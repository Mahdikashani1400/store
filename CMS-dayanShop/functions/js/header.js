const myHeader = document.createElement("template");
let activeSelect = null;
let adminMenuFlag = false;
let menuState = "mini-menu";
let adminName = null;

const registerAdmin = () => {
  let adminInfo = document.cookie.split(";").filter((item) => {
    console.log(item.split("=")[0]);
    return item.split("=")[0].trim() === "admin";
  })[0];
  if (JSON.parse(adminInfo.split("=")[1])) {
    adminName = JSON.parse(adminInfo.split("=")[1])["name"];
    console.log(adminName);
  }
};
registerAdmin();
myHeader.innerHTML = `

<link rel="stylesheet" href="../../functions/css/header.css"> 
<link rel="stylesheet" href="../../functions/css/flex.css"> 
<link rel="stylesheet" href="../../functions/css/font.css"> 
<link rel="stylesheet" href="../../functions/css/reset.css"> 

<link
rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>
<header class="header-page flex-column">
<nav class="flex-row">
  <div class="container-menu">
    <div class="icon-menu"><i class="fa fa-bars"></i></div>
    <ul class="menu flex-column open-mini-menu">
      <li class="item-text"><h1>پنل ادمین</h1></li>

      <li class="open-menu-item">
        <div class="contain-welcome">
          <div class="welcome-img">
            <img src="../../takhfifat/img/admin-photo.jpg" alt="" />
          </div>
          <div class="welcome-text">
            <span>خوش آمدید.</span>
            <h2>${adminName}</h2>
          </div>
        </div>
      </li>
      <li class="item active">
        <a href="#"><i class="fa fa-home"></i><span>خانه</span></a>
      </li>
      <li class="item">
        <a href="#"
          ><i class="fa fa-chevron-down"></i><i><img src="../../takhfifat/img/Product-icon.png" alt="" /></i
          ><span>محصولات</span></a
        >
        <ul>
        <a href="../../products/product-list/index.html"><i class="fa fa-circle"></i><span>لیست محصولات</span></a>
        <a href="../../products/create-product/index.html"><i class="fa fa-circle"></i><span>محصول جدید</span></a>
        </ul>
      </li>
      <li class="item">
        <a href="#"><i class="fa fa-bars"></i><span>منو ها</span></a>
      </li>
      <li class="item">
        <a href="#"><i class="fa fa-comment"></i><span>دیدگاه ها</span></a>
      </li>
      <li class="item">
        <a href="#"><i class="fa fa-chevron-down"></i><i class="fa fa-percent"></i><span>تخفیفات</span></a>
        <ul>
        <a href="../../takhfifat/discount-list/index.html"><i class="fa fa-circle"></i><span>لیست تخفیفات</span></a>
        <a href="../../takhfifat/create-discount/index.html"><i class="fa fa-circle"></i><span>تخفیف جدید</span></a>
        </ul>
      </li>
      <li class="item">
        <a href="#"><i class="fa fa-chevron-down"></i><i class="fa fa-users"></i><span>کاربران</span></a>
        <ul>
        <a href="../../users/list-users/index.html"><i class="fa fa-circle"></i><span>لیست کاربران</span></a>
    
        </ul>
      </li>
    </ul>
  </div>
  <div class="more-items flex-row">
    <div class="container-img">
      <img src="../../takhfifat/img/admin-photo.jpg" alt="" />
    </div>
    <span>${adminName}</span>
    <ul class="flex-column" id="adminItems">
      <li><a href="#">پروفایل</a></li>
      <li><a href="#">تنظیمات</a></li>
      <li><a href="#">راهنما</a></li>
      <li><a href="../../../dayanShop-project1-middLeveal/login-form/login-form.html">خروج</a></li>
    </ul>
  </div>
</nav>
<section class="flex-row explain-page">
  <div class="title-page">
    <h3>
      
      <small> </small>
    </h3>
  </div>
  <div class="search-page">
    <input
      type="searchPage"
      name=""
      id="search"
      placeholder="جستجو برای ..."
    /><i class="fa fa-search"></i>
  </div>
</section>
</header>`;
class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(myHeader.content.cloneNode(true));
  }
  connectedCallback() {
    const $ = this.shadowRoot;
    let menuIcon = $.querySelector(".icon-menu");
    let menu = $.querySelector(".menu");
    let title = $.querySelector("small");
    let headerSection = $.querySelector(".header-page");
    title.innerHTML = this.getAttribute("title");
    headerSection.insertAdjacentHTML(
      "beforebegin",
      `
    <link rel="stylesheet" href="../../${
      this.getAttribute("css-link").split("/")[0]
    }/${this.getAttribute("css-link").split("/")[1]}/style.css">

    `
    );

    menuIcon.addEventListener("click", this.menuHandler.bind(this, menu));

    window.addEventListener("resize", () => {
      if (window.innerWidth < 750) {
        if (menuState === "menu") {
          this.removeAddClass(menu, "open-menu", "open-mini-menu");
          menuState = "mini-menu";
        }
      } else {
        if (menuState === "close") {
          this.removeAddClass(menu, "close-menu", "open-mini-menu");
          menuState = "mini-menu";
        }
      }
      document.body.style.setProperty(
        "--space-body",
        String(menu.getBoundingClientRect().width) + "px"
      );
    });

    let adminMenu = $.querySelector(".more-items");

    adminMenu.addEventListener("click", this.adminMenuHandler);
    let menuItems = $.querySelectorAll(".item");

    menuItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (
          e.target.href === location.href ||
          e.target.parentElement.href === location.href ||
          e.target.parentElement.parentElement.href === location.href
        ) {
          e.preventDefault();
        }
        activeSelect = $.querySelector(".active.item");
        activeSelect?.classList.remove("active");
        if (item != activeSelect) {
          item.classList.add("active");
        }
      });
    });
  }
  menuHandler(menu) {
    if (window.innerWidth >= 750) {
      if (menuState === "mini-menu") {
        this.removeAddClass(menu, "open-mini-menu", "open-menu");

        menuState = "menu";
      } else {
        this.removeAddClass(menu, "open-menu", "open-mini-menu");
        menuState = "mini-menu";
      }
    } else {
      if (menuState === "mini-menu") {
        this.removeAddClass(menu, "open-mini-menu", "close-menu");
        menuState = "close";
      } else {
        this.removeAddClass(menu, "close-menu", "open-mini-menu");
        menuState = "mini-menu";
      }
    }
    document.body.style.setProperty(
      "--space-body",
      String(menu.getBoundingClientRect().width) + "px"
    );
  }
  adminMenuHandler() {
    if (!adminMenuFlag) {
      this.classList.add("more-items-active");
      adminMenuFlag = true;
    } else {
      this.classList.remove("more-items-active");
      adminMenuFlag = false;
    }
  }

  removeAddClass(elem, rem, add) {
    elem.classList.remove(rem);
    elem.classList.add(add);
  }

  disconnectedCallback() {}
  static observedAttributes() {
    return ["title", "css-link"];
  }
}

export { Header };
