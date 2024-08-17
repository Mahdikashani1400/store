import { allProducts } from "../../../dayanShop-project1-middLeveal/functions/functions.js";
import { Header } from "../../functions/js/header.js";
import { Toast } from "../../functions/js/modals.js";

window.customElements.define("header-section", Header);
let $ = document;
let productsInfo = JSON.parse(localStorage.getItem("products"));

if (!productsInfo) {

  localStorage.setItem("products", JSON.stringify(allProducts))
  productsInfo = JSON.parse(localStorage.getItem("products"));
}



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
    console.log(productList);
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
  try {
    if (category.value === "همه") {
      productsInfo = _.values(productsInfo);
      productsInfo.forEach((kind) => {
        if (isNaN(kind[0])) {
          _.map(kind, (product) => {
            console.log(product);
            tBody.insertAdjacentHTML(
              "afterbegin",
              `<tr>
      
        <td>${product.model}</td>
        <td>
             <img src="../../../dayanShop-project1-middLeveal/images/${product.image.split("images/")[1]}" alt="" />

        </td>
        <td>${product.title.split("مدل")[0]}</td>
        <td>${product.kind}</td>
        <td><div>
        ${Number(product.price).toLocaleString("en-US")}
        </div></td>
       
      </tr>
        `
            );
          });
        }
      });
    } else {
      _.map(productsInfo[category.value], (product) => {
        tBody.insertAdjacentHTML(
          "afterbegin",
          `<tr>
      
        <td>${product.model}</td>
        <td>
          <img src="../../../dayanShop-project1-middLeveal/images/${product.image.split("images/")[1]}" alt="" />
        </td>
        <td>${product.title.split("مدل")[0]}</td>
        <td>${product.kind}</td>
        <td>${Number(product.price).toLocaleString("en-US")}</td>
    
      </tr>
        `
        );
      });
    }
  } catch (err) {
    Toast.fire({
      icon: "error",
      position: "top",
      text: "محصولی با چنین عنوانی یافت نشد !",
      timer: 2500,
    });
  }
}
category.addEventListener("change", getProducts);

window.removeDiscount = removeDiscount;

async function removeDiscount(productModel) {
  productsInfo = JSON.parse(localStorage.getItem("products"));

  await Swal.fire({
    title: `آیا از حذف محصول مطمئن هستید?`,
    showCancelButton: true,
    confirmButtonText: "تایید",
    cancelButtonText: "لغو",
  }).then((result) => {
    if (result.isConfirmed) {
      for (let kind in productsInfo) {
        if (kind != "models") {
          productsInfo[kind] = productsInfo[kind].filter((product) => {
            Swal.fire({
              title: `محصول ${product.title} با موفقیت حذف شد.`,
              confirmButtonText: "تایید",
              icon: "success",
            });

            return product.model != productModel;
          });
        } else {
          productsInfo[kind] = productsInfo[kind].filter((model) => {
            return model != productModel;
          });
        }
      }
    }
  });
  localStorage.setItem("products", JSON.stringify(productsInfo));
  getProducts();
}
window.checkHandler = checkHandler;
function checkHandler(productModel) {
  productsInfo = JSON.parse(localStorage.getItem("products"));
  for (let kind in productsInfo) {
    if (kind != "models") {
      productsInfo[kind] = productsInfo[kind].map((product) => {
        if (product.model == productModel) {
          product.state = product.state ? false : true;
        }
        return product;
      });
    }
  }
  localStorage.setItem("products", JSON.stringify(productsInfo));
  getProducts();
}
