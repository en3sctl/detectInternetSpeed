let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits");
kbSpeed = document.getElementById("kbs");
mbSpeed = document.getElementById("mbs");
info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;

//getting random image from unsplash
let imageApi = "https://source.unsplash.com/random?topic=nature";

//when image loads
image.onload = async function () {
  endTime = new Date().getTime();

  //get image size
  await fetch(imageApi).then((response) => {
    imageSize = response.headers.get("content-length");
    calculateSpeed();
  });
};

//function to calculate speed
function calculateSpeed() {
  //time taken in seconds
  let timeTaken = (endTime - startTime) / 1000;
  //total bits
  let loadedBits = imageSize * 8;
  let speedInBits = loadedBits / timeTaken;
  let speedInKb = speedInBits / 1024;
  let speedInMb = speedInKb / 1024;

  totalBitSpeed += speedInBits;
  totalKbSpeed += speedInKb;
  totalMbSpeed += speedInMb;

  testCompleted++;

  //if all tests completed (we get 5 image then calculate average)
  if (testCompleted === numTests) {
    let averageSpeedInBits = (totalBitSpeed / numTests).toFixed(2);
    let averageSpeedInKb = (totalKbSpeed / numTests).toFixed(2);
    let averageSpeedInMb = (totalMbSpeed / numTests).toFixed(2);

    //display average speed
    bitSpeed.innerHTML += `${averageSpeedInBits}`;
    kbSpeed.innerHTML += `${averageSpeedInKb}`;
    mbSpeed.innerHTML += `${averageSpeedInMb}`;
    info.innerHTML += "Test Completed!";
  } else {
    //run the next test
    startTime = new Date().getTime();
    image.src = imageApi;
  }
}

//initial function to start the test
const init = async () => {
  info.innerHTML = "Test Running...";
  startTime = new Date().getTime();
  image.src = imageApi;
};

//run test when window loads
window.onload = () => {
  for (let i = 0; i < numTests; i++) {
    init();
  }
};
