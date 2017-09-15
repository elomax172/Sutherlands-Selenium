"use strict";

var Page = require("../page.js");
const { By, Key, until } = require ('selenium-webdriver');

class TestPage extends Page {
    constructor( seleniumWebDriver ){
        super(seleniumWebDriver, "http://www.google.com");
    }

}
module.exports = TestPage;