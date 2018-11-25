import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Oops!</h1>
                <p className="lead">Looks like you wondered off the path!</p>
                <hr className="my-4" />
                <p>The path "<code>{window.location.pathname}</code>" hasn't been explored! You can try turning back or just going home and restarting your journey!</p>
                <button className="btn btn-primary" onClick={() => window.history.back()}>Turn Back</button>
                <button><Link to="/" className="btn btn-dark">Head Home</Link></button>
            </div>
            )
}

export default NotFound;
