## THE BACKEND ARCHITECTURE

### The Backend's architecture uses a *Controller* and a *Model*.</br>
### Since FinaDelic is a SPA, the *View* part is handled by the frontend almost entirely.

***/routes.js*** routes the requests to functions in *Controller*,</br>
which themselves call functions in the Model part.</br>
___
These functions operate on Mongoose models imported from *model/schemas.js*,</br>
where the Schemas, on which these models are based, are defined too.</br>
</br>
The Data Schema has a hierarchical top-to-down architecture.</br>
Each of the following schemas contains the next one in a field:</br>
* **userSchema** *contains*
* **dataSchema** *contains*
* **bagSchema** *contains* other *bagSchemas* (recursively) or it *contains*
* **flowSchema**
</br>

#### *Note, that __dataSchema__ and its 'children' is mirrored at the frontend with a similar architecture, where an object is used.*<br/>*Upon full reloads, the backend also prepares such an object, as it is used in the frontend,*</br>*and sends it to the frontend. These preparations happen in __model/Data > prepareData()__*</br>*where the data is added via the recursive function __model/Data > fillUp()__*

#### The userSchema exists in the backend only though, also holding authentication data.

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