
url = 'http://www.smartsoft.com.br/webservice/restifydb/empresa/puc_perfil';

//executa retrieve do CRUD 
function execRetrieve() {
    var req = new XMLHttpRequest;
    req.onreadystatechange = function () {
        if ((req.readyState == 4) && (req.status == 200)) {
            var dados = JSON.parse(req.responseText);
            var tabelaHTML = '';

            //montagem da tabela de perfis
            tabelaHTML = '<table class="table table-hover">';
            
            for (i = 0; i < dados.restify.rowCount; i++) {
                tabelaHTML += '<thead><th><h6> Foto </h6></th> <th><h6> Informações </h6></th></thead>';
                tabelaHTML += '<tr class="table_row"><td class="td_foto"><img id="foto" src="' + dados.restify.rows[i].values.foto_url.value + '"></td>';
                tabelaHTML += '<td class="td_texto"><h2>' + dados.restify.rows[i].values.nome.value + '</h2>';
                tabelaHTML += '<p>Sexo:<br>' + dados.restify.rows[i].values.sexo.value + '<br>';
                tabelaHTML += 'Data de nascimento:<br>' + dados.restify.rows[i].values.data_nascimento.value + '<br>';
                tabelaHTML += 'Cidade:<br>' + dados.restify.rows[i].values.cidade.value + '<br>';
                tabelaHTML += 'Website:<br><a href="' + dados.restify.rows[i].values.site_url.value + '">' + dados.restify.rows[i].values.nome.value + '</a><br></p>';
                tabelaHTML += '<a class="btn btn-info btn-sm" href="javascript:execUpdate(' + dados.restify.rows[i].values.nome.value + ', ' + dados.restify.rows[i].values.sexo.value + ', ' + dados.restify.rows[i].values.data_nascimento.value + ', ' + dados.restify.rows[i].values.cidade.value + ', ' + dados.restify.rows[i].values.site_url.value + ', ' + dados.restify.rows[i].values.foto_url.value + ', ' + dados.restify.rows[i].values.id.value + ' ));">Atualizar</a>'
                tabelaHTML += '<a class="btn btn-info btn-sm" href="javascript:execDelete(' + dados.restify.rows[i].values.id.value + ');">Excluir</a></td></tr>';
            }
            tabelaHTML += '</table>';

            document.getElementById('div_listagem').innerHTML = tabelaHTML;

        }
    }

    req.open('GET', url, true)
    req.send();
}

//executa o delete o CRUD
function execDelete (id) {
    if (confirm('Deseja excluir o registro : ' + id + ' ?')) {
        var req = new XMLHttpRequest;
        
        req.onreadystatechange = function (){
            if ((req.readyState == 4) && (req.status == 200)) {
                alert ('Registro '+ id +' excluido com sucesso');
                //recarrega dados do banco
                execRetrieve();
            }
        }
        req.open('DELETE', url + '/' + id, true);
        req.send();
        
    }
}

