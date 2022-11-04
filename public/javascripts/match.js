const indice = `
  <a
    class="list-group-item list-group-item-action active"
    id="list-home-list"
    data-toggle="list"
    href="#list-home"
    role="tab"
    aria-controls="home"
  >
    Home
  </a>`

const list_tab = document.getElementById("list-tab")


window.addEventListener("load", (event) => {
  console.log("Todos os recursos terminaram o carregamento!");

  fetch("/api/user/stickers/match")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach(element => {
        console.log(element)
      });
    })
    .catch((err) => {
      console.log(err);
      // alerta de erro
    });
});
