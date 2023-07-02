const { google } = require('googleapis');

const clientId = '592117409224-ln06h7s1694vfliqiaevnf7c0ifjcdfu.apps.googleusercontent.com'
const clientSecret = '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'
const redirecturi = 'https://developers.google.com/oauthplayground/'
const refreshtoken = '1//04ktw-H9_3iBTCgYIARAAGAQSNwF-L9Iri6Ypg5vf5V6P4XrFNXXKaTpvlVD9aXZmttfL4UX8wp368jOPhYB5sKM8fPVyXkcaVJQ'

const oauthClient = new google.auth.OAuth2(clientId, clientSecret, redirecturi, refreshtoken);

oauthClient.setCredentials({ refresh_token: refreshtoken });

module.exports = oauthClient;
