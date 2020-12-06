//@ts-check

/**
 * @param {string} id
 * @returns {object}
 */
const $ = (id) => document.getElementById(id);

const engine = $("engine");

// Globale variabler.
let accelerationX;
let accelerationY;
let moveX;
let moveY;
let fuelConsumption;
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
        }, 500);


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
    }

    crash(){
        this.div.innerHTML = "";
        this.div.classList.remove("falcon9Class");
        this.div.classList.add("explosion");
        setTimeout(() => {
            this.div.classList.remove("explosion");
            this.div.classList.add("falcon9Class");
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
    rx = 0;
    ry = 0;
    div = undefined;

    moveSpaceY(){
        accelerationY = setInterval(() => {
            if(this.vy < 0.18){
                this.vy -= this.ay;
            }
        }, 50);
        
        moveY = setInterval(() => {
            this.y += this.vy;
            this.div.style.backgroundPositionY = `${this.y}%`;
        }, 10);

        allIntervals.push(accelerationY, moveY);
    }

    startDesending(){
        allIntervals.push(accelerationY);
        accelerationY = setInterval(() => {
            if(this.y < 41.4){
                this.vy += this.ay;
            }
            else{
                if(this.vy > 0.05){
                    falcon9.crash();
                }
                stopIntervals();
            }
        }, 50);
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
space.y = 41.3;
space.vx = 0;
space.vy = 0;
space.ax = 0.0015;
space.ay = 0.00008;
space.rx = 0;
space.ry = 0;
space.div = $("world");

/**
 * @param {{ keyCode: number; }} e
 */
const controllRocket = (e) => {
    if(e.keyCode === 32){
        if(falcon9.engineOn !== true){
            falcon9.takeOff();
            space.moveSpaceY();
        }
    }
    if(e.keyCode === 39){
        // rotate right
        if(falcon9.angle <= 85){
            falcon9.angle += 5;
            falcon9.rotate();
        }
    }
    if(e.keyCode === 37){
        // rotate left
        if(falcon9.angle >= -85){
            falcon9.angle -= 5;
            falcon9.rotate();
        }
    }
}

const stopIntervals = () => {
    allIntervals.forEach((e) => clearInterval(e));
}

document.addEventListener("keydown", controllRocket);
/**
 * Spiller kan styre rotasjonen til raketten slik at du går inn i bane den ene eller andre rettningen
 * Når raketten beveger seg oppover så er det bakgrunnsposisjonen som endrer seg, ikke x og y possisjonen til raketten
 * Når raketten roterer så endrer det på akkselerasjon x som vil rotere bakgrunnsbildet i x rettning.
 * Dette må da på et vis gi raketten noen verdier som kan regnes frem til om du kommer i bane eller ei. 
 * 
 * For å komme i bane må akselerasjonen din (eller farten) i X rettning være mer enn 11.000 m/s, 
 * samt at du har en viss avstand fra jorden.
 */