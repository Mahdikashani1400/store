import {
  $,
  allProducts,
  displayOn,
  displayNone,
  preLoader,
  menuStracture,
  menu,
  search,
  load,
  virgolPriceOff,
  virgolPriceOn,
  showProductInfo,
  userLoginHandler,
  goToUserBasket,
  newProductsHandler,
} from "../functions/functions.js";
window.showProductInfo = showProductInfo;
window.mainOfProduct = mainOfProduct;
window.backToHome = backToHome;
window.filterSize = filterSize;
window.clickOnPage = clickOnPage;
window.filterColor = filterColor;

// menu

menu("products-list");

// search
search("products-list");

window.addEventListener("load", () => {
  preLoader();
  setTimeout(() => {
    productPagination(
      productsTarget,
      countOfProduct,
      FirestPage,
      kindOfProduct
    );
  }, 1500);
  userLoginHandler();
  goToUserBasket();
});

newProductsHandler();

let allOfThing = $.getElementById("all");

// customize range input

let leftThumb = $.getElementById("range-filter-price2");
let rightThumb = $.getElementById("range-filter-price1");
let containPriceRange = $.querySelector(".contain-range-price");
leftThumb.setAttribute("data-minPrice", "10,000");
rightThumb.setAttribute("data-maxPrice", "1,000,000");

function leftMoveThumb(event) {
  leftThumb.style.left = `${(
    ((event.x - containPriceRange.getBoundingClientRect().x) /
      containPriceRange.getBoundingClientRect().width) *
    100
  ).toFixed(0)}%`;

  if (leftThumb.style.left.slice(0, -1) >= 100) {
    leftThumb.style.left = `${100}%`;
  }

  let minPrice = +(+leftThumb.style.left.slice(0, -1));

  containPriceRange.style.setProperty(
    "--width-price-left",
    String(+minPrice) + "%"
  );

  if (
    +leftThumb.style.left.slice(0, -1) + 2 >=
    +100 - rightThumb.style.right.slice(0, -1)
  ) {
    
    leftThumb.style.left = `${100 - rightThumb.style.right.slice(0, -1) - 2}%`;
    minPrice = +(+leftThumb.style.left.slice(0, -1) + 2);

    containPriceRange.style.setProperty(
      "--width-price-left",
      String(+minPrice - 2) + "%"
    );
  }

  if (minPrice <= 0) {
    minPrice = 1;
  }
  leftThumb.setAttribute("data-minPrice", virgolPriceOn(minPrice * 10));
}

function rightMoveThumb(event) {
  rightThumb.style.right = `${
    100 -
    (
      ((event.x - containPriceRange.getBoundingClientRect().x) /
        containPriceRange.getBoundingClientRect().width) *
      100
    ).toFixed(0)
  }%`;
  if (rightThumb.style.right.slice(0, -1) >= 100) {
    rightThumb.style.right = `${100}%`;
  }

  let maxPrice = 100 - rightThumb.style.right.slice(0, -1);

  containPriceRange.style.setProperty(
    "--width-price-right",
    String(100 - +maxPrice) + "%"
  );

  if (
    +rightThumb.style.right.slice(0, -1) + 2 >=
    +100 - leftThumb.style.left.slice(0, -1)
  ) {
    rightThumb.style.right = `${100 - leftThumb.style.left.slice(0, -1) - 2}%`;
    maxPrice = +(98 - +rightThumb.style.right.slice(0, -1));
    containPriceRange.style.setProperty(
      "--width-price-right",
      String(98 - +maxPrice) + "%"
    );
  }
  if (maxPrice <= 0) {
    maxPrice = 1;
  }
  rightThumb.setAttribute("data-maxPrice", virgolPriceOn(maxPrice * 10));
}

leftThumb.addEventListener("pointerdown", () => {
  containPriceRange.addEventListener("pointermove", leftMoveThumb);
});
rightThumb.addEventListener("pointerdown", function () {
  containPriceRange.addEventListener("pointermove", rightMoveThumb);
});

containPriceRange.parentElement.addEventListener("pointerup", function () {
  containPriceRange.removeEventListener("pointermove", leftMoveThumb);
  containPriceRange.removeEventListener("pointermove", rightMoveThumb);
});

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
let containColors = $.querySelector(".contain-filter-colors");

