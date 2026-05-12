# Special Flows

## the workspace refreshing customEvent
A custom Event created at the constructor of ***flowpage***, and an eventListener is added inside its method ***#renderFlowPage()*** to the ***boundRefreshHandler()*** of the toolbar.</br>The Event is forwarded to ***Toolbar*** and from there it's forwarded to ***ToolbarEventHandler***, always being passed to the constructors.
Reason: in ***ToolbarEventHandler***, where the functionality of toolbar buttons is implemented which need reloads, this custom Event is dispatched (=triggered).
___
## The 'revisitFlag'-Symbol
This is a constant Symbol stored at ***appData***, which is only used to preserve the workspace's state after coming back from another page.</br>Only when coming back from another page, the symbol ***revisitFlag*** is used instead of ***bagname*** inside ***flowpage's*** ***#renderFlowPage()***. </br>Usually, bagname would determine where to navigate inside the workspace,</br>but ***revisitFlag*** causes the app to navigate to the very same bag again</br>- by not changing ***appData's*** ***currentBag***, which usually would be used as workspace destination.

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