postData("http://localhost:3000/api/user/stickers", {
  id: 1,
  quantity: 1,
});

window.addEventListener("load", (event) => {
  console.log("Todos os recursos terminaram o carregamento!");

  fetch("http://localhost:3000/api/user/stickers")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      // alerta de erro
    });
});
