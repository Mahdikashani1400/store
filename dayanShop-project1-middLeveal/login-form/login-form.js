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
} from "../functions/functions.js";
window.showProductInfo = showProductInfo;

// loading
load();

// menu

menu("login-form");

// search
search("login-form");

window.addEventListener("load", () => {
  // userLoginHandler();
  goToUserBasket();
});

let backElement = $.querySelector(".contain-back-topage");
backElement.addEventListener("click", backToPreviousPage);

function backToPreviousPage() {
  preLoader();

  setTimeout(() => {
    productSituation.style.setProperty("--alert-product-situation", "none");
    allOfThing.style.setProperty("--hidden-for-situation", "block");

    displayNone(backElement);

    productPagination(
      allProducts[myProduct],
      countOfProduct,
      FirestPage,
      kindOfProduct
    );
  }, 1500);
}

let productSituation = $.querySelector(".alert-product-situation");

let usersInfo = JSON.parse(localStorage.getItem("users"));

let adminInfo = {
  id: 0,
  username: "adminadmin",
  name: "محمد جووون",
  email: "admin.admin@gmail.com",
  password: "adminadmin",
};
if (!usersInfo) {
  usersInfo = [...adminInfo]
  localStorage.setItem('users', JSON.stringify([...adminInfo]))

}
let userId = null;
let allOfThing = $.getElementById("all");
let username = $.getElementById("username");
let password = $.getElementById("password");
let acceptBtn = $.querySelector(".login-btn");
let isEmail =
  /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
let isUser = /^\w{8,1000}$/;
let isPass = /^\w{8,1000}$/;
let capitalPass = /[A-Z]/;
let numberPass = /\d/;
let userError = $.getElementById("userError");
let passError = $.getElementById("passError");
username.addEventListener("input", () => {
  if (username.value.trim() != "" && state === "signUp") {
    if (!isUser.test(username.value)) {
      username.style.borderColor = "#cf2b2b96";
      userError.innerHTML =
        "نام کاربری شما باید شامل حروف مجاز و حداقل 8 کاراکتر باشد.";
    } else {
      username.style.borderColor = "rgb(58 217 39)";
      userError.innerHTML = "";
    }
  }
});
password.addEventListener("input", () => {
  if (password.value != "" && state === "signUp") {
    if (
      isPass.test(password.value) &&
      capitalPass.test(password.value) &&
      numberPass.test(password.value)
    ) {
      password.style.borderColor = "rgb(58 217 39)";

      passError.innerHTML = "";
    } else {
      password.style.borderColor = "#cf2b2b96";
      passError.innerHTML =
        "رمز عبور شما باید شامل حداقل 8 کاراکتر و 1 حرف بزرگ و 1 عدد باشد.";
    }
  }
});
acceptBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    state === "signUp" &&
    username.style.borderColor == "rgb(58, 217, 39)" &&
    email.style.borderColor == "rgb(58, 217, 39)" &&
    repPassword.style.borderColor == "rgb(58, 217, 39)"
  ) {
    checkUser("signUp");
  } else if (state === "signIn") {
    checkUser("signIn");
  } else {
    showModal(loginError);
  }
});
let loginError = $.querySelector(".login-error");

async function showModal(modal, kind = "", state = "") {
  if (kind === "accept") {
    modal.style.cssText =
      "background-color: rgb(51, 157, 16); box-shadow: 1px 2px 8px #879b81;";
    if (state === "signUp") {
      modal.innerHTML = "ثبت نام شما با موفقیت انجام شد .";
    } else {
      modal.innerHTML = "شما با  موفقیت وارد پنل کاربری خود شدید :)";
      if (findInfo["id"]) {
        $.cookie = `user=${JSON.stringify(findInfo)};path=/`;
        window.location.href = "../main-page/main-page.html";
      } else {
        $.cookie = `admin=${JSON.stringify(findInfo)};path=/`;

        window.location.href =
          "../../CMS-dayanShop/takhfifat/discount-list/index.html";
      }
    }
  } else if (kind === "error") {
    modal.style.cssText = `background-color: #e98b8b;
    box-shadow: 1px 2px 8px #9b8181;`;
    if (state === "signIn") {
      if (username.value.trim() !== "" && password.value !== "") {
        modal.innerHTML = "کاربری با این اطلاعات، ثبت نام نکرده است.";
      } else {
        modal.innerHTML = "لطفا نام کاربری و رمز عبور خود را وارد کنید.";
      }
    } else {
      if (hasUser && hasEmail) {
        modal.innerHTML = "قبلا کاربری با این اطلاعات ثبت نام کرده است!";
      } else if (hasUser) {
        modal.innerHTML = "قبلا کاربری با این نام کاربری ثبت نام کرده است!";
      } else {
        modal.innerHTML = "قبلا کاربری با این ایمیل ثبت نام کرده است!";
      }
    }
  } else {
    modal.innerHTML = "لطفا اطلاعات خواسته شده را به درستی وارد کنید";
    modal.style.cssText = `background-color: #e98b8b;
        box-shadow: 1px 2px 8px #9b8181;`;
  }
  modal.classList.remove("display-none");
  setTimeout(() => {
    modal.classList.add("display-none");
  }, 2000);
}

