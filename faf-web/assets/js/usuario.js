
async function handleValidation(event) {
    event.preventDefault()
    const senha = document.getElementById('senha').value;
    const confirm_senha = document.getElementById('confirm_senha').value;

    if (!isFieldOfLetterString("form #nome", event.target.nome.value)) {
        return
    }

    if (!event.target.checkValidity()) {
        event.target.classList.add("was-validated")
        return
    }

    if ((senha !== confirm_senha)) {
        document.getElementById('confirm_senha').classList.add('is-invalid');
        document.getElementById('confirm_senha').nextElementSibling.innerHTML = 'A Senha deve ser igual.';

        return
    }

    document.getElementById('confirm_senha').classList.remove('is-invalid');
    document.getElementById('confirm_senha').nextElementSibling.innerHTML = '';

    await handlecriarItem(event.target);
    return
}

async function handlecriarItem(form) {
    const usuarioData = {
        nome: form.nome.value,
        tipo: "user",
        senha: form.senha.value,
    };

    await postNewField("usuario", usuarioData);
    document.location.href = "./login.html";
}