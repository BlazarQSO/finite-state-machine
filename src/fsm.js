class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == null) {
            throw new Error();
        }
        this.wrong = true;
        this.state = config.initial;
        this.config = config;
        this.arrayStates = ['normal', 'busy', 'hungry', 'sleeping'];
        this.stackStepsStates = [];
        this.historySteps = [];
        this.historyIndex = -1;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state == "normal" || state == "busy" || state == "hungry" || state == "sleeping") {
            this.state = state;
            this.stackStepsStates.push(state);
            this.historySteps.push("empty");
            this.historyIndex++;
        } else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.wrong) {
            switch (event) {
                case "study": {
                    this.state = "busy";
                    this.stackStepsStates.push("busy");                     
                    this.historySteps.push("study");
                    this.historyIndex = this.historySteps.length - 1;
                    this.wrong = false;
                    break;
                }
                case "get_tired": {
                    this.state = "sleeping";
                    this.stackStepsStates.push("sleeping");          
                    this.historySteps.push("get_tired");
                    this.historyIndex = this.historySteps.length - 1;
                    this.wrong = false;
                    break;
                }
                case "get_hungry": {
                    this.state = "hungry";
                    this.stackStepsStates.push("hungry");                   
                    this.historySteps.push("get_hungry");
                    this.historyIndex = this.historySteps.length - 1;
                    this.wrong = false;
                    break;
                }
                case "eat": {
                    this.state = "normal";
                    this.stackStepsStates.push("normal");           
                    this.historySteps.push("eat");
                    this.historyIndex = this.historySteps.length - 1;
                    this.wrong = false;
                    break;
                }
                case "get_up": {
                    this.state = "normal";
                    this.stackStepsStates.push("normal");                          
                    this.historySteps.push("get_up");
                    this.historyIndex = this.historySteps.length - 1;   
                    this.wrong = false;
                    break;
                }
            }

            if (!this.wrong) {
                this.wrong = true;
            } else {                    
                throw new Error();
            }
        } else {
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
        this.stackStepsActions = [];
        this.stackStepsStates = [];
        this.lastStep = "";
        this.wrong = true;
        this.historySteps = [];
        this.historyIndex = -1;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event == null) {
            return this.arrayStates;
        } else {
            switch (event) {
                case "study": {
                    let arr = ["normal"];
                    return arr;                            
                }
                case "get_tired": {
                    let arr = ["busy"];
                    return arr;
                }
                case "get_hungry": {
                    let arr = ["busy", "sleeping"];
                    return arr;
                }
                case "eat": {
                    let arr = ["hungry"];
                    return arr;
                }
                case "get_up": {
                    let arr = ["sleeping"];
                    return arr;
                }
            }
        }
        return [];
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.historyIndex > -1) {
            if (this.stackStepsStates.length > 1) {
                this.historyIndex--;
                this.state = this.stackStepsStates[this.historyIndex];
            } else {
                this.state = "normal";
                this.historyIndex--;
            }              
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.historyIndex + 1 >= 0 && this.historyIndex + 1 < this.historySteps.length) {
            this.historyIndex++;
            if (this.historySteps[this.historyIndex] == "empty") {
                this.historyIndex--;
                return false;
            }
            this.state = this.stackStepsStates[this.historyIndex];
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.stackStepsStates = [];
        this.historySteps = [];
        this.historyIndex = -1;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
