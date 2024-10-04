import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import HomeCarousel from "./HomeCarousel";


function HomePage() {
    return (
        <>
            <Header />
            <HomeCarousel/>
            <Footer/>
        </>
    );
}

export default HomePage;
