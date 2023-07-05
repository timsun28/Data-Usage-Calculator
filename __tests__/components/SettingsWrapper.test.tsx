import { render, fireEvent } from '@testing-library/react';
import SettingsWrapper from '../../components/SettingsWrapper';

describe('SettingsWrapper Component', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<SettingsWrapper />);
    expect(getByText('Data:')).toBeInTheDocument();
  });

  it('should handle user interactions correctly', () => {
    const { getByLabelText } = render(<SettingsWrapper />);
    const input = getByLabelText('Data:');
    fireEvent.change(input, { target: { value: '50' } });
    expect(input.value).toBe('50');
  });

  it('should handle useEffect hook correctly', () => {
    const { getByText } = render(<SettingsWrapper />);
    expect(getByText(/You should have/)).toBeInTheDocument();
  });
});
