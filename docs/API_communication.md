# API Communication

## full page reloading requests
#### The following backend routes are only triggered if the browser address-bar or reload-button is used:
GET /</br>
GET /legal</br>
GET /privacy</br>
GET /terms</br>
GET /workspace</br>
GET /chart</br>
GET /login</br>
#### The following route is triggered in every page file in *src_in/routing*, inside the *setup...Links* method:
GET /logout --> backend redirection to '/'</br>
</br>

___
## AJAX-requests
requested @ *execSignIn()* @ src_out/routing/loginPage_src/serverInteraction:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /signup** *--> frontend reaction: GET request to '/' (= full page reload)!*</br>
___
requested @ *execSignUp()* @ src_out/routing/loginPage_src/serverInteraction:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /signin** *--> frontend reaction: GET request to '/' (= full page reload)!*</br>
___
requested @ *fetchUserData()* @ src_out/appData:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**GET /userdata**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**GET /time**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /time**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**GET /chartPaths**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /chartPath**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**DELETE /chartPath**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /createBag**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /renameBag**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /eraseBag**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /disbandBag**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /moveBag**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /createFlow**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /changeFlowAmount**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /changeFlowDesc**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /changeFlowDate**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /deleteFlow**</br>
___
requested @ ** @ src_/:</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**POST /moveFlow**</br>
___