import { Header } from "../../functions/js/header.js";
import { Toast } from "../../functions/js/modals.js";
window.customElements.define("header-section", Header);
const $ = document;
let submitBtn = $.querySelector(".btn-submit");
let priceInput = $.querySelector('input[type="number"]');
let discountInput = $.querySelector('input[type="text"]');
let kindInput = $.querySelector("select");
let discountsInfo = JSON.parse(localStorage.getItem("discounts")) || [];
let discountId = discountsInfo[discountsInfo.length - 1]?.id || 0;
let discountEditedId = new URLSearchParams(location.search).get("id");
let discountEdited = null;
let discountState = null;
window.addEventListener("load", () => {
  if (discountEditedId) {
    discountState = "edit";
    discountEdited = [...discountsInfo].filter((discount) => {
      return discount.id == discountEditedId;
    })[0];
    console.log(discountEditedId);

    priceInput.value = discountEdited.price;
    discountInput.value = discountEdited.code;
    kindInput.value = discountEdited.kind;
  } else {
    discountState = "add";
  }
});
let hasDiscount = false;
submitBtn.addEventListener("click", () => {
  if (discountInput.value.length > 3) {
    hasDiscount = discountsInfo.some((discount) => {
      if (discount.id != discountEditedId) {
        return discountInput.value.trim() === discount.code;
      }
    });
    if (!hasDiscount) {
      if (discountState === "add") {
        discountId++;
        discountsInfo.push({
          id: discountId,
          kind: kindInput.value,
          price: priceInput.value,
          code: discountInput.value.trim(),
          check: "checked",
        });
      } else {
        discountsInfo = discountsInfo.map((discount) => {
          if (discount.id == discountEditedId) {
            discount.price = priceInput.value;
            discount.code = discountInput.value;
            discount.kind = kindInput.value;
          }
          return discount;
        });
      }
      localStorage.setItem("discounts", JSON.stringify(discountsInfo));
      window.location.href = window.location.href
        .split("?")[0]
        .replace("create-discount", "discount-list");
    } else {
      Toast.fire({
        icon: "warning",
        text: "کد تخفیف تکراری میباشد!",
        timer: 3000,
      });
    }
  } else {
    Toast.fire({
      icon: "error",
      text: "لطفا ورودی ها را با دقت پر کنید.",
      timer: 3000,
    });
  }
  // resetInouts();
});
function resetInouts() {
  kindInput.value = "تخفیف ثابت سبد خرید";
  priceInput.value = 10000;
  discountInput.value = "";
}
let kindOfDiscount = $.getElementById("kindOfDiscount");
kindOfDiscount.addEventListener("change", (e) => {
  if (e.target.value.split(" ")[1] === "درصدی") {
    setPriceInput(5);
    priceInput.max = 100;
    priceInput.previousElementSibling.innerHTML = "درصد تخفیف";
  } else {
    setPriceInput(10000);
    priceInput.max = 999999;
    priceInput.previousElementSibling.innerHTML = "مبلغ تخفیف (تومان)";
  }
});
function setPriceInput(num) {
  priceInput.value = num;
  priceInput.min = num;
  priceInput.step = num;
}
