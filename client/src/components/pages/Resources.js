import React, { Component } from "react";
import resource from "../../../../server/models/resource";
import "../../utilities.css";
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
        console.log(this.state.resourceList[0]);
        return (
            <div>
                {this.state.resourceList.map((resourceObj) => (
                    <ul>
                        <li>{resourceObj.organization} - {<a href = {resourceObj.url}>link</a>}</li>
                    </ul>
                    
                ))}
            </div>
        );
    }
}

export default Resources;