import { render, screen, fireEvent } from '@testing-library/react';
import FormField from './FormField';

describe('FormField Component', () => {
  const mockHandleChange = jest.fn();
  const mockHandleSurpriseMe = jest.fn();

  // 1. Renders without crashing
  it('should render the FormField component', () => {
    render(
      <FormField
        labelName='Test Label'
        type='text'
        name='testName'
        placeholder='Test Placeholder'
        value='Test Value'
        handleChange={mockHandleChange}
        isSurpriseMe={false}
      />
    );
    const input = screen.getByPlaceholderText('Test Placeholder');
    expect(input).toBeInTheDocument();
  });

  // 2. Displays the correct label
  it('should display the correct label', () => {
    render(
      <FormField
        labelName='Test Label'
        type='text'
        name='testName'
        placeholder='Test Placeholder'
        value='Test Value'
        handleChange={mockHandleChange}
        isSurpriseMe={false}
      />
    );
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  // 3. Renders the input with correct attributes
  it('should render the input with correct attributes', () => {
    render(
      <FormField
        labelName='Test Label'
        type='text'
        name='testName'
        placeholder='Test Placeholder'
        value='Test Value'
        handleChange={mockHandleChange}
        isSurpriseMe={false}
      />
    );
    const input = screen.getByPlaceholderText('Test Placeholder');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'testName');
    expect(input).toHaveValue('Test Value');
  });

  // 4. Handles onChange events correctly
  it('should call handleChange when the input value changes', () => {
    render(
      <FormField
        labelName='Test Label'
        type='text'
        name='testName'
        placeholder='Test Placeholder'
        value=''
        handleChange={mockHandleChange}
        isSurpriseMe={false}
      />
    );
    const input = screen.getByPlaceholderText('Test Placeholder');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  // 5. Conditionally renders the "Surprise Me" button
  it('should render the "Surprise Me" button only when isSurpriseMe is true', () => {
    render(
      <FormField
        labelName='Test Label'
        type='text'
        name='testName'
        placeholder='Test Placeholder'
        value='Test Value'
        handleChange={mockHandleChange}
        isSurpriseMe={true}
        handleSurpriseMe={mockHandleSurpriseMe}
      />
    );
    const button = screen.getByText('Surprise me');
    expect(button).toBeInTheDocument();
  });

  it('should not render the "Surprise Me" button when isSurpriseMe is false', () => {
    render(
      <FormField
        labelName='Test Label'
        type='text'
        name='testName'
        placeholder='Test Placeholder'
        value='Test Value'
        handleChange={mockHandleChange}
        isSurpriseMe={false}
      />
    );
    const button = screen.queryByText('Surprise me');
    expect(button).not.toBeInTheDocument();
  });

  // 6. Calls handleSurpriseMe when the "Surprise Me" button is clicked
  it('should call handleSurpriseMe when the button is clicked', () => {
    render(
      <FormField
        labelName='Test Label'
        type='text'
        name='testName'
        placeholder='Test Placeholder'
        value='Test Value'
        handleChange={mockHandleChange}
        isSurpriseMe={true}
        handleSurpriseMe={mockHandleSurpriseMe}
      />
    );
    const button = screen.getByText('Surprise me');
    fireEvent.click(button);
    expect(mockHandleSurpriseMe).toHaveBeenCalledTimes(1);
  });
});
