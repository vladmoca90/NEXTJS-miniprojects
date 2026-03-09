import { render, screen } from '@testing-library/react';
import CountriesListComponent from '../src/app/CountryListComponent';
import { Country } from '../data/countries/Country';

// Mock Next.js Link and Router to avoid routing issues in tests
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: any }) => (
    <a href={typeof href === 'string' ? href : href.pathname + '?' + new URLSearchParams(href.query).toString()}>
      {children}
    </a>
  );
});

// Mock CountryComponentTwo since it's a separate component
jest.mock('../src/app/CountryComponentTwo', () => {
  return function MockCountryComponentTwo() {
    return <td>Mocked Component</td>;
  };
});

const mockCountry: Country = {
  name: 'Test Country',
  code: 'TC',
};

describe('CountriesListComponent', () => {
  it('renders country name and code correctly', () => {
    render(<CountriesListComponent country={mockCountry} />);

    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('TC')).toBeInTheDocument();
  });

  it('renders a link with correct href for country name', () => {
    render(<CountriesListComponent country={mockCountry} />);

    const link = screen.getByRole('link', { name: 'Test Country' });
    expect(link).toHaveAttribute('href', '/country-name?countryName=Test%20Country');
  });

  it('renders the mocked CountryComponentTwo', () => {
    render(<CountriesListComponent country={mockCountry} />);

    expect(screen.getByText('Mocked Component')).toBeInTheDocument();
  });
});