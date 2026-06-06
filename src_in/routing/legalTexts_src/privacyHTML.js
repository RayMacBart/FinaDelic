import privacyEnglish from "./privacyEnglish";
import privacyGerman from "./privacyGerman";

const styling = `<style>
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
   .table {
      list-style-type: decimal;
   }
   ul {
      list-style-type: disc;
   }
    @media screen and (min-width: 576px) {
      #privacyContainer {
         width: 30rem;
      }
      #privacyContainer > article {
         width: 30rem;
      }
      .compPage__artwrap, .compPage__title, .compPage__paragraph {
         width: 30rem;
      }
    }
    @media screen and (min-width: 880px) {
      #privacyContainer {
         width: 42rem;
      }
      #privacyContainer > article {
         width: 42rem;
      }
      .compPage__artwrap, .compPage__title, .compPage__paragraph {
         width: 42rem;
      }
    }
</style>`;
const privacyHTML = styling + privacyEnglish + privacyGerman;

export default privacyHTML;