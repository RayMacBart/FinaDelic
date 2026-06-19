const Brevo = require('@getbrevo/brevo');

const apiInstance = new Brevo.Api.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

module.exports = apiInstance;
