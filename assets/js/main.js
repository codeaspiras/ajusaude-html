;(function(baseURL) {
    const form = document.getElementById('searchForm');
    const documentInput = document.getElementById('document');
    const formResult = document.getElementById('searchResult');

    form.onsubmit = (evt) => {
        evt.preventDefault();
        try {
            const protocols = searchProtocolsByDocument(documentInput.value);
            if (protocols.length) {
                printList(protocols);
            } else {
                printEmptyList();
            }
        } catch (err) {
            printError(err);
            console.error(err);
        }
    }

    function searchProtocolsByDocument(document) {
        const URL = `${baseURL}/${document}`;
        
        const req = new XMLHttpRequest();
        req.open('GET', URL, false);
        req.send();
        
        if (req.status >= 400) {
            throw new Error(`HTTP Status Error: code ${req.status}`);
        }
        
        return JSON.parse(req.responseText);
    }

    function protocolToString(index, protocol) {
        return `
        <tr>
            <td>${index+1}</td>
            <td>${protocol.protocolo}</td>
            <td>${protocol.nome}</td>
            <td>${protocol.dataNascimento}</td>
            <td>${protocol.descricao}</td>
            <td>${protocol.situacao}</td>
            <td>${protocol.condicao}</td>
        </tr>`;
    }

    function printList(protocols) {
        const tableBody = protocols.reduce((currentBody, protocol, index) => {
            return currentBody + protocolToString(index, protocol);
        }, '');
        formResult.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Protocolo</th>
                    <th>Nome</th>
                    <th>Data de Nascimento</th>
                    <th>Descrição</th>
                    <th>Situação</th>
                    <th>Condição</th>
                </tr>
            </thead>
            <tbody>${tableBody}</tbody>
        </table>`;
    }

    function printEmptyList() {
        formResult.innerHTML = `<b>Sentimos muito</b>, mas não encontramos nenhum protocolo`;
    }

    function printError(err) {
        formResult.innerHTML = `<b>Um erro aconteceu</b>: ${err}`;
    }
})('http://localhost:3000');