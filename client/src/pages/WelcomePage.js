import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import About from "../components/About/About"
class WelcomePage extends Component {
    state = {
        redirectLogin: false,
    }

    render () {
        if (this.state.redirectLogin) {
            return (<Redirect to="/login"/>);
        } else {
             return (
                <div style={{maxWidth: "100%", overflowX: "hidden"}}>
                    <div className="row justify-content-center" style={{ backgroundImage: "url(./images/phone-trio.jpg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center"}}>
                        <div className="col col-lg-8 text-center d-flex align-items-center">
                            <div>
                                <h1 className="text-light text-center" style={{textShadow: "2px 2px 20px rgba(0,0,0,0.6)"}}>Welcome to Source1Phones!</h1>
                                <p className="m-0 p-3 text-light" style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                                <a href="#about-scrollpoint">
                                    <button className="btn btn-secondary mt-3 shadow">Learn More</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{height: "50vh", marginTop: "20vh"}}>
                        <div className="col col-lg-6 text-center">
                            <h4>Customer Sign In</h4>
                            <div className="px-3">
                                <button className="btn btn-lg btn-block btn-primary mt-3">COMING SOON</button>
                            </div>
                        </div>
                        <div className="col col-lg-6 text-center">
                            <h4>Employee Sign In</h4>
                            <div className="px-3">
                                <button className="btn btn-lg btn-block btn-primary mt-3" onClick={(e) => {e.preventDefault(); this.setState({redirectLogin: true})}}>LOGIN</button>
                            </div>
                        </div>
                    </div>
                    <About scrollPoint="about-scrollpoint"/>
                </div>
            );
        }
    }
}



export default WelcomePage;