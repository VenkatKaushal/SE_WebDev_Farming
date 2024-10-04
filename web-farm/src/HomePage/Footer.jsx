import React from 'react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="container">
            <p className="float-right">
                <a href="#" onClick={scrollToTop}>Back to top</a>
            </p>
            <p>
                © 2024 Company, Inc. · 
                <a href="#"> Privacy </a> · 
                <a href="#"> Terms </a>
            </p>
        </footer>
    );
};

export default Footer;
