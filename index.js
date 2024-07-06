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

function handleAddMetaData(e) {
   e.preventDefault();
//TODO:pass is isDragging

  //window.open("https://www.wisdomatl.com/collections/all");
}

function populateBoxesWithDelay(items) {
  items.forEach((item, index) => {
    setTimeout(() => {
      randomizeDragItemPosition(item);
    }, index * 100); //staggered load
  });
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

/**
 * Mouse Event Start
*/
dragItems.forEach((item, index) => {
  item.addEventListener("mousedown", (e) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY, index, item);
   // handleAddMetaData(e);
  });
});

let moved = false;
let touchedOrClicked = false;
const handleMouseDown = (e) => {
    //console.log(e.currentTarget);
    touchedOrClicked = true;
    moved = false;
  }
  
  let itemWasDragged = false;
  const handleMouseMove = (e) => {
    //console.log('handleMouseMove');
    e.preventDefault();
    if(touchedOrClicked){
      itemWasDragged = true;
      moved = true;
      //console.log('handleMouseMove');
  }
    
}

const handleMouseUp = (e) => {
    //console.log('handleMouseUp');
    if(itemWasDragged ){
      console.log('moved works!');
    }
    if( !moved){
      console.log('handleAddMetaData');
    }
    touchedOrClicked = false;
}

// /**
//  * Touch Event Start
// */
dragItems.forEach((item, index) => {
  item.addEventListener("touchstart", (e) => {
    console.log(e);
    //e.preventDefault(); // Prevent scrolling on touch devices
    startDrag(e.touches[0].clientX, e.touches[0].clientY, index, item);
   // handleAddMetaData(e);
  });
});

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

/**
 * Touch Move
 */
document.addEventListener("touchmove", (e) => {
    e.preventDefault(); // Prevent scrolling on touch devices
    isStateDragging(e.touches[0].clientX, e.touches[0].clientY);
});

/**
 * Mouse Move
 */
document.addEventListener("mousemove", (e) => {
  e.preventDefault();
  isStateDragging(e.clientX, e.clientY);
});

/**
 * Mouse Up End
 */
document.addEventListener("mouseup", () => {
  // Reset dragging state for all boxes
  Object.keys(itemStateAndPosition).forEach((key) => {
    itemStateAndPosition[key].isDragging = false;
  });
});

/**
 * Touch End
 */
document.addEventListener("touchend", () => {
  // Reset dragging state for all boxes
  Object.keys(itemStateAndPosition).forEach((key) => {
    itemStateAndPosition[key].isDragging = false;
  });
});

// dragItems.forEach((item, index) => {
//   item.addEventListener("click", (e) => {
//     e.preventDefault();

//     handleAddMetaData(e);
//   });
// });
dragItems.forEach((item, index) => {
  item.addEventListener('mousedown', (e) => handleMouseDown(e));
  item.addEventListener('touchstart', (e) => handleTouchStart(e));
  item.addEventListener('mousemove', (e) => handleMouseMove(e));
  item.addEventListener('mouseup', (e) => handleMouseUp(e));
  //item.addEventListener('touchmove', (e) => handleTouchMove(e));
  //item.addEventListener('touchend', (e) => handleTouchEnd(e)
})

//start
populateBoxesWithDelay(dragItems);
