async function handleValidation(event) {
  event.preventDefault()

  if (!event.target.checkValidity()) {
    event.target.classList.add("was-validated")
    return
  }

  await handleSubmitLogin(event.target);
  return
}

async function handleSubmitLogin(form) {
  const data = {
    nome: form.nome.value,
    senha: form.senha.value,
  };

  try {
    const result = await login(data);

    console.log(result);

    if (!result.nome) {
      alert("úsuario não econtrado! ")
      document.location.href = "./login.html";
    }

    document.location.href = "./index.html";

  } catch {
    alert("Verifique os teus dados")
  }

}