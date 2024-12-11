import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Component', () => {
  // 1. Renders without crashing
  it('should render the Loader component', () => {
    render(<Loader />);
    const loader = screen.getByRole('status'); // Check for the role attribute
    expect(loader).toBeInTheDocument();
  });

  // 2. Contains correct ARIA attributes
  it('should have ARIA attributes for accessibility', () => {
    render(<Loader />);
    const svg = screen.getByRole('status').querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  // 3. SVG is displayed with the correct classes
  it('should display the SVG with the correct classes', () => {
    render(<Loader />);
    const svg = screen.getByRole('status').querySelector('svg');
    expect(svg).toHaveClass('inline w-10 h-10 mr-2 text-gray-200 animate-spin fill-[#6469ff]');
  });

  // 4. Uses the correct DOM structure
  it('should have a div containing an SVG', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');
    const svg = loader.querySelector('svg');
    expect(loader).toContainElement(svg); // Ensures SVG is a child of the div
  });
});