function addColors(englishColors, persianColors) {
  containColors.innerHTML = "";
  for (let i = 0; i < englishColors.length; i++) {
    containColors.innerHTML += `<div class="box-filter-color flex-center">
            <div class="box-label-color flex-center"><label for="filter-color-${englishColors[i]}" class="text-filter-color">${persianColors[i]}</label>
                <input type="radio" name="color" id="filter-color-${englishColors[i]}" style="accent-color:${englishColors[i]};cursor:pointer;" onclick="filterColor(event)" ></div>
            <span class="itself-color-filter" id="itself-color-${englishColors[i]}"></span>
        </div>`;
    let bgColor = $.getElementById(`itself-color-${englishColors[i]}`);
    
    bgColor.style.setProperty("--color-filter", englishColors[i]);
  }
}
addColors(englishColors, persianColors);

function filterColor(event) {
  let targetColor = event.target.id.split("-").slice(-1)[0];
  

  productsTarget = allProducts[myProduct].filter((product) => {
    return product.color === targetColor;
  });

  preLoader();
  setTimeout(() => {
    try {
      productPagination(
        productsTarget,
        countOfProduct,
        FirestPage,
        kindOfProduct
      );
    } catch {
      productSituation.style.setProperty("--alert-product-situation", "block");
      allOfThing.style.setProperty("--hidden-for-situation", "none");
      displayOn(backElement);
      displayNone(containPageShop);
    }

    returnPriceRange();
    addSizes(myProduct);
  }, 1500);
}

let closeFilters = $.querySelectorAll(".icon-filter-product");
closeFilters.forEach((filter) => {
  filter.setAttribute("icon-filter", "-");
  filter.addEventListener("click", (event) => {
    let container = event.target.parentElement.parentElement;
    
    if (container.classList.contains("animate-close-filter")) {
      container.classList.remove("animate-close-filter");
      container.classList.add("animate-open-filter");
      filter.setAttribute("icon-filter", "-");
      filter.style.setProperty("--bottom-close-filter", "29.7px");
      filter.style.setProperty("--left-close-filter", "5.2px");
      filter.style.setProperty("--size-close-filter", "28px");
    } else {
      container.classList.remove("animate-open-filter");
      container.classList.add("animate-close-filter");

      filter.setAttribute("icon-filter", "+");
      filter.style.setProperty("--bottom-close-filter", "22.7px");
      filter.style.setProperty("--left-close-filter", "3.5px");
      filter.style.setProperty("--size-close-filter", "20px");
    }
  });
});

function thousand(price) {
  return +price * 1000;
}


let containProducts = $.querySelector(".contain-box-products");
let containNumPage = $.querySelector(".box-number-page");

let productMoving;
let productInfo = new URLSearchParams(location.search).get("productInfo");
let mainProduct = new URLSearchParams(location.search).get("mainProduct");

// arrive to particulat paroducts page

if (productInfo !== null) {
  productInfo = productInfo.split(",");

  productMoving = {
    kindOfProduct:
      menuStracture[+productInfo[0]].subsetTitle[+productInfo[1]][
        +productInfo[2]
      ],
    imageOfProduct: menuStracture[+productInfo[0]].imageList[+productInfo[3]],
    nameOfProduct: menuStracture[+productInfo[0]].subsetList[+productInfo[4]],
    nameOfProductFa:
      menuStracture[+productInfo[0]].subsetTitleFa[+productInfo[5]][
        +productInfo[6]
      ],
  };
} else {
  mainProduct = mainProduct.split(",");
  productMoving = {
    kindOfProduct: "all",
    imageOfProduct: menuStracture[mainProduct[0]].imageList[mainProduct[1]],
    nameOfProduct: menuStracture[mainProduct[0]].subsetList[mainProduct[1]],
    nameOfProductFa: menuStracture[mainProduct[0]].subsetListFa[mainProduct[1]],
  };
}

let myProduct = productMoving.nameOfProduct;
let kindOfProduct = productMoving.kindOfProduct;
let productImageName = productMoving.imageOfProduct;
let countOfProduct = 3;

let FirestPage = 1;

let productsTarget = allProducts[myProduct];

