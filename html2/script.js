url = 'http://www.smartsoft.com.br/webservice/restifydb/empresa/puc_perfil?_view=json';

function execRetrieve() {
    var req = new XMLHttpRequest;

    req.onreadystatechange = function () {
        if ((req.readyState == 4) && (req.status == 200)) {

            var dados = JSON.parse(req.responseText);
            var tabelaHTML = '';

            //montagem da tabela de perfis
            tabelaHTML = '<table border="1">';
            for (i = 0; i < dados.restify.rows.length; i++) {
                tabelaHTML += '<tr><td><img src="' + dados.restify.rows[i].values.foto_url.value +'"></td>'
                tabelaHTML += '<td><h2>' + dados.restify.rows[i].values.nome.value + '</h2>';
                tabelaHTML += '<p>Sexo: ' + dados.restify.rows[i].values.sexo.value + '<br>';
                tabelaHTML += '<p>Data de nascimento: ' + dados.restify.rows[i].values.data_nascimento.value + '<br>';
                tabelaHTML += '<p>Cidade: ' + dados.restify.rows[i].values.cidade.value + '<br>';
                tabelaHTML += '<p>Website: ' + dados.restify.rows[i].values.site_url.value + '<br>';
                tabelaHTML += '</td></tr>';
            }
            tabelaHTML += '</table>';

            document.getElementById('div_listagem').innerHTML = tabelaHTML;

        }
    }

    req.open('GET', url, true)
    req.send();
}