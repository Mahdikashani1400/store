import { Header } from "../../functions/js/header.js";
import { Toast } from "../../functions/js/modals.js";

window.customElements.define("header-section", Header);
const $ = document;

let category = $.getElementById("category");
let kind = $.getElementById("kind");
let menuStracture = [
  {
    name: "man",
    nameFa: "مردانه",
    subsetList: ["sportThing", "manClothes", "shoes"],
    subsetListFa: ["ورزشی", "لباس مردانه", "کفش"],
    imageList: ["sport", "man-cloth", "shoe"],
    subsetTitle: [
      ["bag", "tshirt"],
      ["shirt", "pants"],
      ["sport", "walking"],
    ],
    subsetTitleFa: [
      ["کوله و ساک", "لوازم هواداری"],
      ["پیراهن", "شلوار"],
      ["کفش ورزشی و اسپرت", "کفش  روزمره"],
    ],
  },
  {
    name: "woman",
    nameFa: "زنانه",
    subsetList: ["womanClothes", "womanBag"],
    subsetListFa: ["لباس زنانه", "کیف"],
    imageList: ["woman-cloth", "woman-bag"],

    subsetTitle: [
      ["set", "scarf"],
      ["handbag", "leather"],
    ],
    subsetTitleFa: [
      ["ست زنانه", "شال و روسری"],
      ["کیف دوشی", "ست چرمی"],
    ],
  },

  {
    name: "digital",
    nameFa: "دیجیتال",
    subsetList: ["digital"],
    subsetListFa: ["لوازم جانبی"],
    imageList: ["digital"],

    subsetTitle: [["microphone", "headset"]],
    subsetTitleFa: [["میکروفون و اسپیکر", "شارژر و هنذفری"]],
  },
];
let productList = null;
let productsubsetEn = null;
let productsubsetFa = null;
let kindEn = null;
let kindFa = null;
let targetList = null;
let productEditedModel = new URLSearchParams(location.search).get("id");
let productEdited = null;
window.addEventListener("load", () => {
  setCategoryOfProduct();
  setKindOfProduct();
  if (productEditedModel) {
    for (let kind in productsInfo) {
      if (kind != "models") {
        productsInfo[kind] = productsInfo[kind].filter((product) => {
          if (product.model === productEditedModel) {
            productEdited = product;
          }
          return product.model != productEditedModel;
        });
      } else {
        productsInfo[kind] = _.pull(productsInfo[kind], productEditedModel);
      }
    }
    priceValue = productEdited.price;
    colorValue = productEdited.color;

    sizesArray = productEdited.sizes;
    title.value = productEdited.title;

    propertyHandler();
  } else {
    priceValue = 10000;
    colorValue = englishColors[0];
    sellerValue = "";
    sizesArray = [];
  }
});

function setCategoryOfProduct() {
  category.innerHTML = "";
  for (let i = 0; i < menuStracture.length; i++) {
    productList = menuStracture[i];
    category.insertAdjacentHTML(
      "beforeend",
      `
      <optgroup label="${menuStracture[i].nameFa}" id="${menuStracture[i].name}">
     </optgroup>
     `
    );
    targetList = $.getElementById(menuStracture[i].name);

    for (let j = 0; j < productList.subsetList.length; j++) {
      productsubsetEn = productList.subsetList[j];
      productsubsetFa = productList.subsetListFa[j];
      targetList.insertAdjacentHTML(
        "beforeend",
        `
        <option value="${productsubsetEn}" id="${i}-${j}">${productsubsetFa}</option>
  
      `
      );
    }
  }
  category.value = menuStracture[0].subsetList[0];
}

let selectedOption = null;
let selectedOptionId = null;

kind.innerHTML = "";

window.setKindOfProduct = setKindOfProduct;
function setKindOfProduct() {
  kind.innerHTML = "";

  selectedOption = category.options[category.options.selectedIndex];
  selectedOptionId = selectedOption.id.split("-");

  for (
    let i = 0;
    i <
    menuStracture[selectedOptionId[0]].subsetTitle[selectedOptionId[1]].length;
    i++
  ) {
    kindEn =
      menuStracture[selectedOptionId[0]].subsetTitle[selectedOptionId[1]][i];
    kindFa =
      menuStracture[selectedOptionId[0]].subsetTitleFa[selectedOptionId[1]][i];
    kind.insertAdjacentHTML(
      "beforeend",
      `
    <option value="${kindEn}-${kindFa}">${kindFa}</option>
    
    `
    );
  }
}

