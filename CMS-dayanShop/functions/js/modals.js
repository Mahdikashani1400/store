const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
});
let newItemInputs = Swal.mixin({
    showCancelButton: true,
    confirmButtonText: "تایید",
    cancelButtonText: "بازگشت",
    focusConfirm: false,
  });
  export{newItemInputs,Toast}