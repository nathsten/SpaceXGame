// @ts-check

const displayDiv = $("display");
const displayDataDiv = $("displayData")

let allStates = {
    "Engine": "Off",
    "Speed": "0m/s",
    "Gravity": "9.8m/s^2"
}

let allStatesArray = Object.keys(allStates)

/** Updates info on display and in the controll center
 * @returns {void}
 */
const renderControllCenter = () => {
    displayDataDiv.innerHTML = "";

    /**
     * @param {String[]} e
     */
    allStatesArray.forEach(e => {
        const div = document.createElement("div");
        div.innerHTML = `${e}: ${allStates[e]}`;
        displayDataDiv.append(div);
    });
}

/**
 * @param {String[]} e
 */
allStatesArray.forEach(e => {
    const div = document.createElement("div");
    div.innerHTML = `${e}: ${allStates[e]}`;
    displayDataDiv.append(div);
});

class minimapRocket{
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    ax = 0;
    ay = 0;
    r = 0;
    div = undefined;

    render(){
        this.div.style.left = `${this.x}px`;
        this.div.style.top = `${this.y}px`;
    }
}

const miniRocket = new minimapRocket;
miniRocket.x = 99;
miniRocket.y = 72;
miniRocket.vx = 0;
miniRocket.vy = 0;
miniRocket.ax = 0;
miniRocket.ay = 0;
miniRocket.r = 0;
miniRocket.div = $("miniRocket");
miniRocket.render();