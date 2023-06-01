import { MODULE } from "./const.js"
import { registerSettings, cacheSettings } from "./settings.js"

//Compatibility with v9
let fvttVersion
//Compatibility with PF2E
let system

Hooks.once('init', async function () {
    registerSettings();
    cacheSettings();
});

Hooks.once('ready', async function () {
    fvttVersion = parseInt(game.version)
    system = game.system.id
    console.log(" ======================================== 💀 Death Mark  ========================================= ")
    console.log(" ==================================== FoundryVTT Version:", fvttVersion, " ==================================== ")
});

Hooks.on("ready", () => {
    if (game.user.isGM) Hooks.on("updateActor", updateActor)
})

//settings
function getSetting(key) {
    return game.settings.get(MODULE, key)
}

async function updateOverlay(actor) {
    let linked = actor.isToken ? "unlinked" : "linked"
    let img = getSetting(`${linked}StatusIcon`);
    let npcToken = actor.parent
    let playerToken = null
    if (linked === "unlinked") {
        if (!npcToken.actor.isDead) img = ''
        await npcToken.update({ overlayEffect: img })
    } else {
        if (!actor.isDead) img = ''
        playerToken = canvas.scene.tokens.find(t => t.actorId === actor.id)
        await playerToken.update({ overlayEffect: img })
    }
}

async function updateActor(actor, update) {
    // console.log("====================================== 💀 Death Mark  =======================================", actor, update)
    if (!game.user === game.users.find(u => u.isGM && u.active)) return //first GM only
    let hp = getProperty(update, getSetting("hitPath"))
    if (hp === undefined) {
        if (getProperty(actor, getSetting("hitPath")) === undefined) console.warn(`${MODULE} | The setting ${game.i18n.localize("DEATHMARK.Settings.HitPath.Name")} is not a valid property of actor or that property is undefined`)
        return
    }
    await updateOverlay(actor)
}