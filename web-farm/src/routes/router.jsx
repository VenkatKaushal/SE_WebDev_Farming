import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import SignUp from "../RegisterPage/RegisterPage";
import Login from "../RegisterPage/LoginPage";
import Simulate from "../SimulationPage/SimulationPage";
import Crop_Info from "../Info_Page/Components/crop_info";
import Fertilizer from "../Info_Page/Components/fertilizer_info";
import Info_page from "../Info_Page/Components/info_page";
import Prediction from "../Prediction Page/PredictionPage";
import ForgotPassword from "../RegisterPage/ForgotPassword";

export const router = createBrowserRouter([
            {
                path: "/",
                element: <HomePage />,
                exact: true,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/signup",
                element: <SignUp/>,
            },
            {
                path: "/simulate",
                element: <Simulate/>,
            },
            {
                path: "/Info",
                element: <Info_page/>,
            },
            {
                path: "/crop_info",
                element: <Crop_Info/>,
            },
            {
                path: "/fertilizer_info",
                element: <Fertilizer/>,
            },
            {
                path: "/prediction",
                element: <Prediction/>,
            },
            {
                path: "/forgotpassword",
                element: <ForgotPassword/>,
            },
]);