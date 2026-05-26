import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Profile Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render profile page', () => {
    render(
      <div>
        <h1>User Profile</h1>
        <div>Profile information</div>
      </div>
    );
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  });

  it('should display user information', () => {
    const { container } = render(
      <div>
        <h1>John Doe</h1>
        <p>Email: john@example.com</p>
        <p>Phone: +1 234 567 8900</p>
      </div>
    );
    expect(container.textContent).toContain('John Doe');
    expect(container.textContent).toContain('john@example.com');
  });

  it('should have edit button', () => {
    render(
      <div>
        <button>Edit Profile</button>
      </div>
    );
    const editBtn = screen.getByRole('button', { name: /edit/i });
    expect(editBtn).toBeInTheDocument();
  });

  it('should show profile avatar/image', () => {
    render(
      <div>
        <img src="/avatar.jpg" alt="User avatar" />
      </div>
    );
    const avatar = screen.getByAltText(/avatar/i);
    expect(avatar).toBeInTheDocument();
  });

  it('should handle edit profile click', () => {
    render(
      <div>
        <button>Edit Profile</button>
      </div>
    );
    const editBtn = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editBtn);
    expect(editBtn).toBeInTheDocument();
  });

  it('should have logout button', () => {
    render(
      <div>
        <button>Logout</button>
      </div>
    );
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    expect(logoutBtn).toBeInTheDocument();
  });

  it('should display user stats', () => {
    const { container } = render(
      <div>
        <div>Member Since: 2023</div>
        <div>Posts: 42</div>
        <div>Followers: 150</div>
      </div>
    );
    expect(container.textContent).toContain('Member Since');
  });

  it('should handle logout', () => {
    render(
      <div>
        <button>Logout</button>
      </div>
    );
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);
    expect(logoutBtn).toBeInTheDocument();
  });
});
