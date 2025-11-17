class ChartPage {

   #setupChartPageLinks(app) {

   }

   setup(app) {
      this.#setupChartPageLinks(app);
      app.makeIconHoverEffect('switch');
      app.makeIconHoverEffect('clock');
      app.makeIconHoverEffect('flows');
      app.makeIconHoverEffect('logout');
   }
}

export default ChartPage;