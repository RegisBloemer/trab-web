console.log("register");

const email = document.getElementById("email-i");
const pass = document.getElementById("pass-i");
const city = document.getElementById("city-i");
const form = document.getElementById("form");
form.addEventListener("submit", submit);

async function submit(event) {
  console.log("checkValidity", form.checkValidity());
  event.preventDefault();
  event.stopPropagation();
  if (form.checkValidity()) {
    console.log("email", email.value);
    console.log("pass", pass.value);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          pass: pass.value,
          city: city.value,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        if (data.id === undefined) {
          alert("Senha ou email incorreto!");
        } else {
          await window.cookieStore.set("id", data.id);
          window.location = "/";
        }
      } else {
        console.log(data);
        alert(data.msg);
      }
    } catch (err) {
      console.log("fetch", err);
    }
  }

  form.classList.add("was-validated");
}
