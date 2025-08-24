function listen4effects() {
   const logOutIcon = document.querySelector('.icon, .icon--logout');
   logOutIcon.addEventListener('mouseenter', () => {
      logOutIcon.src = './assets/logout_hovered.svg';
   })
   logOutIcon.addEventListener('mouseover', () => {
      logOutIcon.src = './assets/logout_hovered.svg';
   })
   logOutIcon.addEventListener('mouseleave', () => {
      logOutIcon.src = './assets/logout.svg';
   })
}

export { listen4effects };