url = 'http://www.smartsoft.com.br/webservice/restifydb/empresa/puc_perfil?_view=json';

//executa retrieve do CRUD 
function execRetrieve() {
    var req = new XMLHttpRequest;

    req.onreadystatechange = function () {
        if ((req.readyState == 4) && (req.status == 200)) {

            var dados = JSON.parse(req.responseText);
            var tabelaHTML = '';

            //montagem da tabela de perfis
            tabelaHTML = '<table border="2">';
            for (i = 0; i < dados.restify.rowCount; i++) {
                tabelaHTML += '<tr><td><img src="' + dados.restify.rows[i].values.foto_url.value + '"></td>'
                tabelaHTML += '<td><h2>' + dados.restify.rows[i].values.nome.value + '</h2>';
                tabelaHTML += '<p>Sexo: ' + dados.restify.rows[i].values.sexo.value + '<br>';
                tabelaHTML += 'Data de nascimento: ' + dados.restify.rows[i].values.data_nascimento.value + '<br>';
                tabelaHTML += 'Cidade: ' + dados.restify.rows[i].values.cidade.value + '<br>';
                tabelaHTML += 'Website: ' + dados.restify.rows[i].values.site_url.value + '<br></p>';
                tabelaHTML += '</td></tr>';
            }
            tabelaHTML += '</table>';

            document.getElementById('div_listagem').innerHTML = tabelaHTML;

        }
    }

    req.open('GET', url, true)
    req.send();
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