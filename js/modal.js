const modalTrigger = document.querySelectorAll("[data-modal]");
const modal = document.querySelector(".modal");

function openModal() {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  clearTimeout(modalTimeout);
}

modalTrigger.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

function closeModal() {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target.getAttribute("data-close") == "") {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

const modalTimeout = setTimeout(openModal, 50000);

function showModalByScroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    openModal();
    window.removeEventListener("scroll", showModalByScroll);
  }
}
window.addEventListener("scroll", showModalByScroll);

//form AJAX

const forms = document.querySelectorAll("form");
const message = {
  loading: "../img/form/054 spinner.svg",
  success: "done",
  failure: "fail...",
};
forms.forEach((item) => postData(item));

function postData(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const statusMessage = document.createElement("img");
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
    display: block;
    margin: 0 auto`;
    form.append(statusMessage);
    form.insertAdjacentElement("afterend", statusMessage);

    const request = new XMLHttpRequest();
    request.open("POST", "/server.php");

    request.setRequestHeader("Content-type", "application/json");
    const formData = new FormData(form);

    const object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });

    const json = JSON.stringify(object);

    request.send(json);

    request.addEventListener("load", () => {
      if (request.status === 200) {
        console.log(request.response);
        showThanksModal(message.success);
        form.reset();
        statusMessage.remove();
      } else {
        showThanksModal(message.failure);
      }
    });
  });
}

// form fetch
// function postData(form) {
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const statusMessage = document.createElement("img");
//     statusMessage.src = message.loading;
//     statusMessage.style.cssText = `
//     display: block;
//     margin: 0 auto`;
//     form.append(statusMessage);
//     form.insertAdjacentElement("afterend", statusMessage);

//     const object = {};
//     formData.forEach(function (value, key) {
//       object[key] = value;
//     });

//     fetch("server.php", {
//       method: "POST",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify(object), //formData
//     })
//       .then((data) => data.text())
//       .then((data) => {
//         console.log(data);
//         showThanksModal(message.success);

//         statusMessage.remove();
//       })
//       .catch(() => {
//         showThanksModal(message.failure);
//       })
//       .finform.reset();
//     ally(() => {});
//   });
// }

//form modal bueaty modal
function showThanksModal(message) {
  const prevModalDialog = document.querySelector(".modal__dialog");

  prevModalDialog.classList.add("hide");
  openModal();

  const thanksModal = document.createElement("div");
  thanksModal.classList.add("modal__dialog");
  thanksModal.innerHTML = `
  <div class="modal__content">
    <div class="modal__close" data-close>×</div>
    <div class="modal__title">${message}</div>
  </div>`;

  document.querySelector(".modal").append(thanksModal);
  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add("show");
    prevModalDialog.classList.remove("hide ");
    closeModal();
  }, 4000);
}
