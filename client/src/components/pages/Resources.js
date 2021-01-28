import React, { Component } from "react";
import resource from "../../../../server/models/resource";
import "../../utilities.css";
import "./Resources.css";
import InfoPane from "../modules/InfoPane.js";
import {get, post} from "../../utilities";

class Resources extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resourceList: [],
        };
    }

    componentDidMount() {
        get("/api/resource").then((list) => {
            this.setState({resourceList: list})
        });
    }

    render() {
        return (
            <div className = "Resources-container">
                <h1>Resources</h1>
                {this.state.resourceList.map((resourceObj) => (
                    <ul>
                        <li>{resourceObj.organization} - {<a className = "Resources-links" href = {resourceObj.url}>link</a>}</li>
                    </ul>
                    
                ))}
            </div>
        );
    }
}

export default Resources;