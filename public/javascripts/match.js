const list_tab = document.getElementById("list-tab");
const nav_tabContent = document.getElementById("nav-tabContent");

const triggerTabList = document.querySelectorAll('#list-tab a')

window.addEventListener("load", (event) => {
  console.log("Todos os recursos terminaram o carregamento!");
  var tmp_tab = "";
  var tmp_content = "";

  fetch("/api/user/stickers/match")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        tmp_tab = `
        <a
          class="list-group-item list-group-item-action active"
          id="list-${data[0]._id}-list"
          data-toggle="list"
          href="#${data[0]._id}"
          role="tab"
          aria-controls="${data[0]._id}"
        >
          ${data[0].email}
        </a>
        `;

        let tmp_stickers = "";
        Object.keys(data[0].stickers).forEach((e) => {
          tmp_stickers = tmp_stickers + `<li class="list-group-item">${data[0].stickers[e]}</li>`;
        });

        tmp_content = `
        <div 
          class="tab-pane fade"
          id="${data[0]._id}"
          role="tabpanel"
          >
          teste
          <ul class="list-group list-group-flush">
            ${tmp_stickers}
          <ul>
        </div>
        `;

        data.splice(0, 1);

        data.forEach((element) => {
          console.log(element);
          tmp_tab =
            tmp_tab +
            `
          <a
            class="list-group-item list-group-item-action"
            id="list-home-list"
            data-toggle="list"
            href="#${element._id}"
            role="tab"
            aria-controls="${element._id}"
          >
            ${element.email}
          </a>`;

          tmp_content =
            tmp_content +
            `
            <div 
              class="tab-pane fade"
              id="list-${element._id}"
              role="tabpanel"
              aria-labelledby="list-${element._id}-list"
              >
            </div>
        `;
        });
      }
    })
    .catch((err) => {
      console.log(err);
      // alerta de erro
    })
    .finally(() => {
      list_tab.innerHTML = tmp_tab;
      nav_tabContent.innerHTML = tmp_content;
      triggerTabList.forEach(triggerEl => {
        const tabTrigger = new bootstrap.Tab(triggerEl)
      
        triggerEl.addEventListener('click', event => {
          event.preventDefault()
          tabTrigger.show()
        })
      })
    });
});
