import React, { Component } from "react";
import { Link } from "@reach/router";

import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Navigation.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "65853503700-pq6j28087kgdb3b6h0e592sjt3dql55k.apps.googleusercontent.com";

//import necessary css file here

//basically a navigation bar
class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className = "Navigation-container">
                <div className = "Navigation-block"> 
                    <Link to = "/" className = "Navigation-link Navigation-mainlink">
                        Recycler
                    </Link>

                    <span className = "Navigation-normalLinks">
                        {
                            this.props.userId ? (
                                <>
                                    <Link to = "/modules/" className = "Navigation-link">
                                        Modules
                                    </Link>
                                    <Link to = "/game/" className = "Navigation-link">
                                        Quiz
                                    </Link>
                                    <Link to = "/log/" className = "Navigation-link">
                                        Recycle Log
                                    </Link>
                                </>
                            ) : (
                                <></>
                            )
                        }

                        <Link to = "/about/" className = "Navigation-link">
                            About Us
                        </Link>

                        <Link to = "/resources/" className = "Navigation-link">
                            Resources
                        </Link>

                        {this.props.userId ? (
                            <GoogleLogout
                                clientId={GOOGLE_CLIENT_ID}
                                buttonText="Logout"
                                onLogoutSuccess={this.props.handleLogout}
                                onFailure={(err) => console.log(err)}
                            />
                            ) : (
                            <GoogleLogin
                                clientId={GOOGLE_CLIENT_ID}
                                buttonText="Login"
                                onSuccess={this.props.handleLogin}
                                onFailure={(err) => console.log(err)}
                            />
                        )}
                    </span>
                </div>
            </nav>
        );
    }
}

export default Navigation;