function setupNewRoutes() {

}

function getRessources() {
   import('../sourcefetchs.js').then((mod) => mod.getHeroLogo());
   import('../UIeffects.js').then((mod) => mod.listen4effects());
}

export { setupNewRoutes, getRessources };