const list_tab = document.getElementById("list-tab");
const nav_tabContent = document.getElementById("nav-tabContent");

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
          class="list-group-item list-group-item-action active "
          data-bs-toggle="list"
          href="#id-${data[0]._id}"
          role="tab"
        >
          ${data[0].email}
        </a>
        `;

        let tmp_stickers = "";
        Object.keys(data[0].stickers).forEach((e) => {
          if (data[0].stickers[e] > 0) {
            tmp_stickers =
              tmp_stickers +
              `<li 
              class="list-group-item"
            >
              ${data[0].stickers[e]} Figurinhas <div class="col-5">
                <img src="/images/fig/${e}.jpeg" class="img-thumbnail">
              </div>
            </li>`;
          }
        });

        tmp_content = `
        <div 
          class="tab-pane active"
          id="id-${data[0]._id}"
          role="tabpanel"
          >
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
            data-bs-toggle="list"
            href="#id-${element._id}"
            role="tab"
          >
            ${element.email}
          </a>`;

          let tmp_stickers = "";
          Object.keys(element.stickers).forEach((e) => {
            if (element.stickers[e] > 0) {
              tmp_stickers =
                tmp_stickers +
                `<li class="list-group-item">
                ${element.stickers[e]} Figurinhas <div class="col-5">
                  <img src="/images/fig/${e}.jpeg" class="img-thumbnail">
                </div>
              </li>`;
            }
          });

          tmp_content =
            tmp_content +
            `
            <div 
              class="tab-pane"
              id="id-${element._id}"
              role="tabpanel"
              >
              <ul class="list-group list-group-flush">
                ${tmp_stickers}
              <ul>
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
      const triggerTabList = document.querySelectorAll("#list-tab a");
      triggerTabList.forEach((triggerEl) => {
        const tabTrigger = new bootstrap.Tab(triggerEl);

        triggerEl.addEventListener("click", (event) => {
          event.preventDefault();
          tabTrigger.show();
        });
      });
    });
});
