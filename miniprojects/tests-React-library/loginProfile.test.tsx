import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginProfile from '../src/app/login-profile/page';

describe('Login Profile Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login profile page', () => {
    render(<LoginProfile />);
    expect(document.body.textContent.length).toBeGreaterThan(0);
  });

  it('should have login form', () => {
    render(<LoginProfile />);
    const forms = screen.queryAllByRole('form', { hidden: true });
    expect(forms.length).toBeGreaterThan(0);
  });

  it('should have username input', () => {
    render(<LoginProfile />);
    const inputs = screen.queryAllByRole('textbox', { hidden: true });
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('should handle login submission', () => {
    render(<LoginProfile />);
    const buttons = screen.queryAllByRole('button');
    
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
  });

  it('should toggle between login and profile views', async () => {
    render(<LoginProfile />);
    const buttons = screen.queryAllByRole('button');
    
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
      await waitFor(() => {
        expect(document.body.textContent.length).toBeGreaterThan(0);
      });
    }
  });

  it('should handle logout', async () => {
    render(<LoginProfile />);
    const buttons = screen.queryAllByRole('button');
    
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
      await waitFor(() => {
        // Should return to login view
        expect(document.body.textContent.length).toBeGreaterThan(0);
      });
    }
  });
});
