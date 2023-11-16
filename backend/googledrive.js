const { google } = require('googleapis');

const clientId = '592117409224-nfppm0rp93gqkstatcumlc75n3bh7b7q.apps.googleusercontent.com'
const clientSecret = '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'
const redirecturi = 'https://developers.google.com/oauthplayground/'
const refreshtoken = '1//04tJvGp6IIuTACgYIARAAGAQSNwF-L9IruVaHZCzLuaOIy27dJAPOz7ABHoUgt6X8w8ngtaPVtM09dA88VlEV-lQFFNV0c2MDtug'

const oauthClient = new google.auth.OAuth2(clientId, clientSecret, redirecturi, refreshtoken);

// console.log(oauthClient);
oauthClient.setCredentials({ refresh_token: refreshtoken });

module.exports = oauthClient;
