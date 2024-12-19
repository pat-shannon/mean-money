import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import "./Homepage.css"; // Ensure you import your CSS

export function Homepage() {


    return (
        <>
            <NavBar />
            <div className="home ">
                <div className="hero-section">
                    <h1 className="hero-title">Welcome to Mean Money</h1>
                    <p className="hero-subtitle">
                    The truly free money management app that keeps you afloat, <br></br>with advice that bites.
                    </p>
                    <div className="cta-buttons">
                        <Link to="/login" className="home-btn login-btn">Log In</Link>
                        <Link to="/signup" className="home-btn signup-btn">Sign Up</Link>
                    </div>
                </div>
                <section className="wave-section">
                    <div className='wave wave1'></div>
                    <div className='wave wave2'></div>
                    <div className='wave wave3'></div>
                    <div className='wave wave4'></div>
                </section>
            </div>
        </>
    );
}
