import termsEnglish from "./termsEnglish";
import termsGerman from "./termsGerman";

const styling = `
   <style>
   .compPage {
      font-weight: 450;
   }
   .compPage strong {
      font-weight: 650;
   }
   .compPage em {
      font-style: italic;
   }
   .compPage li {
      padding-left: 0.7rem;
      margin-left: 3rem;
      margin-top: 0.8rem;
      margin-bottom: 0.7rem;
      color: #007;
      font-weight: 550;
   }
   ul {
      list-style-type: disc;
   }
    @media screen and (min-width: 576px) {
      #termsContainer {
         width: 30rem;
      }
      #termsContainer > article {
         width: 30rem;
      }
      .compPage__artwrap, .compPage__title, .compPage__paragraph {
         width: 30rem;
      }
    }
   ul {
      list-style-type: disc;
   }
    @media screen and (min-width: 880px) {
      #termsContainer {
         width: 42rem;
      }
      #termsContainer > article {
         width: 42rem;
      }
      .compPage__artwrap, .compPage__title, .compPage__paragraph {
         width: 42rem;
      }
    }
</style>`;

const termsHTML = styling + termsEnglish + termsGerman;

export default termsHTML;