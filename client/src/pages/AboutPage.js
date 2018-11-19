import React from "react";

const About = () => (
    <div className="container bg-light mt-4 p-4 shadow">

        <h1>About</h1>

        <hr className="bg-light" />

        <div>
            <div className="row pt-1">
                <div className="col-12 mb-3">
                    S1P Employee Web Application is an interactive user interface to create streamlined communication, efficiency
                    in time management, and knowledge in repair.
                </div>
            </div>

            <div className="row">

                <div className="col">
                    <div className="card border-primary mb-3" style={{ maxWidth: "20rem" }}>

                        <div className="card-header">Time Managment</div>

                        <div className="card-body">
                            <h4 className="card-title">Customizable task lists with unified access from all team members.</h4>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card border-primary mb-3" style={{ maxWidth: "20rem" }}>

                        <div className="card-header">Communication</div>

                        <div className="card-body">
                            <h4 className="card-title">Communicating between team members and customers.</h4>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
                            card's content.</p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card border-primary mb-3" style={{ maxWidth: "20rem" }}>

                        <div className="card-header">Repair Knowledge</div>

                        <div className="card-body">
                            <h4 className="card-title">The S1P Web App is a library of how-to and repair resources.</h4>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
);

export default About;