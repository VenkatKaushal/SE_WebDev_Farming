import React from 'react'
import HomePage from './HomePage/HomePage';
import LoginPage from './RegisterPage/LoginPage';
import Stats from './stats/stats';
import ResultsPage from './Prediction Page/Results';
import ForgotPassword from './RegisterPage/ForgotPassword';
import PredictionPage from './Prediction Page/PredictionPage';
import FertilizerInfo from './Info_Page/Components/fertilizer_info';
import InfoPage from './Info_Page/Components/info_page';
import SimulationPage from './SimulationPage/SimulationPage';
import ContactUs from './HomePage/ContactUs';



function App(){
    return (
        // <App/> Change this name to <App/> and import to see Home page.
        
        // <PredictorPage/>
        // <InfoPage />
        // <RegisterPage/>
        <Routes>
        <HomePage />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/contactUs" element={<ContactUs/>} />
        <Route path="/simulate" element={<SimulationPage/>} />
        <Route path="/Info" element={<InfoPage/>} />
        <Route path="/crop_info" element={<CropInfo/>} />
        <Route path="/fertilizer_info" element={<FertilizerInfo/>} />
        <Route path="/prediction" element={<PredictionPage/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/results" element={<ResultsPage/>} />
        <Route path="/stats" element={<Stats/>} />
      </Routes>
        
    );
};

export default App;