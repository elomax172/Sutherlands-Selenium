"use strict";

var fs = require('fs');

class SeleniumHelpers {
/**
 * Cross cutting helper class for Selenium WebDriver
 * @param {WebDriver} seleniumWebDriver
 * @param {string} baseFileName - FileName will have NNNN.jpg appended by saveScreenshot
 */    
    constructor( seleniumWebDriver, baseFileName ){
        this.driver = seleniumWebDriver;
        this.fileName = baseFileName;

        this.screenshotCounter = 0;
        this.screenshotPad = 4;
    }

/**
 * Calls WebDriver.takeScreenshot() and saves to an auto-incremented file
 */    
    async saveScreenshot(){
        let paddedCounter = ("" + this.screenshotCounter++)
            .padStart(this.screenshotPad, "0");
        let fn = `${this.fileName}${paddedCounter}.jpg`;
        //console.log(fn);

        var data = await this.driver.takeScreenshot();
        let base64data = data.replace(/^data:image\/png;base64,/,'');
        await fs.writeFile(
            fn, 
            base64data, 
            'base64', 
            function(err) {
                if(err){
                    console.log("Screenshot Error "+err);
                    throw err;                       
                }
            }
        );
    };
}

module.exports = SeleniumHelpers