import {
  $,
  allProducts,
  displayOn,
  displayNone,
  preLoader,
  menu,
  search,
  virgolPriceOff,
  virgolPriceOn,
  userLoginHandler,
  goToUserBasket,
  newProductsHandler,
} from "../functions/functions.js";

window.countPlus = countPlus;
window.countMinus = countMinus;
window.removeProduct = removeProduct;

let productSituation = $.querySelector(".alert-product-situation");

menu("user-basket");

// search of product
search("user-basket");

// back To PreviousPage

let backElement = $.querySelector(".contain-back-topage");

let productTargetInfo;
let productTarget;
let allOfInfoProducts;
let alertError = $.querySelector(".alert-error-product");
let basketOfProducts = $.querySelector(".section-products-info");

let containInfoProducts = $.querySelector(".container-all-products");

let allPrice = 0;
let priceContainer = $.querySelector(".number-price");

let imgNewData = "../images/new-product.jpg";

window.addEventListener("load", () => {
  preLoader();
  userLoginHandler();
  goToUserBasket();
  try {
    allOfInfoProducts = JSON.parse(localStorage.getItem("infoProducts"));
    if (allOfInfoProducts === null) {
      allOfInfoProducts = [];
    }
  } catch { }
  console.log(allOfInfoProducts);
  try {
    if (allOfInfoProducts) {
      productTarget = new URLSearchParams(location.search).get("id").split(",");
      console.log(productTarget);
      productTargetInfo = allProducts[productTarget[0]];
      console.log(productTarget);

      if (
        !allOfInfoProducts.some((product) => {
          return product.model == productTargetInfo[productTarget[1] - 1].model;
        })
      ) {
        if (productTarget[2]) {
          productTargetInfo[productTarget[1] - 1].size = productTarget[2];
        } else {
          productTargetInfo[productTarget[1] - 1].size = "نامشخص";
        }
        allOfInfoProducts.push(productTargetInfo[productTarget[1] - 1]);
      }
      localStorage.setItem("infoProducts", JSON.stringify(allOfInfoProducts));
      allOfInfoProducts.forEach((product) => {
        if (!product.count) {
          product.count = 1;
        }

        containInfoProducts.insertAdjacentHTML(
          "beforeend",
          `
        <div class="contain-product-particulars" id="${product.model}-${product.id
          }-container">
        <div class="contain-image-product flex-center">
            <img src="${product?.state ? imgNewData : product.image
          }" alt="" class="image-product-particular" />
        </div>
        <div class="contain-model-product">
            <h6 class="model-product-particular">
                ${product.title} مدل ${product.model}
            </h6>
            <span class="size-product-particular">سایز ${product.title
            .split(" ")
            .slice(0, 2)
            .join(" ")}: ${product.size}</span>
        </div>
        <div class="contain-input-count">
            <i class="increase-input-count fa" onclick="countPlus(event)">&#xf107;</i>
            <span class="increase-input-count fa" onclick="countPlus(event)">+</span>
            <input type="number" name="" id="${product.model}-${product.id
          }-input" class="input-count-product" value="${product.count
          }" min="1" readonly />
            <i class="decrease-input-count fa" onclick="countMinus(event)">&#xf107;</i>
            <span class="decrease-input-count fa" onclick="countMinus(event)">_</span>
        </div>

    <div class="contain-discount-product">
        <span class="discount-product-particular">0</span>
    </div>
    <div class="contain-price-product">
        <span class="price-product-particular">${virgolPriceOn(
            product.price
          )} تومان</span>
    </div>
    <div class="contain-remove-product" >
        <i class="icon-remove-product fas" onclick="removeProduct(event)"> &#xf2ed;</i>
        <i class="icon-close-product fas" onclick="removeProduct(event)"> x</i>
    </div>
    </div>
    `
        );
      });
    } else {
      allOfInfoProducts = [];
      productTargetInfo[productTarget[1] - 1].count = 1;
      productTargetInfo[productTarget[1] - 1].size = productTarget[2];
      allOfInfoProducts.push(productTargetInfo[productTarget[1] - 1]);
      localStorage.setItem("infoProducts", JSON.stringify(allOfInfoProducts));

      let size;
      if (productTarget[2]) {
        size = productTarget[2];
      } else {
        size = "نامشخص";
      }
      containInfoProducts.insertAdjacentHTML(
        "beforeend",
        `
        <div class="contain-product-particulars" id="${productTargetInfo[productTarget[1] - 1].model
        }-${productTargetInfo[productTarget[1] - 1].id}-container">
        <div class="contain-image-product flex-center">
            <img src="${product?.state
          ? imgNewData
          : productTargetInfo[productTarget[1] - 1].image
        }" alt="" class="image-product-particular" />
        </div>
        <div class="contain-model-product">
            <h6 class="model-product-particular">
                ${productTargetInfo[productTarget[1] - 1].title} مدل ${productTargetInfo[productTarget[1] - 1].model
        }
            </h6>
            <span class="size-product-particular">سایز ${productTargetInfo[
          productTarget[1] - 1
        ].title
          .split(" ")
          .slice(0, 2)
          .join(" ")}: ${productTarget[2]}</span>
        </div>
        <div class="contain-input-count">
            <i class="increase-input-count fa" onclick="countPlus(event)">&#xf107;</i>
            <span class="increase-input-count fa" onclick="countPlus(event)">+</span>
            <input type="number" name="" id="${productTargetInfo[productTarget[1] - 1].model
        }-${productTargetInfo[productTarget[1] - 1].id
        }-input" class="input-count-product" value="1" min="1" readonly />
            <i class="decrease-input-count fa" onclick="countMinus(event)">&#xf107;</i>
            <span class="decrease-input-count fa" onclick="countMinus(event)">_</span>
        </div>

    <div class="contain-discount-product">
        <span class="discount-product-particular">0</span>
    </div>
    <div class="contain-price-product">
        <span class="price-product-particular">${virgolPriceOn(
          productTargetInfo[productTarget[1] - 1].price
        )} تومان</span>
    </div>
    <div class="contain-remove-product" >
        <i class="icon-remove-product fas" onclick="removeProduct(event)"> &#xf2ed;</i>
        <i class="icon-close-product fas" onclick="removeProduct(event)"> x</i>
    </div>
    </div>
    `
      );
    }
    allOfInfoProducts.forEach((product) => {
      allPrice += +product.price * +product.count;
    });
    priceContainer.innerHTML = `${virgolPriceOn(allPrice)} تومان`;
  } catch {
    if (allOfInfoProducts.length === 0) {
      setTimeout(() => {
        productSituation.style.setProperty(
          "--alert-product-situation",
          "block"
        );
        basketOfProducts.style.setProperty("--hidden-for-situation", "none");
        alertError.innerHTML = "کالایی در سبد خرید شما وجود ندارد ...";
        displayOn(backElement);
        backElement.addEventListener("click", () => {
          location.href = "../main-page/main-page.html";
        });
      }, 1500);
    } else {
      allOfInfoProducts.forEach((product) => {
        if (!product.count) {
          product.count = 1;
        }
        containInfoProducts.insertAdjacentHTML(
          "beforeend",
          `
        <div class="contain-product-particulars" id="${product.model}-${product.id
          }-container">
        <div class="contain-image-product flex-center">
            <img src="${product?.state ? imgNewData : product.image
          }" alt="" class="image-product-particular" />
        </div>
        <div class="contain-model-product">
            <h6 class="model-product-particular">
                ${product.title} مدل ${product.model}
            </h6>
            <span class="size-product-particular">سایز ${product.title
            .split(" ")
            .slice(0, 2)
            .join(" ")}: ${product.size}</span>
        </div>
        <div class="contain-input-count">
            <i class="increase-input-count fa" onclick="countPlus(event)">&#xf107;</i>
            <span class="increase-input-count fa" onclick="countPlus(event)">+</span>
            <input type="number" name="" id="${product.model}-${product.id
          }-input" class="input-count-product" value="${product.count
          }" min="1" readonly />
            <i class="decrease-input-count fa" onclick="countMinus(event)">&#xf107;</i>
            <span class="decrease-input-count fa"  onclick="countMinus(event)">_</span>
        </div>

    <div class="contain-discount-product">
        <span class="discount-product-particular">0</span>
    </div>
    <div class="contain-price-product">
        <span class="price-product-particular">${virgolPriceOn(
            product.price
          )} تومان</span>
    </div>
    <div class="contain-remove-product" >
        <i class="icon-remove-product fas" onclick="removeProduct(event)"> &#xf2ed;</i>
        <i class="icon-close-product fas" onclick="removeProduct(event)"> x</i>
    </div>
    </div>
    `
        );
      });
      allOfInfoProducts.forEach((product) => {
        allPrice += +product.price * +product.count;
      });
      priceContainer.innerHTML = `${virgolPriceOn(allPrice)} تومان`;
    }
  }
});