let titleOfProduct = $.querySelector(".title-products-shop");
titleOfProduct.innerHTML = productMoving.nameOfProductFa;

let productShowArray;

// pagination

function productPagination(
  productArray,
  countOfProduct,
  FirestPage,
  kindOfProduct
) {
  productShowArray = [];
  if (kindOfProduct != "all") {
    productArray = productArray.filter((product) => {
      return product.kind === kindOfProduct;
    });
  }
  let countOfPage = Math.ceil(productArray.length / countOfProduct);
  containNumPage.innerHTML = "";
  for (let i = 0; i < countOfPage; i++) {
    if (i + 1 == FirestPage) {
      containNumPage.innerHTML += `
        <div class="contain-page-text select-page-color" onclick="clickOnPage(event)">${
          i + 1
        }</div>`;
    } else {
      containNumPage.innerHTML += `
        <div class="contain-page-text" onclick="clickOnPage(event)">${
          i + 1
        }</div>`;
    }

    addProduct(productArray, i * countOfProduct, (i + 1) * countOfProduct);
    
  }

  showProductInPage(productShowArray, FirestPage);
}

function addProduct(productArray, pruductStart, productEnd) {
  productShowArray.push(productArray.slice(pruductStart, productEnd));
}
let productId;
let imgNewData = "../images/new-product.jpg";

function showProductInPage(productInPage, pageNumber) {
  containProducts.innerHTML = "";
  productInPage[pageNumber - 1].forEach(function (product) {
    productId = `${myProduct}-${product.id}`;

    containProducts.innerHTML += `   <div  class="product-box-shop flex-center-column" id="${productId}" onclick="showProductInfo('${productId}','products-list')">
        <div class="contain-image-product"><img src="${
          product?.state
            ? imgNewData
            : `../images/${productImageName}${product.id}.jpg`
        }" alt="" class="image-product-shop"></div>
        <div class="contain-info-product flex-center-column">
            <p class="name-model-product">${product.title} مدل  ${
      product.model
    }</p>
            <strong class="price-product-shop">${
              product.price
            }،000 تومان</strong>
        </div>
    </div>`;
  });
}

function clickOnPage(event) {
  let pageSelect = $.querySelector(".select-page-color");
  pageSelect.classList.remove("select-page-color");
  event.target.classList.add("select-page-color");

  preLoader();
  setTimeout(() => {
    showProductInPage(productShowArray, +event.target.innerHTML);

    returnPriceRange();
  }, 1500);
}

let backElement = $.querySelector(".contain-back-topage");
backElement.addEventListener("click", backToPreviousPage);

function backToPreviousPage() {
  preLoader();

  setTimeout(() => {
    productSituation.style.setProperty("--alert-product-situation", "none");
    allOfThing.style.setProperty("--hidden-for-situation", "block");

    displayNone(backElement);
    displayOn(containPageShop);
    productPagination(
      allProducts[myProduct],
      countOfProduct,
      FirestPage,
      kindOfProduct
    );
    addColors(englishColors, persianColors);
  }, 1500);
}

let productSituation = $.querySelector(".alert-product-situation");

let submitPrice = $.querySelector(".submit-filter-price");

// price filtering

function filterPrice() {
  let minPrice = virgolPriceOff(leftThumb.getAttribute("data-minPrice"));
  let maxPrice = virgolPriceOff(rightThumb.getAttribute("data-maxPrice"));
  productsTarget = allProducts[myProduct].filter((product) => {
    if (
      thousand(product.price) >= +minPrice &&
      thousand(product.price) <= +maxPrice
    ) {
      return product;
    }
  });

  // countOfProduct = 3
  // FirestPage = 1
  

  preLoader();
  setTimeout(() => {
    try {
      productPagination(
        productsTarget,
        countOfProduct,
        FirestPage,
        kindOfProduct
      );
    } catch {
      productSituation.style.setProperty("--alert-product-situation", "block");
      allOfThing.style.setProperty("--hidden-for-situation", "none");
      displayOn(backElement);
      displayNone(containPageShop);
    }
    addColors(englishColors, persianColors);
    returnPriceRange();
  }, 1500);

  
}

submitPrice.addEventListener("click", filterPrice);

