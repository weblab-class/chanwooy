import React, { Component } from "react";
import "../../utilities.css";
import "./ContentMenu.css";
import InfoPane from "../modules/InfoPane.js";
import NotFound from "./NotFound";
import {get, post} from "../../utilities";


//a page with access to various modules; modules so far haven't been populated with actual information
class ContentMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modules: [],
            sortedModules: [],
            organizedModulePages: [],
            moduleButtons: [],
            currentModuleNumber: undefined,
        };
    }

    componentDidMount() {
        get("/api/module").then((moduleInfo) => {
            //Get pieces of every module, as represented by moduleInfo, and distribute/sort that into a 2D array (1D array of arrays each representing a module)
            let sortedArr = this.distributeInfo(moduleInfo); 
            //Based on the sorted array just before, make InfoPane instances to present the information. 
            let modulePages = this.populateModulePages(sortedArr);
            //Create buttons for accessing each module. The number of buttons === the number of modules. 
            let buttons = this.populateModuleButtons(modulePages);
            
            console.log(JSON.stringify(buttons));
            this.setState({
                modules: moduleInfo,
                sortedModules: sortedArr,
                organizedModulePages: modulePages,
                moduleButtons: buttons,
            });
        });
    }

    /**
     * 
     * @param {*} modules is the list of module items returned by the api. 
     */
    distributeInfo(modules) {
        console.log("distributeInfo() ran");
        let numIteration = modules.length;
        let sortedArr = [];
        console.log("num iter" + numIteration);
        for(let i = 0; i < numIteration; i++) {
            let destinationModule = modules[i].moduleNumber;
            if(destinationModule >= sortedArr.length){
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

    populateModulePages(sortedArr) {
        return sortedArr.map((nthModule) => {
            return nthModule.map((segment) => (
                <InfoPane heading = {segment.title} text = {segment.content} />
            ));
        });
    }

    populateModuleButtons(modulePages) {
        let buttons = [];

        for(let i = 0; i < modulePages.length; i++) {
            buttons.push(
                <div className = "ContentMenu-moduleButton u-pointer" onClick = {() => {this.setState({currentModuleNumber: i})}}> 
                    Module {i + 1} 
                </div>
            );
        }
        
        return buttons;
    }

    render() {
        let specifiedModulePage = this.state.organizedModulePages[this.state.currentModuleNumber];
        return this.props.userId ? (
            <>
                {
                    (this.state.currentModuleNumber > -1) ? 
                        (
                            <div className = "ContentMenu-buttonContainer">
                                <h1>{"Module " + this.state.currentModuleNumber}</h1>
                                <div className = "ContentMenu-menuButton u-pointer" onClick = {() => this.setState({currentModuleNumber: undefined})}>Menu</div>
                                {specifiedModulePage}
                            </div>
                        )
                        : 
                        <div className = "ContentMenu-flexBox">
                            {this.state.moduleButtons}
                        </div>
                }
            </>
        ) : (
            <NotFound /> //if not logged in, give 404
        );
    }
}

export default ContentMenu;