import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import App from './App';

// Helper to render App with routing
// const renderWithRouter = (ui) => {
//   return render(<BrowserRouter>{ui}</BrowserRouter>);
// };

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
});

// it('should navigate to Home when clicking the logo', async () => {
//   renderWithRouter(<App />);
//   const user = userEvent.setup();

//   const logoLink = screen.getByAltText(/logo/i).closest('a');
//   expect(logoLink).toHaveAttribute('href', '/');

//   // Simulate clicking the logo
//   await user.click(logoLink);

//   // Verify Home component renders
//   expect(
//     screen.getByText(/welcome to the feed/i) // Assuming this text is in the Home component
//   ).toBeInTheDocument();
// });

// it('should navigate to CreatePost when clicking the "Create" button', async () => {
//   renderWithRouter(<App />);
//   const user = userEvent.setup();

//   const createButton = screen.getByRole('link', { name: /create/i });
//   expect(createButton).toHaveAttribute('href', '/create-post');

//   // Simulate clicking the "Create" button
//   await user.click(createButton);

//   // Verify CreatePost component renders
//   expect(
//     screen.getByText(/create your post/i) // Assuming this text is in the CreatePost component
//   ).toBeInTheDocument();
// });

// it('should apply correct styles for responsive layout', () => {
//   renderWithRouter(<App />);

//   // Check that header contains expected classes for responsiveness
//   const header = screen.getByRole('banner'); // Assuming header has `role="banner"`
//   expect(header).toHaveClass('sm:px-8', 'bg-white', 'border-b');

//   // Verify main layout styles
//   const main = screen.getByRole('main');
//   expect(main).toHaveClass('sm:p-8', 'bg-[#f9fafe]');
// });
