import React, { Component } from "react";
import "../../utilities.css";
import InfoPane from "../modules/InfoPane.js";
import "./About.css";
import {get, post} from "../../utilities";

//about section as found in most websites
class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: []
        };
    }

    componentDidMount() {
        get("/api/aboutsection").then((aboutsectionInfo) => {
            this.setState({contents: aboutsectionInfo});
        });
    }

    render() {
        return (
            <div className = "About-container">
                <h1>About us (Team AmIDoingThisRight)</h1>
                {this.state.contents.map((contentInstance => (
                    <InfoPane heading = {contentInstance.heading} text = {contentInstance.content} />
                )))}
            </div>
        );
    }
}

export default About;