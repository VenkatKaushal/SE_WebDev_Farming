import { render, fireEvent } from '@testing-library/react';
import App from '../src/App'; // Assuming your main component is App

test('dragging a crop into the canvas adds it to the simulation', () => {
  const { getByText } = render(<App />);
  
  const cropItem = getByText(/Crop Name/i); // Replace with actual crop name
  const canvas = getByText(/canvas/i); // Assuming you have a canvas element with this text

  fireEvent.dragStart(cropItem);
  fireEvent.drop(canvas);
  
  // Add assertions here to verify the crop has been added
});
