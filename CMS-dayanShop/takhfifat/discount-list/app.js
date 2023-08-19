import { Header } from "../../functions/js/header.js";
window.customElements.define("header-section", Header);
const $ = document;
let discountsInfo = JSON.parse(localStorage.getItem("discounts")) || [];

let newItemBtn = $.querySelector(".new-item-table.discount");
newItemBtn.addEventListener("click", () => {
  window.location.href = window.location.href.replace(
    "discount-list",
    "create-discount"
  );
});
window.addEventListener("load", () => {
  getDiscounts();
});

let tbody = $.querySelector("tbody");
window.checkHandler = checkHandler;
function checkHandler(e) {
  discountsInfo = discountsInfo.map((discount) => {
    if (e.target.id.split("-")[1] == discount.id) {
      if (discount.check) {
        discount.check = "";
      } else {
        discount.check = "checked";
      }
    }
    return discount;
  });
  localStorage.setItem("discounts", JSON.stringify(discountsInfo));
  console.log(discountsInfo);
}

window.removeDiscount = removeDiscount;
function removeDiscount(id) {
  discountsInfo = [...discountsInfo].filter((discount) => {
    return discount.id != id;
  });
  localStorage.setItem("discounts", JSON.stringify(discountsInfo));
  getDiscounts();
}
let discountPrice = null;
function getDiscounts() {
  tbody.innerHTML = "";
  discountsInfo.forEach((discount) => {
    discountPrice = discount.price;
    tbody.insertAdjacentHTML(
      "afterbegin",
      `
      <tr>
      <td>
        <input
        id="checkbox-${discount.id}"
          type="checkbox"
          name="select-item-table discount"
          id=""
          onclick="checkHandler(event)"
          ${discount.check}
        />
      </td>
      <td>${discount.code}
      </td>
      <td>
        ${discount.kind}
      </td>
      <td>${discountPrice}</td>
      <td>
        <div class="btn-item-table discount flex-row">
        
            <a href="${window.location.href.replace(
              "discount-list",
              "create-discount"
            )}?id=${discount.id}" class="edit-item-table discount flex-row">
              <i class="fa fa-pencil"></i> ویرایش
            </a>
            <a href="#" class="remove-item-table discount flex-row" onclick="removeDiscount('${
              discount.id
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
