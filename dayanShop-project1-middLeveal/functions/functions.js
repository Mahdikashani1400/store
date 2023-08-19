const $ = document;
let allProducts = {
  shoes: [
    {
      id: 1,
      title: "کفش ورزشی مردانه Fashion",
      model: "31482",
      price: 389,
      color: "black",
      kind: "sport",
      sizes: [41, 42, 43, 44],
      image: "../images/shoe1.jpg",
    },
    {
      id: 2,
      title: "کفش ورزشی مردانه Fashion",
      model: "31483",
      price: 389,
      color: "white",
      kind: "sport",
      sizes: [44],
      image: "../images/shoe2.jpg",
    },
    {
      id: 3,
      title: "کفش ورزشی مردانه Nike",
      model: "31495",
      price: 249,
      color: "gray",
      kind: "sport",
      sizes: [41, 42, 43],
      image: "../images/shoe3.jpg",
    },
    {
      id: 4,
      title: "کفش ورزشی مردانه Nike ",
      model: "31496",
      price: 249,
      color: "black",
      kind: "sport",
      sizes: [41, 43, 44],
      image: "../images/shoe4.jpg",
    },
    {
      id: 5,
      title: "نیم بوت مردانه Kiyan",
      model: "31603",
      price: 269,
      color: "brown",
      kind: "walking",
      sizes: [41],
      image: "../images/shoe5.jpg",
    },
    {
      id: 6,
      title: "کفش روزمره مردانه Cat",
      model: "31385",
      price: 269,
      color: "black",
      kind: "walking",
      sizes: [40, 41, 42, 43, 44],
      image: "../images/shoe6.jpg",
    },
    {
      id: 7,
      title: "کفش روزمره مردانه Cat",
      model: "31384",
      price: 269,
      color: "brown",
      kind: "walking",
      sizes: [40, 41, 42, 44],
      image: "../images/shoe7.jpg",
    },
    {
      id: 8,
      title: "کفش روزمره مردانه Sevin",
      model: "31383",
      price: 309,
      color: "brown",
      kind: "walking",
      sizes: [40, 41, 42, 43],
      image: "../images/shoe8.jpg",
    },
    {
      id: 9,
      title: "کفش روزمره مردانه Sevin",
      model: "31382",
      price: 309,
      color: "black",
      kind: "walking",
      sizes: [40, 41, 42, 43, 44],
      image: "../images/shoe9.jpg",
    },
    {
      id: 10,
      title: "کفش روزمره مردانه Sevin",
      model: "31380",
      price: 309,
      color: "brown",
      kind: "walking",
      sizes: [40, 41, 44],
      image: "../images/shoe10.jpg",
    },
    {
      id: 11,
      title: "کفش روزمره مردانه Cat",
      model: "31386",
      price: 269,
      color: "brown",
      kind: "walking",
      sizes: [40, 41, 42, 43, 44],
      image: "../images/shoe11.jpg",
    },
    {
      id: 12,
      title: "کفش ورزشی مردانه Fila",
      model: "31405",
      price: 329,
      color: "black",
      kind: "sport",
      sizes: [41, 42, 43, 44],
      image: "../images/shoe12.jpg",
    },
  ],
  sportThing: [
    {
      id: 1,
      title: "کیف ورزشی Benson",
      model: "30422",
      price: 439,
      color: "yellow",
      kind: "bag",
      image: "../images/sport1.jpg",
    },
    {
      id: 2,
      title: "کیف ورزشی Stark",
      model: "30423",
      price: 439,
      color: "red",
      kind: "bag",
      image: "../images/sport2.jpg",
    },
    {
      id: 3,
      title: "کیف ورزشی Manchester City",
      model: "30424",
      price: 439,
      color: "blue",
      kind: "bag",
      image: "../images/sport3.jpg",
    },
    {
      id: 4,
      title: "ساک ورزشی Esteghlal",
      model: "N8730",
      price: 495,
      color: "blue",
      kind: "bag",
      image: "../images/sport4.jpg",
    },
    {
      id: 5,
      title: "کیف ورزشی Benson",
      model: "30422",
      price: 510,
      color: "yellow",
      kind: "bag",
      image: "../images/sport5.jpg",
    },
    {
      id: 6,
      title: "پیراهن آستین کوتاه استقلال",
      model: "league17",
      price: 570,
      color: "blue",
      kind: "tshirt",
      sizes: ["L", "XL"],
      image: "../images/sport6.jpg",
    },
    {
      id: 7,
      title: "پیراهن آستین کوتاه پرسپولیس",
      model: "league17",
      price: 570,
      color: "red",
      kind: "tshirt",
      sizes: ["L", "XL"],
      image: "../images/sport7.jpg",
    },
  ],

  manClothes: [
    {
      id: 1,
      title: "پیراهن مردانه Dior",
      model: "31034",
      price: 169,
      color: "blue",
      kind: "shirt",
      sizes: ["L", "XL"],
      image: "../images/man-cloth1.jpg",
    },
    {
      id: 2,
      title: "پیراهن مردانه Emery",
      model: "30862",
      price: 159,
      color: "yellow",
      kind: "shirt",
      sizes: ["M", "L", "XL"],
      image: "../images/man-cloth2.jpg",
    },
    {
      id: 3,
      title: "پیراهن مردانه Carlo",
      model: "30864",
      price: 249,
      color: "block",
      kind: "shirt",
      sizes: ["L", "XL", "XXL"],
      image: "../images/man-cloth3.jpg",
    },
    {
      id: 4,
      title: "پیراهن مردانه Versace",
      model: "30830",
      price: 169,
      color: "gray",
      kind: "shirt",
      sizes: ["L", "XL"],
      image: "../images/man-cloth4.jpg",
    },
    {
      id: 5,
      title: "پیراهن مردانه Emery",
      model: "30861",
      price: 159,
      color: "red",
      kind: "shirt",
      sizes: ["M", "L", "XL"],
      image: "../images/man-cloth5.jpg",
    },
    {
      id: 6,
      title: "شلوار اسلش مردانه Benson",
      model: "30566",
      price: 249,
      color: "green",
      kind: "pants",
      sizes: ["L", "XL"],
      image: "../images/man-cloth6.jpg",
    },
    {
      id: 7,
      title: "شلوار اسلش مردانه Nike",
      model: "30532",
      price: 249,
      color: "red",
      kind: "pants",
      sizes: ["L", "XL", "XXL"],
      image: "../images/man-cloth7.jpg",
    },
    {
      id: 8,
      title: "شلوار لی مردانه Damon",
      model: "30516",
      price: 349,
      color: "gray",
      kind: "pants",
      sizes: [31, 32, 33, 34, 35, 36],
      image: "../images/man-cloth8.jpg",
    },
  ],

  womanClothes: [
    {
      id: 1,
      title: "ست تیشرت و شلوار زنانه Pink",
      model: "30252",
      price: 269,
      color: "yellow",
      kind: "set",
      sizes: ["xL"],
      image: "../images/woman-cloth1.jpg",
    },
    {
      id: 2,
      title: "ست سویشرت و شلوار زنانه Fendi ",
      model: "17289",
      price: 325,
      color: "blue",
      kind: "set",
      sizes: ["L", "XL"],
      image: "../images/woman-cloth2.jpg",
    },
    {
      id: 3,
      title: "ست سویشرت و شلوار زنانه Fendi ",
      model: "17284",
      price: 269,
      color: "red",
      kind: "set",
      sizes: ["L", "XL"],
      image: "../images/woman-cloth3.jpg",
    },
    {
      id: 4,
      title: "ست تیشرت و شلوار زنانه Pink",
      model: "30252",
      price: 269,
      color: "black",
      kind: "set",
      sizes: ["L", "XL"],
      image: "../images/woman-cloth4.jpg",
    },
    {
      id: 5,
      title: "روسری زنانه Rayan",
      model: "28220",
      price: 129,
      color: "white",
      kind: "scarf",
      image: "../images/woman-cloth5.jpg",
    },
    {
      id: 6,
      title: "شال زنانه Pink ",
      model: "28213",
      price: 140,
      color: "blue",
      kind: "scarf",
      image: "../images/woman-cloth6.jpg",
    },
    {
      id: 7,
      title: "روسری بلند Pink ",
      model: "L9825",
      price: 169,
      color: "red",
      kind: "scarf",
      image: "../images/woman-cloth7.jpg",
    },
  ],
  womanBag: [
    {
      id: 1,
      title: "کیف دستی زنانه Zara",
      model: "30657",
      price: 249,
      color: "black",
      kind: "handbag",
      image: "../images/woman-bag1.jpg",
    },
    {
      id: 2,
      title: "کیف دوشی Gucci",
      model: "25242",
      price: 159,
      color: "brown",
      kind: "handbag",
      image: "../images/woman-bag2.jpg",
    },
    {
      id: 3,
      title: "کیف دوشی Clarks",
      model: "21700",
      price: 229,
      color: "brown",
      kind: "handbag",
      image: "../images/woman-bag3.jpg",
    },
    {
      id: 4,
      title: "ست کیف دوشی و کیف پالتویی Supreme",
      model: "23525",
      price: 389,
      color: "brown",
      kind: "leather",
      image: "../images/woman-bag4.jpg",
    },
    {
      id: 5,
      title: "کیف دستی زنانه Zara ",
      model: "23306",
      price: 229,
      color: "blue",
      kind: "leather",
      image: "../images/woman-bag5.jpg",
    },
  ],
  digital: [
    {
      id: 1,
      title: "کابل شارژ مغناطیسی Smart",
      model: "15195",
      price: 178,
      color: "black",
      kind: "headset",
      image: "../images/digital1.jpg",
    },
    {
      id: 2,
      title: "اسپیکر Smart",
      model: "27791",
      price: 319,
      color: "black",
      kind: "microphone",
      image: "../images/digital2.jpg",
    },
    {
      id: 3,
      title: "هندزفری بلوتوثی Xiaomi",
      model: "27809",
      price: 259,
      color: "black",
      kind: "headset",
      image: "../images/digital3.jpg",
    },
    {
      id: 4,
      title: "هندزفری بلوتوثی Q2",
      model: "27781",
      price: 329,
      color: "white",
      kind: "headset",
      image: "../images/digital4.jpg",
    },
    {
      id: 5,
      title: "هندزفری بلوتوثی F_9",
      model: "27108",
      price: 519,
      color: "black",
      kind: "headset",
      image: "../images/digital5.jpg",
    },
    {
      id: 6,
      title: "هندزفری بلوتوثی Beats",
      model: "22674",
      price: 379,
      color: "black",
      kind: "headset",
      image: "../images/digital6.jpg",
    },
  ],
};
let containModal = $.querySelector(".contain-pre-loader");
let shopLoader = $.querySelector(".preloader-change-page");
let fakeBackground = $.querySelector(".fake-background-load ");
let allOfThing = $.getElementById("all");

