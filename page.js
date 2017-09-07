"use strict";

// Page Object Pattern prototype
// https://www.martinfowler.com/bliki/PageObject.html

class Page {
    constructor( seleniumWebDriver, url ){
        this.webDriver = seleniumWebDriver;
        this.url = url;
        console.log(`PAGE CTOR ${url}`);
    }

    get driver() { 
        return this.webDriver; 
    }

    async open( url = this.url ){
        await this.webDriver.get(url);
    }
}

module.exports = Page;