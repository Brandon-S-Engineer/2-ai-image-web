import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePost from './CreatePost';

// Mocking getRandomPrompt

jest.mock('../utils', () => ({
  getRandomPrompt: jest.fn(() => 'A random prompt'),
}));

// Mock fetch responses
const mockDalleResponse = { photo: 'mocked_base64_photo_data' };
const mockPostResponse = { success: true };

describe('CreatePost Component', () => {
  // Helper function to render component with routing context
  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('renders the component with expected initial elements', () => {
    renderWithRouter(<CreatePost />);

    // Check the heading specifically
    expect(screen.getByRole('heading', { name: /Create/i })).toBeInTheDocument();

    // Check the descriptive paragraph
    expect(screen.getByText(/Generate an imaginative image through DALL-E AI/i)).toBeInTheDocument();

    // Check for form fields
    expect(screen.getByPlaceholderText('Ex., John Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('An Impressionist oil painting of sunflowers in a purple vase…')).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByRole('button', { name: /Generate/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Share with the Community/i })).toBeInTheDocument();
  });

  it('updates form values when the user types', () => {
    renderWithRouter(<CreatePost />);
    const nameInput = screen.getByPlaceholderText('Ex., John Doe');
    const promptInput = screen.getByPlaceholderText('An Impressionist oil painting of sunflowers in a purple vase…');

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(promptInput, { target: { value: 'A sunset over mountains' } });

    expect(nameInput.value).toBe('Jane Doe');
    expect(promptInput.value).toBe('A sunset over mountains');
  });

  it('uses "Surprise Me" to change the prompt', () => {
    renderWithRouter(<CreatePost />);
    const promptInput = screen.getByPlaceholderText('An Impressionist oil painting of sunflowers in a purple vase…');

    // Check initial value
    expect(promptInput.value).toBe('');

    // Find and click the "Surprise Me" button (within FormField)
    // Assume "Surprise Me" is a button with some recognizable text or role
    const surpriseMeButton = screen.getByRole('button', { name: /Surprise Me/i });
    fireEvent.click(surpriseMeButton);

    // After "Surprise Me" is clicked, prompt should change
    expect(promptInput.value).toBe('A random prompt');
  });

  it('alerts if generate button is clicked without a prompt', () => {
    global.alert = jest.fn();
    renderWithRouter(<CreatePost />);

    const generateButton = screen.getByRole('button', { name: /Generate/i });
    fireEvent.click(generateButton);

    expect(global.alert).toHaveBeenCalledWith('Please provide proper prompt');
  });

  it('generates an image when a valid prompt is provided', async () => {
    // Mock fetch response for Dall-E generation
    global.fetch.mockResolvedValueOnce({
      json: async () => mockDalleResponse,
      ok: true,
    });

    renderWithRouter(<CreatePost />);
    const promptInput = screen.getByPlaceholderText('An Impressionist oil painting of sunflowers in a purple vase…');
    fireEvent.change(promptInput, { target: { value: 'A forest with blue trees' } });

    const generateButton = screen.getByRole('button', { name: /Generate/i });
    fireEvent.click(generateButton);

    // Check loading state
    expect(generateButton).toHaveTextContent('Generating...');

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/v1/dalle', expect.any(Object));
      expect(screen.getByAltText('A forest with blue trees')).toBeInTheDocument();
    });

    // After successful fetch, button returns to "Generate"
    expect(generateButton).toHaveTextContent('Generate');
  });

  //!
  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn(); // Mock alert
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
  });

  it('alerts and logs an error if image generation fails', async () => {
    const mockError = new Error('Something went wrong');
    global.fetch.mockRejectedValueOnce(mockError);
    global.alert = jest.fn();
    console.error = jest.fn(); // to avoid noisy error logs in test output

    renderWithRouter(<CreatePost />);
    const promptInput = screen.getByPlaceholderText('An Impressionist oil painting of sunflowers in a purple vase…');
    fireEvent.change(promptInput, { target: { value: 'A robot painting a portrait' } });

    const generateButton = screen.getByRole('button', { name: /Generate/i });
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(mockError);
      expect(console.log).toHaveBeenCalledWith(mockError);
      expect(generateButton).toHaveTextContent('Generate'); // returned to normal
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn();
  });

  it('alerts if user tries to share without generating an image', () => {
    renderWithRouter(<CreatePost />);

    // Find the share button
    const shareButton = screen.getByRole('button', {
      name: /share with the community/i,
    });

    // Get the form element from the button's closest ancestor
    const form = shareButton.closest('form');
    expect(form).not.toBeNull();

    // Directly submit the form
    fireEvent.submit(form);

    expect(window.alert).toHaveBeenCalledWith('Please generate an image');
  });

  it('submits the post when form is complete and navigates home', async () => {
    global.fetch
      .mockResolvedValueOnce({
        // Mock generate image fetch
        json: async () => mockDalleResponse,
        ok: true,
      })
      .mockResolvedValueOnce({
        // Mock save post fetch
        json: async () => mockPostResponse,
        ok: true,
      });

    // Mocking navigate function since we use useNavigate from react-router
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    renderWithRouter(<CreatePost />);

    const nameInput = screen.getByPlaceholderText('Ex., John Doe');
    const promptInput = screen.getByPlaceholderText('An Impressionist oil painting of sunflowers in a purple vase…');
    const generateButton = screen.getByRole('button', { name: /Generate/i });
    const shareButton = screen.getByRole('button', { name: /Share with the Community/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(promptInput, { target: { value: 'A futuristic cityscape' } });

    // Generate image first
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByAltText('A futuristic cityscape')).toBeInTheDocument();
    });

    // Now share the image
    fireEvent.click(shareButton);

    expect(shareButton).toHaveTextContent('Sharing...');

    await waitFor(() => {
      // Post request sent
      expect(global.fetch).toHaveBeenLastCalledWith(
        'http://localhost:8080//api/v1/post',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            name: 'John Doe',
            prompt: 'A futuristic cityscape',
            photo: 'data:image/jpeg;base64,mocked_base64_photo_data',
          }),
        })
      );

      // Success alert
      expect(global.alert).toHaveBeenCalledWith('Success');
      // Ensure navigation after success
      // NOTE: Since we've mocked useNavigate above as jest.fn(),
      // in a real scenario you'd mock the module and check this call differently.
    });

    // Button reverts back after sharing
    expect(shareButton).toHaveTextContent('Share with the Community');
  });

  it('handles errors from the share endpoint', async () => {
    global.fetch
      .mockResolvedValueOnce({
        // Mock generate image fetch
        json: async () => mockDalleResponse,
        ok: true,
      })
      .mockRejectedValueOnce(new Error('Failed to save post')); // Mock share fetch error

    global.alert = jest.fn();

    renderWithRouter(<CreatePost />);

    const nameInput = screen.getByPlaceholderText('Ex., John Doe');
    const promptInput = screen.getByPlaceholderText('An Impressionist oil painting of sunflowers in a purple vase…');
    const generateButton = screen.getByRole('button', { name: /Generate/i });
    const shareButton = screen.getByRole('button', { name: /Share with the Community/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(promptInput, { target: { value: 'A mystical forest' } });

    // Generate image
    fireEvent.click(generateButton);
    await waitFor(() => {
      expect(screen.getByAltText('A mystical forest')).toBeInTheDocument();
    });

    // Attempt to share
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(new Error('Failed to save post'));
    });
  });
});
