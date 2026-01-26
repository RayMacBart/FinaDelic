globalThis["webpackHotUpdatefinadelic"]("src_out_routing_loginPage_src_serverInteraction_js",{

/***/ "./src_out/routing/loginPage_src/serverInteraction.js":
/*!************************************************************!*\
  !*** ./src_out/routing/loginPage_src/serverInteraction.js ***!
  \************************************************************/
/***/ ((module) => {

class SIA {
   static async execSignUp(event) {
      const response = await fetch('/signup', {
                                                method: 'POST',
                                                body: JSON.stringify({email: event.target.form[0].value,
                                                                      password: event.target.form[1].value}),
                                                headers: {
                                                   'Content-Type': 'application/json'
                                                }
                                             });
      if (response.status === 404) {
         alert("We are sorry!\nYour sign up failed due to a server error.\nWe'll fix it fast!");
      }
   }
}

module.exports = SIA;

/***/ })

});