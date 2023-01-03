const sideBarElements: NodeListOf<Element> =
  document.querySelectorAll("#side-nav li");

sideBarElements.forEach((li: any) => {
  li.onclick = function () {
    this.classList.toggle("active");
  };
});

/**************************************************************************************** */

//date
const card_date = document.getElementById("card-date") as HTMLDivElement;

card_date.textContent = new Date().toLocaleDateString();

/**************************************************************************************** */

// Hide Elements
sideBarElements.forEach(function (li: any): void {
  li.addEventListener("click", function () {
    if (this.dataset.inform) {
      let item = document.querySelector(this.dataset.inform);
      item.classList.toggle("hide");
    }
  });
});

/**************************************************************************************** */
// set background
const card_container = document.getElementById("card") as HTMLDivElement;
const fileInput = <HTMLInputElement>(
  document.querySelector("#background-btn input[type = file]")
);
//setbackground function
const inputFileType: string[] = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];
function validFileTypes(file: any): any {
  return inputFileType.includes(file.type);
}
function setBackGroundImg(fileInput: HTMLInputElement) {
  let curFiles = fileInput.files;

  for (const file of curFiles) {
    if (validFileTypes(file)) {
      let backgroundImg = URL.createObjectURL(file);
      card_container.style.backgroundImage = `url(${backgroundImg})`;
    }
  }
}
fileInput.addEventListener("change", updateImage);
function updateImage(): void {
  setBackGroundImg(fileInput);
}
//background btn
const backgroundBtn = document.getElementById(
  "background-btn"
) as HTMLLIElement;

backgroundBtn.addEventListener("click", function () {
  if (!this.classList.contains("active")) {
    card_container.style.backgroundImage = "unset";
    fileInput.style.display = "block";
  }
  if (this.classList.contains("active")) {
    fileInput.style.display = "none";
  }
});

// change style
const cardElements: Element[] = Array.from(card_container.children);

const selectedItem = document.getElementById("selected") as HTMLDivElement;
const fontColor = document.getElementById("fontcolor") as HTMLInputElement;
const fontSize = document.getElementById("fontsize") as HTMLInputElement;
const fontBold = document.getElementById("font-bold") as HTMLInputElement;
const italicFont = document.getElementById("italic") as HTMLInputElement;

//change style
cardElements.forEach((e: any) => {
  e.addEventListener("dblclick", function () {
    fontBold.classList.remove("bold");
    italicFont.classList.remove("italic");
    selectedItem.textContent = e.innerText;
    fontColor.disabled = false;
    fontSize.disabled = false;
    fontBold.disabled = false;
    italicFont.disabled = false;

    e.style.border = `1px dashed black`;
    changeStyle(e);
  });
});

//disable button
if (selectedItem.textContent === "") {
  fontColor.disabled = true;
  fontSize.disabled = true;
  fontBold.disabled = true;
  italicFont.disabled = true;
}

function changeStyle(e: any): void {
  if (selectedItem.textContent === "") {
    return;
  }

  //change color

  fontColor.oninput = () => {
    e.style.color = `${fontColor.value}`;
  };

  //change fontSize

  fontSize.oninput = () => {
    e.style.fontSize = `${fontSize.value}px`;
  };

  //font bold

  fontBold.onclick = () => {
    fontBold.classList.toggle("bold");
    if (fontBold.classList.contains("bold")) {
      e.style.fontWeight = "bold";
    } else {
      e.style.fontWeight = "normal";
    }
  };

  //font italic

  italicFont.onclick = () => {
    italicFont.classList.toggle("italic");
    if (italicFont.classList.contains("italic")) {
      e.style.fontStyle = "italic";
    } else {
      e.style.fontStyle = "normal";
    }
  };
}

// add logo
const addLogoBtn = <HTMLInputElement>document.querySelector("#logoBtn input");
const radiusRange = document.getElementById("radius-size") as HTMLInputElement;

addLogoBtn.addEventListener("change", updateLogo);

