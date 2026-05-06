# <p align="center">FinaDelic</p>

<div align="center"> &nbsp;&nbsp;&nbsp;&nbsp;<img style="width: 35%; height: auto" src="assets/FinaDelic%20Logo%20Nav.svg"> </div>

## <p align="center">finance organizer tool</p>

#### <p align="end">Built by: *Reinhard Höbart*</p></br>
### This is a webapp that lets users organize and visualize their incomes and expenses. It is for private purposes only.
</br>

#### &nbsp; Note, that most of the features are implemented already, but the app is not finished yet, though.</br></br><p align="end">If you want, you can check out the [still missing features](docs/missing.md).</p>
</br>

*There are no automatic synchronizations with other services - users have to make their entries manually.*</br>*BUT: adding transactions is **easy** - FinaDelic is built for **fast** day to day usage.*</br>*Advantage of manual entries: it ensures maximum privacy.*</br>
___

### <p align="center">For more technical details, read the <span style="text-decoration: underline">[docs](docs/)</span></p>
#### <p align="end">Since this is a SPA, I recommend to take a look at the [frontend architecture](/docs/frontend/architecture.md)</p>
#### <p align="end">If interested, also check out the used [tech-stack](/docs/used_tech.md)</br></p>
___
</br>

## FEATURES:
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
