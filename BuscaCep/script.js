const enviar = document.querySelector(".enviar-dados");
const resultadosContainer = document.querySelector(".resultados");
const loading = document.querySelector(".loader");

const gerandoCode = async () => {
    let valueIpt = document
        .querySelector(".pesquisar-dados")
        .value.replace(/\D/g, "");

    if (valueIpt === "") return;

    const URL = `https://viacep.com.br/ws/${valueIpt}/json/`;
    loading.classList.add("loaders");
    resultadosContainer.innerHTML = "";

    try {
        const response = await fetch(URL);
        const data = await response.json();
        mostrarDados(data);
    } catch (error) {
        mostrarErro("Erro, cep não existente...");
        console.log(error);
    } finally {
        loading.classList.remove("loaders");
    }

    document.querySelector(".pesquisar-dados").value = "";
};

const mostrarDados = (dados) => {
    resultadosContainer.innerHTML = ` 
           <div class="box-resultados">
             <div class="box-infos">
                <span>Estado:</span>
                <div class="resposta-info">${
                    dados.estado || "Não disponível"
                }</div>
            </div>
            <div class="box-infos">
                <span>localidade:</span>
                <div class="resposta-info">${
                    dados.localidade || "Não disponível"
                }</div>
            </div>
            <div class="box-infos">
                <span>região:</span>
                <div class="resposta-info">${
                    dados.regiao || "Não disponível"
                }</div>
            </div>
            <div class="box-infos">
                <span>bairro:</span>
                <div class="resposta-info">${
                    dados.bairro || "Não disponível"
                }</div>
            </div>
        </div>`;
};

const mostrarErro = (mensagem) => {
    resultadosContainer.innerHTML = `
        <div class = 'erro'>
            <span>${mensagem}</span>
        </div>`;
};

enviar.addEventListener("click", (e) => {
    e.preventDefault();
    gerandoCode(e);
});
