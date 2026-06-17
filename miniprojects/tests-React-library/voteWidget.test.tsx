import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import VoteWidget from '../src/app/vote-widget/VoteWidget';

describe('VoteWidget (React Library)', () => {
  it('should render vote widget', () => {
    render(<VoteWidget />);
    expect(screen.getByText(/yamaha|ducati|harley/i)).toBeInTheDocument();
  });

  it('should display all bike voting buttons', () => {
    render(<VoteWidget />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(3);
  });

  it('should display bike names in buttons', () => {
    render(<VoteWidget />);
    expect(screen.getByRole('button', { name: /yamaha/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ducati/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /harley/i })).toBeInTheDocument();
  });

  it('should show vote message when clicking a bike button', async () => {
    render(<VoteWidget />);
    
    const yamahaButton = screen.getByRole('button', { name: /yamaha/i });
    fireEvent.click(yamahaButton);
    
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveTextContent('clicked done');
    });
  });

  it('should display bike emoji icons', () => {
    const { container } = render(<VoteWidget />);
    const emojiElements = container.querySelectorAll('.bike-emoji');
    
    expect(emojiElements.length).toBe(3);
    emojiElements.forEach(emoji => {
      expect(emoji.textContent).toBe('🏍️');
    });
  });

  it('should render vote buttons with correct styling', () => {
    const { container } = render(<VoteWidget />);
    const voteButtons = container.querySelectorAll('.vote-button');
    
    expect(voteButtons.length).toBe(3);
    voteButtons.forEach(button => {
      expect(button).toHaveClass('vote-button');
    });
  });

  it('should update message when different bikes are voted', async () => {
    render(<VoteWidget />);
    
    const ducatiButton = screen.getByRole('button', { name: /ducati/i });
    fireEvent.click(ducatiButton);
    
    await waitFor(() => {
      let statusMessage = screen.getByRole('status');
      expect(statusMessage).toHaveTextContent('clicked done');
    });

    const harleyButton = screen.getByRole('button', { name: /harley/i });
    fireEvent.click(harleyButton);

    await waitFor(() => {
      let statusMessage = screen.getByRole('status');
      expect(statusMessage).toHaveTextContent('clicked done');
    });
  });

  it('should have vote widget container with correct structure', () => {
    const { container } = render(<VoteWidget />);
    
    const voteWidget = container.querySelector('.vote-widget');
    expect(voteWidget).toBeInTheDocument();
    
    const voteButtons = container.querySelector('.vote-buttons');
    expect(voteButtons).toBeInTheDocument();
    expect(voteWidget).toContainElement(voteButtons);
  });

  it('should display vote message with correct status role', async () => {
    render(<VoteWidget />);
    
    const button = screen.getByRole('button', { name: /yamaha/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      const statusElement = screen.getByRole('status');
      expect(statusElement).toHaveClass('vote-message');
    });
  });

  it('should not display message initially', () => {
    render(<VoteWidget />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
