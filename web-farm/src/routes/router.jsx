import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import SignUp from "../RegisterPage/RegisterPage";
import Login from "../RegisterPage/LoginPage";
// import Simulate from "../SimulationPage/SimulationPage";
import Crop_Info from "../Info_Page/Components/crop_info";
import Fertilizer from "../Info_Page/Components/fertilizer_info";
import Info_page from "../Info_Page/Components/info_page";
import ForgotPassword from "../RegisterPage/ForgotPassword";
import PredictionPage from '../Prediction Page/PredictionPage';
import ResultsPage from '../Prediction Page/Results';
import ContactUs from '../HomePage/ContactUs';
import Stats from '../stats/stats';
import SimulationPage from '../SimulationPage/SimulationPage';
import FertilizerInfo from '../Info_Page/Components/fertilizer_info';

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
                element: <SimulationPage/>,
            },
            {
                path: "/Info",
                element: <Infopage/>,
            },
            {
                path: "/crop_info",
                element: <CropInfo/>,
            },
            {
                path: "/fertilizer_info",
                element: <FertilizerInfo/>,
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
            },
            {
                path: "/stats",
                element: <Stats/>,
            }
]);