newProductsHandler();
// caculate price of products

function priceHandler(inputTarget, state) {
  let productChoise = allOfInfoProducts.filter((product) => {
    return (
      product.model == inputTarget.id.split("-")[0] &&
      product.id == inputTarget.id.split("-")[1]
    );
  });
  productChoise = productChoise[0];
  // console.log(inputTarget);
  allPrice -= +productChoise.count * +productChoise.price;
  if (state === "plus") {
    inputTarget.stepUp();
  } else {
    inputTarget.stepDown();
  }
  productChoise.count = inputTarget.value;
  allPrice += +productChoise.count * +productChoise.price;

  if (finishPrice.innerHTML.trim() !== "") {
    displayNone(animateDiscount1);
    displayNone(animateDiscount2);
    displayNone(discountReplaceText);
  }
  priceContainer.innerHTML = `${virgolPriceOn(allPrice)} تومان`;

  allOfInfoProducts = allOfInfoProducts.map((product) => {
    if (
      product.model == inputTarget.id.split("-")[0] &&
      product.id == inputTarget.id.split("-")[1]
    ) {
      product.count = productChoise.count;
    }
    return product;
  });
  localStorage.setItem("infoProducts", JSON.stringify(allOfInfoProducts));
}

function countPlus(event) {
  let inputTarget = event.target.nextElementSibling.nextElementSibling;
  console.log(inputTarget);
  if (!inputTarget.classList.contains("input-count-product")) {
    inputTarget = event.target.nextElementSibling;
    console.log(inputTarget);
  }
  priceHandler(inputTarget, "plus");
}

