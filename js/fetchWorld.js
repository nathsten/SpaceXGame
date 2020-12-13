const world = $("world");

async function fetchWorld(){
    // const fetchImg = await fetch('https://github.com/nathsten/SpaceXGame/raw/main/Images/spaceCompressed.png');
    const fetchImg = await fetch('Images/spaceCompressed.png');
    const img = await fetchImg.blob();
    const imgURL = await URL.createObjectURL(img);

    world.style.backgroundImage = `url(${imgURL})`;
}

fetchWorld();
