"use strict";

class Page {

    init(seleniumWebDriver){
        this.webDriver = seleniumWebDriver;
    }

    get driver() { return this.webDriver; }

    async open(url){
        await this.webDriver.get(url);
    }
}

module.exports = Page;