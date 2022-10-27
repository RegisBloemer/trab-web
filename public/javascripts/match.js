async function change_card(value, id) {
  try {
    const response = await fetch("/api/user/stickers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        quantity: value,
      }),
    });
    const data = await response.json();
    console.log(data)
  } catch (err) {
    console.log("fetch", err);
  }
}

window.addEventListener("load", (event) => {
  console.log("Todos os recursos terminaram o carregamento!");

  fetch("http://localhost:3000/api/user/stickers")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i <= 8; i++) {
        document.getElementById("n-cards-" + i).value = data.stickers[i];
      }
    })
    .catch((err) => {
      console.log(err);
      // alerta de erro
    });
});
