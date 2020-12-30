// @ts-check

const displayDiv = $("display");
const displayDataDiv = $("displayData");
const map = $("map");

let allStates = {
    "Engine": "Off",
    "Speed": "0m/s",
    "Fuel": "100%",
    "Altitude": "0m"
}

// Globale Variabler
const mapRadius = 100;

let allStatesArray = Object.keys(allStates);
let accelerateMiniRocketY;
let accelerateMiniRocketX;
let moveMiniRocketY;
let moveMiniRocketX;

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

    moveMiniRocket(){
        accelerateMiniRocketY = setInterval(() => {
            this.vy += this.ax;
        }, 50);

        moveMiniRocketY = setInterval(() => {
            this.y -= this.vy;
            if(this.x - mapRadius <= 99){
                // x = radius - something with y
            }
            if(this.y + mapRadius <= 99){
                // y = radius - something with x
                this.y = 1;
            }
            this.div.style.top = `${this.y}px`;
        }, 10);
    }
}

const miniRocket = new minimapRocket;
miniRocket.x = 98;
miniRocket.y = 77;
miniRocket.vx = 0;
miniRocket.vy = 0;
/**
 * @param {number} ay
 */
const updateMiniRocketAY = (ay) => {
    miniRocket.ax = ay;
}
miniRocket.ay = 0;
miniRocket.r = 0;
miniRocket.div = $("miniRocket");
miniRocket.render();

const earthCenter = new minimapRocket;
earthCenter.x = 99.5;
earthCenter.y = 99.5;
earthCenter.div = document.createElement("div");
earthCenter.div.className = "earthCenter";
map.append(earthCenter.div);
earthCenter.render();