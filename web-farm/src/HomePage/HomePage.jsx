import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import HomeCarousel from "./HomeCarousel";
import Login from "../RegisterPage/LoginPage";
import SignUp from "../RegisterPage/RegisterPage";
import Simulate from "../SimulationPage/SimulationPage";

function HomePage() {
    return (
        <Router>
            <>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
                <HomeCarousel />
                <Routes>
                    <Route path="/simulate" element={<Simulate/>} />
                </Routes>
                <Footer />
            </>
        </Router>
    );
}

export default HomePage;
