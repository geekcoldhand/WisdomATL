const dragItems = document.querySelectorAll(".box");
const container = document.getElementById("container");
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

let moved = false;
let touchedOrClicked = false;
const handleMouseDown = (e, index, item) => {
    e.preventDefault();
    touchedOrClicked = true;
    moved = false;
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
    if(itemWasDragged ){
      console.log('moved works!');
      Object.keys(itemStateAndPosition).forEach((key) => {
        itemStateAndPosition[key].isDragging = false;
      });
    }
    if( !moved){
      handleAddMetaData(e)
    }
    touchedOrClicked = false;
}

const handleTouchStart = (e, index, item) => {
  e.preventDefault();
  touchedOrClicked = true;
  moved = false;
  startDrag(e.touches[0].clientX, e.touches[0].clientY, index, item);
}

const handleTouchMove = (e) => {
  e.preventDefault();
  if(touchedOrClicked){
    itemWasDragged = true;
    moved = true;
    isStateDragging(e.touches[0].clientX, e.touches[0].clientY);
  }
}

const handleTouchEnd = () => {
  if(itemWasDragged ){
    Object.keys(itemStateAndPosition).forEach((key) => {
      itemStateAndPosition[key].isDragging = false;
    });
  }
  if(!moved){
    console.log('handleAddMetaData');
  }
  touchedOrClicked = false;
}


function isStateDragging(moveClientX, moveClientY) {
  Object.keys(itemStateAndPosition).forEach((key) => {
    const state = itemStateAndPosition[key];
  // console.log("state is dragging");
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



dragItems.forEach((item, index) => {
  item.addEventListener('mousedown', (e) => handleMouseDown(e, index, item));
  item.addEventListener('touchstart', (e) => handleTouchStart(e, index, item));
  item.addEventListener('mousemove', (e) => handleMouseMove(e));
  item.addEventListener('touchmove', (e) => handleTouchMove(e));
  item.addEventListener('mouseup', (e) => handleMouseUp(e, index, item));
  item.addEventListener('touchend', (e) => handleTouchEnd(e));
})

//start
populateBoxesWithDelay(dragItems);