function countMinus(event) {
  let inputTarget = event.target.previousElementSibling;
  if (!inputTarget.classList.contains("input-count-product")) {
    inputTarget = event.target.previousElementSibling.previousElementSibling;
  }
  priceHandler(inputTarget, "minus");
}

// remove product

function removeProduct(event) {
  console.log("hi");
  let boxTarget = event.target.parentElement.parentElement;
  allOfInfoProducts = allOfInfoProducts.filter((product) => {
    return product.model != boxTarget.id.split("-")[0];
  });

  boxTarget.remove();
  localStorage.setItem("infoProducts", JSON.stringify(allOfInfoProducts));
  console.log(allOfInfoProducts);

  if ((location.search = "")) {
    location.href = location.href;
  } else {
    location.href = location.pathname;
  }
}

let modalHandler = $.querySelector(".section-modal-handle");
let getDiscountCode = $.querySelector(".modal-discount-product");
let containChanceCircle = $.querySelector(".modal-circle-chance");
let chanceCircle = $.querySelector(".contain-slice-chane");
let ctxCircle = chanceCircle.getContext("2d");
let showDiscount = $.querySelector(".text-have-discount");
let closeDiscount = $.querySelector(".modal-close-discount");
let submitDiscount = $.querySelector(".modal-btn-discount");
let stateCode = $.querySelector(".ok-reject-code");

let closeChanceCircle = $.querySelector(".dont-turn-chance");

// execute discount on products

showDiscount.addEventListener("click", () => {
  displayOn(modalHandler);
  show(getDiscountCode);
});
let submitForm = $.querySelector(".button-arrive-text");

closeDiscount.addEventListener("click", () => {
  hidden(getDiscountCode);
  setTimeout(() => {
    displayNone(modalHandler);
    userInputCode.value = "";
  }, 300);
});

let chanceTitle = ["پوچ"];
let chanceCode = [""];

let staticTitle = [];
let staticCode = [];

let discountsInfo = JSON.parse(localStorage.getItem("discounts")) || [];

let priceTarget;
discountsInfo.forEach((discount) => {
  priceTarget = +discount.price;
  if (
    discount.kind.split(" ")[2] === "گردونه" &&
    discount.check === "checked"
  ) {
    chanceCode.push(discount.code);
    if (discount.kind.split(" ")[1] === "درصدی") {
      chanceTitle.push(`${priceTarget} درصد`);
    } else {
      chanceTitle.push(`${priceTarget.toLocaleString()} تومان`);
    }
  } else if (
    discount.kind.split(" ")[2] === "سبد" &&
    discount.check === "checked"
  ) {
    staticCode.push(discount.code);
    if (discount.kind.split(" ")[1] === "درصدی") {
      staticTitle.push(`${priceTarget} درصد`);
    } else {
      staticTitle.push(`${priceTarget.toLocaleString()} تومان`);
    }
  }
});
console.log(chanceCode);
console.log(chanceTitle);
let randomChance;
let turnDown = $.querySelector(".turn-down-chance");
let showDiscountCode = $.querySelector(".show-discount-code");
let codeText = $.querySelector(".text-show-code");
let copyCode = $.querySelector(".copy-discount-code");
let closeCodeText = $.querySelector(".btn-finish-copy");
let discountCode = $.querySelector(".text-discount-code");

