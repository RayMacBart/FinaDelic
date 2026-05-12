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

</br>
</br>
</br>

___
___
## FinaDelic Documentation
### frontend:
[frontend architecture](/docs/frontend/architecture.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [special flows](/docs/frontend/special_flows.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [cautionary hints](/docs/frontend/cautionary_hints.md)
___
### backend:
[backend architecture](/docs/backend/architecture.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [auth & security](/docs/backend/auth_and_security.md)
___
### general:
[API communication](/docs/API_communication.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [used tech](/docs/used_tech.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [missing features](/docs/missing.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [known bugs](/docs/known_bugs.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [next steps](/docs/next_steps.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [learnings](/docs/learnings.md)