import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';

// Enable fake timers globally for this test file
jest.useFakeTimers(); // Enable fake timers

// Mock child components
jest.mock('../components/Card', () => {
  const MockCard = ({ name, prompt }) => (
    <div data-testid='card'>
      {name}: {prompt}
    </div>
  );
  MockCard.displayName = 'Card'; // Add displayName
  return MockCard;
});

jest.mock('../components/Loader', () => {
  const MockLoader = () => <div data-testid='loader'>Loading...</div>;
  MockLoader.displayName = 'Loader'; // Add displayName
  return MockLoader;
});

jest.mock('../components/FormField', () => {
  const MockFormField = ({ handleChange, value }) => (
    <input
      data-testid='search-input'
      type='text'
      placeholder='Search something...'
      onChange={handleChange}
      value={value}
    />
  );
  MockFormField.displayName = 'FormField'; // Add displayName
  return MockFormField;
});

// Mock window.alert
beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

describe('Home Component', () => {
  const mockPosts = [
    { id: 1, name: 'Post 1', prompt: 'Beautiful sunset' },
    { id: 2, name: 'Post 2', prompt: 'Ocean waves' },
  ];

  beforeEach(() => {
    // Mock the fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockPosts }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllTimers(); // Clear any active timers
    // jest.useRealTimers(); // Reset timers to real after tests
  });

  it('should render header and description on initial load', () => {
    render(<Home />);
    expect(screen.getByText(/The community Showcase/i)).toBeInTheDocument();
    expect(screen.getByText(/Browse through a collection of imaginative and visually stunning images/i)).toBeInTheDocument();
  });

  it('should display the loader while fetching posts', () => {
    const mockFetch = jest.fn(
      () =>
        new Promise((resolve) => {
          // Simulate a delay to ensure loading is tested
          setTimeout(() => resolve({ ok: true, json: () => ({ data: [] }) }), 100);
        })
    );

    global.fetch = mockFetch;

    render(<Home />);

    // Loader should be visible during loading
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should fetch and render posts from API', async () => {
    const mockPosts = [
      { id: 1, name: 'Post 1', prompt: 'Beautiful sunset' },
      { id: 2, name: 'Post 2', prompt: 'Ocean waves' },
    ];

    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockPosts }),
      })
    );

    render(<Home />);

    await waitFor(() => {
      expect(screen.getAllByTestId('card')).toHaveLength(mockPosts.length);
    });

    expect(screen.getByText(/Post 1: Beautiful sunset/i)).toBeInTheDocument();
    expect(screen.getByText(/Post 2: Ocean waves/i)).toBeInTheDocument();
  });

  //!
  it('should filter posts when a search term is entered', async () => {
    render(<Home />);

    // Wait for posts to load
    await waitFor(() => {
      expect(screen.getAllByTestId('card')).toHaveLength(mockPosts.length);
    });

    const searchInput = screen.getByTestId('search-input');

    // Change the search input value to 'sunset'
    fireEvent.change(searchInput, { target: { value: 'sunset' } });

    // Advance timers to simulate debounce
    jest.advanceTimersByTime(500);

    // Wait for the DOM to update based on the filtered results
    await waitFor(() => {
      // Ensure only "Post 1: Beautiful sunset" is displayed
      const filteredPosts = screen.getAllByTestId('card');
      expect(filteredPosts).toHaveLength(1);
      expect(screen.getByText(/Post 1: Beautiful sunset/i)).toBeInTheDocument();

      // Ensure "Post 2: Ocean waves" is not displayed
      expect(screen.queryByText(/Post 2: Ocean waves/i)).not.toBeInTheDocument();
    });
  });

  it('should display fallback message if no search results are found', async () => {
    const mockPosts = [
      { id: 1, name: 'Post 1', prompt: 'Beautiful sunset' },
      { id: 2, name: 'Post 2', prompt: 'Ocean waves' },
    ];

    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockPosts }),
      })
    );

    render(<Home />);

    await waitFor(() => {
      expect(screen.getAllByTestId('card')).toHaveLength(mockPosts.length);
    });

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'mountain' } });

    jest.advanceTimersByTime(500); // Simulate debounce

    await waitFor(() => {
      expect(screen.getByText(/No Search Results Found/i)).toBeInTheDocument();
    });
  });

  it('should display fallback message if no posts exist', async () => {
    // Mock fetch with no posts
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] }),
      })
    );

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/No Posts Found/i)).toBeInTheDocument();
    });
  });
});
