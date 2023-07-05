import { render, fireEvent } from '@testing-library/react';
import Home from '../../pages/index';

describe('Home Component', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Data Usage')).toBeInTheDocument();
  });

  it('should handle user interactions correctly', () => {
    const { getByLabelText } = render(<Home />);
    const input = getByLabelText('Data:');
    fireEvent.change(input, { target: { value: '50' } });
    expect(input.value).toBe('50');
  });

  it('should handle useEffect hook correctly', () => {
    const { getByText } = render(<Home />);
    expect(getByText(/You should have/)).toBeInTheDocument();
  });
});
