import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../pages/index';

describe('Home', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Data Usage')).toBeInTheDocument();
  });

  // Add more tests as needed
});
