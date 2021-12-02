import calc from "./modules/calc";
import cards from "./modules/cards";
import form from "./modules/form";
import modal from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimeout = setTimeout(() => openModal(".modal", modalTimeout), 5000);

  calc();
  cards();
  form("form", modalTimeout);
  modal("[data-modal]", ".modal", modalTimeout);
  slider({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    slide: ".offer__slide",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
  tabs(".tabheader__item", ".tabcontent", ".tabheader", "tabheader__item_active");
  timer(".timer", "2021-12-11");
});
