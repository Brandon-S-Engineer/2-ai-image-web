import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';
import { downloadImage } from '../utils';

jest.mock('../utils', () => ({
  downloadImage: jest.fn(),
}));

describe('Card Component', () => {
  const mockProps = {
    _id: '12345',
    name: 'John Doe',
    prompt: 'A beautiful sunset over the mountains.',
    photo: 'test-photo-url',
  };

  // 1. Renders without crashing
  it('should render the Card component', () => {
    render(<Card {...mockProps} />);
    const card = screen.getByAltText(mockProps.prompt);
    expect(card).toBeInTheDocument();
  });

  // 2. Displays the correct image
  it('should display the correct image with alt text', () => {
    render(<Card {...mockProps} />);
    const image = screen.getByAltText(mockProps.prompt);
    expect(image).toHaveAttribute('src', mockProps.photo);
    expect(image).toHaveAttribute('alt', mockProps.prompt);
  });

  // 3. Displays the prompt and name
  it('should render the prompt and name elements with correct classes', () => {
    render(<Card {...mockProps} />);
    const promptElement = screen.getByText(mockProps.prompt);
    const nameElement = screen.getByText(mockProps.name);

    // Check that the elements are present
    expect(promptElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();

    // Optionally, check that their parent has the 'hidden' and 'group-hover:flex' classes
    const parentDiv = promptElement.parentElement;
    expect(parentDiv).toHaveClass('hidden', 'group-hover:flex');

    // Since CSS hover effects are not applied in the test environment,
    // we cannot test the visibility change on hover.
  });

  // 4. Displays the correct initial letter for the name
  it('should display the first letter of the name in the green circle', () => {
    render(<Card {...mockProps} />);
    const initial = screen.getByText(mockProps.name[0]);
    expect(initial).toBeInTheDocument();
    expect(initial).toHaveClass('bg-green-700'); // Check for correct styling
  });

  // 5. Handles download button click
  it('should call downloadImage with the correct arguments when the download button is clicked', () => {
    render(<Card {...mockProps} />);
    const button = screen.getByAltText('download').closest('button');

    fireEvent.click(button);
    expect(downloadImage).toHaveBeenCalledTimes(1);
    expect(downloadImage).toHaveBeenCalledWith(mockProps._id, mockProps.photo);
  });
});
