//@ts-check

/**
 * @param {string} id
 * @returns {object}
 */
const $ = (id) => document.getElementById(id);

const engine = $("engine");
const speed = $("speed");

// Globale intervaller:
let accelerationX;
let accelerationY;
let moveX;
let moveY;
let fuelConsumption;
let axOrbit;
let orbit;
let spaceExtentions = 0;
let allIntervals = [];

class Falcon9{
    angle = 0;
    mass = 1000;
    fuel = 100;
    engineOn = false;
    orbitSuccess = false;
    div = undefined;

    takeOff(){
        this.engineOn = true;
        allStates["Engine"] = "On";
        renderControllCenter();
        fuelConsumption = setInterval(() => {
            if(this.fuel >= 0){
                this.fuel -= this.mass/100
            }
            if(this.mass >= 250){
                this.mass -= 75;
            }
            if(this.fuel <= 0){
                falcon9.outOffuel();
            }
        }, 1500);


        engine.classList.remove("førStart");
        void engine.offsetWidth;
        engine.classList.add("etterStart");
        allIntervals.push(fuelConsumption);
    }

    rotate(){
        this.div.style.transform = `rotate(${this.angle}deg)`;
    }

    outOffuel(){
        engine.classList.add("førStart");
        engine.classList.remove("etterStart");
        if(this.orbitSuccess !== true){
            space.startDesending();
        }
        allStates["Engine"] = "Off";
        renderControllCenter();
    }

    crash(){
        this.div.innerHTML = "";
        this.div.classList.remove("falcon9Class");
        void this.div.offsetWidth;
        this.div.classList.add("explosion");
        setTimeout(() => {
            this.div.classList.remove("explosion");
            void this.div.offsetWidth;
            this.div.classList.add("falcon9Class");
            stopIntervals();
        }, 500);
    }
}

class Space{
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    ax = 0;
    ay = 0;
    gy = 0;
    rx = 0;
    ry = 0;
    div = undefined;

    moveSpaceY(){
        accelerationY = setInterval(() => {
            if(this.vy < 2.5){
                this.vy += this.ay;
                if(this.y > -1288){
                    this.vy -= ((this.gy * this.ay)*100);
                }
            }
        }, 50);
        
        moveY = setInterval(() => {
            this.y += this.vy;
            allStates["Speed"] = `${Math.abs(this.vy * 300).toFixed(1)}m/s`;
            renderControllCenter();
            if(this.y > -1){
                this.y = -180;
                spaceExtentions += 1;
            }
            if(this.ay === 0 && this.y > -1280){
                this.vy -= this.gy;
                if(this.y < -180 && spaceExtentions > 0){
                    this.y = -1;
                    spaceExtentions -= 1;
                }
            }
            if(this.ay === 0 && this.y < -1290){
                if(this.vy < -1){
                    falcon9.crash();
                }
                stopIntervals();
            }
            this.div.style.top = `${this.y}%`;
        }, 10);

        allIntervals.push(accelerationY, moveY);
    }

    startDesending(){
        accelerationY = setInterval(() => {
            if(this.y > -1288){
                if(this.y < -180 && spaceExtentions > 0){
                    this.y = -1;
                    spaceExtentions -= 1;
                }
                this.vy -= this.gy;
                clearInterval(axOrbit);
            }
            else{
                if(this.vy < -1){
                    falcon9.crash();
                }
                stopIntervals();
            }
        }, 40);
        allIntervals.push(accelerationY);
    }

    orbit(){
        axOrbit = setInterval(() => {
            if(this.vx < 0.0025){
                this.vx += this.ax;
            }
        }, 100);

        orbit = setInterval(() => {
            this.rx += this.vx;
            this.div.style.transform = `rotate(${this.rx}deg)`;
        }, 50);
        allIntervals.push(axOrbit, orbit);
    }
}

const falcon9 = new Falcon9;
falcon9.angle = 0;
falcon9.fuel = 100;
falcon9.mass = 1000;
falcon9.div = $("falcon9");
falcon9.engineOn = false;
falcon9.orbitSuccess = false;

const space = new Space;
space.x = 50;
space.y = -1288;
space.vx = 0;
space.vy = 0;
space.ax = 0;
/** Updates the acceleration y
 * @param {number} ay
 */
const updateSpaceAY = (ay) => {
    space.ay = ay;
}
space.gy = 0.004
space.rx = 0;
space.ry = 0;
space.div = $("world");

speed.oninput = function() {
    let ay = (this.value/25000);
    engine.style.opacity = (this.value/100)
    updateSpaceAY(ay);
    updateMiniRocketAY(ay/40);
}

/**
 * @param {{ keyCode: number; }} e
 */
const controllRocket = (e) => {
    switch(e.keyCode){
        case 32:
        {
            if(falcon9.engineOn !== true){
                falcon9.takeOff();
                space.moveSpaceY();
                renderControllCenter();
                miniRocket.moveMiniRocket();
            }
            break
        }
        case 39:
        {
        // rotate right
            if(falcon9.angle <= 85 && falcon9.engineOn === true){
                falcon9.angle += 5;
                space.ax -= 0.0000005;
                space.vy -= 0.005
                falcon9.rotate();
                space.orbit();
            }
            break;
        }
        case 37:
        {
            // rotate left
            if(falcon9.angle >= -85 && falcon9.engineOn === true){
                falcon9.angle -= 5;
                space.ax += 0.0000005;
                space.vy -= 0.005
                falcon9.rotate();
                space.orbit();
            }
            break;
        }
        case 38:
        {
            speed.value -= -5;
            updateSpaceAY(speed.value/20000);
            break;
        }

        case 40:
        {
            speed.value -= 5;
            updateSpaceAY(speed.value/20000);
            break;
        }
    }
}

const stopIntervals = () => {
    allIntervals.forEach((e) => clearInterval(e));
}

document.addEventListener("keydown", controllRocket);