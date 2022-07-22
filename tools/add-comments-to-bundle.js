const fs = require("fs");

const DELAY = 2000;

const TAMPERMONKEY_HEADERS = `// ==UserScript==
// @name        MTG Monkey
// @description Price and collection plugin for MTG deck websites
// @namespace   github.com/cvzi
// @include     https://www.mtggoldfish.com/archetype/*
// @include     https://www.mtggoldfish.com/deck/*
// @include     https://www.mtgtop8.com/event?*
// @include     https://mtgtop8.com/event?*
// @include     https://mtgazone.com/deck/*
// @connect     www.floatrates.com
// @connect     api.scryfall.com
// @connect     c1.scryfall.com
// @connect     c2.scryfall.com
// @connect     c3.scryfall.com
// @connect     c4.scryfall.com
// @connect     c5.scryfall.com
// @version     0.1.0
// @author      witalewski
// @license     MIT
// @grant       GM.getValue
// @grant       GM.setValue
// @grant       GM.xmlHttpRequest
// ==/UserScript==
`;

const addCommentsToBundle = () =>
  setTimeout(() => {
    try {
      console.info("🐵 Adding tampermonkey comments to bundle...");
      const webpackBundle = fs.readFileSync("./dist/bundle.js", "utf8");
      const content = `${TAMPERMONKEY_HEADERS}\n${webpackBundle}\n`;
      fs.writeFileSync("./dist/bundle.user.js", content);
      console.info("✅ Finished adding tampermonkey comments to bundle.");
    } catch (err) {
      console.error(`❌ Failed to add tampermonkey comments to bundle:`);
      console.error(err);
    }
  }, DELAY);

module.exports = addCommentsToBundle;
