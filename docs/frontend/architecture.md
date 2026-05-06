# <p align="center">FRONTEND ARCHITECTURE</p>
</br>


### Since FinaDelic is a SPA, its frontend architecture is way more complex than its backend architecture.
#### We have to distinguish between the *authenticated area* SPA and the *public area* SPA.</br>The *authenticated area* provides all the core functionalities and features, so it is much bigger than the *public area*.
#### In both areas, all navigable pages are defined as templates within a single HTML file.

#### Some features can be found in both areas:
- central SPA 'boot' and routing (index.js, route.js)
- the ***shared footer***, which won't be affected by routing/navigation,
- A ***lazy load*** of SVGs (logo, icons upon hover).

#### Webpack is used to build/bundle from each *origin* to each *target* (both specified below).

#### NOTE:</br>As this was my first large SPA, some architectural inconsistencies reflect my early experience.</br>The most significant one concerns state management:</br>The state is mainly shared through parameter‑based propagation, but in some cases through module imports/exports too.</br>Refactoring the codebase to use imports/exports consistently would likely improve the overall architecture.
___

</br>

## <p align="center">THE PUBLIC AREA</p>
origin: *src_out/*</br>
dev-target: *public/*</br>
prod-target: *dist_out/*</br>

### The public area’s architecture is centered around its pages and their routing.
#### THERE ALSO ARE SOME SHARED & NOT ROUTE-SPECIFIC FEATURES THOUGH:
- the SPA initialization at ***index.js***
- routing at ***route.js***
- the *footer* part of every page at ***footer.js***
- lazy SVG imports upon hovers at ***lazyLoader.js***
</br>
</br>

#### BE AWARE OF THE FOLLOWING STATE PROPAGATION:
**App**-instance @ index.js --> new Router @ *route.js* --> *all **setup()** methods of all pages modules*
</br>
</br>

#### Also note, that **showInfo()** from *routing/loginPage_src/infos.js* is imported and used by:</br> &nbsp;&nbsp;&nbsp; - routing/loginPage.js,</br> &nbsp;&nbsp;&nbsp; - routing/loginPage_src/inputChecker.js,</br> &nbsp;&nbsp;&nbsp; - routing/loginPage_src/serverInteraction.js
___

</br>
</br>


## <p align="center">THE AUTHENTICATED AREA</p>
origin: *src_in/*</br>
dev-target: *public/*</br>
prod-target: *dist_in/*</br>

### Overall, the authenticated area's architecture is centered around its pages and their routing too, but also provides way more functionalities, state and utilities shared by all the pages, which affect the whole app.
</br>

#### SHARED & NOT ROUTE-SPECIFIC FEATURES ARE:
- the SPA initialization at ***index.js***
- routing at ***route.js***
- shared, dynamic user data (state) at ***appData.js***
- modals at ***modal.js***
- the operations triggered by different modals in multiple modules inside ***modals_src/***
- static content of modals at ***modalContents.js***
- the config of the timespan used for transactional data and charts at ***timespan.js***
- data used for the charts at ***chart.js***
- the *footer* part of every page at ***footer.js***
- hints in boxes from ***info.js***
- lazy SVG imports upon hovers at ***lazyLoader.js***
</br>
</br>
</br>

### Selection of Modules, Instances and Methods that are imported/used by multiple modules:
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Sorted by modules. Read each line as: *"...: is imported and used by ..."*)
___

### index.js
**app.chart:**&nbsp;&nbsp;&nbsp; chartAdjuster.js &nbsp;| &nbsp; chartOps.js
</br>
**app.timespan, app.router:**&nbsp;&nbsp;&nbsp; timeSet.js

___
### infos.js
#### **showInfo():**
in *backendDataCommunication/*:</br> bagDataPoster.js &nbsp;| &nbsp; flowDataPoster.js &nbsp;| &nbsp; timeDataPoster.js</br></br>
in *modals_src/*:</br> bagSubmits.js &nbsp;| &nbsp; flowSubmits.js &nbsp;| &nbsp; chartOps.js &nbsp;| &nbsp; inputModal.js &nbsp;| &nbsp; timeSet.js

___
### flowPage_src/renderAmount.js
#### renderAmount()
in *routing/flowPage_src/*:</br>
baglist.js &nbsp;| &nbsp; flowlist.js &nbsp;| &nbsp; flowPageSurface.js

___
### modals_src/chartOps.js
chart.js &nbsp;| &nbsp; modals_src/chartAdjuster.js &nbsp;| &nbsp; modals_src/modalSubmitAllocator.js

___
### modals_src/submitUtils.js
appData.js &nbsp;| &nbsp; modals_src/bagSubmits.js &nbsp;| &nbsp; modals_src/flowSubmits.js &nbsp;| &nbsp; modals_src/selectModal.js
___


</br>

### <p align="center">STATE PROPAGATIONS *(authenticated area)*:</p>
<p align="center">

**App**-instance @ index.js --> new Router @ *route.js* --> *all **setup()** methods of all pages modules*
</p>
