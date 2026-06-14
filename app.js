document.addEventListener("DOMContentLoaded", () => {

    const usuario =
        localStorage.getItem("usuarioLogado");

    const menuLogado =
        document.getElementById("menuLogado");

    const menuDeslogado =
        document.getElementById("menuDeslogado");

    if (usuario) {

        if (menuLogado)
            menuLogado.style.display = "block";

        if (menuDeslogado)
            menuDeslogado.style.display = "none";

    } else {

        if (menuLogado)
            menuLogado.style.display = "none";

        if (menuDeslogado)
            menuDeslogado.style.display = "block";
    }

});

function toggleMenu(){

    document
    .querySelector(".sidebar")
    .classList
    .toggle("active");

}