let state = "signIn";
let signUpIn = $.getElementById("signUpIn");
let divPass = $.getElementById("divPass");
let divName = $.getElementById("divName");
let titleForm = $.querySelector(".title-form");
let repPassword = null;
let repPassError = null;
let email = null;
let emailError = null;

const repPasswordHandler = () => {
  repPassword.addEventListener("input", () => {
    repPassword.style.borderColor = "rgba(207, 43, 43, 0.59)";
    if (
      password.style.borderColor === "rgba(207, 43, 43, 0.59)" ||
      password.value === ""
    ) {
      repPassError.innerHTML = "لطفا رمز عبور را بدون خطا وارد کنید.";
    } else if (repPassword.value !== password.value) {
      repPassError.innerHTML = "لطفا تکرار رمز عبور را در این کادر وارد کنید.";
    } else {
      repPassError.innerHTML = "";
      repPassword.style.borderColor = "rgb(58, 217, 39)";
    }
  });
};
const emailHandler = () => {
  email.addEventListener("input", () => {
    email.style.borderColor = "rgba(207, 43, 43, 0.59)";
    if (!isEmail.test(email.value)) {
      emailError.innerHTML = "لطفا ایمیل خود را به درستی وارد کنید.";
    } else {
      emailError.innerHTML = "";
      email.style.borderColor = "rgb(58, 217, 39)";
    }
  });
};
const clearInput = () => {
  username.value = "";
  username.style.borderColor = "#e6e8ef";
  userError.innerHTML = "";
  try {
    email.value = "";
    email.style.borderColor = "#e6e8ef";
    emailError.innerHTML = "";
  } catch (error) { }
  password.value = "";
  password.style.borderColor = "#e6e8ef";

  passError.innerHTML = "";
  repPassword
    ? (repPassword.value = "") || (repPassword.style.borderColor = "#e6e8ef")
    : "";

  repPassError ? (repPassError.innerHTML = "") : "";
};
const setUserHandler = () => {
  userId = usersInfo[usersInfo.length - 1]?.id || 0;

  userId++;
  usersInfo.push({
    id: userId,
    username: username.value.trim(),
    email: email.value.trim(),
    password: password.value,
  });
  localStorage.setItem("users", JSON.stringify(usersInfo));

  showModal(loginError, "accept", state);
  clearInput();

  signUpInHandler.bind(preLoader)();
};
signUpIn.addEventListener("click", signUpInHandler.bind(preLoader));

function signUpInHandler(e) {
  this();
  clearInput();
  if (state === "signIn") {
    divName.insertAdjacentHTML(
      "afterend",
      `
    <div class="input-form" id="divEmail">
    <span class="error-input" id="emialError"></span>
    <input type="email" name="" id="email" placeholder="ایمیل :" />
</div>
    `
    );
    divPass.insertAdjacentHTML(
      "afterend",
      `
    <div class="input-form" id="divRepPass">
    <span class="error-input" id="repPassError"></span>
    <input type="password" name="" id="repPassword" placeholder="تکرار رمز عبور :" />

</div>
    `
    );
    repPassword = $.getElementById("repPassword");
    repPassError = $.getElementById("repPassError");
    repPasswordHandler();
    email = $.getElementById("email");
    emailError = $.getElementById("emialError");
    emailHandler();
    signUpIn.innerHTML = "ورود به پنل کاربری";
    titleForm.innerHTML = "ثبت نام";
    acceptBtn.innerHTML = "ثبت نام";
    state = "signUp";
  } else {
    let divRepPass = $.getElementById("divRepPass");
    divRepPass.remove();

    let divEmail = $.getElementById("divEmail");
    divEmail.remove();

    signUpIn.innerHTML = "ثبت نام";
    titleForm.innerHTML = "ورود به پنل کاربری";
    acceptBtn.innerHTML = "ورود";
    state = "signIn";
  }
}
let userIn = null;
let findInfo = null;
let hasUser;
let hasEmail;
const checkUser = (state) => {
  usersInfo.push(adminInfo);
  hasUser = usersInfo.some((user) => {
    findInfo = user;
    return user.username === username.value.trim();
  });
  try {
    hasEmail = usersInfo.some((user) => {
      return user.email === email.value.trim();
    });
  } catch (error) { }
  userIn = hasEmail || hasUser;
  usersInfo.pop();
  if (userIn && state === "signIn") {
    password.value === findInfo["password"]
      ? showModal(loginError, "accept", "signIn")
      : showModal(loginError, "error", "signIn");
  } else if (state === "signIn") {
    showModal(loginError, "error", "signIn");
  }
  if (userIn && state === "signUp") {
    showModal(loginError, "error", "signUp");
  } else if (state === "signUp") {
    setUserHandler();
  }
};
