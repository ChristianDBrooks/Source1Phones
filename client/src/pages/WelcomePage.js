import React from "react";
import { Link } from "react-router-dom";
import About from "../components/About/About"

const WelcomePage = () => (
    <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
        <div className="row justify-content-center" style={{ backgroundImage: "url(./images/phone-trio.jpg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center" }}>
            <div className="col col-lg-8 text-center d-flex align-items-center">
                <div>
                    <h1 className="text-light text-center" style={{ textShadow: "2px 2px 20px rgba(0,0,0,0.6)" }}>Welcome to Source1Phones!</h1>
                    <p className="m-0 p-3 text-light" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>Source1Phones is an all around stop shop for any electronic purchase or repair needs. We make technology work for you!</p>
                    <a href="#about-scrollpoint">
                        <button className="btn btn-secondary mt-3 shadow">Learn More</button>
                    </a>
                </div>
            </div>
        </div>
        <div className="row my-5 pt-3 pb-4">
            <div className="col col-lg-6 pb-3 text-center">
                <h4>Customer Sign In</h4>
                <div className="px-3">
                    <button className="btn btn-lg btn-block btn-secondary mt-3" disabled>COMING SOON</button>
                </div>
            </div>
            <div className="col col-lg-6 text-center">
                <h4>Employee Sign In</h4>
                <div className="px-3">
                    <Link to="/login">
                        <button className="btn btn-lg btn-block btn-secondary mt-3">LOGIN</button>
                    </Link>
                </div>
            </div>
        </div>
        <About scrollPoint="about-scrollpoint" />
    </div>
);

export default WelcomePage;