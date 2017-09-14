"use strict";

// Page Object Pattern prototype
// https://www.martinfowler.com/bliki/PageObject.html
const { By, Key, until } = require ('selenium-webdriver');

class Page {
    constructor( seleniumWebDriver, url ){
        this.webDriver = seleniumWebDriver;
        this.url = url;
        console.log(`PAGE CTOR ${url}`);
    }

    /**
    * Return page url.  Overridden in derived page objects
    * so each can decorate its url as needed
    */  
    getPageUrl(){
        return this.url;
    }

    // This is a property, for now, no async/await
    get driver() { 
        return this.webDriver; 
    }

    async open(){
        let baseOrDerivedUrl = this.getPageUrl();
        await this.webDriver.get(baseOrDerivedUrl);
    }

    /**
     * Checks if an element is on a page
     * @param {By} locator
     */           
    async checkForElement( locator ){
        let elementExists = await this.webDriver
            .findElements(locator)
            .count > 0;
        return elementExists;
    }

}

module.exports = Page;