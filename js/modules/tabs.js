function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabsParent = document.querySelector(tabsParentSelector);

  function hideTabs() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  function showTabs(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  }

  hideTabs();
  showTabs();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabs();
          showTabs(i);
        }
      });
    }
  });
}

export default tabs;

//regular

// const ans = promt("entner ur name");
// const reg = /n/ig;
// console.log(reg.test(ans)); - true or false
// const str = 'My name is R2D2'
// console.log(str.match(/\w\d\w\d/i)); -найдет R2D2

// обратные классы не
// \D не числа
// \W не буквы

// \d- ищем цифры
// \w-все слова ищем
// \s- ищем все пробелы
// i-первое значение выволит;
// g-глабальный поиск;
// m;
// console.log(ans.search(reg));
// console.log(ans.match(reg));

// const pass = promt("Password");
// console.log(pass.replace(/./g, "*"));
// . - все жлементы которые попадут в строку
// *-все символы заменяем на зведочку

// log('12-34-56'.replace(/-/g), ":") -- 12:34:56
