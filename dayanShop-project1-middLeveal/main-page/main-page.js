import {
  $,
  allProducts,
  displayOn,
  displayNone,
  preLoader,
  menu,
  search,
  load,
  showProductInfo,
  userLoginHandler,
  goToUserBasket,
  newProductsHandler,
} from "../functions/functions.js";
// import * as allMM from './functions.js'

window.chooseBoard = chooseBoard;
window.showProductInfo = showProductInfo;
window.chooseBoard = chooseBoard;
window.runLeftslide = runLeftslide;
window.runRightslide = runRightslide;

// menu
menu("main-page");

// loading
load();

window.addEventListener("load", () => {
  userLoginHandler();
  goToUserBasket();
});

newProductsHandler();

let containAllProducts = $.getElementById("all-products-shop");
let productId;
// search

search("main-page", "flex");

// product of main-page

let titleOfProduct = ["shoes", "sportThing", "digital"];
let persianNameProducts = ["کفش مردانه", "لوازم ورزشی", "لوازم دیجیتالی"];
let imageNameProducts = ["shoe", "sport", "digital"];

let countOfBox = 5;

function firstPageProduct(productsName, productCount) {
  for (let i = 0; i < productsName.length; i++) {
    containAllProducts.innerHTML += ` <section class="contain-products-shop">
        <div class="products-product-shop ">
            <div class="products-title-shop flex-center ">
                <div class="title-products-name flex-center">
                    <span class="text-name-products">${
                      persianNameProducts[i]
                    }</span><i class="icon-name-products" style="background-image:url(../images/${
      titleOfProduct[i]
    }-icon.png);"></i>

                </div>
                <div class="arrow-products-shop">
                <span class="right-slide-products" onclick="runRightslide(event)"><</span>
                <span class="left-slide-products" onclick="runLeftslide(event)">></span>
                   
                </div>
            </div>
            <div class="contain-box-products" id="contain-box-products_${
              i + 1
            }">
            </div>
            </section>`;
    let containBoxProducts = $.getElementById(`contain-box-products_${i + 1}`);
    for (let j = 1; j <= productCount; j++) {
      productId = `${titleOfProduct[i]}-${
        allProducts[titleOfProduct[i]][j - 1].id
      }`;
      containBoxProducts.innerHTML += ` <div class="product-box-shop flex-center-column" id="${productId}" onclick="showProductInfo('${productId}','main-page')">
             <div class="contain-image-product"><img src="../images/${
               allProducts[titleOfProduct[i]][j - 1]?.state
                 ? "new-product"
                 : imageNameProducts[i]
             }${
        allProducts[titleOfProduct[i]][j - 1]?.state ? "" : j
      }.jpg" alt="" class="image-product-shop"></div>
            <div class="contain-info-product flex-center-column">
                <p class="name-model-product">${
                  allProducts[titleOfProduct[i]][j - 1].title
                } مدل ${allProducts[titleOfProduct[i]][j - 1].model}</p>
                <strong class="price-product-shop">${
                  allProducts[titleOfProduct[i]][j - 1].price
                },000 تومان</strong>
            </div>
        </div>`;
    }
  }
}
firstPageProduct(titleOfProduct, countOfBox);

let newIdproduct;
let boxContainer = $.querySelectorAll(".contain-box-products");

boxContainer.forEach(function (item) {
  item.addEventListener("animationend", animateContainer);
});