let menuStracture = [
  ["style", "استایل ها"],
  ["news", "جدید ترین"],
  ["blog", "بلاگ"],

  {
    name: "digital",
    nameFa: "دیجیتال",
    subsetList: ["digital"],
    subsetListFa: ["لوازم جانبی"],
    imageList: ["digital"],

    subsetTitle: [["microphone", "headset"]],
    subsetTitleFa: [["میکروفون و اسپیکر", "شارژر و هنذفری"]],
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
];

let keySearch = {
  mainIndex: [],
  mainTitle: [],
  subsetTitle: [],
  subsetIndex: [],
};

function displayOn(element) {
  element.classList.remove("display-none");
}

function displayNone(element) {
  element.classList.add("display-none");
}

function preLoader() {
  $.documentElement.style.setProperty("--wait-load", "hidden");
  allOfThing.style.filter = "blur(5px)";
  displayOn(containModal);
  displayOn(shopLoader);
  displayOn(fakeBackground);
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    displayNone(containModal);
    displayNone(shopLoader);
    displayNone(fakeBackground);
    allOfThing.style.filter = "";
    $.documentElement.style.setProperty("--wait-load", "scroll");
  }, 1500);
}

const load = () => {
  window.addEventListener("load", () => {
    preLoader();
  });
};

