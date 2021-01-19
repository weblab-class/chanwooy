import React, { Component } from "react";

/**
 * @param {string} heading of the information page
 * @param {string} text of the information page
 */
class InfoPane extends Component {
    constructor(props){
        super(props);
        
        this.state = {

        };
    }

    //add function to interpret how the text property will be interpreted

    render() {
        return(
            <div>
                <h1 className = "InfoPane-heading" >{this.props.heading}</h1>
                <p className = "InfoPane-content">{this.props.text}</p>
            </div>
        );
    }
}

export default InfoPane;