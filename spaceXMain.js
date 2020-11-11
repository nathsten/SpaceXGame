//@ts-check

const $ = (id) => document.getElementById(id);

let okeAkselerasjonY;
let okeY;
let gravity;
let akkselerasjonX;

class Falcon9{
    vinkel = 0;
    masse = 150;
    fuel = 100;
    //Akselerasjon X & Y
    ax = 0;
    ay = 0.0005;
    //Fart X & Y
    vx = 0;
    vy = 0;
    y = 84.14;
    x = 50;
    orbitSuccess = false;
}

//Lager den slik at raketten får akselerasjonen ax og ay men,  det er på bakgrunnsbildet 
//det blir utført. 

const world = $("world");
const engine = $("engine");

// @ts-ignore
const falcon9Div = new Falcon9($("falcon9"));


let spaceClicked = false;
let engineOn = false;

document.addEventListener("keydown", sjekkSpace);

function sjekkSpace(e){
    e = e || window.event
    if(e.keyCode == '32'){
        if(spaceClicked !== true){
            move();
            spaceClicked = true;
        }
 
    }
}

function move(){
    engineOn = true;
    falcon9Div.vy;
    falcon9Div.fuel;

    okeAkselerasjonY = setInterval(() => {
        if(falcon9Div.vy <= 0.18){
            falcon9Div.vy += falcon9Div.ay;
        }
    }, 50);

    setInterval(() => {
        if(falcon9Div.fuel >= 0){
            falcon9Div.fuel -= 5;
        }
    }, 1500);
    
    falcon9Div.y;
    okeY = setInterval(() => {
        falcon9Div.y -= falcon9Div.vy;
        world.style.backgroundPositionY = `${falcon9Div.y}%`;
        if(falcon9Div.fuel <= 0){
            outOfGas();
        }
    }, 50); 

    engine.classList.remove("førStart");
    void engine.offsetWidth;
    engine.classList.add("etterStart");
    
}

document.addEventListener("keydown", checkArrow)

//Øker akselerasjonen i X rettning 
//Må kobles til bakgrunnsbildet som vil både bevege i bestemt X rettning
//men også rotere svakt. 
function AX(ax){
    akkselerasjonX = setInterval(() => {
        if(falcon9Div.vx <= 0.1){
            falcon9Div.vx += ax;
            akselerereX(falcon9Div.vx);
        }
    }, 100);
}

function akselerereX(vx){
    falcon9Div.x -= vx;
    world.style.backgroundPositionX = `${falcon9Div.x}%`;
}

//Hvilke vei i X rettning du vil akselerere
function checkArrow(e){
    falcon9Div.vinkel;
    if(engineOn !== false){
        if(e.key === 'ArrowLeft'){
            falcon9Div.vinkel -= 5;
            roter();
            falcon9Div.ax += 0.00005;
            AX(falcon9Div.ax);
        }
        else if(e.key === 'ArrowRight'){
            falcon9Div.vinkel += 5;
            roter();
            falcon9Div.ax -= 0.00005;
            AX(falcon9Div.ax);
        } 
    }
}
//Roterer rakett diven
function roter(){
    $("falcon9").style.transform = `rotate(${falcon9Div.vinkel}deg)`;
} 

//Stopper alle intervaller og finner ut om du er i bane eller ei. 
//Dersom du ikke er i bane så detter du mot bakken. 
function outOfGas(){
    if(falcon9Div.orbitSuccess !== true){
        clearInterval(okeAkselerasjonY);
        clearInterval(okeY);
        clearInterval(akkselerasjonX);

        engine.classList.remove("etterStart");
        void engine.offsetWidth;
        engine.classList.add("førStart");

        engineOn = false;
        falcon9Div.vy;
        falcon9Div.fuel;
        setInterval(() => {
            falcon9Div.vy -= falcon9Div.ay;
        }, 10);

        falcon9Div.y;
        gravity = setInterval(() => {
            falcon9Div.y -= falcon9Div.vy;
            world.style.backgroundPositionY = `${falcon9Div.y}%`;
            if(falcon9Div.y > 84.14){
                crash();
            }
        }, 50); 
    
        function crash(){
            clearInterval(gravity);
            const falcon9 = $("falcon9");
            //Endre dette så jeg slipper setTimeout
            setTimeout(() => {
                falcon9.innerHTML = "";
                falcon9.classList.remove("falcon9Class");
                falcon9.classList.add("explosion");
                setTimeout(() => {
                    falcon9.classList.remove("explosion");
                    falcon9.classList.add("falcon9Class");
                }, 500);
            }, 50);

            //lage en eller annen animasjon/gif med en eksplosjon
        }
    }
    else{
        alert("Du er i bane");
    }
}

/**
 * Spiller kan styre rotasjonen til raketten slik at du går inn i bane den ene eller andre rettningen
 * Når raketten beveger seg oppover så er det bakgrunnsposisjonen som endrer seg, ikke x og y possisjonen til raketten
 * Når raketten roterer så endrer det på akkselerasjon x som vil bevege bakgrunnsbildet i x rettning.
 * Dette må da på et vis gi raketten noen verdier som kan regnes frem til om du kommer i bane eller ei. 
 * 
 * For å komme i bane må akselerasjonen din (eller farten) i X * Y rettning være mer enn 11.000 m/s.
 * Feks: vy * vx**2 >= 11.000 m/s
 */