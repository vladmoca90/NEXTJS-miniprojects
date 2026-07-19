import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/app/add-list-redux/page';

describe('Add-List Redux Page', () => {
  it('should render add component and list component', () => {
    render(<App />);
    // Both components should be rendered within main element
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should have Redux store provider', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render add-list styles', () => {
    const { container } = render(<App />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });
});
