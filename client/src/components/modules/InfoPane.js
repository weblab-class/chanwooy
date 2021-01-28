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
        let referenceText = this.props.text;
        let interpretedText = [];
        let lastSavedIndex = 0;
        for(let i = 0; i < referenceText.length - 1; i++) {
            if(referenceText.substring(i, i + 2) == "\\n") { //new line formatting
                interpretedText.push(<p>{referenceText.substring(lastSavedIndex, i)}</p>);
                i += 2;
                lastSavedIndex = i;
            }
        }
        interpretedText.push(<p>{referenceText.substring(lastSavedIndex)}</p>);

        return(
            <div>
                <h2 className = "InfoPane-heading" >{this.props.heading}</h2>
                <div>{interpretedText}</div>
            </div>
        );
    }
}

export default InfoPane;