const newProductsHandler = () => {
  let hasProduct = JSON.parse(localStorage.getItem("products"));
  if (hasProduct) {
    Object.entries(hasProduct).forEach((category) => {
      if (category[0] !== "models") {
        category[1].forEach((product) => {
          if (product.state) {
            product["id"] =
              +allProducts[category[0]][allProducts[category[0]].length - 1][
                "id"
              ] + 1;
            allProducts[category[0]].push(product);
          }
        });
      }
    });
  }
};
const menu = (nowPage) => {
  let menuImages = [
    "image-menu-sport.png",
    "image-menu-woman.png",
    "image-menu-digital.png",
  ];
  let menuSubsetName = ["مردانه", "زنانه", "دیجیتال"];
  let listHaveSubset;
  let menuBar = $.querySelector(".menu-bar-header");
  let closeMenuIcon = $.querySelector(".contain-close-menu");
  let containMenu = $.querySelector(".contain-menu-header");
  let containList = $.querySelector(".menu-lists-header");
  let iconBackMenu = $.querySelector(".back-icon-header");
  let showSubsetMenu = $.querySelector(".subset-menu-show");
  let timeClose = 500;

  const makeMenuStracture = (nowPage) => {
    menuStracture.forEach((list) => {
      if (list[0]) {
        containList.insertAdjacentHTML(
          "afterbegin",
          `
            <li class="list-shop-header list-have-subset flex-center" id="${list[0]}">
                            <a href="" class="link-shop-header ">${list[1]}</a>

                            </li>

            `
        );
      } else {
        containList.insertAdjacentHTML(
          "afterbegin",
          `
                <li class="list-shop-header list-have-subset flex-center">
                                <a href="#" class="link-shop-header ">${list.nameFa}</a>
                                <i class="icon-menu-header fa">	&#xf107;</i>
                                <ul class="subset-menu-header" id="${list.name}">

                            </ul>
                                </li>
                `
        );
        keySearch.mainIndex.push(menuStracture.indexOf(list));
        keySearch.mainTitle.push(list.subsetListFa);

        let containSubset = $.getElementById(list.name);
        for (let i = 0; i < list.subsetList.length; i++) {
          containSubset.insertAdjacentHTML(
            "beforeend",
            `
                    <li class="subset-list-header">
                    <h3 class="subset-link-header">${list.subsetListFa[i]}</h3>
                    <ul class="menu-product-header" id="${list.subsetList[i]}">
                    </ul>
                                    </li>
                `
          );
          let subsetProduct = $.getElementById(list.subsetList[i]);
          for (let j = 0; j < list.subsetTitle[i].length; j++) {
            keySearch.subsetTitle.push(list.subsetTitleFa[i][j]);
            let moveInfoProducts = [
              menuStracture.indexOf(list),
              i,
              j,
              i,
              i,
              i,
              j,
            ];
            keySearch.subsetIndex.push(moveInfoProducts);
            subsetProduct.insertAdjacentHTML(
              "beforeend",
              `    <li class="list-product-header">
                        <a href="${window.location.pathname.replace(
                          new RegExp(nowPage, "g"),
                          "products-list"
                        )}?productInfo=${moveInfoProducts}" class="link-product-header">${
                list.subsetTitleFa[i][j]
              }</a>
                    </li>`
            );
          }
        }
      }
    });
    listHaveSubset = $.querySelectorAll(".list-have-subset");
  };

  const sideBarMenu = () => {
    for (let i = 0; i < menuSubsetName.length; i++) {
      listHaveSubset[i].addEventListener("click", function (event) {
        if (
          window.innerWidth <= 975 &&
          (menuSubsetName[i] ==
            event.target.parentElement.firstElementChild.innerHTML
              .split("<")[0]
              .trim() ||
            menuSubsetName[i] ==
              event.target.firstElementChild?.innerHTML.split("<")[0].trim())
        ) {
          iconBackMenu.style.cssText = `visibility: visible;
                            opacity: 1;`;
          iconBackMenu.classList.add("back-icon-animate");
          iconBackMenu.addEventListener("animationend", function () {
            iconBackMenu.classList.remove("back-icon-animate");
          });

          containList.classList.add("hidden-text-js");
          if (
            menuSubsetName[i] ==
            event.target.parentElement.firstElementChild.innerHTML
              .split("<")[0]
              .trim()
          ) {
            event.target.parentElement.lastElementChild.classList.add(
              "subset-menu-show"
            );
          } else {
            event.target.lastElementChild.classList.add("subset-menu-show");
          }
          showSubsetMenu = $.querySelector(".subset-menu-show");

          containMenu.classList.remove("change-background-menu");
          containMenu.classList.add("animate-background-menu");
          containMenu.addEventListener("animationend", function () {
            containMenu.classList.add("change-background-menu");
            containMenu.classList.remove("animate-background-menu");
          });
          containMenu.style.setProperty(
            "--change-background-menu",
            `linear-gradient(45deg, rgb(29 30 31 / 46%), rgba(33, 50, 163, 0.23)), url(../../images/${menuImages[i]})`
          );
        }
      });
    }
  };

  function backToMainMenu() {
    iconBackMenu.style.cssText = `visibility: hidden;
        opacity: 0;`;
    showSubsetMenu.classList.remove("subset-menu-show");
    containMenu.classList.remove("change-background-menu");
    containMenu.classList.add("animate-background-menu");
    containList.classList.remove("hidden-text-js");
    containMenu.style.setProperty(
      "--change-background-menu",
      `linear-gradient(45deg, #1971fc75, #2132a33b, #a25be2e0), url(../../images/image-menu.png)`
    );
  }

  function closeMenu() {
    if (window.innerWidth <= 639) {
      containMenu.style.right = "-200%";
    } else {
      containMenu.style.right = "-100%";
    }
    iconBackMenu.style.cssText = `visibility: hidden;
        opacity: 0;`;
    menuBar.style.cssText = "opacity:1;visibility:visible;margin-right:14px;";
    containMenu.style.transition = "1.5s";
    setTimeout(function () {
      containMenu.classList.remove("change-background-menu");
      if (showSubsetMenu) {
        showSubsetMenu.classList.remove("subset-menu-show");
      }
    }, timeClose);
  }

  function openMenu(event) {
    containList.classList.remove("hidden-text-js");
    containMenu.classList.remove("change-background-menu");
    containMenu.classList.add("animate-background-menu");

    containMenu.style.cssText =
      "opacity:1 !important;visibility:visible !important;right:0;";
    containMenu.style.setProperty(
      "--change-background-menu",
      `linear-gradient(45deg, #1971fc75, #2132a33b, #a25be2e0), url(../../images/image-menu.png)`
    );
  }

  function animationMenu() {
    containMenu.classList.remove("animate-background-menu");
    containMenu.classList.add("change-background-menu");
  }

  makeMenuStracture(nowPage);
  sideBarMenu();

  menuBar.addEventListener("click", openMenu);

  containMenu.addEventListener("animationend", animationMenu);
  iconBackMenu.addEventListener("click", backToMainMenu);
  closeMenuIcon.addEventListener("click", closeMenu);

  window.addEventListener("resize", function () {
    if (window.innerWidth > 975 && showSubsetMenu) {
      closeMenu();
    }
  });
};

