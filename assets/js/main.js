;(function(baseURL) {
    const form = document.getElementById('searchForm');
    const documentInput = document.getElementById('document');
    const formResult = document.getElementById('searchResult');

    form.onsubmit = async (evt) => {
        evt.preventDefault();
        printLoader();
        const documents = documentInput.value.split(' ');
        let searchedDocuments = [];
        let promises = [];
        for (const doc of documents) {
            if (searchedDocuments.includes(doc)) {
                continue;
            }

            searchedDocuments.push(doc);
            promises.push(searchProtocolsByDocument(doc));
        }

        Promise.all(promises).then(
            (results) => {
                const protocols = [].concat(...results);
                if (protocols.length) {
                    printList(protocols);
                    return;
                }

                printEmptyList();
            }
        ).catch((err) => {
            printError(err);
            console.error(err);
        })

    }

    function searchProtocolsByDocument(document) {
        return new Promise((resolve, reject) => {
            const URL = `${baseURL}/${document}`;
            
            const req = new XMLHttpRequest();
            req.open('GET', URL);
            req.onreadystatechange = (evt) => {
                if (req.readyState != 4) {
                    return;
                }

                
                if (req.status >= 400) {
                    reject(`HTTP Status Error: code ${req.status}`);
                    return;
                }

                resolve(JSON.parse(req.responseText));
            };
            req.send();
        });
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

    function printLoader() {
        formResult.innerHTML = `<b>Carregando</b>............`;
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