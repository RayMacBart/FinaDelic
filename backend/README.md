# <p align="center">FinaDelic</p>

<div align="center"> &nbsp;&nbsp;&nbsp;&nbsp;<img style="width: 35%; height: auto" src="assets/FinaDelic%20Logo%20Nav.svg"> </div>

## <p align="center">finance organizer tool</p>

#### <p align="end">Built by: *Reinhard Höbart*</p></br>
### This is a webapp that lets users organize and visualize their incomes and expenses. It is for private purposes only.
</br>

#### Most of the features are implemented already. The app is not finished yet, though. If you want, you can check out the [still missing features](docs/missing.md).
</br>

*There are no automatic synchronizations with other services - users have to make their entries manually.* </br>*BUT: adding transactions is **easy** - FinaDelic is built for **fast** day to day usage.*</br>*Advantage of manual entries:* &nbsp;*Ensures maximum privacy.*
</br>
</br>
___

### <p align="center">For more technical details, read the documentation. You can find links to the docs <span style="text-decoration: underline">[here](#bottom)</span></p>
#### <p align="center">Since this is a SPA, I especially recommend to learn about the [frontend architecture](/docs/frontend/architecture.md)</p>
#### <p align="center">If interested, also check out the used [tech-stack](/docs/used_tech.md)</br></p>
___
</br>
</br>
</br>

# <p align="center"> Features</p>
</br>

## <p align="center">The workspace</p>

<p align="center">Inside the 'IN'-area and inside the 'OUT'-area, users can create custom accounts ('Boxes') without limits, nested to any depth.</br>'In-Boxes' organize single transactions called 'Gains', 'Out-Boxes' organize single transactions called 'Losses'.</br>Any amount of transactions can be added to each Box.</p>
</br>

### <p align="center">Available operations on Boxes:</p>
- Creation
- Rename
- Disband ( = Move all its content to the parent box, then delete it)
- Erase ( = Delete the box including its content)
- Move ( ...into another box)
</br>
</br>

### <p align="center">Available operations on Gains and Losses:</p>
- Creation (users have to enter date, description and amount)
- Deletion
- Move (...into another box)
- Change date
- Change description
- Change amount
</br>
</br>

#### *A timespan can be configured as a filter (Start-Date & End-Date). Gains and Losses outside of this timespan will be hidden.*
</br>
</br>

___

## <p align="center">The Chart</p>

<p align="center">Each Box's data can be added to the chart (and of course, it can be removed from it).</br>A separate chart-page provides visualizations showing how the boxes compare to each other.</br>Users can choose between a TIMELINE-view or a PIE-view.</p>

#### *The configured timespan is also used in the TIMELINE charts: There, an automatic time axis aggregation is implemented as well.*
</br>
</br>
</br>
</br>
<a id="bottom"></a>



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