//executa o Create do CRUD
function execCreate(nome, sexo, data_nascimento, cidade, site_url, foto_url) {
    var req = new XMLHttpRequest;
    var dados = '_data={"nome":"' + nome.value + '", "sexo":"' + sexo.value + '", "data_nascimento":"' + data_nascimento.value + '", "cidade":"' + cidade.value + '", "site_url":"' + site_url.value + '", "foto_url":"' + foto_url.value + '"}';

    req.onreadystatechange = function () {
        //alert('ate aqui deu');
        if ((req.readyState == 4) && (req.status == 200)) {
            alert('Perfil incluido com sucesso.');
            
            /* futuro modal
            alertahtml = '<div class="alert alert-success">'
            alertahtml += '<strong>Well done!</strong> You successfully read this important alert message.'
            alertahtml += '</div>' 
            

            document.getElementById('div_alerta').innerHTML = alertahtml;
            */
            //recarrega dados do banco
            execRetrieve();
        }
    }
    req.open('POST', url, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(dados);
}


function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

//executa o Update do CRUD
/*function execUpdate(nome, sexo, data_nascimento, cidade, site_url, foto_url, id) {
    alert("nome: "+nome);
    alert("sexo: "+sexo);
    alert("data: "+data_nascimento);
    alert("cidade: "+cidade);
    alert("site: "+site_url);
    alert("foto: "+foto_url);
    var req = new XMLHttpRequest;
    var dados = '_data={"nome":"' + nome + '", "sexo":"' + sexo + '", "data_nascimento":"' + data_nascimento + '", "cidade":"' + cidade + '", "site_url":"' + site_url + '", "foto_url":"' + foto_url + '"}';

    req.onreadystatechange = function () {
        //alert('ate aqui deu');
        if ((req.readyState == 4) && (req.status == 200)) {
            alert('Perfil alterado com sucesso.');

            //recarrega dados do banco
            execRetrieve();
        }
    }
    req.open('PUT', url + '/' + id, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(dados);
}*/

function execUpdate(nome, sexo, data_nascimento, cidade, site_url, foto_url, id) {
    var req = new XMLHttpRequest;
    console.log("nome: "+nome);
    console.log("sexo: "+sexo);
    console.log("data: "+data_nascimento);
    console.log("cidade: "+cidade);
    console.log("site: "+site_url);
    console.log("foto: "+foto_url);
    //var dados = '_data={"nome":"' + nome + '", "sexo":"' + sexo + '", "data_nascimento":"' + data_nascimento + '", "cidade":"' + cidade + '", "site_url":"' + site_url + '", "foto_url":"' + foto_url + '"}';

    req.onreadystatechange = function () {
        //alert('ate aqui deu');
        if ((req.readyState == 4) && (req.status == 200)) {
            alert('Perfil alterado com sucesso.');

            formupdate  += '<div class="modal" tabindex="-1" role="dialog">';
            formupdate  += '<div class="modal-dialog" role="document">';
            formupdate  += '<div class="modal-content">';
            formupdate  += '<div class="modal-header">';
            formupdate  += '<h5 class="modal-title">Atualizar cadastro</h5>';
            formupdate  += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
            formupdate  += '<span aria-hidden="true">&times;</span>';
            formupdate  += '</button>';
            formupdate  += '</div>';
            formupdate  += '<div class="modal-body">';
            formupdate  += '<div class="container">';
            formupdate  += '<div class="row">';
            formupdate  += '<div id="div_form" class="col-lg-4 col-lg-offset-4">';
            formupdate  += '<form id="formperfil" action="javascript:execCreate(this.nome, this.sexo, this.data_nascimento, this.cidade, this.site_url, this.foto_url);">';
            formupdate  += '<p class="info"><label for="nome">Nome</label><br><input placeholder="' + dados.restify.rows[i].values.nome.value + '" type="text" id="nome"></p>';
            formupdate  += '<hr>';
            formupdate  += '<p class="info"><label for="sexo">Sexo</label><br><input placeholder="' + dados.restify.rows[i].values.sexo.value + '" type="text" id="sexo"></p>';
            formupdate  += '<hr>';
            formupdate  += '<p class="info"><label for="data_nascimento">Data de nascimento</label><br><input placeholder="' + dados.restify.rows[i].values.data_nascimento.value + '" type="text" id="data_nascimento"></p>';
            formupdate  += '<hr>';
            formupdate  += '<p class="info"><label for="cidade">Cidade</label><br><input placeholder="' + dados.restify.rows[i].values.cidade.value + '" type="text" id="cidade"></p>';
            formupdate  += '<hr>';
            formupdate  += '<p class="info"><label for="site_url">Website</label><br><input placeholder="' + dados.restify.rows[i].values.site_url.value + '" type="text" id="site_url"></p>';
            formupdate  += '<hr>';
            formupdate  += '<p class="info"><label for="foto_url">Foto URL</label><br><input placeholder="' + dados.restify.rows[i].values.foto_url.value + '" type="text" id="foto_url"></p>';
            formupdate  += '<p ><input class="btn" type="submit" value="Cadastrar"></p>';
            formupdate  += '</form>';
            formupdate  += '</div>';
            formupdate  += '</div>';
            formupdate  += '</div>';
            formupdate  += '</div>';
            formupdate  += '<div class="modal-footer">';
            formupdate  += '<button type="submit" class="btn btn-primary">Atualizar</button>';
            formupdate  += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
            formupdate  += '</div>';
            formupdate  += '</div>';
            formupdate  += '</div>';
            formupdate  += '</div>';
            
            document.getElementById('div_formupdate').innerHTML = formupdate;
            
            //recarrega dados do banco
            execRetrieve();
        }
    }
    req.open('PUT', url + '/' + id, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(dados);
}


