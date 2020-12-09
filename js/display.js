// @ts-check

const engineState = $("engineState");

const renderControllCenter = () => {
    let state;
    if(falcon9.engineOn !== true){
        state = "Engine: Off";
    }
    else{
        state = "Engine: On";
    }
    engineState.innerHTML = state;
}