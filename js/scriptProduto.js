xhttp = new XMLHttpRequest();
let api = "https://thiagonkd-prj-java.herokuapp.com/api/produto/";
let apiProduto;

listarProdutos();
function listarProdutos(){
    let texto = "";
    xhttp.open("GET",api);
    xhttp.send();
    xhttp.onload = function(){
        apiProduto = this.responseText;
        apiProduto = JSON.parse(apiProduto);

        let contador = 0;
        for (const i of apiProduto) {
            texto += `<tr onclick='editar(${contador})'><td>${i.nome}</td><td>${i.descricao}</td><td>${i.valor}</td></tr>`;
            contador++;
        }
        document.getElementById('listagem').innerHTML = texto;
    }
}

function adicionarProduto(){
    let produtos = {};
    let metodo;

    produtos.nome = document.getElementById('nome').value;
    produtos.descricao = document.getElementById('descricao').value;
    produtos.valor = document.getElementById('valor').value;
    produtos.id = document.getElementById('id').value;

    if(produtos.id >0){
        metodo = "PUT";
    }else{
        metodo = "POST";
    }

    xhttp.open(metodo,api);
    xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(produtos));
    xhttp.onload = function(){
        listarProdutos();
        limparCampos();

    }



}

function limparCampos(){
    document.getElementById('id').value = "";
    document.getElementById('nome').value = "";
    document.getElementById('descricao').value = "";
    document.getElementById('valor').value = "";
}

function editar(contador){
    info = apiProduto[contador];
    document.getElementById('id').value = info.id;
    document.getElementById('nome').value = info.nome;
    document.getElementById('descricao').value = info.descricao;
    document.getElementById('valor').value = info.valor;

}

function apagar(){
    let id = document.getElementById('id').value;
    xhttp.open("DELETE",api+id);
    xhttp.send();
    xhttp.onload = function(){
        alert(this.responseText);
        listarProdutos();
        limparCampos();
    }
}