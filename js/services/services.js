// const postData = async (url, data) => {
//   const res = await fetch(url, {
//     method: "POST",
//     headers: { "Content-type": "application/json" },
//     body: data,
//   });

//   return await res.json();
// };
// //на db.json делаем запрос и получаем оттуда данные
// getResource("http://localhost:3000/menu").then((data) => {
//   data.forEach(({ img, altimg, title, descr, price }) => {
//     new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
//   });
// });

// export { postData };
// export { getResource };
