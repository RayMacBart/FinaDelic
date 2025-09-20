
class Footer {

   constructor(navigate, importSVG) {
      this.getLogo(navigate, importSVG);
      this.setupLinks(navigate);
   }

   async getLogo(navigate, importSVG) {
      this.logo = await importSVG('FinaDelic Logo Footer', 'footerLogoBox', ['logo', 'logo--footer']);
      this.logo.addEventListener('click', () => navigate());
   }

   setupLinks(navigate) {
      document.querySelector('menu :nth-child(1) > a').addEventListener('click', (e) => {e.preventDefault(); navigate('terms');});
      document.querySelector('menu :nth-child(2) > a').addEventListener('click', (e) => {e.preventDefault(); navigate('privacy');});
      document.querySelector('menu :nth-child(3) > a').addEventListener('click', (e) => {e.preventDefault(); navigate('legal');});
   }
}


export default Footer;