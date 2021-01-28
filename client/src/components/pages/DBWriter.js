import React, { Component, useRef } from "react";
import "../../utilities.css";
import InfoPane from "../modules/InfoPane.js";

import {get, post} from "../../utilities";

//about section as found in most websites
class DBWriter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            content: "",
            moduleNumber: -1,
            nth: -1,
            sortedContent: [],
        };
    }

    componentDidMount() {
        get("/api/module").then((modules) => {
            this.setState({
                sortedContent: this.distributeInfo(modules),
            });
        });
    }

    distributeInfo(modules) {
        console.log("distributeInfo() ran");
        let numIteration = modules.length;
        let sortedArr = [];
        console.log("num iter" + numIteration);
        for(let i = 0; i < numIteration; i++) {
            let destinationModule = modules[i].moduleNumber;
            if(destinationModule >= sortedArr.length) {
                sortedArr.push([]);
            }
            sortedArr[destinationModule].push(modules[i]);
        }

        for(let i = 0; i < sortedArr.length; i++){
            sortedArr[i].sort(this.compareTo);
        }
        return sortedArr;
    }

    //compareTo function for sort() in the method above
    compareTo(moduleItemA, moduleItemB) {
        //I don't plan for two items of nth module to have same index as of now; so 0 is not returned.
        return (moduleItemA.nth < moduleItemB.nth) ? -1 : 1;
    }

    render() {
        return (
            <div>
                <div>
                    <label for = "moduleNumber">Module Number</label>
                    <input type = "number" name = "moduleNumber" required minLength = "1" size = "8" onChange = {(event) => this.setState({moduleNumber: event.target.value})}/>
                    {"The total number of modules: " + this.state.sortedContent.length}
                </div>
                
                <div>
                    <label for = "nth">Sequence</label>
                    <input type = "number" name = "nth" required minLength = "1" size = "8" onChange = {(event) => this.setState({nth: event.target.value})}/>
                    {/* {(this.state.moduleNumber > -1 && this.state.moduleNumber !== "") ? ("The total number of cards in this module: " + this.state.sortedContent[this.state.moduleNumber].length) : "please give the nth module that you would like to add onto"} */}
                    {/* Number of cards in module {this.state.moduleNumber - 1} : {numOfSequences} */}
                </div>

                <div>
                    <label for = "title">Title</label>
                    <input name = "title" required minLength = "1" size = "16" onChange = {(event) => this.setState({title: event.target.value})}/>
                </div>

                <div>
                    <label for = "content">Content</label>
                    <input name = "content" required minLength = "1" size = "40" onChange = {(event) => this.setState({content: event.target.value})}/>
                </div>

                <div>
                    <button type = "submit" onClick = {() => {
                        post("/api/module", {
                            title: this.state.title,
                            content: this.state.content,
                            moduleNumber: this.state.moduleNumber,
                            nth: this.state.nth,
                        })
                        .then(() => {console.log("successfully updated the database!")})
                        .catch((e) => {console.log(e.message)});

                        this.setState({
                            title: "",
                            content: "",
                            moduleNumber: -1,
                            nth: -1,
                        });
                        window.location.reload();
                    }}>
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default DBWriter;