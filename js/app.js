var filePaths = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var survayImageData = [];
var totalClicked = 0;
var totalDisplayed = 0;

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function SurvayImage(name, src){
  this.name = name;
  this.src = src;
  this.timesClicked = 0;
  this.timesDisplayed = 0;
}

SurvayImage.prototype.createImageEl = function(eventHandler){
  var imgEl = document.createElement('img');
  imgEl.setAttribute('id', this.name);
  imgEl.setAttribute('src', this.src);
  imgEl.addEventListener('click', eventHandler);
  this.timesDisplayed++;
  totalDisplayed++;
  return imgEl;
}

function getThreeImageIndexes(){
  var randomIndexOne = getRandomIntInclusive(0, survayImageData.length -1);

  var randomIndexTwo = randomIndexOne;
  while (randomIndexTwo === randomIndexOne){
    randomIndexTwo = getRandomIntInclusive(0, survayImageData.length -1);
  }

  var randomIndexThree = randomIndexOne;
  while (randomIndexThree === randomIndexOne || randomIndexThree === randomIndexOne){
    randomIndexThree = getRandomIntInclusive(0, survayImageData.length -1);
  }
  

  return [randomIndexOne, randomIndexTwo, randomIndexThree]
}

function handleSurvayImageClick(event){
  totalClicked++;
  if (totalClicked < 5){ 
    var currentImageId = event.target.id;
    for(var i=0; i<survayImageData.length; i++){
      if (currentImageId === survayImageData[i].name){
        survayImageData[i].timesClicked++;
        break
      }
    }
    displayThreeImages();
  } else {
    displayBarChart();
  }
}

function displayBarChart(){
   
}

function displayThreeImages(){
  var threeImageIndexes = getThreeImageIndexes();
  // get access to the survay-image-container
  var survayImageContainer = document.getElementById('survay-image-container');
  // clear it 
  survayImageContainer.textContent = '';

  // create three images
  var survayImageOne = survayImageData[threeImageIndexes[0]];
  var survayImageTwo = survayImageData[threeImageIndexes[1]];
  var survayImageThree = survayImageData[threeImageIndexes[2]];
  var imageElOne = survayImageOne.createImageEl(handleSurvayImageClick);
  var imageElTwo = survayImageTwo.createImageEl(handleSurvayImageClick);
  var imageElThree = survayImageThree.createImageEl(handleSurvayImageClick);

  // put them on the survay image container
  survayImageContainer.appendChild(imageElOne);
  survayImageContainer.appendChild(imageElTwo);
  survayImageContainer.appendChild(imageElThree);
}

for(var i=0; i<filePaths.length; i++){
  filename = filePaths[i].split('/')[1].split('.')[0];
  filePath = filePaths[i];
  survayImageData.push(new SurvayImage(filename, filePath)); 
}

displayThreeImages();
