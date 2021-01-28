import React, { Component } from "react";
import "../../utilities.css";
import {get, post} from "../../utilities";
import "./Log.css";
import NotFound from "./NotFound.js";

class Log extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logs: [],
            sortedLogs: [],
            sortedLogsDisplay: [],

            isEditing: false,
            isDeleting: false,
        };
    }

    componentDidMount() {
        get("/api/log", {googleId: this.props.googleId}).then((listOfLogs) => {
            let list = this.getCorrectLogs(listOfLogs);
            console.log("this is hopefully not the result: " + JSON.stringify(list));
            let organizedLogs = this.sortLogsByDate(list);
            console.log("Organized log: " + JSON.stringify(organizedLogs));
            let logsDisplay = this.makeDisplayFromLogs(organizedLogs);

            this.setState({
                logs: list,
                sortedLogs: organizedLogs,
                sortedLogsDisplay: logsDisplay,
            });
        });
    }

    getCorrectLogs(list) {
        let correctList = [];
        for(let i = 0; i < list.length; i++){
            if(list[i] && list[i].googleid === this.props.googleId){
                correctList.push(list[i]);
            }
        }
        return correctList;
    }

    sortLogsByDate(listOfLogs) {
        console.log("sort() is running");
        let numIteration = listOfLogs.length - 1;
        listOfLogs.sort(this.compareTo);
        return listOfLogs;
    }

    makeDisplayFromLogs(sortedLogs) {
        let recycleList = [];
        for(let i = 0; i < sortedLogs.length; i++) {
            let container = 
                <div>
                    <ul>
                        {sortedLogs[i].date + " - "} {sortedLogs[i].recycled}
                    </ul>
                </div>

            recycleList.push(container);
        }
        return recycleList;
    }

    compareTo(logA, logB) {
        //date will be in mm-dd-yyyy format in String
        const dateA = logA.date;
        const dateB = logB.date;

        let logAParts = [dateA.substring(0,2), dateA.substring(3,5), dateA.substring(6,10)];
        let logBParts = [dateB.substring(0,2), dateB.substring(3,5), dateB.substring(6,10)];

        for(let i = 0; i < logAParts.length; i++) {
            logAParts[i] = parseInt(logAParts[i], 10);
            logBParts[i] = parseInt(logBParts[i], 10);
        }

        return ((logAParts[2] < logBParts[2]) ? 
                    1
                    :
                    ((logAParts[2] > logBParts[2]) ?
                        -1
                        :
                        ((logAParts[1] < logBParts[1]) ? //if the years are the same, compare months
                            1
                            :
                            ((logAParts[1] > logBParts[1]) ?
                                -1
                                :
                                ((logAParts[0] < logBParts[0]) ? //if the months are the same, compare days
                                    1 
                                    :
                                    ((logAParts[0] > logBParts[0]) ?
                                        -1 : 0
                                    )
                                )
                            )
                        )
                    )
        );
    }

    render() {
        if(this.state.isEditing) {
            let dateEdited = "";
            let recycledItem = "";

            return (
                this.props.googleId ? (
                    <div className = "Log-input">
                        <h1>Newly Recycled Item</h1>
                        <div className = "Log-inputField">
                            <label for = "dateInput">mm-dd-yyyy : </label>
                            <input name = "dateInput" onChange = {(event) => {
                                dateEdited = event.target.value;
                            }} />
                        </div>
                        
                        <div className = "Log-inputField">
                            <label for = "itemInput">Item You Recycled : </label>
                            <input name = "itemInput" onChange = {(event) => {
                                recycledItem = event.target.value;
                            }} />
                        </div>
                        
                        <div className = "Log-addButton Log-inputField" onClick = {() => {
                            post("/api/log", {
                                recycled: recycledItem,
                                date: dateEdited,
                                googleId: this.props.googleId,
                            }).then(() => {
                                let listOfLogs = this.state.logs;
                                listOfLogs.push({
                                    recycled: recycledItem,
                                    date: dateEdited,
                                    googleId: this.props.googleId,
                                });
                                let organizedLogs = this.sortLogsByDate(list);
                                let logsDisplay = this.makeDisplayFromLogs(organizedLogs);

                                this.setState({
                                    logs: list,
                                    sortedLogs: organizedLogs,
                                    sortedLogsDisplay: logsDisplay,
                                });
                            });



                            window.location.reload();
                        }}>
                            Add
                        </div>
                    </div>
                ) : (
                    <NotFound /> //if not logged in, give 404
                )
            );
        }
        else {
            return (
                this.props.googleId ? (
                    <div className = "Log-container">
                        <h1>Recycle Log</h1>
                        {this.state.sortedLogsDisplay}
                        <div className = "Log-addButton" onClick = {() => {this.setState({isEditing: true,});}}>
                            Add
                        </div>
                    </div>
                ) : (
                    <NotFound /> //if not logged in, give 404
                )
            );
        }
    }
}

export default Log;