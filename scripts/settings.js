import { MODULE } from "./const.js"

export let unlinkedStatusIcon = `modules/${MODULE}/icons/skull.svg`;
export let linkedStatusIcon = `modules/${MODULE}/icons/wound.svg`;
export let hitPath = "system.attributes.hp.value";

export function registerSettings() {

    game.settings.register(MODULE, "unlinkedStatusIcon", {
        name: "DEATHMARK.Settings.UnlinkedStatusIcon.Name",
        hint: "DEATHMARK.Settings.UnlinkedStatusIcon.Hint",
        scope: 'world',     // "world" = sync to db, "client" = local storage
        config: true,       // false if you dont want it to show in module config
        type: String,       // Number, Boolean, String,
        filePicker: "image",
        default: unlinkedStatusIcon
    })

    game.settings.register(MODULE, "linkedStatusIcon", {
        name: "DEATHMARK.Settings.LinkedStatusIcon.Name",
        hint: "DEATHMARK.Settings.LinkedStatusIcon.Hint",
        scope: 'world',     // "world" = sync to db, "client" = local storage
        config: true,       // false if you dont want it to show in module config
        type: String,       // Number, Boolean, String,
        filePicker: "image",
        default: linkedStatusIcon
    })

    game.settings.register(MODULE, "hitPath", {
        name: "DEATHMARK.Settings.HitPath.Name",
        hint: "DEATHMARK.Settings.HitPath.Hint",
        scope: 'world',     // "world" = sync to db, "client" = local storage
        config: false,       // false if you dont want it to show in module config
        type: String,       // Number, Boolean, String,
        default: hitPath
    })
}

export function cacheSettings() {
    unlinkedStatusIcon = game.settings.get(MODULE, 'unlinkedStatusIcon');
    linkedStatusIcon = game.settings.get(MODULE, 'linkedStatusIcon');
    hitPath = game.settings.get(MODULE, 'hitPath');
}