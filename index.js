const dragItems = document.querySelectorAll(".box");
const imageButtonItem = document.querySelectorAll(".img-button");
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
  // e.preventDefault();
  console.log("clicked");
  //window.open("https://www.wisdomatl.com/collections/all");
}

function populateBoxesWithDelay(items) {
  //multiple items add to list

  items.forEach((item, index) => {
    setTimeout(() => {
      randomizeDragItemPosition(item);
    }, index * 200); //staggered load
  });
}

function startDrag(moveClientX, moveClientY, index, item) {
 
    itemStateAndPosition[index] = {
      isDragging: true,
      offsetX: moveClientX - item?.offsetLeft,
      offsetY: moveClientY - item?.offsetTop,
    };

}
/**
 * Mouse Event Start
*/
dragItems.forEach((item, index) => {
  item.addEventListener("mousedown", (e) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY, index, item);
  });
});

/**
 * Touch Event Start
*/
dragItems.forEach((item, index) => {
  item.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent scrolling on touch devices
    startDrag(e.touches[0].clientX, e.touches[0].clientY, index, item);
  });
});

function isStateDragging( moveClientX, moveClientY) {

  Object.keys(itemStateAndPosition).forEach((key) => {
    const state = itemStateAndPosition[key];
    // Iterate over itemStateAndPosition object and update positions if dragging
   if (state.isDragging) {
    
     const item = dragItems[key];
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

dragItems.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    handleAddMetaData(e);
  });
});
//start
populateBoxesWithDelay(dragItems);
