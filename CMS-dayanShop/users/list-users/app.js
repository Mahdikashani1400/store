import { Header } from "../../functions/js/header.js";
import { newItemInputs, Toast } from "../../functions/js/modals.js";
window.customElements.define("header-section", Header);
const $ = document;

let usersInfo = JSON.parse(localStorage.getItem("users")) || [
  {
    id: 0,
    username: "adminadmin",
    email: "admin.admin@gmail.com",
    password: "Admin123456",
  },
];
let userId = null;

let tbody = $.querySelector("tbody");

window.addEventListener("load", () => {
  getUsers();
});

function getUsers() {
  userId = usersInfo[usersInfo.length - 1]?.id || 0;
  tbody.innerHTML = "";
  usersInfo.forEach((user) => {
    tbody.insertAdjacentHTML(
      "afterbegin",
      `
      <tr id="user-${user.id}">
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.password}</td>
      <td>1</td>
      <td class="td-btn">
        <div class="btn-item-table users flex-row">
            <a href="#" class="edit-item-table users flex-row" onclick="editUser('${user.id}')">
              <i class="fa fa-pencil"></i> ویرایش
            </a>
            <a href="#" class="remove-item-table users flex-row" onclick="removeUser('${user.id}')">
              <i class="fa fa-trash-o"></i> حذف</a
            >
        </div>
      </td>
    </tr>
    `
    );
  });
}

window.editUser = editUser;
let userEdited = null;
async function editUser(id) {
  hasEmail = false;
  hasUser = false;
  userEdited = [...usersInfo].filter((user) => {
    return user.id == id;
  })[0];

  let { value: formValues } = await newItemInputs.fire({
    title: "ویرایش کاربر",
    html:
      `<div class="contain-input-swal"><lable>نام کاربری</lable> <input id="swal-input1" class="swal2-input "value="${userEdited.username}"></div>` +
      `<div class="contain-input-swal"><lable>ایمیل</lable> <input id="swal-input2" type="email" class="swal2-input" value="${userEdited.email}"></div>` +
      `<div class="contain-input-swal"><lable>رمز ورود</lable> <input id="swal-input3" type="password" class="swal2-input" value="${userEdited.password}"></div>`,
    preConfirm: () => {
      username = document.getElementById("swal-input1").value;
      email = document.getElementById("swal-input2").value;
      password = document.getElementById("swal-input3").value;
      if (
        username.trim().length > 3 &&
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password) &&
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
      ) {
        hasUser = usersInfo.some((user) => {
          if (user.id != id) {
            return user.username === username.trim();
          }
        });
        hasEmail = usersInfo.some((user) => {
          if (user.id != id) {
            return user.email === email.trim();
          }
        });
        if (hasUser) {
          Toast.fire({
            icon: "warning",
            text: "نام کاربری تکراری میباشد!",
            timer: 3000,
          });
        } else if (hasEmail) {
          Toast.fire({
            icon: "warning",
            text: "ایمیل تکراری میباشد!",
            timer: 3000,
          });
        }

        return {
          id,
          username: username.trim(),
          email: email.trim(),
          password,
        };
      } else {
        Swal.showValidationMessage(
          `لطفا اطلاعات خواسته شده را به درستی وارد کنید.`
        );
      }
    },
  });
  if (formValues && !hasEmail && !hasUser) {
    console.log(usersInfo);

    usersInfo = [...usersInfo].map((user) => {
      if (user.id == id) {
        user.username = formValues.username;
        user.email = formValues.email;
        user.password = formValues.password;
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(usersInfo));
    Toast.fire({
      icon: "success",
      text: "اطلاعات کاربر مورد نظر با موفقیت ویرایش شد.",
      timer: 2000,
    });
    getUsers();
  }
}

window.removeUser = removeUser;
function removeUser(id) {
  usersInfo = [...usersInfo].filter((user) => {
    return user.id != id;
  });
  localStorage.setItem("users", JSON.stringify(usersInfo));
  Toast.fire({
    icon: "success",
    text: "کاربر مورد نظر با موفقیت حذف شد.",
    timer: 2000,
  });
  getUsers();
}

let newItemBtn = $.querySelector(".new-item-table.users");
let username = null;
let password = null;
let email = null;
let hasUser = false;
let hasEmail = false;
newItemBtn.addEventListener("click", async () => {
  hasEmail = false;
  hasUser = false;
  await Toast.fire({
    icon: "warning",
    title:
      "- نام کاربری باید حداقل شامل 4 حرف باشد.\n\n- رمز عبور باید حداقل شامل 8 کاراکتر باشد که در آن حروف بزرگ،کوجک و اعداد وجود دارند.",
    timer: 3000,
  });

  let { value: formValues } = await newItemInputs.fire({
    title: "افزودن کاربر جدید",
    html:
      '<div class="contain-input-swal"><lable>نام کاربری</lable> <input id="swal-input1" class="swal2-input"></div>' +
      '<div class="contain-input-swal"><lable>ایمیل</lable> <input id="swal-input2" type="email" class="swal2-input"></div>' +
      '<div class="contain-input-swal"><lable>رمز ورود</lable> <input id="swal-input3" type="password" class="swal2-input"></div>',
    preConfirm: () => {
      username = document.getElementById("swal-input1").value;
      email = document.getElementById("swal-input2").value;
      password = document.getElementById("swal-input3").value;
      if (
        username.trim().length > 3 &&
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password) &&
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
      ) {
        hasUser = usersInfo.some((user) => {
          return user.username === username.trim();
        });
        hasEmail = usersInfo.some((user) => {
          return user.email === email.trim();
        });
        if (hasUser) {
          Toast.fire({
            icon: "warning",
            text: "نام کاربری تکراری میباشد!",
            timer: 3000,
          });
        } else if (hasEmail) {
          Toast.fire({
            icon: "warning",
            text: "ایمیل تکراری میباشد!",
            timer: 3000,
          });
        }
        userId++;
        return {
          id: userId,
          username: username.trim(),
          email: email.trim(),
          password,
        };
      } else {
        Swal.showValidationMessage(
          `لطفا اطلاعات خواسته شده را به درستی وارد کنید.`
        );
      }
    },
  });
  if (formValues && !hasEmail && !hasUser) {
    usersInfo.push(formValues);
    localStorage.setItem("users", JSON.stringify(usersInfo));
    Toast.fire({
      icon: "success",
      text: "کاربر جدید با موفقیت به لیست اضافه شد.",
      timer: 2000,
    });

    getUsers();
  }
});
