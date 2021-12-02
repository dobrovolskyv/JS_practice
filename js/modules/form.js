import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function form(formSelector, modalTimeout) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: "in progress",
    success: "done",
    failure: "fail...",
  };
  forms.forEach((item) => postData(item));

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

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
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.failure;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        }
      });
    });
  }

  //form modal bueaty modal
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal(".modal", modalTimeout);

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
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }
  //form AJAX

  // const forms = document.querySelectorAll("form");
  // const message = {
  //   loading: "../img/form/054 spinner.svg",
  //   success: "done",
  //   failure: "fail...",
  // };
  // forms.forEach((item) => bindPostData(item));

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

  //     const request = new XMLHttpRequest();
  //     request.open("POST", "/server.php");

  //     request.setRequestHeader("Content-type", "application/json");
  //     const formData = new FormData(form);

  //     const object = {};
  //     formData.forEach(function (value, key) {
  //       object[key] = value;
  //     });

  //     const json = JSON.stringify(object);

  //     request.send(json);

  //     request.addEventListener("load", () => {
  //       if (request.status === 200) {
  //         console.log(request.response);
  //         showThanksModal(message.success);
  //         form.reset();
  //         statusMessage.remove();
  //       } else {
  //         showThanksModal(message.failure);
  //       }
  //     });
  //   });
  // }

  // form fetch
  //
  // function bindPostData(form) {
  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();

  //     const statusMessage = document.createElement("img");
  //     statusMessage.src = message.loading;
  //     statusMessage.style.cssText = `
  //     display: block;
  //     margin: 0 auto`;
  //     form.append(statusMessage);
  //     form.insertAdjacentElement("afterend", statusMessage);

  //     const formData = new FormData(form);

  //     const json = JSON.stringify(Object.fromEntries(formData.entries()));

  //     postData("http://localhost:30000/request", json)
  //       .then((data) => {
  //         console.log(data);
  //         showThanksModal(message.success);

  //         statusMessage.remove();
  //       })
  //       .catch(() => {
  //         showThanksModal(message.failure);
  //       })
  //       .finally(() => {
  //         form.reset();
  //       });
  //   });
  // }
}

export default form;
