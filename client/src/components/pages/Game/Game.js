import React, { Component } from "react";
import "../../../utilities.css";
import "./Game.css";
import {get, post} from "../../../utilities";
import Carrier from "./Carrier.js";
import NotFound from "../NotFound.js";

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trashOptions: [],
            recyclableWasteOptions: [],

            score: 0,
            chances: 3,
        };
    }

    componentDidMount() {
        //import different types of the game's recyclable objects
        get("/api/game").then((gameAsset) => {
            console.log("being run");
            let recyclables = gameAsset.filter((waste) => waste.recyclable);
            let trash = gameAsset.filter((waste) => !waste.recyclable);

            this.setState({
                recyclableWasteOptions: recyclables,
                trashOptions: trash,
            });
        });
    }

    //generates a new, random carrier with a random waste (recyclable or normal trash) and return it
    getNewCarrier() {
        //make a coin toss between true and false
        let isRecycling = this.coinToss();

        //find out what the carrier is carrying!
        //if true is returned by coinToss(), then an instance of recyclable waste would be returned and vice versa. 
        let shouldBeRecycled = this.coinToss(); 
        //get a reference to either waste collection
        let chosenWasteArr = (shouldBeRecycled) ? this.state.recyclableWasteOptions : this.state.trashOptions;
        //get an index of a random waste instance from the chosen collection
        let randomWasteIndex = Math.floor(Math.random() * chosenWasteArr.length);

        let isRight = (isRecycling === shouldBeRecycled) ? true : false;

        // console.log(JSON.stringify(randomWasteIndex));
        let wasteName;
        
        if(chosenWasteArr[randomWasteIndex] && chosenWasteArr[randomWasteIndex].name){
            wasteName = chosenWasteArr[randomWasteIndex].name;
        }

        let newCarrier = new Carrier(isRecycling, wasteName, isRight);

        return newCarrier;
    }

    coinToss() {
        let coinToss = Math.floor(Math.random() * 2);

        //true and false conditions here are just arbitrary
        return (coinToss >= 1) ? true : false;
    }

    render() {
        if(this.state.chances <= 0) {
            return (
                this.props.userId ? (
                    <div className = "Game-container">
                        <h1>Game Over</h1>
                        <h4>Score: {this.state.score}</h4>
                        <div className = "Game-retryButton" onClick = {() => this.setState({chances: 3, score: 0})}>Retry</div>
                    </div>
                ) : (
                    <NotFound /> //if not logged in, give 404
                )
            );
        }
        else {
            let newCarrier = this.getNewCarrier();
            console.log(JSON.stringify(this.state.recyclableWasteOptions));
            // let trashByCarrier = newCarrier.carriedWaste;
            return (
                this.props.userId ? (
                    <div className = "Game-container">
                        <h1>Quiz</h1>
                        {"The carrier will " + ((newCarrier.isRecycling) ? "" : "not ") + "recycle. The carrier has " + newCarrier.carriedWaste + ". Is the carrier correct?"}

                        <div className = "Game-buttonLayout">
                            <span className = "Game-rightButton u-pointer" onClick = {() => {
                                if(newCarrier.isRight) {
                                    this.setState({score: this.state.score + 1});
                                }
                                else {
                                    this.setState({chances: this.state.chances - 1});
                                }
                            }}> 
                                Correct 
                            </span>
                            <span className = "Game-wrongButton u-pointer" onClick = {() => {
                                if(newCarrier.isRight) {
                                    this.setState({chances: this.state.chances - 1});
                                }
                                else {
                                    this.setState({score: this.state.score + 1});
                                }
                            }}> 
                                Incorrect
                            </span>
                        </div>

                        <div className = "Game-scoreBox">
                            <h4>{"Your score: " + this.state.score}</h4>
                            <h4>{"Chances left: " + this.state.chances}</h4>
                        </div>
                    </div>
                ) : (
                    <NotFound /> //if not logged in, give 404
                )
            );
        }
    }
}

export default Game;