# API Communication

## full page reloading requests
#### The following backend routes are only triggered if the browser address-bar or reload-button is used:
#### triggering *generalPages.getRootPage()*:
GET /</br>
#### triggering *generalPages.getPage()*:
GET /legal</br>
GET /privacy</br>
GET /terms</br>
GET /workspace</br>
GET /chart</br>
GET /login</br>
#### The following route is requested from every page file in *src_in/routing*, inside the *setup...Links* method:
GET /logout   (backend redirection to '/')</br>
triggers: &nbsp;userCTRL > getLogout()
</br>

___
## AJAX-requests
requested @ *execSignIn()* @ src_out/routing/loginPage_src/serverInteraction:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /signup** &nbsp;[*frontend reaction: GET request to '/' (= full page reload)!*]</br>
triggers: &nbsp;userCTRL > postSignUp() --> model/User.create()
___
requested @ *execSignUp()* @ src_out/routing/loginPage_src/serverInteraction:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /signin** &nbsp;[*frontend reaction: GET request to '/' (= full page reload)!*]</br>
triggers: &nbsp;userCTRL > postSignIn()
___
requested @ *fetchUserData()* @ src_out/appData:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**GET /userdata**</br>
triggers: &nbsp;dataCTRL > getUserData() --> model/Data.getData() __+__ .prepareData()
___
requested @ *fetchTime()* @ src_in/timespan:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**GET /time**</br>
triggers: &nbsp;TimeCTRL > getTime()
___
requested @ *storeTimeSpan()* @ src_in/backendDataCommunication/timeDataPoster:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /time**</br>
triggers: &nbsp;TimeCTRL > setTime()
___
requested @ *fetchChartPaths()* @ src_in/chart:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**GET /chartPaths**</br>
triggers: &nbsp;chartCTRL > getChartPaths() --> model/Data.getData()
___
requested @ *processChartPath()* @ src_in/backendDataCommunication/chartDataPoster,
this is called by *add2chart()* @ src_in/modals_src/chartOps:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /chartPath**</br>
triggers: &nbsp;chartCTRL > postChartPath() --> model/Data.getData()
___
requested @ *processChartPath()* @ src_in/backendDataCommunication/chartDataPoster,
this is called by *removeFromChart()* @ src_in/modals_src/chartOps:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DELETE /chartPath**</br>
triggers: &nbsp;chartCTRL > delChartPath() --> model/Data.getData()
___
requested @ *#sendBagAction* @ src_in/backendDataCommunication/bagDataPoster:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /createBag**</br>
triggers: &nbsp;bagCTRL > postCreateBag() --> model/Bag.getBagDocFromPath() __+__ .createNestedBag()
___
requested @ *#sendBagAction* @ src_in/backendDataCommunication/bagDataPoster:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /renameBag**</br>
triggers: &nbsp;bagCTRL > postRenameBag() --> model/Bag.getBagDocFromPath() __+__ .renameBag()
___
requested @ *#sendBagAction* @ src_in/backendDataCommunication/bagDataPoster:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /eraseBag**</br>
triggers: &nbsp;bagCTRL > postEraseBag() --> model/Bag.getBagDocFromPath()
___
requested @ *#sendBagAction* @ src_in/backendDataCommunication/bagDataPoster:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /disbandBag**</br>
triggers: &nbsp;bagCTRL > postDisbandBag() --> model/Bag.getBagDocFromPath() __+__ .disbandBag()
___
requested @ *#sendBagAction* @ src_in/backendDataCommunication/bagDataPoster:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /moveBag**</br>
triggers: &nbsp;bagCTRL > postMoveBag() --> model/Bag.getBagDocFromPath() [2x] __+__ .moveBag()
___
requested @ *#sendFlowAction* @ src_in/backendDataCommunication/flowDataPoster:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /createFlow**</br>
triggers: &nbsp;flowCTRL > postCreateFlow() -->  model/Bag.getBagDocFromPath()__,__ model/Flow.createFlow()
___
requested @ *#sendFlowAction* @ src_in/backendDataCommunication/flowDataPoster:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /changeFlowAmount**</br>
triggers: &nbsp;flowCTRL > postChangeAmount() --> model/Bag.getBagDocFromPath()__,__ model/Flow.changeAmount()
___
requested @ *#sendFlowAction* @ src_in/backendDataCommunication/flowDataPoster:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /changeFlowDesc**</br>
triggers: &nbsp;flowCTRL > postChangeDesc() --> model/Bag.getBagDocFromPath()__,__ model/Flow.changeDesc()
___
requested @ *#sendFlowAction* @ src_in/backendDataCommunication/flowDataPoster:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /changeFlowDate**</br>
triggers: &nbsp;flowCTRL > postChangeDate() --> model/Bag.getBagDocFromPath()__,__ model/Flow.changeDate()
___
requested @ *#sendFlowAction* @ src_in/backendDataCommunication/flowDataPoster:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /deleteFlow**</br>
triggers: &nbsp;flowCTRL > postDeleteFlow() --> model/Bag.getBagDocFromPath()__,__ model/Flow.deleteFlow()
___
requested @ *#sendFlowAction* @ src_in/backendDataCommunication/flowDataPoster:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /moveFlow**</br>
triggers: &nbsp;flowCTRL > postMoveFlow() --> model/Bag.getBagDocFromPath() [2x] __,__ model/Flow.moveFlow()
___