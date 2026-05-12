# Cautionary Hints
</br>

## Chart synchronizations upon bag changes
Bags, which are added to the chart, may change.</br>Ensure that the functionality that updates the chart automatically upon bag changes keeps working!</br>In each operation execution within modules ***bagSubmits*** and ***flowSubmits***, the method ***checkAndAdjustChart()*** from the module ***submitUtils*** is called. There, ***getAffectedChartBags()*** and ***refreshAffectedCharts()*** from the module ***chartAdjuster*** are called. In these methods, the chart is updated using the ***chart*** object imported from ***index.js***, as well as methods of the module ***chartOps*** are called.</br>

#### An old note about this:
&nbsp;&nbsp;&nbsp;*CHART CHANGES AND BAG-REFRESH:*</br>&nbsp;&nbsp;&nbsp;*This only works if the changes which are worth to be applied on the chart*</br>&nbsp;&nbsp;&nbsp;*always trigger reload and hence a new toolbar button is built.*</br>&nbsp;&nbsp;&nbsp;*Take care of this fact!*
____

## timespan enddate include
The number '86400000' was added to the timespan's end within the check,</br>to cause an inclusion of the end date's full day. 86400000 is the number of milliseconds in a day.</br>Otherwise, it would end at 00:00 at the end date.</br>Now, as it seems, it ends on the day after the enddate at 00:00 (!)

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