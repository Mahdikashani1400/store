import { Header } from "../../functions/js/header.js";
window.customElements.define("header-section", Header);
const $ = document;

let trDiscount = $.querySelectorAll("tr");
trDiscount.forEach((tr) => {
  if (tr.lastElementChild.lastElementChild) {
    tr.lastElementChild.lastElementChild.lastElementChild.addEventListener(
      "click",
      removeDiscount.bind(tr)
    );
  }
});

function removeDiscount(e) {
  e.preventDefault();
  this.remove();
}
