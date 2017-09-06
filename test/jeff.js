"use strict";

// Node --version 8.2.1

var assert = require('assert');
var csv = require('fast-csv');
const fs = require('fs'); // Built into NodeJS
const {Builder, By, Capabilities, Key, logging, until } = require ('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const seleniumHelpers = require("../selenium-helpers.js");
const loginPageObject = require("../pages/login.page.js");


logging.installConsoleHandler();
logging.getLogger('webdriver.http').setLevel(logging.Level.ALL);
//logging.getLogger('server').setLevel(logging.Level.ALL);

var builder = new Builder()
    .withCapabilities(Capabilities.chrome());

var driver = builder.build();

async function jeff(){
    try {
        var loginPage = new loginPageObject();  
        loginPage.init(driver);

        await loginPage.open();

        var userNameElement = await loginPage.setUserName("sutherlands lumber");

        var userNameText = await loginPage.getUserNameText(userNameElement);
        console.log(`"Sent Username ${userNameText}`);

        driver.quit();

    }
    catch( e ){
        console.error('>>>method Jeff Failed:' + e);
    }
}


async function tests1(){
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
        console.error('>>>Fail:' + e);
    }
}
//tests();
jeff();
