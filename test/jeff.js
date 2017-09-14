"use strict";

// Node --version 8.2.1

// Require Packages
var assert = require('assert');
var csv = require('fast-csv');
const fs = require('fs'); // Built into NodeJS
const {Builder, By, Capabilities, Key, logging, until, error } = require ('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const seleniumHelpers = require("../selenium-helpers.js");
var loginPage = require("../pages/login.page.js");
var editPage = require("../pages/edit.page.js");
var testPage = require("../pages/test.page.js");

// Setup optional logging
logging.installConsoleHandler();
logging.getLogger('webdriver.http').setLevel(logging.Level.ALL);
//logging.getLogger('server').setLevel(logging.Level.ALL);

// Create WebDriver
var builder = new Builder()
    .withCapabilities(Capabilities.chrome());

var driver = builder.build();

// https://umaar.com/dev-tips/124-webdriver-js/
//const link = webdriver.until.elementLocated(webdriver.By.css('[href="http://seleniumconf.co.uk/"]'));
//	(await browser.wait(link, 2000)).click();
async function waitTest(){
    try{
        // Create Page Object
        let testPageObject = new testPage(driver);      

        await testPageObject.open();

        let searchInputElement = driver.findElement(By.id("lst-ib"));
        await driver.wait(until.elementIsVisible(searchInputElement));
        await searchInputElement.sendKeys("selenium webdriver" + Key.ESCAPE);

        let locator = By.id("jeff");

        var elementExists = await testPageObject.checkForElement(locator);
        if( !elementExists ){
            console.log(`${locator.toString()} not found`);
        }

        try{
            // Until
            // elementIs[Disabled|Enabled|Selected|Visible]
            // elementIsNot[Selected|Visible}
            // element[Located]
            // elementText[Is|Contains|Matches]
            // more https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html
            const l = await driver.wait(
                until.elementLocated(By.id("q")),
                1000
            );   
        }
        catch( e ){
            if( e instanceof error.TimeoutError ){
                // Did not find element
                console.log("Did not find element");
            } else {
                throw e;
            }
        }
        
        driver.quit();
    }
    catch( e ){
        console.error('>>>method waitTest Failed:' + e);
    } 
}



async function editPageTest(){
    try{
        // Create Page Object
        let editPageObject = new editPage(driver);

        var sku = "4437372";

        // Navigate to URL
        await editPageObject.open(sku);
        
        driver.quit();
    }
    catch( e ){
        console.error('>>>method editPageTest Failed:' + e);
    } 
}


// Login Page Test
async function loginPageTest(){
    try {
        // Create Page Object
        // Reads default username/pw from dev_credentials env var
        var loginPageObject = new loginPage(driver);  

        // Navigate to URL
        await loginPageObject.open();

        var userNameElement = await loginPageObject.setUserName();

        var userNameText = await loginPageObject.getUserNameText(userNameElement);
        console.log(`"Sent Username ${userNameText}`);

        await loginPageObject.clickSubmitButton();

        driver.quit();

    }
    catch( e ){
        console.error('>>>method loginPageTest Failed:' + e);
    }
}


async function editPageExample(){
    try {

        // Create cross-cutting helper class
        var seleniumHelper = new seleniumHelpers(driver,"testme");       

        await driver.get('https://sutherlands.com/products/item/1010644/Turtle-Wax-Bug-Tar-Remover&s_market=true');

        // Item Description
        var contentFeature = await driver.findElement(By.id("content-feat"));

        var descriptionElement = await contentFeature.findElement(By.tagName("p"));
        var descriptionText = await descriptionElement.getText();

        //await saveScreenshot(driver, "testme.jpg");
        await seleniumHelper.saveScreenshot();

        // Price, if displayed
        var isPriceDisplayed = false;
        var priceText = "No Price";
/*        
        try {
            var priceElements = await driver.findElement(By.css('span.price'));
            isPriceDisplayed = true;
            priceText = await priceElements[0].getText();    
        }
        catch( findElementException ){
            console.log("Did not find price");
        }
*/
        console.log(`Price: ${priceText}`);

        driver.quit(); // Closes the Browser and ends the webdriver session
    } catch( e ){
        console.error('>>>Fail:editPageExample' + e);
    }
}
//editPageExample();
//loginPageTest();
//editPageTest();
waitTest();
