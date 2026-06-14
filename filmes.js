function getFilmes() {
    return JSON.parse(localStorage.getItem("filmes")) || [];
}

function salvarFilmes(lista) {
    localStorage.setItem("filmes", JSON.stringify(lista));
}

document.addEventListener("DOMContentLoaded", () => {

    const usuarioLogado =
        localStorage.getItem("usuarioLogado");

    const pagina =
        window.location.pathname;

    if (
        (pagina.includes("cadastro.html")
        || pagina.includes("filmes.html"))
        && !usuarioLogado
    ) {
        window.location.href = "login.html";
    }

    const filmeForm =
        document.getElementById("filmeForm");

    if (filmeForm) {

        filmeForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const titulo =
                document.getElementById("titulo").value.trim();

            const genero =
                document.getElementById("genero").value.trim();

            const sinopse =
                document.getElementById("sinopse").value.trim();

            const imagem =
                document.getElementById("imagem").files[0];

            let filmes = getFilmes();

            const repetido = filmes.find(
                f =>
                f.titulo.toLowerCase() ===
                titulo.toLowerCase()
            );

            if (repetido) {
                alert("Já existe um filme com esse título.");
                return;
            }

            if (imagem) {

                const reader = new FileReader();

                reader.onload = function() {

                    filmes.push({
                        id: Date.now(),
                        titulo,
                        genero,
                        sinopse,
                        imagem: reader.result
                    });

                    salvarFilmes(filmes);

                    window.location.href =
                    "filmes.html";
                };

                reader.readAsDataURL(imagem);

            } else {

                filmes.push({
                    id: Date.now(),
                    titulo,
                    genero,
                    sinopse,
                    imagem: ""
                });

                salvarFilmes(filmes);

                window.location.href =
                "filmes.html";
            }

        });

    }

    carregarTabela();

    const busca =
        document.getElementById("busca");

    if (busca) {

        busca.addEventListener("keyup", () => {
            carregarTabela(busca.value);
        });

    }

});

function carregarTabela(texto = "") {

    const tabela =
        document.getElementById("listaFilmes");

    if (!tabela) return;

    let filmes = getFilmes();

    filmes = filmes.filter(f =>
        f.titulo.toLowerCase()
        .includes(texto.toLowerCase())
    );

    tabela.innerHTML = "";

    filmes.forEach(filme => {

        tabela.innerHTML += `
        <tr>

        <td>
        ${
            filme.imagem
            ?
            `<img class="capa" src="${filme.imagem}">`
            :
            "N/A"
        }
        </td>

        <td>${filme.titulo}</td>

        <td>${filme.genero}</td>

        <td>
        ${
            filme.sinopse
            ?
            filme.sinopse
            :
            "N/A"
        }
        </td>

        <td class="acoes">

        <button
        onclick="editarFilme(${filme.id})">
        ✏️
        </button>

        <button
        onclick="excluirFilme(${filme.id})">
        🗑️
        </button>

        </td>

        </tr>
        `;
    });

}

function excluirFilme(id) {

    if (!confirm("Deseja excluir?"))
        return;

    let filmes = getFilmes();

    filmes = filmes.filter(
        f => f.id !== id
    );

    salvarFilmes(filmes);

    carregarTabela();
}

function editarFilme(id) {

    let filmes = getFilmes();

    let filme =
        filmes.find(f => f.id === id);

    const novoTitulo =
        prompt("Título:", filme.titulo);

    if (!novoTitulo)
        return;

    const duplicado =
        filmes.find(
            f =>
            f.titulo.toLowerCase() ===
            novoTitulo.toLowerCase()
            &&
            f.id !== id
        );

    if (duplicado) {
        alert("Título já existe.");
        return;
    }

    const novoGenero =
        prompt("Gênero:", filme.genero);

    const novaSinopse =
        prompt(
            "Sinopse:",
            filme.sinopse
        );

    filme.titulo = novoTitulo;
    filme.genero = novoGenero;
    filme.sinopse = novaSinopse;

    salvarFilmes(filmes);

    carregarTabela();
}