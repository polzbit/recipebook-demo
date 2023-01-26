import { render, screen } from '@testing-library/react';
import { TabPanel } from '.';

describe('TabPanel test suite', () => {
  it('TabPanel should mount', () => {
    render(<TabPanel currentTab='' value='' />);
    const tabpanel = screen.getByTestId('tabpanel');
    expect(tabpanel).toBeInTheDocument();
  });
});
