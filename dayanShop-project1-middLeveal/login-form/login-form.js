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
} from "../functions/functions.js";
window.showProductInfo = showProductInfo;

// loading
load();

// menu

menu("login-form");

// search
search("login-form");

let backElement = $.querySelector(".contain-back-topage");
backElement.addEventListener("click", backToPreviousPage);

function backToPreviousPage() {
    // window.location.href = location.href.slice(0, location.href.indexOf('?')).replace('products-list', 'main-page')

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

let allOfThing = $.getElementById("all");
let username = $.getElementById("username");
let password = $.getElementById("password");
let acceptBtn = $.querySelector(".login-btn");
let isUser = /^\w{8,1000}$/;
let isPass = /^\w{8,1000}$/;
let capitalPass = /[A-Z]/;
let numberPass = /\d/;
let userError = $.getElementById("userError");
let passError = $.getElementById("passError");
username.addEventListener("input", () => {
    // console.log(username.value, isUser, isUser.test(username.value));
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
    if (password.value.trim() != "" && state === "signUp") {
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
        repPassword.style.borderColor == "rgb(58, 217, 39)"
    ) {
        checkUser('signUp')
    } else if (state === "signIn") {
        checkUser("signIn");
    } else {
        showModal(loginError);
        // } else if (state !== 'signIn') {
        // clearInput()
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
        }
    } else if (kind === "error") {
        modal.style.cssText = `background-color: #e98b8b;
    box-shadow: 1px 2px 8px #9b8181;`;
        if (state === "signIn") {

            if (username.value.trim() !== "" && password.value.trim() !== "") {
                modal.innerHTML = "کاربری با این اطلاعات، ثبت نام نکرده است.";
            } else {
                modal.innerHTML = "لطفا نام کاربری و رمز عبور خود را وارد کنید.";
            }
        } else {
            modal.innerHTML = "قبلا کاربری با این نام ثبت نام کرده است!"

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
let titleForm = $.querySelector(".title-form");
let repPassword = null;
let repPassError = null;
let userData = $.cookie;
const repPasswordHandler = () => {
    repPassword.addEventListener("input", () => {
        repPassword.style.borderColor = "rgba(207, 43, 43, 0.59)";
        if (password.style.borderColor === "rgba(207, 43, 43, 0.59)") {
            repPassError.innerHTML = "لطفا رمز عبور را بدون خطا وارد کنید.";
        } else if (repPassword.value !== password.value) {
            repPassError.innerHTML = "لطفا تکرار رمز عبور را در این کادر وارد کنید.";
        } else {
            repPassError.innerHTML = "";
            repPassword.style.borderColor = "rgb(58, 217, 39)";
        }
    });
};
const clearInput = () => {
    username.value = "";
    username.style.borderColor = "#e6e8ef";
    userError.innerHTML = "";
    password.value = "";
    password.style.borderColor = "#e6e8ef";

    passError.innerHTML = "";
    repPassword
        ?
        (repPassword.value = "") || (repPassword.style.borderColor = "#e6e8ef") :
        "";

    repPassError ? (repPassError.innerHTML = "") : "";
};
const setUserHandler = () => {
        $.cookie = `data${
    !userData
      ? 1
      : +$.cookie.split(";").slice(-1)[0].split("=")[0].split("data")[1] + 1
  }=${JSON.stringify({
    username: `${username.value}`,
    password: `${password.value}`,
  })};path=/`;
  showModal(loginError, "accept", state);
  clearInput();

  signUpInHandler.bind(preLoader)();
};
signUpIn.addEventListener("click", signUpInHandler.bind(preLoader));

function signUpInHandler(e) {
  this();
  clearInput();
  if (state === "signIn") {
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
    signUpIn.innerHTML = "ورود به پنل کاربری";
    titleForm.innerHTML = "ثبت نام";
    acceptBtn.innerHTML = "ثبت نام";
    state = "signUp";
  } else {
    let divRepPass = $.getElementById("divRepPass");
    divRepPass.remove();
    signUpIn.innerHTML = "ثبت نام";
    titleForm.innerHTML = "ورود به پنل کاربری";
    acceptBtn.innerHTML = "ورود";
    state = "signIn";
  }
}
let userIn = null;
let findInfo = null;

const checkUser = (state) => {
  userData = $.cookie;

  // if(userData){
  userIn =
    userData &&
    userData.split(";").some((data) => {
      findInfo = JSON.parse(data.split("=")[1]);
      return findInfo["username"] === username.value;
    });
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
  // }
};
// const love = (pass) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(pass + 'love')
//         }, 2000)
//     })
// }
// const goToLove = (hh) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('fuck' + hh)
//         }, 2000);
//     })
// }
// async function handler() {
//     let lovely = await love('me and you are')
//     let fuck = await goToLove(lovely)
//     console.log(fuck);
// }
// handler()