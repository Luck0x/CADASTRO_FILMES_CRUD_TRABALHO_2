function getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function salvarUsuarios(lista) {
    localStorage.setItem("usuarios", JSON.stringify(lista));
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {

    const cadastroForm = document.getElementById("cadastroUsuarioForm");

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const usuario = document.getElementById("cadUsuario").value.trim();
            const senha = document.getElementById("cadSenha").value.trim();

            let usuarios = getUsuarios();

            const existe = usuarios.find(
                u => u.usuario.toLowerCase() === usuario.toLowerCase()
            );

            if (existe) {
                alert("Usuário já existe.");
                return;
            }

            usuarios.push({
                usuario,
                senha
            });

            salvarUsuarios(usuarios);

            alert("Usuário cadastrado com sucesso!");

            cadastroForm.reset();
        });
    }

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const usuario = document.getElementById("loginUsuario").value.trim();
            const senha = document.getElementById("loginSenha").value.trim();

            let usuarios = getUsuarios();

            const encontrado = usuarios.find(
                u =>
                u.usuario === usuario &&
                u.senha === senha
            );

            if (!encontrado) {
                alert("Login inválido.");
                return;
            }

            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify(encontrado)
            );

            window.location.href = "index.html";
        });
    }

});