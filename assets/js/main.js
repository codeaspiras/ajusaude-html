;(function(baseURL) {
    const form = document.getElementById('searchForm');
    const documentInput = document.getElementById('document');
    const formResult = document.getElementById('searchResult');

    form.onsubmit = (evt) => {
        evt.preventDefault();
        try {
            const protocols = searchProtocols(documentInput.value);
            console.log(protocols);
        } catch (err) {
            alert(`Ocorreu um erro: ${err}`);
            console.error(err);
        }
    }

    function searchProtocols(document) {
        const URL = `${baseURL}/${document}`;
        
        const req = new XMLHttpRequest();
        req.open('GET', URL, false);
        req.send();
        
        if (req.status >= 400) {
            throw new Error(`HTTP Status Error: code ${req.status}`);
        }
        
        return JSON.parse(req.responseText);
    }
})('http://localhost:3000');