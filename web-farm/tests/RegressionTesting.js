import { render } from '@testing-library/react';
import SoilPanel from '../src/components/SoilPanel';

test('matches the snapshot', () => {
  const { asFragment } = render(<SoilPanel />);
  expect(asFragment()).toMatchSnapshot();
});
