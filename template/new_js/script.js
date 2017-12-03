url = 'http://www.smartsoft.com.br/webservice/restifydb/empresa/puc_perfil';

//executa retrieve do CRUD 
function execRetrieve() {
    var req = new XMLHttpRequest;
    req.onreadystatechange = function () {
        if ((req.readyState == 4) && (req.status == 200)) {
            var dados = JSON.parse(req.responseText);
            var tabelaHTML = '';

            //montagem da tabela de perfis
            tabelaHTML = '<table class="tabela table">';
            tabelaHTML += '<thead><th>Foto</th><th>Informações</th>';
            for (i = 0; i < dados.restify.rowCount; i++) {
                tabelaHTML += '<tr class="table_row"><td><img id="foto" src="' + dados.restify.rows[i].values.foto_url.value + '"></td>'
                tabelaHTML += '<td id="texto"><h2>' + dados.restify.rows[i].values.nome.value + '</h2>';
                tabelaHTML += '<p>Sexo:<br>' + dados.restify.rows[i].values.sexo.value + '<br>';
                tabelaHTML += 'Data de nascimento:<br>' + dados.restify.rows[i].values.data_nascimento.value + '<br>';
                tabelaHTML += 'Cidade:<br>' + dados.restify.rows[i].values.cidade.value + '<br>';
                tabelaHTML += 'Website:<br>' + dados.restify.rows[i].values.site_url.value + '<br></p>';
                tabelaHTML += '<a href="javascript:execUpdate(' + dados.restify.rows[i].values.id.value + ');">Atualizar</a><br>'
                tabelaHTML += '<a href="javascript:execDelete(' + dados.restify.rows[i].values.id.value + ');">Excluir</a></td></tr>';
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
    if (confirm('Deseja excluir o registro :' + id + '?')) {
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

//executa o create do CRUD
function execCreate(nome, sexo, data_nascimento, cidade, site_url, foto_url) {
    var req = new XMLHttpRequest;
    var dados = '_data={"nome":"' + nome.value + '", "sexo":"' + sexo.value + '", "data_nascimento":"' + data_nascimento.value + '", "cidade":"' + cidade.value + '", "site_url":"' + site_url.value + '", "foto_url":"' + foto_url.value + '"}';

    req.onreadystatechange = function () {
        //alert('ate aqui deu');
        if ((req.readyState == 4) && (req.status == 200)) {
            alert('Perfil incluido com sucesso.');

            //recarrega dados do banco
            execRetrieve();
        }
    }
    req.open('POST', url, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(dados);
}

//executa o Update do CRUD
function execUpdate(nome, sexo, data_nascimento, cidade, site_url, foto_url, id) {
    var req = new XMLHttpRequest;
    var dados = '_data={"nome":"' + nome.value + '", "sexo":"' + sexo.value + '", "data_nascimento":"' + data_nascimento.value + '", "cidade":"' + cidade.value + '", "site_url":"' + site_url.value + '", "foto_url":"' + foto_url.value + '"}';

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
}