function returnPriceRange() {
  leftThumb.setAttribute("data-minPrice", "10,000");
  rightThumb.setAttribute("data-maxPrice", "1,000,000");
  leftThumb.style.left = 0;
  rightThumb.style.right = 0;
  containPriceRange.style.setProperty("--width-price-left", "0");
  containPriceRange.style.setProperty("--width-price-right", "0");
}

let containBoxSizes = $.querySelector(".filter-products-size");
let boxSizes = $.querySelector(".contain-range-size");

addSizes(myProduct);

function addSizes(productTarget) {
  let sizesArray = allProducts[productTarget][0].allSizes;
  
  if (!sizesArray) {
    displayNone(containBoxSizes);
  } else {
    displayOn(containBoxSizes);
    boxSizes.innerHTML = "";

    sizesArray.forEach((size) => {
      boxSizes.insertAdjacentHTML(
        "beforeend",

        `<div class="box-filter-size flex-center">
            <label class="text-filter-siza" for="filter-size-${size}">${size}</label>
            <input type="radio" name="size" id="filter-size-${size}"  onclick="filterSize(event)">
        </div>`
      );
    });
  }
}

// size filtering

function filterSize(event) {
  let targetSize = event.target.id.split("-").slice(-1)[0];

  productsTarget = allProducts[myProduct].filter((product) => {
    return product.sizes.join(",").includes(targetSize);
  });
  preLoader();

  setTimeout(() => {
    try {
      productPagination(
        productsTarget,
        countOfProduct,
        FirestPage,
        kindOfProduct
      );
    } catch {
      productSituation.style.setProperty("--alert-product-situation", "block");
      allOfThing.style.setProperty("--hidden-for-situation", "none");
      displayOn(backElement);
    }
    addColors(englishColors, persianColors);
  }, 1500);
}
let containPageShop = $.querySelector(".menu-page-shop");

// page leader

function leaderPageShop() {
  containPageShop.insertAdjacentHTML(
    "afterbegin",
    `<li class="list-page-shop flex-center">
    <a href="#" class="link-page-shop" id="home" onclick="backToHome(event)">فروشگاه اینترنتی دایان شاپ</a> <i class="icon-page-shop fa" >&#xf107;</i>
</li>`
  );
  
  let findMain = menuStracture.find((list) => {
    if (!list[0]) {
      let existMain = list.subsetList.some((main) => {
        return productMoving.nameOfProduct === main;
      });
      if (existMain) {
        return list;
      }
    }
  });
  
  
  if (findMain.subsetListFa.join(",").includes(titleOfProduct.innerHTML)) {
    containPageShop.insertAdjacentHTML(
      "beforeend",
      `<li class="list-page-shop flex-center">
        <a href="#" class="link-page-shop" onclick="mainOfProduct(event)">${titleOfProduct.innerHTML}</a> 
    </li>`
    );
  } else {
    let indexTitle = findMain.subsetList.findIndex((list) => {
      return list === productMoving.nameOfProduct;
    });
    
    let findTitle = findMain.subsetListFa[indexTitle];
    containPageShop.insertAdjacentHTML(
      "beforeend",
      `<li class="list-page-shop flex-center">
        <a href="#" class="link-page-shop" onclick="mainOfProduct(event)">${findTitle}</a> <i class="icon-page-shop fa">&#xf107;</i>
    </li>
    <li class="list-page-shop flex-center">
        <a href="#" class="link-page-shop" onclick="preLoader()">${titleOfProduct.innerHTML}</a>
    </li>
    
    `
    );
  }
}
leaderPageShop();

function backToHome(event) {
  
  event.target.href = location.pathname.replace(
    new RegExp("products-list", "g"),
    "main-page"
  );
}

function mainOfProduct(event) {
  preLoader();

  setTimeout(() => {
    titleOfProduct.innerHTML = event.target.innerHTML;
    kindOfProduct = "all";

    productPagination(
      allProducts[myProduct],
      countOfProduct,
      FirestPage,
      kindOfProduct
    );
    try {
      event.target.nextElementSibling.remove();
      event.target.parentElement.nextElementSibling.remove();
    } catch {}
  }, 1500);
}

// go to explain of product page

// showProductInfo
