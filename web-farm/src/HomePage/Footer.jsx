import React, { useEffect } from 'react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    return (
        <div style={{ backgroundColor: '#e3f2fd'}}>
            <footer className="container py-5">
                <div id="google_translate_element" style={{ marginBottom: '2rem' }}></div>
                
                <div className="row">
                    <div className="col-12 col-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="d-block mb-2" role="img" viewBox="0 0 24 24" focusable="false">
                            <title>Product</title>
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path>
                        </svg>
                        <p><a href="mailto:team4temp@gmail.com">team4temp@gmail.com</a></p>
                        <small className="d-block mb-3 text-muted">© 2024-2025</small>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Features</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="text-muted" href="#">Cool stuff</a></li>
                            <li><a className="text-muted" href="#">Random feature</a></li>
                            <li><a className="text-muted" href="#">Team feature</a></li>
                            <li><a className="text-muted" href="#">Stuff for developers</a></li>
                            <li><a className="text-muted" href="#">Another one</a></li>
                            <li><a className="text-muted" href="#">Last time</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Resources</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="text-muted" href="#">Resource</a></li>
                            <li><a className="text-muted" href="#">Resource name</a></li>
                            <li><a className="text-muted" href="#">Another resource</a></li>
                            <li><a className="text-muted" href="#">Final resource</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Resources</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="text-muted" href="#">Business</a></li>
                            <li><a className="text-muted" href="#">Education</a></li>
                            <li><a className="text-muted" href="#">Government</a></li>
                            <li><a className="text-muted" href="#">Gaming</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>About</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="text-muted" href="#">Team</a></li>
                            <li><a className="text-muted" href="#">Locations</a></li>
                            <li><a className="text-muted" href="#">Privacy</a></li>
                            <li><a className="text-muted" href="#">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <p className="float-right">
                    <a href="#" onClick={scrollToTop}>Back to top</a>
                </p>
            </footer>
        </div>
    );
};

export default Footer;