function updateLogo(): void {
  setLogo(addLogoBtn);
}

function setLogo(fileInput: HTMLInputElement) {
  let curFiles = fileInput.files;
  let img: HTMLImageElement = document.createElement("img");
  let logoContainer = document.getElementById(
    "logo-container"
  ) as HTMLDivElement;

  for (const file of curFiles) {
    while (logoContainer.lastElementChild) {
      logoContainer.removeChild(logoContainer.lastElementChild);
    }
    radiusRange.value = 0;
    if (validFileTypes(file)) {
      let logo = URL.createObjectURL(file);
      card_container;
      img.src = `${logo}`;
      img.alt = `logo`;
      logoContainer.appendChild(img);
      card_container.appendChild(logoContainer);
    }
  }
}

// chnage logo radius

radiusRange.addEventListener("input", () => {
  const logo = <HTMLImageElement>document.querySelector("#logo-container img");

  if (!logo) {
    radiusRange.disabled = true;
  } else {
    radiusRange.disabled = false;

    logo.style.borderRadius = `${radiusRange.value}%`;
  }
});

radiusRange.closest("li").addEventListener("click", function () {
  this.classList.toggle("close");
});

//rotate img
const rotateRight = document.getElementById("rotate-right") as HTMLLIElement;
const rotateLeft = document.getElementById("rotate-left") as HTMLLIElement;
//rotate right
let rotateRightVal = 0;
rotateRight.addEventListener("click", () => {
  const logo = <HTMLImageElement>document.querySelector("#logo-container img");
  rotateRightVal += 45;
  logo.style.transform = `rotate(${rotateRightVal}deg)`;
});
//rotate left
let rotateLeftVal = 0;
rotateLeft.addEventListener("click", () => {
  const logo = <HTMLImageElement>document.querySelector("#logo-container img");
  rotateLeftVal -= 45;
  logo.style.transform = `rotate(${rotateLeftVal}deg)`;
});

/****************************************************************************** */

// Add more info
const addInfoBtn = document.getElementById("data-entry") as HTMLLIElement;

// create container for input info
const contentDiv = <HTMLDivElement>document.createElement("div");
contentDiv.setAttribute("id", "info-input");

//create input text
const inputTextInform = <HTMLInputElement>document.createElement("input");
inputTextInform.type = "text";

//create button to add the element
const submitInfoBtn = <HTMLButtonElement>document.createElement("button");
submitInfoBtn.textContent = "اضافة";

//append element in container
contentDiv.appendChild(inputTextInform);
contentDiv.appendChild(submitInfoBtn);

//pop up text
const popText = document.querySelector("#data-entry .pop-up") as HTMLElement;
console.log(popText);
//aside
const aside = document.getElementById("side-nav") as HTMLElement;

addInfoBtn.addEventListener("click", function () {
  if (contentDiv.isConnected) {
    contentDiv.remove();
    this.addEventListener("mouseover", () => {
      popText.style.display = "block";
    });
    this.addEventListener("mouseleave", () => {
      popText.style.display = "none";
    });
  } else {
    aside.appendChild(contentDiv);
    this.addEventListener("mouseover", () => {
      popText.style.display = "none";
    });

    contentDiv.querySelector("button").addEventListener("click", () => {
      // card_container.append(paragInfo);
    });
  }
});

//check
function responding(evt: any) {
  if (evt.target.matches("input")) {
    //create element inside card
    const paragInfo = <HTMLParagraphElement>document.createElement("p");

    // add the info box inside card
    contentDiv.querySelector("input").addEventListener("input", () => {
      paragInfo.textContent = contentDiv.querySelector("input").value;
    });

    if (paragInfo.isConnected) {
      paragInfo.textContent = contentDiv.querySelector("input").value;
    } else if (!card_container.contains(paragInfo)) {
      card_container.insertAdjacentElement("beforeend", paragInfo);
    } else {
    }
  }
}

inputTextInform.addEventListener("click", responding);