function animateContainer(event) {
  if (event.animationName === "next-product-animate") {
    event.target.classList.remove("contain-products-animate");
    event.target.insertAdjacentHTML(
      "beforeend",
      ` <div class="product-box-shop flex-center-column"  id="${
        titleOfProduct[event.target.id.split("_")[1] - 1]
      }-${
        allProducts[titleOfProduct[event.target.id.split("_")[1] - 1]][
          newIdproduct
        ].id
      }"  onclick="showProductInfo('${
        titleOfProduct[event.target.id.split("_")[1] - 1]
      }-${
        allProducts[titleOfProduct[event.target.id.split("_")[1] - 1]][
          newIdproduct
        ].id
      }','main-page')">
        <div class="contain-image-product"><img src="../images/${
          allProducts[titleOfProduct[event.target.id.split("_")[1] - 1]][
            newIdproduct
          ]?.state
            ? "new-product"
            : imageNameProducts[event.target.id.split("_")[1] - 1]
        }${
        allProducts[titleOfProduct[event.target.id.split("_")[1] - 1]][
          newIdproduct
        ]?.state
          ? ""
          : newIdproduct + 1
      }.jpg" alt="" class="image-product-shop"></div>
        <div class="contain-info-product flex-center-column">
            <p class="name-model-product">${
              allProducts[titleOfProduct[event.target.id.split("_")[1] - 1]][
                newIdproduct
              ].title
            } مدل ${
        allProducts[titleOfProduct[event.target.id.split("_")[1] - 1]][
          newIdproduct
        ].model
      }</p>
            <strong class="price-product-shop">${
              allProducts[titleOfProduct[event.target.id.split("_")[1] - 1]][
                newIdproduct
              ].price
            },000 تومان</strong>
        </div>
    </div>`
    );
    let lastProduct;
    if (innerWidth > 1140) {
      lastProduct = event.target.lastElementChild;
    } else if (innerWidth > 925) {
      lastProduct = event.target.lastElementChild.previousElementSibling;
    } else {
      lastProduct = event.target.firstElementChild.nextElementSibling;
    }

    lastProduct.style.animation = "add-animate-product .3s .1s both";
    event.target.firstElementChild.remove();
  } else if (event.animationName === "previous-product-animate") {
    event.target.classList.remove("contain-products-animate");
    event.target.insertAdjacentHTML(
      "afterbegin",
      ` <div class="product-box-shop flex-center-column"  id="${
        titleOfProduct[event.target.id.split("_")[1] - 1]
      }-${
        allProducts[titleOfProduct[event.target.id.split("_")[1] - 1]][
          newIdproduct - 1
        ].id
      }" onclick="showProductInfo('${
        titleOfProduct[event.target.id.split("_")[1] - 1]
      }-${
        allProducts[titleOfProduct[event.target.id.split("_")[1] - 1]][
          newIdproduct - 1
        ].id
      }','main-page')">
                <div class="contain-image-product"><img src="../images/${
                  allProducts[
                    titleOfProduct[event.target.id.split("_")[1] - 1]
                  ][newIdproduct - 1]?.state
                    ? "new-product"
                    : imageNameProducts[event.target.id.split("_")[1] - 1]
                }${
        allProducts[titleOfProduct[event.target.id.split("_")[1] - 1]][
          newIdproduct - 1
        ]?.state
          ? ""
          : newIdproduct
      }.jpg" alt="" class="image-product-shop"></div>
                <div class="contain-info-product flex-center-column">
                    <p class="name-model-product">${
                      allProducts[
                        titleOfProduct[event.target.id.split("_")[1] - 1]
                      ][newIdproduct - 1].title
                    } مدل ${
        allProducts[titleOfProduct[event.target.id.split("_")[1] - 1]][
          newIdproduct - 1
        ].model
      }</p>
                    <strong class="price-product-shop">${
                      allProducts[
                        titleOfProduct[event.target.id.split("_")[1] - 1]
                      ][newIdproduct - 1].price
                    },000 تومان</strong>
                </div>
            </div>`
    );
    let firstProduct = event.target.firstElementChild;

    firstProduct.style.animation = "add-animate-product .3s .1s both";
    event.target.lastElementChild.remove();
  }
}

let boxTarget;

// slider - products
const sliderAnimate = (arrowEvent, nameAnimate) => {
  boxTarget = arrowEvent.parentElement.parentElement.nextElementSibling;
  if (window.innerWidth <= 925) {
    boxTarget.style.setProperty("--move-container-product", "700px");
  } else {
    boxTarget.style.setProperty("--move-container-product", "260px");
  }

  boxTarget.classList.add("contain-products-animate");
  boxTarget.style.setProperty(
    "--product-animate",
    `${nameAnimate} .4s .1s both ease-out`
  );
};

