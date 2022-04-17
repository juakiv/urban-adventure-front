import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders start button', () => {
  render(<App />);
  const connecting = screen.getByText(/Connecting to the server.../i);
  expect(connecting).toBeInTheDocument();
});

test("Is there a Canvas", () => {
  render(<App/>);
  const canvas = screen.getByTestId("canvas");
  expect(canvas).toBeInTheDocument();
});


