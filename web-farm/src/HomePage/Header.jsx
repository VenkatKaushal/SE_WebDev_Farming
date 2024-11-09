import { Link } from 'react-router-dom';
import './Header.css';
// @ts-ignore
import logo from './navbar/logo.png';

function Header() {
    return (
        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
                integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <img src={logo} alt="" className='logo' />
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link"><Link to="/" className="nav-link-custom">Home</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">
                                <Link to="/contactUS" className="nav-link-custom">Contact Us</Link></a>
                        </li>
                        <li className="nav-item">

                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <div id="google_translate_element"></div>
                    </form>
                    <div className="mx-2">


                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link"><Link to="/login" className="nav-link-custom">
                                    <button className="btn btn-success">Login</button>
                                </Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    <Link to="/signup" className="nav-link-custom">
                                        <button className="btn btn-primary">SignUp</button>
                                    </Link></a>
                            </li>
                            <li className="nav-item">

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;