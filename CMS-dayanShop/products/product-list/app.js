import { Header } from "../../functions/js/header.js";
window.customElements.define("header-section", Header);
let $ = document;
let productsInfo = JSON.parse(localStorage.getItem("products"));
// console.log(productsInfo);

let tBody = $.querySelector("tbody");
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

let category = $.getElementById("category");

let productList = null;
let targetList = null;
let productsubsetEn = null;
let productsubsetFa = null;

function setCategoryOfProduct() {
  category.innerHTML = `<option value="همه">همه</option>`;
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
}

window.addEventListener("load", () => {
  getProducts();
  setCategoryOfProduct();
});
function getProducts() {
  tBody.innerHTML = "";
  productsInfo = JSON.parse(localStorage.getItem("products"));
  console.log(productsInfo);
  console.log(category.value);
  if (category.value === "همه") {
    productsInfo = _.values(productsInfo);

    productsInfo.forEach((kind) => {
      if (isNaN(kind[0])) {
        _.map(kind, (product) => {
          console.log(product);
          tBody.insertAdjacentHTML(
            "afterbegin",
            `<tr>
        <td>
        <input
          type="checkbox"
          name="select-item-table discount"
          id=""
          ${product.state ? "checked" : ""}
        />
      </td>
        <td>${product.model}</td>
        <td>
          <img src="../../takhfifat/img/admin-photo.jpg" alt="" />
        </td>
        <td>${product.title.split("مدل")[0]}</td>
        <td>${product.kindFa}</td>
        <td>${Number(product.price).toLocaleString("en-US")}</td>
        <td>
          <div class="btn-item-table flex-row">
              <a href="" class="flex-row edit-item-table">
                <i class="fa fa-pencil"></i> ویرایش
              </a>

              <a href="#" class="flex-row remove-item-table" onclick="removeDiscount('${
                product.model
              }')">
                <i class="fa fa-trash-o"></i> حذف</a
              >
          </div>
        </td>
      </tr>
        `
          );
        });
      }
    });
  } else {
    _.map(productsInfo[category.value], (product) => {
      // console.log(product);
      tBody.insertAdjacentHTML(
        "afterbegin",
        `<tr>
        <td>
        <input
          type="checkbox"
          name="select-item-table discount"
          id=""
          ${product.state ? "checked" : ""}
        />
      </td>
        <td>${product.model}</td>
        <td>
          <img src="../../takhfifat/img/admin-photo.jpg" alt="" />
        </td>
        <td>${product.title.split("مدل")[0]}</td>
        <td>${product.kindFa}</td>
        <td>${Number(product.price).toLocaleString("en-US")}</td>
        <td>
          <div class="btn-item-table flex-row">
              <a href="" class="flex-row edit-item-table">
                <i class="fa fa-pencil"></i> ویرایش
              </a>

              <a href="" class="flex-row remove-item-table">
                <i class="fa fa-trash-o"></i> حذف</a
              >
          </div>
        </td>
      </tr>
        `
      );
    });
  }
  if (tBody.innerHTML === "") {
    alert("محصولی موجود نمیباشد.");
  }
}
category.addEventListener("change", getProducts);

window.removeDiscount = removeDiscount;
function removeDiscount(productModel) {
  // _.pull(productsInfo["model"]);
  productsInfo = productsInfo.map((kind) => {
    console.log(kind);

    kind = kind.filter((product) => {
      return product.model != productModel;
    });
    console.log(kind);

    return kind;
  });
  localStorage.setItem("products", JSON.stringify(productsInfo));
  getProducts();
}
