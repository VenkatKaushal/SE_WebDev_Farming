import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import SignUp from "../RegisterPage/RegisterPage";
import Login from "../RegisterPage/LoginPage";
import Simulate from "../SimulationPage/SimulationPage";
import Crop_Info from "../Info_Page/Components/crop_info";
import Fertilizer from "../Info_Page/Components/fertilizer_info";
import Info_page from "../Info_Page/Components/info_page";
import ForgotPassword from "../RegisterPage/ForgotPassword";
import PredictionPage from '../Prediction Page/PredictionPage';
import ResultsPage from '../Prediction Page/Results';
import ContactUs from '../HomePage/ContactUs';

export const router = createBrowserRouter([
            {
                path: "/",
                element: <HomePage />,
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
                path: "/contactUs",
                element: <ContactUs/>,
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
                element: <PredictionPage/>,
            },
            {
                path: "/forgotpassword",
                element: <ForgotPassword/>,
            },
            {
                path: "/results",
                element: <ResultsPage />,
            }
]);