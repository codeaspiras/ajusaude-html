
const baseURL = 'http://aracajusaude.voipy.com.br:8090/IDSPortalCidadaoWS/rest/portalcidadao';

async function searchProtocols(document) {
    const URL = `${baseURL}/listaesperapublica?tipo=TODAS&situacao=0&documento=${document}`;
    
    const req = await fetch(URL);
    if (req.status >= 400) {
        throw new Error(`HTTP Status Error: code ${req.status}`);
    }

    const response = await req.json();
    if (response.lista?.length) {
        return response.lista;
    }
    
    return [];
}

module.exports = searchProtocols;