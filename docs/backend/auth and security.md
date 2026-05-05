## AUTHENTICATION & SECURITY
### FinaDelic uses:
- *express-session* for authentication
- CSRF Tokens via *@dr.pogodin/csurf*
- *argon2* password hashing
- Thorough input validation (and sanitization) via *express-validator* (see: *routes.js* and *customValidators.js*)
- AES-256-GCM encryption at rest using the node native *crypto* module (prepared by: *crypt.js*)
- Secure headers and CSPs via *helmet.js*
- CORS related headers (which have to be modified - the should be stricter!)

### Make sure that deployment at the hosting provider also enables:
- Encryption at transit (also make sure *helmet.js* is configured to support HTTPS)
- Rate Throttling