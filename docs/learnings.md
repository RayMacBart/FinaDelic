## Learnings

### 'this' and 'arrow' functions as properties
If methods are created as a property using an arrow function,
'this' inside the method refers to the instance itself:
It resides at the top of the instance's prototype chain and isn't just created in its prototype.
If methods, which are not created as a property, are passed to other classes,
'this' inside the passed method is not bound to the original instance anymore when called there.
Keeping the memory to which instance it belongs can be very useful and necessary in some places.

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
[readme & features](/README.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [API communication](/docs/API_communication.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [used tech](/docs/used_tech.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [missing features](/docs/missing.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [known bugs](/docs/known_bugs.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [next steps](/docs/next_steps.md) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [learnings](/docs/learnings.md)