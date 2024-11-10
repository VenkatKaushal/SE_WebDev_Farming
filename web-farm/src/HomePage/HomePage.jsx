import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import HomeCarousel from "./HomeCarousel";


function HomePage() {
    return (
       
            <>
                <Header />
                <HomeCarousel />
                <Footer />
            </>
    );
}

export default HomePage;
