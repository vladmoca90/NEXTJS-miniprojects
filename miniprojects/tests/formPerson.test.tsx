import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormPerson from '../src/app/person-main/page';

describe('FormPerson', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // stub fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) }) as any
    );
  });

  it('renders the form fields and submit link', () => {
    render(<FormPerson />);

    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your password')).toBeInTheDocument();
    expect(screen.getByText('Confirm terms and conditions!')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Submit' })).toBeInTheDocument();
  });

  it('disables submit when inputs are empty or invalid', () => {
    render(<FormPerson />);
    const submitLink = screen.getByRole('link', { name: 'Submit' });

    expect(submitLink).toHaveClass('btn-submit disabled');

    fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Your password'), { target: { value: '' } });
    expect(submitLink).toHaveClass('disabled');
  });

  it('shows validation messages when password or checkbox invalid', () => {
    render(<FormPerson />);

    const passwordInput = screen.getByPlaceholderText('Your password');
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    // password validation span should exist
    expect(screen.getByText('The password is not valid')).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(screen.getByText('You must agree with the term and conditions')).toBeInTheDocument();
  });

  it('enables submit and calls fetch on click when valid', () => {
    render(<FormPerson />);

    const nameInput = screen.getByPlaceholderText('Your name');
    const passwordInput = screen.getByPlaceholderText('Your password');
    const checkbox = screen.getByRole('checkbox');
    const submitLink = screen.getByRole('link', { name: 'Submit' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPass123' } });
    fireEvent.click(checkbox);

    expect(submitLink).not.toHaveClass('disabled');

    fireEvent.click(submitLink);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/person-details', expect.any(Object));
  });
});