function runRightslide(event) {
  sliderAnimate(event.target, "next-product-animate");

  newIdproduct = +boxTarget.lastElementChild.id.split("-")[1];
  if (
    newIdproduct ===
    allProducts[titleOfProduct[boxTarget.id.split("_")[1] - 1]].length
  ) {
    newIdproduct = 0;
  }
}

function runLeftslide(event) {
  sliderAnimate(event.target, "previous-product-animate");

  newIdproduct = +boxTarget.firstElementChild.id.split("-")[1] - 1;
  if (newIdproduct === 0) {
    newIdproduct =
      allProducts[titleOfProduct[boxTarget.id.split("_")[1] - 1]].length;
  }
}

// image of board

let boardImage = $.querySelector(".image-shop-header");
let boardImagesArray = [
  "../images/board1.jpg",
  "../images/board2.jpg",
  "../images/board3.jpg",
  "../images/board4.jpg",
];
let containBoardImages = $.querySelector(".box-icon-image");
let indexOfboardImages = 0;
let leftBoard = $.querySelector(".icon-left-board");
let rightBoard = $.querySelector(".icon-right-board");
for (let i = 1; i <= boardImagesArray.length; i++) {
  if (i == 1) {
    containBoardImages.innerHTML += `<span class="icon-image-header select-image-header" id="icon-image-board${i}" onclick="chooseBoard(event)"></span>`;
  } else {
    containBoardImages.innerHTML += `<span class="icon-image-header" id="icon-image-board${i}" onclick="chooseBoard(event)"></span>`;
  }
}

// change board with animation

boardImage.addEventListener("animationend", function (event) {
  if (event.animationName === "board-next-before") {
    boardImage.setAttribute("src", boardImagesArray[indexOfboardImages]);

    boardImage.classList.remove("board-animate-next-before");
    boardImage.classList.add("board-animate-next-after");
  } else if (event.animationName === "board-next-after") {
    boardImage.classList.remove("board-animate-next-after");
  } else if (event.animationName === "board-previous-before") {
    boardImage.setAttribute("src", boardImagesArray[indexOfboardImages]);
    boardImage.classList.remove("board-animate-previous-before");
    boardImage.classList.add("board-animate-previous-after");
  } else if (event.animationName === "board-previous-after") {
    boardImage.classList.remove("board-animate-previous-after");
  }
});

function chooseBoard(event) {
  let selectBoardOld = $.querySelector(".select-image-header");
  selectBoardOld.classList.remove("select-image-header");
  let selectBoardNew = event.target;
  indexOfboardImages = +event.target.id.slice(-1) - 1;
  selectBoardNew.classList.add("select-image-header");

  boardImage.classList.add("board-animate-next-before");
}

function nextBoard() {
  let selectBoardOld = $.querySelector(".select-image-header");
  selectBoardOld.classList.remove("select-image-header");
  boardImage.classList.remove("board-animate-next-after");
  boardImage.classList.remove("board-animate-next-before");
  indexOfboardImages++;
  if (indexOfboardImages === boardImagesArray.length) {
    indexOfboardImages = 0;
  }
  let selectBoardNew = $.getElementById(
    `icon-image-board${indexOfboardImages + 1}`
  );
  selectBoardNew.classList.add("select-image-header");

  boardImage.classList.add("board-animate-next-before");
}

function previousBoard() {
  let selectBoardOld = $.querySelector(".select-image-header");
  selectBoardOld.classList.remove("select-image-header");
  boardImage.classList.remove("board-animate-previous-after");
  boardImage.classList.remove("board-animate-previous-before");
  indexOfboardImages--;

  if (indexOfboardImages === -1) {
    indexOfboardImages = boardImagesArray.length - 1;
  }
  let selectBoardNew = $.getElementById(
    `icon-image-board${indexOfboardImages + 1}`
  );
  selectBoardNew.classList.add("select-image-header");

  boardImage.classList.add("board-animate-previous-before");
}
setInterval(nextBoard, 5000);
leftBoard.addEventListener("click", previousBoard);
rightBoard.addEventListener("click", nextBoard);

// go to explain of product page
