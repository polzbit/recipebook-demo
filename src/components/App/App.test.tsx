import { render, screen } from '@testing-library/react';
import { App } from './';

test('app should mount', () => {
  render(<App />);
  const app = screen.getByTestId('app');
  expect(app).toBeInTheDocument();
});
