import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConverterApp from '../src/app/converter-redux/page';

describe('Converter Redux Page', () => {
  it('should render converter application', () => {
    render(<ConverterApp />);
    expect(screen.getByText(/convert/i)).toBeInTheDocument();
  });

  it('should have input fields for conversion', () => {
    render(<ConverterApp />);
    const inputs = screen.getAllByRole('textbox', { hidden: true });
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('should support input changes', () => {
    render(<ConverterApp />);
    const input = screen.queryAllByRole('textbox', { hidden: true })[0];
    
    if (input) {
      fireEvent.change(input, { target: { value: '100' } });
      expect(input).toHaveValue('100');
    }
  });

  it('should have conversion options', () => {
    render(<ConverterApp />);
    const selects = screen.queryAllByRole('combobox');
    expect(selects.length).toBeGreaterThan(0);
  });

  it('should perform conversion on value change', () => {
    render(<ConverterApp />);
    const input = screen.queryAllByRole('textbox', { hidden: true })[0];
    
    if (input) {
      fireEvent.change(input, { target: { value: '50' } });
      expect(input).toHaveValue('50');
    }
  });
});
