;(function(baseURL) {
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