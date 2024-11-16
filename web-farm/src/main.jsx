import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router'; // Your router setup

const Main = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Main;
