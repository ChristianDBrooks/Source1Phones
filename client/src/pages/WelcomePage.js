import React from "react";
import { Link } from "react-router-dom";
import About from "../components/About/About"

const WelcomePage = () => (
    <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
        <div className="row justify-content-start" style={{ backgroundImage: "url(./images/broken-ipad.jpg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center" }}>
            <div className="col col-lg-8 d-flex align-items-center m-5">
                <div>
                    <div className="text-left title">Say <span className="text-success">Goodbye</span><br></br> to <span className="text-success">Broken Tech</span>!</div>
                    <a href="#about-scrollpoint">
                        <button className="btn btn-success mt-3 shadow">Learn More</button>
                    </a>
                </div>
            </div>
        </div>
        <div className="row my-5 pt-3 pb-4">
            <div className="col col-lg-6 pb-3 text-center">
                <h4 className="text-light">Customer Sign In</h4>
                <div className="px-3">
                    <button className="btn btn-lg btn-block btn-secondary mt-3" disabled>COMING SOON</button>
                </div>
            </div>
            <div className="col col-lg-6 text-center">
                <h4 className="text-light">Employee Sign In</h4>
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