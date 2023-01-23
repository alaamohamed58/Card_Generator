// const addLogoBtn = <HTMLInputElement>document.querySelector("#logoBtn input");

// addLogoBtn.addEventListener("change", () => {
//   card = document.querySelectorAll("#card > div");
//   console.log(card);
// });
let initialX: number = 0,
  initialY: number = 0;
let moveElement: boolean = false;
interface Events {
  mouse: {
    up: string;
    move: string;
    down: string;
  };

  touch: {
    up: string;
    move: string;
    down: string;
  };
}

//Events object
let events: Events = {
  mouse: {
    up: "mouseup",
    move: "mousemove",
    down: "mousedown",
  },

  touch: {
    up: "touchend",
    move: "touchmove",
    down: "touchstart",
  },
};

let deviceType: string = "";
const isTouchDevice = (): boolean => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (error) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();
export function dragAndDrop() {
  let card = document.querySelectorAll("#card > div");

  // mouse down
  function onMousedown(e?: any): void {
    //initial x and y
    initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;

    //initial x and y
    initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;

    //START MOVE
    moveElement = true;
  }

  // mouse down
  card.forEach((el: any) => {
    el.addEventListener(events[deviceType].down, (e: any) => {
      e.preventDefault();
      onMousedown(e);
      el.style.cursor = "grab";
      el.style.border = "1px dashed black";
    });
  });

  //mouse move
  function mouseMove(
    e?: any,
    el?: {
      style: { top: string; left: string; cursor: string };
      offsetTop: number;
      offsetLeft: number;
    }
  ) {
    if (moveElement) {
      e.preventDefault();

      let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
      let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;

      if (el != null) {
        el.style.top = el.offsetTop - (initialY - newY) + "px";
        el.style.left = el.offsetLeft - (initialX - newX) + "px";
        el.style.cursor = "grabbing";
      }
      initialX = newX;
      initialY = newY;
    }
  }

  //move
  card.forEach((el: any) => {
    el.addEventListener(events[deviceType].move, (e: any) => {
      mouseMove(e, el);
    });
  });

  function stopMovement(): void {
    moveElement = false;
  }
  //up
  card.forEach((el: any) => {
    el.addEventListener(events[deviceType].up, () => {
      stopMovement();
      el.style.cursor = "grab";
      el.style.border = "none";
    });
  });

  card.forEach((el: any) => {
    el.addEventListener("mouseleave", () => {
      stopMovement();
      el.style.cursor = "grab";
      el.style.border = "none";
    });
  });
}
dragAndDrop();
