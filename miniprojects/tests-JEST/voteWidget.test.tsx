import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VoteWidget from '../src/app/vote-widget/votingWidgetComponent';

describe('VoteWidget (Jest)', () => {
  it('renders all bike buttons', () => {
    render(<VoteWidget />);

    // Check that all bikes are rendered
    expect(screen.getByRole('button', { name: /yamaha/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ducati/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /harley/i })).toBeInTheDocument();
  });

  it('displays bike emoji on buttons', () => {
    const { container } = render(<VoteWidget />);

    const emojiElements = container.querySelectorAll('.bike-emoji');
    expect(emojiElements.length).toBe(3);
    expect(emojiElements[0].textContent).toBe('🏍️');
  });

  it('displays bike names correctly', () => {
    render(<VoteWidget />);

    expect(screen.getByText('Yamaha')).toBeInTheDocument();
    expect(screen.getByText('Ducati')).toBeInTheDocument();
    expect(screen.getByText('Harley')).toBeInTheDocument();
  });

  it('shows message when a bike button is clicked', () => {
    render(<VoteWidget />);

    // Before clicking, message should not be visible
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    // Click Yamaha button
    const yamahaButton = screen.getByRole('button', { name: /yamaha/i });
    fireEvent.click(yamahaButton);

    // After clicking, message should be visible
    const statusMessage = screen.getByRole('status');
    expect(statusMessage).toBeInTheDocument();
    expect(statusMessage).toHaveTextContent('clicked done');
  });

  it('updates message when different bike buttons are clicked', () => {
    render(<VoteWidget />);

    // Click Ducati button
    const ducatiButton = screen.getByRole('button', { name: /ducati/i });
    fireEvent.click(ducatiButton);

    let statusMessage = screen.getByRole('status');
    expect(statusMessage).toHaveTextContent('clicked done');

    // Click Harley button
    const harleyButton = screen.getByRole('button', { name: /harley/i });
    fireEvent.click(harleyButton);

    statusMessage = screen.getByRole('status');
    expect(statusMessage).toHaveTextContent('clicked done');
  });

  it('applies correct CSS classes to vote buttons', () => {
    const { container } = render(<VoteWidget />);

    const buttons = container.querySelectorAll('.vote-button');
    expect(buttons.length).toBe(3);
    buttons.forEach((button) => {
      expect(button).toHaveClass('vote-button');
    });
  });

  it('applies correct CSS classes to vote widget container', () => {
    const { container } = render(<VoteWidget />);

    const voteWidget = container.querySelector('.vote-widget');
    expect(voteWidget).toHaveClass('vote-widget');

    const voteButtons = container.querySelector('.vote-buttons');
    expect(voteButtons).toHaveClass('vote-buttons');
  });

  it('displays vote message with correct styling', () => {
    const { container } = render(<VoteWidget />);

    const button = screen.getByRole('button', { name: /yamaha/i });
    fireEvent.click(button);

    const messageDiv = container.querySelector('.vote-message');
    expect(messageDiv).toHaveClass('vote-message');
    expect(messageDiv).toBeInTheDocument();
  });
});