const search = (nowPage, display = "block") => {
  let backElement = $.querySelector(".contain-back-topage");

  let userInput = $.getElementById("search-input-header");
  let containProductsSearh = $.querySelector(".contain-icon-search");
  let productsSearh = $.querySelector(".icon-search-header");

  let productSituation = $.querySelector(".alert-product-situation");
  const findKeys = () => {
    for (let j = 0; j < keySearch.mainTitle.length; j++) {
      let findProduct = keySearch.mainTitle[j].findIndex((product) => {
        return product == userInput.value.trim();
      });

      if (findProduct != -1) {
        productsSearh.setAttribute(
          "href",
          `${window.location.pathname.replace(
            new RegExp(nowPage, "g"),
            "products-list"
          )}?mainProduct=${[keySearch.mainIndex[j], findProduct]}`
        );
      }
    }

    for (let i = 0; i < keySearch.subsetTitle.length; i++) {
      if (userInput.value === keySearch.subsetTitle[i]) {
        productsSearh.setAttribute(
          "href",
          `${window.location.pathname.replace(
            new RegExp(nowPage, "g"),
            "products-list"
          )}?productInfo=${keySearch.subsetIndex[i]}`
        );
      }
    }
  };

  const goToPage = () => {
    userInput.value = "";
    if (!productsSearh.getAttribute("href")) {
      preLoader();
      setTimeout(() => {
        productSituation.style.setProperty(
          "--alert-product-situation",
          "block"
        );

        allOfThing.style.setProperty("--hidden-for-situation", "none");
        displayOn(backElement);
      }, 1500);
    } else {
      location.href =
        containProductsSearh.lastElementChild.getAttribute("href");
    }
  };

  const backToPreviousPage = () => {
    preLoader();

    setTimeout(() => {
      productSituation.style.setProperty("--alert-product-situation", "none");
      allOfThing.style.setProperty("--hidden-for-situation", display);
      displayNone(backElement);
    }, 1500);
  };
  backElement.addEventListener("click", backToPreviousPage);
  containProductsSearh.addEventListener("click", goToPage);
  userInput.addEventListener("input", findKeys);
};

