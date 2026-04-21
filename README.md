# &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FinaDelic

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![FinaDelic Logo](/assets/FinaDelic%20Logo%20Nav.svg)

## &nbsp;&nbsp;&nbsp;&nbsp;finance organizer tool</br>

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Built by: *Reinhard Höbart*
### This is a webapp that lets users organize and</br>visualize their incomes and expenses.</br>It is for private purposes only.
#### &nbsp; This app is not finished yet, but it will be finished soon.</br>&nbsp;&nbsp;(For missing features: see below.)
</br>

*There are no automatic synchronizations with other services -*</br>*users have to make their entries manually.*</br>*Advantage: This ensures maximum privacy.*</br>*Adding transactions manually is made **easy**</br>&nbsp;- FinaDelic is built for **fast** day to day usage.*</br>

##### &nbsp;&nbsp;&nbsp;&nbsp;TECHNICAL NOTE:</br></br>FinaDelic is a SPA built with vanilla JavaScript at the front end &</br>Node/Express + MongoDB (Mongoose) at the Backend.</br>It also uses SASS, webpack+babel, chart.js, crypto, express-session,</br>express-validator, argon2, dr.pogodin/csurf, helmet.js and more.
_______


### The workspace

Inside the 'IN'-area and inside the 'OUT'-area,</br>users can create custom accounts ('Boxes') without limits, nested to any depth.</br>'In-Boxes' organize single transactions called 'Gains',</br>'Out-Boxes' organize single transactions called 'Losses'.</br>Any amount of transactions can be added to each Box.
</br>

#### Available operations on Boxes:
- Creation
- Rename
- Disband ( = Move all its content to the parent box, then delete it)
- Erase ( = Delete the box including its content)
- Move ( ...into another box)
</br>

#### Available operations on Gains and Losses:
- Creation (users have to enter date, description and amount)
- Deletion
- Move (...into another box)
- Change date
- Change description
- Change amount

#### *A timespan can be configured as a filter (Start-Date & End-Date).</br>Gains and Losses outside of this timespan will be hidden.*
_____

### The Chart

Each Box's data can be added to the chart (and of course, it can be removed from it).</br>A separate chart-page provides visualizations showing how the boxes compare to each other.</br>Users can choose between a TIMELINE-view or a PIE-view.

#### *The configured timespan is also used in the TIMELINE charts:</br>There, an automatic time axis aggregation is implemented as well.*

____

### Still missing features:
- production-ready Terms & Conditions
- production-ready Privacy Policy
- e-mail verification upon sign up
- password reset functionality
- user account deletion feature
- data backups
- aria roles
- help/tutorial page
- 'rolling' enddate config. switch for users
- more error handling
- implement optimistic front end operations (UX!)
- migration to TypeScript
- Vitest unit testing