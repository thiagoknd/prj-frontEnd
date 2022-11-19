let xhttp = new XMLHttpRequest(); //definindo a variavel q receber o XMLHTTP
let apiUser;
let api = "https://thiagonkd-prj-java.herokuapp.com/api/usuario/"
listar();

function listar(){
    let texto = "";
    xhttp.open("GET",api); // passando a requisição
    xhttp.send(); //faz a execução 
    xhttp.onload =  function(){
        apiUser = this.responseText; // devolução da api (variavel recebe o que esta dentro da api no retorno tipo get)
        apiUser = JSON.parse(apiUser); // converteu em JSON/array e armazenou na variavel
    
        document.getElementById('lista').innerHTML = texto;// vai substituir o que tem escrito dentro da div com id LISTA pelo o que estiver dentro do innerHTML

        let count = 0;
        for (const i of apiUser ) {
            texto += ` <tr onclick='editar(${count})'> <td>${i.nome} </td> <td>${i.email}</td> <tr>`; // crase pra manipulação de variavel com string
            count ++;
        } // um laço que ira mostrar todos s nomes que tem dentro de apiUser
        document.getElementById('lista').innerHTML = texto;
    }
}

function incluir(){
    let usuario = {}; // variavel recebe um objeto vazio
    let metodo;

    usuario.nome = document.getElementById('nome').value; 
    usuario.email = document.getElementById('email').value;
    usuario.id = document.getElementById('id').value;
    if(usuario.id> 0){
        metodo = "PUT";
    }else{
        metodo = "POST";
    }
     
    xhttp.open(metodo,api);
    xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8"); // definição do cabeçalho da requisição
    xhttp.send(JSON.stringify(usuario));
    xhttp.onload = function(){
        listar();
        limpar();
    }
}

function editar(count){
    info = apiUser[count];
    document.getElementById('nome').value = info.nome;
    document.getElementById('email').value = info.email;  
    document.getElementById('id').value = info.id;                  
}

function limpar(){
    document.getElementById('nome').value = "";
    document.getElementById('email').value = "";
    document.getElementById('id').value = "";
}

function apagar(){
    let id = document.getElementById('id').value;
    xhttp.open("DELETE",api+id);
    xhttp.send();
    xhttp.onload = function(){
        alert(this.responseText);
        listar();
    }

}