import { render, screen } from '@testing-library/react';
import App from '../App';

test('it renders h1', () => {
  render(<App />);
  const h1Element = screen.getByText(/Urban Adventure/i);
  expect(h1Element).toBeInTheDocument();
});

test("is there a Canvas", () => {
  render(<App/>);
  const canvas = screen.getByTestId("canvas");
  expect(canvas).toBeInTheDocument();
});