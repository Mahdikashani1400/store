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
  virgolPriceOff,
  virgolPriceOn,
  userLoginHandler,
  goToUserBasket,
  newProductsHandler,
} from "../functions/functions.js";

window.setSize = setSize;
window.showProductInfo = showProductInfo;
window.selectBorder = selectBorder;
// loading
load();
window.addEventListener("load", () => {
  userLoginHandler();
  goToUserBasket();
});

newProductsHandler();

// menu
menu("explain-of-product");

// search
search("explain-of-product");

let bigImage = $.querySelector(".big-image-product");

function selectBorder(event) {
  let selectImage = $.querySelector(".border-mini-image");
  selectImage.classList.remove("border-mini-image");

  bigImage.setAttribute("src", `${event.target.src}`);
  event.target.classList.add("border-mini-image");
}

let productTarget = new URLSearchParams(location.search).get("id").split("-");
let productTargetInfo = allProducts[productTarget[0]][productTarget[1] - 1];
let productTitle = $.querySelector(".title-model-product");
let kindOfModel = $.querySelector(".kind-model-product");
let kindOfSize = $.querySelector(".title-produvt-size");
let containProductSize = $.querySelector(".contain-product-sizes ");
let particularSize = $.getElementById("particular-size");
let containColor = $.getElementById("contain-color");
let particularColor = $.getElementById("particular-color");
let englishColors = [
  "red",
  "blue",
  "gray",
  "white",
  "black",
  "green",
  "yellow",
  "brown",
];
let persianColors = [
  "قرمز",
  "آبی",
  "خاکستری",
  "سفید",
  "سیاه",
  "سبز",
  "زرد",
  "قهوه ای",
];
let productPriceInfo = $.querySelector(".price-product-info");

let containSlider = $.querySelector(".contain-slider-product");
let imgNewData = "../images/new-product.jpg";

function executeProductInfo(data) {
  let imgData;
  productTitle.innerHTML = data.title + " " + "مدل" + " " + data.model;
  kindOfModel.innerHTML = data.title.split(" ").slice(0, -1).join(" ");
  kindOfSize.innerHTML =
    "سایز" + " " + data.title.split(" ").slice(0, -1).join(" ") + " " + ":";

  try {
    displayOn(containProductSize);

    data.sizes.forEach((size) => {
      containProductSize.insertAdjacentHTML(
        "beforeend",
        `
        <div class="contain-number-size flex-center" id="${size}" onclick="setSize('${size}')"><span class="number-size-product">${size}</span></div>
        `
      );
    });
    particularSize.innerHTML = data.sizes.join(", ");
  } catch {
    displayNone(containProductSize);
    particularSize.innerHTML = "-----";
  }

  let colorIndex = englishColors.findIndex((color) => {
    return color === data.color;
  });

  containColor.innerHTML = `رنگ: ${persianColors[colorIndex]}`;
  particularColor.innerHTML = persianColors[colorIndex];
  productPriceInfo.innerHTML = `${virgolPriceOn(data.price)} تومان`;

  for (let i = 1; i <= 2; i++) {
    if (i === 1) {
      imgData = `../images/small${i}-${data.image.split("/")[2]}`;
      containSlider.insertAdjacentHTML(
        "beforeend",
        `  <div class="mini-box-image flex-center"><img src="${
          data?.state ? imgNewData : imgData
        }" alt="1" class="mini-image-product border-mini-image" onclick="selectBorder(event)"></div>`
      );
      bigImage.setAttribute("src", `${data?.state ? imgNewData : imgData}`);
    } else {
      imgData = ` ../images/small${i}-${data.image.split("/")[2]}`;
      containSlider.insertAdjacentHTML(
        "beforeend",
        `  <div class="mini-box-image flex-center"><img src="${
          data?.state ? imgNewData : imgData
        }" alt="1" class="mini-image-product" onclick="selectBorder(event)"></div>`
      );
    }
  }
}
executeProductInfo(productTargetInfo);
let sizeError = $.querySelector(".section-modal-handle");

function setSize(id) {
  try {
    let selectedSize = $.querySelector(".select-size");
    selectedSize.classList.remove("select-size");
  } catch {}
  try {
    let sizeTarget = $.getElementById(id);

    sizeTarget.classList.add("select-size");
  } catch {}
}

let containProducts = $.querySelector(".contain-box-other");
let productId;

function sameProducts(nameOfProduct) {
  containProducts.style.left = `${0.000000001}px`;
  allProducts[nameOfProduct[0]].forEach((product) => {
    if (product.id != nameOfProduct[1]) {
      productId = `${nameOfProduct[0]}-${product.id}`;

      containProducts.insertAdjacentHTML(
        "afterbegin",
        `<div class="product-box-shop flex-center-column" id="${productId}" onclick="showProductInfo('${productId}','explain-of-product')">
            <div class="contain-image-same">
                <img src="${
                  product.state ? imgNewData : product.image
                }" alt="img" class="image-product-same">
              
            </div>
            <div class="contain-info-product">
            <p class="name-model-product">${product.title}</p>
            <strong class="price-product-shop">${
              product.price
            },000 تومان</strong>
        </div>
        </div>`
      );
    }
  });
}

sameProducts(productTarget);

let leftArrow = $.querySelector(".icon-box-left");
let rightArrow = $.querySelector(".icon-box-right");
let boxExample = $.querySelector(".product-box-shop");

function runLeftslide() {
  containProducts.scrollLeft -= +boxExample.getBoundingClientRect().width + 24;

  if (
    containProducts.clientWidth - containProducts.scrollWidth ==
    containProducts.scrollLeft
  ) {
    containProducts.scrollLeft = 0;
  }
}
leftArrow.addEventListener("click", runLeftslide);

function runRightslide() {
  containProducts.scrollLeft += +boxExample.getBoundingClientRect().width + 24;
  if (containProducts.scrollLeft == 0) {
    containProducts.scrollLeft =
      containProducts.clientWidth - containProducts.scrollWidth;
  }
}
rightArrow.addEventListener("click", runRightslide);

let basketButton = $.querySelector(".add-to-basket");

function addTobasket() {
  try {
    let selectedSize = $.querySelector(".select-size").firstChild.innerHTML;

    if (selectedSize) {
      location.href =
        location.pathname.replace(
          new RegExp("explain-of-product", "g"),
          "user-basket"
        ) +
        "?id=" +
        productTarget +
        "," +
        selectedSize;
    }
  } catch {
    if (particularSize.innerHTML === "-----") {
      location.href =
        location.pathname.replace(
          new RegExp("explain-of-product", "g"),
          "user-basket"
        ) +
        "?id=" +
        productTarget;
    } else {
      displayOn(sizeError);
      setTimeout(() => {
        displayNone(sizeError);
      }, 1500);
    }
  }
}
basketButton.addEventListener("click", addTobasket);
