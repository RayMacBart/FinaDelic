import { getFooterLogo } from "./sourcefetchs.js";
import { navigate } from "./routing/route.js";

getFooterLogo();
navigate();  // 'loggedoutHP' | 'loginPage' | 'loggedinHP' | 'flowPage' | 'chartPage' | 'terms' | 'privacy' | 'legal'