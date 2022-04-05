import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders h1', () => {
  render(<App />);
  const h1Element = screen.getByText(/Welcome/i);
  expect(h1Element).toBeInTheDocument();
});

test("Is there a Canvas", () => {
  render(<App/>);
  const canvas = screen.getByTitle("canvas");
  expect(canvas).toBeInTheDocument();
});
