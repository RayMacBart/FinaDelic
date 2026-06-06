import privacyHTML from './legalTexts_src/privacyHTML';

class PrivacyPage {

   constructor() {
      this.boundSwitchLang = this.switchLang.bind(this);
   }

   retrieveElems() {
      this.englishArticle = document.getElementById('englishPriPol');
      this.germanArticle = document.getElementById('germanPriPol');
      this.englishSwitch = document.getElementById('priPolEnglishSwitchWrap');
      this.germanSwitch = document.getElementById('priPolGermanSwitchWrap');
      this.englishTitle = document.getElementById('englishPriPolHeader');
      this.germanTitle = document.getElementById('germanPriPolHeader');
   }

   switchLang(event) {
      let val1;
      let val2;
      if (event.target.id === 'priPolGermanLangSwitch' || event.target.id === 'priPolGermanLangSwitchLabel') {
         val1 = 'none';
         val2 = 'block';
      } else if (event.target.id === 'priPolEnglishLangSwitch' || event.target.id === 'priPolEnglishLangSwitchLabel') {
         val1 = 'block';
         val2 = 'none';
      }
      this.englishArticle.style.display = val1;
      this.germanSwitch.style.display = val1;
      this.englishTitle.style.display = val1;
      this.germanArticle.style.display = val2;
      this.englishSwitch.style.display = val2;
      this.germanTitle.style.display = val2;
   }

   setup(app) {
      document.querySelector('.loginBackButton').addEventListener('click', () => app.router.navigate('loggedinHP'), ['page--landing']);
      document.getElementById('privacyContainer').innerHTML = privacyHTML;
      this.retrieveElems();
      document.getElementById('priPolGermanSwitchWrap').addEventListener('click', this.boundSwitchLang);
      document.getElementById('priPolEnglishSwitchWrap').addEventListener('click', this.boundSwitchLang);
   }
}

export default PrivacyPage;