import React from 'react';
import { render } from '@testing-library/react';
import SettingsWrapper from '../../components/SettingsWrapper';

describe('SettingsWrapper', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<SettingsWrapper />);
    expect(getByText('Data:')).toBeInTheDocument();
  });

  // Add more tests as needed
});
