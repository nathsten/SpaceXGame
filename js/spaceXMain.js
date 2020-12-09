//@ts-check

/**
 * @param {string} id
 * @returns {object}
 */
const $ = (id) => document.getElementById(id);

const engine = $("engine");

// Globale intervaller:
let accelerationX;
let accelerationY;
let moveX;
let moveY;
let fuelConsumption;
let axOrbit;
let orbit;
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
        this.engineOn = false;
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
    rx = 0;
    ry = 0;
    div = undefined;

    moveSpaceY(){
        accelerationY = setInterval(() => {
            if(this.vy < 2.5){
                this.vy += this.ay;
            }
        }, 50);
        
        moveY = setInterval(() => {
            this.y += this.vy;
            if(this.y > -1){
                this.y = -150;
            }
            this.div.style.top = `${this.y}%`;
        }, 10);

        allIntervals.push(accelerationY, moveY);
    }

    startDesending(){
        accelerationY = setInterval(() => {
            if(this.y > -1288){
                this.vy -= this.ay;
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
space.ay = 0.004;
space.rx = 0;
space.ry = 0;
space.div = $("world");

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