let secondPoint = null;
let startPoint = null;
let circleOrigin = null;

let countOfCode = chanceTitle.length;
let countOfCodeVar =
  countOfCode == 2 || countOfCode == 3
    ? 0
    : countOfCode == 4 || countOfCode == 5
      ? 1
      : countOfCode == 6 || countOfCode == 7
        ? 2
        : "";
function createChanceCircle() {
  chanceCircle.width = 300;
  chanceCircle.height = 300;
  ctxCircle.font = "16px Tahoma";
  ctxCircle.textAlign = "center";
  ctxCircle.strokeStyle = "blue";
  ctxCircle.translate(150, 150);
  ctxCircle.fillStyle = "#672fff";

  if (countOfCode % 2 === 0) {
    circleOrigin = `90deg`;
  } else {
    circleOrigin = ` ${360 / countOfCode / 2 + 90}deg`;
  }
  chanceCircle.style.setProperty("--circle-origin", circleOrigin);
  chanceTitle.forEach((title) => {
    secondPoint = (1 / countOfCode) * (Math.PI * 2) + startPoint;
    console.log(secondPoint);
    ctxCircle.beginPath();
    ctxCircle.moveTo(0, 0);

    if (title === "پوچ") {
      ctxCircle.fillStyle = "red";
    } else {
      ctxCircle.fillStyle = randomColor();
    }
    ctxCircle.arc(0, 0, 150, startPoint, secondPoint);
    ctxCircle.fill();
    ctxCircle.fillStyle = "#fff";
    // ctxCircle.rotate(-Math.PI);
    ctxCircle.fillText(
      title,
      Math.cos((startPoint + secondPoint) / 2) * 75 * 1.2,
      Math.sin((startPoint + secondPoint) / 2) * 75 * 1.2
    );

    startPoint = secondPoint;
  });
}
createChanceCircle();
function randomColor() {
  return `rgb(${Math.random() * 200},${Math.random() * 200},${Math.random() * 200
    })`;
}

closeCodeText.addEventListener("click", () => {
  hidden(showDiscountCode);
  setTimeout(() => {
    displayNone(modalHandler);
    displayNone(showDiscountCode);
  }, 301);
});
let discountPrice;
turnDown.addEventListener("click", () => {
  while (true) {
    randomChance = Math.ceil(Math.random() * 20);
    if (randomChance >= countOfCode * 3 && randomChance <= countOfCode * 7) {
      break;
    }
  }
  let timeChance = 0.4;
  console.log(randomChance);
  let degChance = 360 / countOfCode / 2 + Number(circleOrigin.split("deg")[0]);
  console.log(degChance);
  timeChance *= randomChance;
  degChance += (randomChance * 360) / countOfCode;
  chanceCircle.classList.add("turn-down-user");
  chanceCircle.style.setProperty("--time-chance", `${timeChance}s`);
  chanceCircle.style.setProperty("--deg-chance", `${degChance}deg`);

  displayNone(turnDown);
  displayNone(closeChanceCircle);
  console.log(window.innerWidth);
  if (window.innerWidth > 894) {
    containChanceCircle.style.setProperty("--top-arrow-circle", "68px");
  } else {
    containChanceCircle.style.setProperty("--top-arrow-circle", "67px");
  }
  console.log(randomChance);
  discountPrice =
    chanceTitle[countOfCode - ((randomChance - countOfCodeVar) % countOfCode)];
  console.log(discountPrice);
  if (discountPrice == undefined) {
    displayNone(copyCode);
    codeText.innerHTML = "متاسفانه این بار شانس نداشتی گلم ... :( ";
  } else {
    codeText.innerHTML = `کد تخفیف ${discountPrice}یتون آمادس. برید حالشو ببرید:)`;
    discountCode.innerHTML =
      chanceCode[countOfCode - ((randomChance - countOfCodeVar) % countOfCode)];
  }
  console.log(discountPrice.split("تومان")[0]);
});
chanceCircle.addEventListener("animationend", (event) => {
  if (event.animationName === "turn-down-user") {
    hidden(containChanceCircle);
    show(showDiscountCode);
    setTimeout(() => {
      displayNone(containChanceCircle);
    }, 500);
    console.log(chanceTitle[randomChance % countOfCode]);
  }
});

