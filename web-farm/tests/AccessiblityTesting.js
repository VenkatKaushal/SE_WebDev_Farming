import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import SidePanel from '../src/components/SoilPanel';

test('should have no accessibility violations', async () => {
  const { container } = render(<SidePanel />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
