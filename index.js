const dragItems = document.querySelectorAll(".box");
const container = document.getElementById("container");
const mainContent = document.getElementById("main-content");
const splash = document.getElementById("splash-screen");
const itemStateAndPosition = {};

function randomizeDragItemPosition(items) {
  const container = document.getElementById("container");
  const containerBoundsRect = container.getBoundingClientRect();

  const maxX = containerBoundsRect.width - items.offsetWidth;
  const maxY = containerBoundsRect.height - items.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  items.style.left = `${randomX}px`;
  items.style.top = `${randomY}px`;
}

function populateBoxesWithDelay(items) {
  items.forEach((item, index) => {
    setTimeout(() => {
      randomizeDragItemPosition(item);
    }, index * 100); //staggered load
  });
}

function handleAddMetaData(e) {
   e.preventDefault();
  window.open("https://www.wisdomatl.com/collections/all");
}

function startDrag(moveClientX, moveClientY, index, item) {
    itemStateAndPosition[index] = {
      isDragging: true,
      offsetX: moveClientX - item?.offsetLeft,
      offsetY: moveClientY - item?.offsetTop,
    };
    Object.keys(itemStateAndPosition).forEach((key) => {
    const state = itemStateAndPosition[key];
    const x = moveClientX - state.offsetX;
    const y = moveClientY - state.offsetY;
    console.log("state", item?.movementX);
    if (item?.movementX && x <= 0 && y <= 0) {
      console.log("state is clicked");
    }
     if (state?.movementX > 0&& x > 0 && y > 0) {
       console.log("state is dragging");
     }
    });
}
function isStateDragging( moveClientX, moveClientY) {

  Object.keys(itemStateAndPosition).forEach((key) => {
    const state = itemStateAndPosition[key];
   if (state.isDragging) {
     const item = dragItems[key]; //get the single draggable box
     const x = moveClientX - state.offsetX;
     const y = moveClientY - state.offsetY;
  
     const maxX = this.container.offsetWidth - item.offsetWidth;
     const maxY = this.container.offsetHeight - item.offsetHeight;

     item.style.left = `${Math.min(Math.max(x, 0), maxX)}px`;
     item.style.top = `${Math.min(Math.max(y, 0), maxY)}px`;
    }
    return true;
  });
}

let moved = false;
let touchedOrClicked = false;
const handleMouseDown = (e, index, item) => {
    e.preventDefault();
    touchedOrClicked = true;
  moved = false;
  item.classList.remove("shrink-on-drop");
  item.classList.add("grow-on-drag");
    startDrag(e.clientX, e.clientY, index, item);
  }
  
let itemWasDragged = false;
const handleMouseMove = (e) => {
    e.preventDefault();
    if(touchedOrClicked){
      itemWasDragged = true;
      moved = true;
      isStateDragging(e.clientX, e.clientY);
    
  }
}

const handleMouseUp = (e) => {
  e.preventDefault();
  console.log('mouse up item: ', e?.target?.classList);
  e?.target?.classList.add("shrink-on-drop");
  e?.target?.classList.remove("grow-on-drag");
    if(itemWasDragged ){
      
      Object.keys(itemStateAndPosition).forEach((key) => {
        itemStateAndPosition[key].isDragging = false;
        //key.classList.add("")
      });
    }
    if(!moved){
      handleAddMetaData(e)
    }
    touchedOrClicked = false;
}

const handleTouchStart = (e, index, item) => {
  e.preventDefault();
  touchedOrClicked = true;
  moved = false;
  item.classList.add("grow-on-drag");
  startDrag(e.touches[0].clientX, e.touches[0].clientY, index, item);
}

const handleTouchMove = (e) => {
  e.preventDefault();
  if(touchedOrClicked){
    itemWasDragged = true;
    moved = true;
    isStateDragging( e.touches[0].clientX, e.touches[0].clientY);
  }
}

const handleTouchEnd = (e) => {
  e?.target?.classList.add("shrink-on-drop");
  if(itemWasDragged ){
    Object.keys(itemStateAndPosition).forEach((key) => {
      itemStateAndPosition[key].isDragging = false;
    });
  }
  if(!moved){
    handleAddMetaData(e)
  }
  touchedOrClicked = false;
}

dragItems.forEach((item, index) => {
  item.addEventListener('mousedown', (e) => handleMouseDown(e, index, item));
  item.addEventListener('touchstart', (e) => handleTouchStart(e, index, item));
  //release memory
  item.removeEventListener('mousedown', (e) => handleMouseDown(e, index, item));
  item.removeEventListener('touchstart', (e) => handleTouchStart(e, index, item));
})
container.addEventListener('mousemove', (e) => handleMouseMove(e));
container.addEventListener('touchmove', (e) => handleTouchMove(e));
container.addEventListener('mouseup', (e) => handleMouseUp(e));
container.addEventListener('touchend', (e) => handleTouchEnd(e));
//release memory
container.removeEventListener('mousemove', (e) => handleMouseMove(e));
container.removeEventListener('touchmove', (e) => handleTouchMove(e));
container.removeEventListener('mouseup', (e) => handleMouseUp(e));
container.removeEventListener('touchend', (e) => handleTouchEnd(e));


//splash screen
function startSplashScreen() {
  mainContent.style.display = "none";
  splash.style.display = "flex";
  setTimeout(() => {
    splash.style.display = "none";
    mainContent.style.display = "block";
    populateBoxesWithDelay(dragItems);

  }, 3000);
}
startSplashScreen();
//document.addEventListener("DOMContentLoaded", startSplashScreen());
//start
