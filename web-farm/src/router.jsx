import { createBrowserRouter } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import SignUp from "./RegisterPage/RegisterPage";
import Login from "./RegisterPage/LoginPage";
import Simulate from "./SimulationPage/SimulationPage";

export const router = createBrowserRouter([
    {
        path: "/",  // Add the base path
        element: <HomePage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/simulate",
                element: <Simulate/>,
            },
        ],
    },
]);