submitForm.addEventListener("click", showModal, { once: true });

function showModal() {
  displayOn(modalHandler);
  show(containChanceCircle);
}
closeChanceCircle.addEventListener("click", () => {
  hidden(containChanceCircle);
  setTimeout(() => {
    displayNone(modalHandler);
  }, 400);
});

function hidden(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}

let containDiscountIcon = $.querySelector(".contaian-icon-discount");
let discountIcon = $.querySelector(".icon-discount-code");
containDiscountIcon.addEventListener("click", () => {
  let codePast = discountCode.innerHTML;
  window.navigator.clipboard.writeText(codePast);

  discountIcon.classList.remove("fa-file");
  discountIcon.classList.add("fa-check");
  containDiscountIcon.style.setProperty("--color-discount-icon", "#454b54a3");
});

let userInputCode = $.querySelector(".modal-input-discount");
let stateCodeText = $.querySelector(".text-ok-reject");
let discountReplaceText = $.querySelector(".contain-replace-discount");
let animateDiscount1 = $.querySelector(".animate-discount-price1");
let animateDiscount2 = $.querySelector(".animate-discount-price2");
let contaianButton = $.querySelector(".contain-button-arrive");
function greenState() {
  stateCode.style.background = "#246c25";
  stateCodeText.innerHTML = "کد تخفیف شما با موفقیت اعمال شد";
  setTimeout(() => {
    animateDiscount1.style.setProperty(
      "--animate-discount-1",
      "animate-discount-1 .5s both"
    );
    animateDiscount1.style.setProperty(
      "--shadow-discount",
      "0 0 10px 5px #fff"
    );
    showDiscount.innerHTML = "";
  }, 1000);
}
let staticCodeIndex = null;
submitDiscount.addEventListener("click", () => {
  staticCodeIndex = staticCode.findIndex((code) => code == userInputCode.value);
  if (
    (userInputCode.value === discountCode.innerHTML ||
      staticCodeIndex !== -1) &&
    userInputCode.value.trim() !== ""
  ) {
    greenState();
    discountPrice =
      discountPrice ||
      (staticCodeIndex !== -1 ? staticTitle[staticCodeIndex] : null);
    submitForm.removeEventListener("click", showModal);
  } else {
    stateCode.style.background = "#eb3838";
    stateCodeText.innerHTML = "کد تخفیف وارد شده معتبر نمیباشد!";
  }
  show(stateCode);
  hidden(getDiscountCode);
  setTimeout(() => {
    userInputCode.value = "";
    hidden(stateCode);
  }, 1000);
  setTimeout(() => {
    displayNone(modalHandler);
  }, 1300);
});
animateDiscount1.addEventListener("animationend", (event) => {
  if (event.animationName === "animate-discount-1") {
    animateDiscount1.style.setProperty(
      "--animate-discount-2",
      "animate-discount-2 .5s both"
    );
  } else if (event.animationName === "animate-discount-2") {
    animateDiscount2.style.setProperty(
      "--animate-discount-3",
      "animate-discount-3 .5s both"
    );
  }
});
let finishPrice = $.querySelector(".discount-price");
animateDiscount2.addEventListener("animationend", (event) => {
  if (event.animationName === "animate-discount-3") {
    animateDiscount2.style.setProperty("--arrow-discount", "5px solid #1149af");
    if (discountPrice.split(" ")[1] == "درصد") {
      console.log(discountPrice);
      allPrice -= allPrice * (+discountPrice.split("درصد")[0] / 100);
    } else {
      allPrice -= Number(discountPrice.split("تومان")[0].split(",").join("."));
    }
    setTimeout(() => {
      finishPrice.innerHTML = `${virgolPriceOn(allPrice.toFixed(2))} تومان`;
      contaianButton.style.justifyContent = "space-between";
      discountReplaceText.firstElementChild.innerHTML = `تخفیف ${discountPrice}ی شما با موفقیت اعمال شد`;
      displayOn(discountReplaceText);
      show(discountReplaceText);
    }, 600);

    containInfoProducts.style.setProperty("--disabled-ability", "none");
  }
});