// user-baket and login form

const headerSizeHandler = (userInfo, showTextElem) => {
  if (window.innerWidth > 810) {
    showTextElem.innerHTML = `
    ${JSON.parse(userInfo.split("=")[1]).username} عزیز به پنل خود خوش آمدید.
    <span class="arrow"></span>
    <span class="exit">خروج</span>
    `;
  } else {
    showTextElem.innerHTML = `
    ${JSON.parse(userInfo.split("=")[1]).username}
    <span class="arrow"></span>
    <span class="exit">خروج</span>
    `;
  }
};

const userLoginHandler = () => {
  let userInfo = $.cookie;
  let showTextElem = $.querySelector(".enter-text-header");
  console.log(userInfo);
  if (userInfo.split("=")[0] === "user" && JSON.parse(userInfo.split("=")[1])) {
    showTextElem.classList.add("show-user-info");
    showTextElem.classList.remove("enter-text-header");
    headerSizeHandler(userInfo, showTextElem);
    window.addEventListener("resize", () => {
      headerSizeHandler(userInfo, showTextElem);
    });

    $.querySelector(".exit").addEventListener("click", () => {
      $.cookie = `user=${JSON.stringify(null)};path=/`;
      window.history.go(0);
      showTextElem.classList.remove("show-user-info");
      showTextElem.classList.add("enter-text-header");
    });
  } else {
    showTextElem.innerHTML = "ورود / عضویت";
    showTextElem.addEventListener("click", () => {
      window.location.href = "../login-form/login-form.html";
    });
  }
};
const goToUserBasket = () => {
  let basketBtn = $.querySelector(".basket-user-header");
  basketBtn.addEventListener("click", () => {
    window.location.href = "../user-basket/user-basket.html";
  });
};

// go to explain of product page
const showProductInfo = (id, nowPage) => {
  location.href =
    location.pathname.replace(new RegExp(nowPage, "g"), "explain-of-product") +
    "?id=" +
    id;
};

function virgolPriceOn(price, countVir = 3) {
  let priceList = String(price * 1000)
    .split("")
    .reverse();
  let finallyPrice = [];
  let count = null;
  priceList.forEach(function (num) {
    if (count % countVir === 0 && count !== null) {
      finallyPrice.push(num + ",");
    } else {
      finallyPrice.push(num);
    }
    count++;
  });
  return finallyPrice.reverse().join("");
}

function virgolPriceOff(price) {
  return +price.split(",").join("");
}

export {
  $,
  allProducts,
  displayOn,
  displayNone,
  preLoader,
  menu,
  menuStracture,
  search,
  showProductInfo,
  load,
  virgolPriceOff,
  virgolPriceOn,
  userLoginHandler,
  goToUserBasket,
  newProductsHandler,
};
