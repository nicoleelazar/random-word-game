
//VARIABLES -------------------
const container = document.getElementById('container');
const button1 = document.getElementById('button');

let words = [
  ['that\'s', 'the', 'way', 'the', 'cookie', 'crumbles'],
  ['cats', 'will', 'take', 'over', 'the', 'world'], 
  ['I', 'like', 'to', 'sing', 'in', 'the', 'rain'],
  ['you\'ve', 'got', 'to', 'pick', 'a', 'pocket', 'or', 'two'],
  ['the', 'cake', 'is', 'a', 'lie'],
  ['is', 'space', 'really', 'the', 'final', 'frontier'],
  ['nobody', 'puts', 'baby', 'in', 'the', 'corner'],
  ['you', 'can\'t', 'handle', 'the', 'truth']
];

//choose a group of words at random, and put this group into a new array
let randomGroup = Math.floor(Math.random() * (words.length));
let newGroupArr = [...words[randomGroup]];

let id = 1;
let boxesArr = [];
let framesArr = [];
let box;
let frame;



//INIT FUNCTION ------------------
function initialise() {
//set variable to keep a fixed array length, since newGroupArr gets spliced at every iteration
let initialLength = newGroupArr.length;
for (let i = 0; i < initialLength; i++) {

  //Create frames
  frame = document.createElement('div');
  container.appendChild(frame);
  framesArr.push(frame);
  frame.classList.add('frame');

  //create boxes inside frames
  box = document.createElement('div');
  frame.appendChild(box);
  boxesArr.push(box);
  box.classList.add('box');

  //MAKE BOX DRAGGABLE
  box.setAttribute('draggable', true);

  //set a unique id for each box for drag function
  box.id = id;
  id++;

  // select words at random and remove them from array so they are only used once
  let randomWords = Math.floor(Math.random() * newGroupArr.length);
  box.innerHTML = newGroupArr[randomWords];
  newGroupArr.splice(randomWords, 1);

  //LISTENERS
  box.addEventListener('dragstart', handleDragstart);
  frame.addEventListener("dragover", handleDragover);
  frame.addEventListener("drop", handleDrop);

  }
} 
initialise();


//NEW SENTENCE on button click ---------------
function nextSentence() {
  randomGroup = Math.floor(Math.random() * (words.length));
  newGroupArr = [...words[randomGroup]];

  //remove all boxes before initialising new set of boxes
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
  initialise();
}
button1.addEventListener('click', nextSentence);


//DRAG START----------------
function handleDragstart(e) {
  e.dataTransfer.setData("text", e.target.id);
}

//DRAG OVER----------------
function handleDragover(e) {
  e.preventDefault();
}

//DROP & SWAP ----------------
function handleDrop(e) {
  e.preventDefault();
  
  let src = document.getElementById(e.dataTransfer.getData("text"));
  let srcParent = src.parentNode;
  let tgt = e.currentTarget.firstElementChild;

  // the swap
  e.currentTarget.replaceChild(src, tgt);
  srcParent.appendChild(tgt);
}