let title = $.getElementById("titleInput");
title.value = "";
let image = $.getElementById("mainImage");
let imgInput = $.getElementById("imgInput");
let btnSave = $.querySelector(".btn-save");
let btnRelease = $.querySelector(".btn-release");
let productPropertyMenu = $.querySelector(".menu-info ul");
let productProperty = $.querySelector(".text-info");
let activeProperty = null;
let productsInfo = JSON.parse(localStorage.getItem("products")) || {};
imgInput.addEventListener("input", () => {
  image.src = URL.createObjectURL(imgInput.files[0]);
});
btnSave.addEventListener("click", addProductHandler);
btnRelease.addEventListener("click", addProductHandler);
function addProductHandler(e) {
  if (
    _.trim(title.value).length >= 3 &&
    image.src &&
    _.trim(brandValue).length >= 3 &&
    _.trim(sellerValue).length >= 3 &&
    sizesArray
  ) {
    productsInfo["models"] = productsInfo["models"] || [];
    if (
      !productsInfo["models"].some(
        (item) => item == _.trim(title.value.split("مدل")[1])
      )
    ) {
      productsInfo["models"].push(_.trim(title.value.split("مدل")[1]));

      productsInfo[category.value] = productsInfo[category.value] || [];
      productsInfo[category.value].push({
        id: 0,
        state: e.target === btnSave ? false : true,
        title: _.trim(title.value.split("مدل")[0]),
        model: _.trim(title.value.split("مدل")[1]),
        price: priceValue.toLocaleString("en-US").split(",")[0].slice(0, -3),
        color: colorValue,

        kind: kind.value.split("-")[0],
        kindFa: kind.value.split("-")[1],

        sizes: sizesArray,
        image: "new-product",
      });
      localStorage.setItem("products", JSON.stringify(productsInfo));
      window.location.href = window.location.href.replace(
        "create-product",
        "product-list"
      );
    } else {
      Toast.fire({
        icon: "warning",

        text: "یک عدد محصول با چنین مدلی ثبت شده است.",
        timer: 2500,
      });
    }
  }
}

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
let sizeInput = null;
let containSizes = null;

let selectColorContainer = null;
let colorValue;
window.changeColor = changeColor;
function changeColor(e) {
  colorValue = e.target.value;
}
let priceValue;

window.changePrice = changePrice;
function changePrice(e) {
  priceValue = e.target.value;
}
let sellerValue;

window.changeSeller = changeSeller;
function changeSeller(e) {
  sellerValue = e.target.value;
}
let brandValue = "";

window.changeBrand = changeBrand;
function changeBrand(e) {
  brandValue = e.target.value;
}

productPropertyMenu.addEventListener("click", propertyHandler);
function propertyHandler(e) {
  if (e) {
    e.preventDefault();
    activeProperty = $.querySelector("a.active");
    activeProperty.classList.remove("active");
    e.target.classList.add("active");
  }
  if (e?.target.textContent === "قیمت" || !e) {
    productProperty.innerHTML = `
    <div class="contain-input-info flex-row">
    <label for="">قیمت اصلی (تومان)</label>
    <input
      type="number"
      name=""
      id="priceInput"
      class="input-handler"
      oninput="changePrice(event)"
      step="10000"
      min="10000"
      max="999999"
      value="${priceValue}"
    />
  </div>
  <div class="contain-input-info flex-row">
    <label for="">قیمت فروش فوق‌العاده (تومان)</label>
    <input
      type="text"
      name=""
      id=""
      class="input-handler"
      style="background-color: #5b5b5b21"
      disabled
    />
  </div>
    `;
  } else if (e.target.textContent === "ویژگی ها") {
    productProperty.innerHTML = `
    <div class="contain-input-info flex-row">
    <label for="">رنگ محصول</label>
    <select class="input-handler" id="colors" onchange="changeColor(event)" value="${
      productEdited?.color && ""
    }"></select>
  </div>
  <div
    class="contain-input-info flex-row"
    style="position: relative"
  >
    <label for="">سایز محصول</label>
    <ul>
      <i
        class="fa fa-plus icon-size"
        onclick="sizeInputHandler()"
      ></i>

      <input
        type="text"
        name=""
        id="sizeInput"
        class="input-handler"
      />
    </ul>
  </div>
    
    `;
    sizeInput = $.getElementById("sizeInput");
    containSizes = $.querySelector(".contain-input-info ul");
    sizeInputHandler();

    selectColorContainer = $.getElementById("colors");
    for (let i = 0; i < englishColors.length; i++) {
      selectColorContainer.insertAdjacentHTML(
        "beforeend",
        `
<option value="${englishColors[i]}">${persianColors[i]}</option>
         
         `
      );
    }
    selectColorContainer.value = colorValue;
  } else {
    productProperty.innerHTML = `
    <div class="contain-input-info flex-row">
    <label for="">فروشنده محصول</label>
    <input
      type="text"
      name=""
      id="sellerInput"
      class="input-handler"
      value="${sellerValue}"
      oninput="changeSeller(event)"
    />
  </div>
  <div class="contain-input-info flex-row">
    <label for="">برند محصول</label>
    <input
      type="text"
      name=""
      id="brandInput"
      class="input-handler"
      value="${brandValue}"
      oninput="changeBrand(event)"
    />
  </div>
    `;
  }
}

let sizesArray;

window.sizeInputHandler = sizeInputHandler;
function sizeInputHandler() {
  if (!_.flow([_.trim, _.isEmpty])(sizeInput.value)) {
    sizeInput.value.split(",").forEach((size) => {
      sizesArray.push(_.trim(size.toUpperCase()));
    });
  }

  containSizes.innerHTML = `     <i class="fa fa-plus icon-size" onclick="sizeInputHandler()"></i>

  <input
    type="text"
    name=""
    id="sizeInput"
    class="input-handler"
  />`;
  sizeInput = $.getElementById("sizeInput");
  sizesArray = _.uniq(sizesArray);
  sizesArray.forEach((size) => {
    containSizes.insertAdjacentHTML(
      "beforeend",
      `
      <li><i class="fa fa-close" onclick="removeSize(event)"></i>${size}</li>
    
    
    `
    );
  });
}

window.removeSize = removeSize;
function removeSize(e) {
  sizesArray = [...sizesArray].filter((size) => {
    return size != e.target.parentElement.textContent;
  });
  sizeInputHandler();
}
