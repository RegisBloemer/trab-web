console.log("login");

const email = document.getElementById("email-i");
const pass = document.getElementById("pass-i");

async function submit(e) {
  e.preventDefault();
  console.log("email", email.value);
  console.log("pass", pass.value);

  const result = await postData("http://localhost:3000/api/login", {
    email: email.value,
    pass: pass.value,
  });

  await window.cookieStore.set("id", result.id);

  if (result.id=== undefined) alert("Senha ou email incorreto!")
  else window.location="http://localhost:3000/index.html"
  
  // mandar para home
}

const form = document.getElementById("form");
form.addEventListener("submit", submit);

