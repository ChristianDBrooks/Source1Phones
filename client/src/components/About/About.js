import React from "react";

const About = (props) => (
    <div id={props.scrollPoint} style={{ backgroundImage: "url(./images/sackcloth.jpeg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center", paddingTop: "15vh" }}>
        <div>
            <div className="container bg-light shadow pt-3">

                <h4>About</h4>
                <hr className="bg-light" />
                <div>
                    <div className="row">

                        <div className="col-md-4">
                            <div className="card text-light bg-primary mb-3">

                                <div className="card-header">Time Managment</div>

                                <div className="card-body">
                                    <h6 className="card-title">Customizable task lists with unified access from all team members.</h6>
                                    <p className="card-text">Sorting and tracking what needs to get done is messy and can be time consuming. You hate to be the employee that answers the phone to a cusotmer asking about a repairs status that you don't readily have the info or location of their device.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-light bg-primary mb-3">
                                <div className="card-header">Communication</div>

                                <div className="card-body">
                                    <h6 className="card-title">Communicating between team members and customers.</h6>
                                    <p className="card-text">With our live chat interface no need for employees, managers, or owners between stores to play phone tag all day long. Everyone can stay on the same page all day long usin our persistant live chat for quick updates and communication.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-light bg-primary mb-3">
                                <div className="card-header">Efficiency</div>

                                <div className="card-body">
                                    <h6 className="card-title">Simple order request sytem for efficent order and item tracking.</h6>
                                    <p className="card-text">With this system employees can make detailed and specific order requests that owners or managers can then respond to and implement tracking info that employees can view, for quick and precise relaying to customers.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
);

export default About;