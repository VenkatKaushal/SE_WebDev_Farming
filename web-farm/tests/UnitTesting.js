import { render, screen } from '@testing-library/react';
import SoilPanel from '../src/components/SoilPanel';

test('renders SoilPanel with correct heading', () => {
  render(<SoilPanel />);
  const headingElement = screen.getByText(/Soil Types/i);
  expect(headingElement).toBeInTheDocument();
});
