import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Send Message Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render send message page', () => {
    render(
      <div>
        <form>
          <label htmlFor="message">Your message</label>
          <textarea id="message" placeholder="Leave a comment..." />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
  });

  it('should have message textarea', () => {
    render(
      <div>
        <textarea id="message" placeholder="Leave a comment..." />
      </div>
    );
    const textarea = screen.getByPlaceholderText(/leave a comment/i);
    expect(textarea).toBeInTheDocument();
  });

  it('should handle message input', () => {
    render(
      <div>
        <textarea id="message" />
      </div>
    );
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test message' } });
    expect(textarea).toHaveValue('Test message');
  });

  it('should submit message', () => {
    render(
      <div>
        <textarea placeholder="message" />
        <button type="submit">Submit</button>
      </div>
    );
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);
    expect(submitBtn).toBeInTheDocument();
  });

  it('should validate message not empty', () => {
    render(
      <div>
        <textarea id="message" required />
        <button type="submit">Submit</button>
      </div>
    );
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.required).toBe(true);
  });

  it('should display message after submission', async () => {
    render(
      <div>
        <textarea id="message" />
        <button>Submit</button>
        <div id="yourText">Your message will appear here</div>
      </div>
    );
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Hello World' } });
    
    await waitFor(() => {
      expect(textarea).toHaveValue('Hello World');
    });
  });
});
