# Special Flows

## the workspace refreshing customEvent
A custom Event created at the constructor of ***flowpage***, and an eventListener is added inside its method ***#renderFlowPage()*** to the ***boundRefreshHandler()*** of the toolbar.</br>The Event is forwarded to ***Toolbar*** and from there it's forwarded to ***ToolbarEventHandler***, always being passed to the constructors.
Reason: in ***ToolbarEventHandler***, where the functionality of toolbar buttons is implemented which need reloads, this custom Event is dispatched (=triggered).
___
## The 'revisitFlag'-Symbol
This is a constant Symbol stored at ***appData***, which is only used to preserve the workspace's state after coming back from another page.</br>Only when coming back from another page, the symbol ***revisitFlag*** is used instead of ***bagname*** inside ***flowpage's*** ***#renderFlowPage()***. </br>Usually, bagname would determine where to navigate inside the workspace,</br>but ***revisitFlag*** causes the app to navigate to the very same bag again</br>- by not changing ***appData's*** ***currentBag***, which usually would be used as workspace destination.