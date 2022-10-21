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

  console.log(result);

  // mandar para home
}

const form = document.getElementById("form");
form.addEventListener("submit", submit);
