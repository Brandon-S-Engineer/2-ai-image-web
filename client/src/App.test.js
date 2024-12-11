import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should render the header with logo and navigation links', () => {
    render(<App />);

    // Check if the logo is rendered correctly
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();

    // Check if the "Create" button is rendered correctly
    const createButton = screen.getByRole('link', { name: /create/i });
    expect(createButton).toBeInTheDocument();
    expect(createButton).toHaveAttribute('href', '/create-post');
  });

  it('should navigate to Home when clicking the logo', async () => {
    // Render the app
    render(<App />);
    const user = userEvent.setup();

    // Find the logo link
    const logoLink = screen.getByAltText(/logo/i).closest('a');
    expect(logoLink).toHaveAttribute('href', '/');

    // Simulate clicking the logo
    await act(async () => {
      await user.click(logoLink);
    });

    // Verify that the Home component renders
    expect(
      screen.getByText(/The community Showcase/i) // Updated to match the actual text
    ).toBeInTheDocument();
  });

  it('should navigate to CreatePost when clicking the "Create" button', async () => {
    render(<App />); // Use render directly since App already includes BrowserRouter
    const user = userEvent.setup();

    const createButton = screen.getByRole('link', { name: /create/i });
    expect(createButton).toHaveAttribute('href', '/create-post');

    // Simulate clicking the "Create" button
    await act(async () => {
      await user.click(createButton);
    });

    // Verify CreatePost component renders
    expect(screen.getByText(/generate an imaginative image through dall-e ai and share it with the community/i)).toBeInTheDocument();
  });

  it('should apply correct styles for responsive layout', () => {
    render(<App />);

    // Check that header contains expected classes for responsiveness
    const header = screen.getByRole('banner'); // Assuming header has `role="banner"`
    expect(header).toHaveClass('sm:px-8', 'bg-white', 'border-b');

    // Verify main layout styles
    const main = screen.getByRole('main');
    expect(main).toHaveClass('sm:p-8', 'bg-[#f9fafe]');
  });
});
