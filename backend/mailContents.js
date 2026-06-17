exports.verificationEmail = (mailToken, userEmail) => {
   return '<body style="height: 100%; background: linear-gradient(180deg, rgba(13, 26, 115, 0.50) 0%, rgba(213, 218, 246, 0.20) 11%, #F7F8FD 100%), #F7F8FD; background-repeat: none">' +
   '<h1 style="color: #3B489C; width: fit-content; font-weight: 480; height: 100%; font-size: 2.5rem; margin-left: auto; margin-right: auto; padding-bottom: 1.8rem;">FinaDelic</h1>' +
   `<img src="cid:bglogo@finadelic.com" alt="logo background" style="margin: auto; background-size: contain; background-repeat: none; ` +
   'width: 20rem; height: 12rem; left: calc(50dvw - 10rem); top: calc(50dvh - 6rem); position: fixed; opacity: 0.33; z-index: 0;">' +
   '<div style="margin-left: 3rem">' +
   '<p style="font-weight: 500; font-size: 1.4rem; margin-bottom: 1rem">Use the link below to verify your email:</p>' +
   `<a style="margin-left: 1rem; font-size: 1.5rem" href="https://www.finadelic.com/confirmation?token=${mailToken}&usermail=${userEmail}">-- CLICK HERE FOR ACCOUNT VERIFICATION --</a>` +
   '<p style="font-weight: 400; font-size: 1.2rem; margin-top: 1rem">This link expires in 10 Minutes.</p>' +
   '<p style="margin-top: 4rem; font-size: 1.3rem;">Please contact us if you need any further help:</p>' +
   '<p style="font-weight: 600; font-size: 1.4rem; margin-left: 4rem">support@finadelic.com</p>' +
   '<h2 style="color: #3B489C; font-weight: 480; margin-left: 2rem; margin-top: 4.5rem; height: 100%; font-size: 1.5rem;">FinaDelic - Total Freedom in Money Mastery</h2>' + 
   '<img src="cid:logo@finadelic.com" alt="FinaDelic Logo" style="width: 10rem; background-size: contain; background-repeat: none; margin-left: 10rem">' +
   '</div></body>'
}


exports.resetEmail = (mailToken, userEmail) => {
   return '<body style="height: 100%; background: linear-gradient(180deg, rgba(13, 26, 115, 0.50) 0%, rgba(213, 218, 246, 0.20) 11%, #F7F8FD 100%), #F7F8FD; background-repeat: none">' +
   '<h1 style="color: #3B489C; width: fit-content; font-weight: 480; height: 100%; font-size: 2.5rem; margin-left: auto; margin-right: auto; padding-bottom: 1.8rem;">FinaDelic</h1>' +
   `<img src="cid:bglogo@finadelic.com" alt="logo background" style="margin: auto; background-size: contain; background-repeat: none; ` +
   'width: 20rem; height: 12rem; left: calc(50dvw - 10rem); top: calc(50dvh - 6rem); position: fixed; opacity: 0.33; z-index: 0;">' +
   '<div style="margin-left: 3rem">' +
   '<p style="font-weight: 500; font-size: 1.4rem; margin-bottom: 1rem">Click on the link below to reset your password:</p>' +
   `<a style="margin-left: 1rem; font-size: 1.5rem" href="https://www.finadelic.com/PWresetPage?token=${mailToken}&usermail=${userEmail}">-- LINK TO PASSWORD RESET PAGE --</a>` +
   '<p style="font-weight: 400; font-size: 1.2rem; margin-top: 1rem">This link expires in 10 Minutes.</p>' +
   '<p style="margin-top: 4rem; font-size: 1.3rem;">Please contact us if you need any further help:</p>' +
   '<p style="font-weight: 600; font-size: 1.4rem; margin-left: 4rem">support@finadelic.com</p>' +
   '<h2 style="color: #3B489C; font-weight: 480; margin-left: 2rem; margin-top: 4.5rem; height: 100%; font-size: 1.5rem;">FinaDelic - Total Freedom in Money Mastery</h2>' + 
   '<img src="cid:logo@finadelic.com" alt="FinaDelic Logo" style="width: 10rem; background-size: contain; background-repeat: none; margin-left: 10rem">' +
   '</div></body>'
}
   

