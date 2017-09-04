//"use strict";

// Node --version 8.2.1
// "edgedriver": "^3.14393.0",
// "mocha": "^3.4.2",
// "selenium-webdriver": "^3.5.0"

// Open Folder, Ctrl-Shift-P, open Launch json
// Create Node Launch Program debug configuration
//    {
//        "type": "node",
//        "request": "launch",
//        "name": "Launch Program",
//        "program": "${workspaceRoot}/test/test.js"
//    }
// Might need         "protocol":"inspector", but should be automatic

// https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs
// https://stackoverflow.com/questions/36309529/selenium-webdriver-js-how-to-wait-until-an-element-is-visible
// http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/logging_exports_Logger.html
// https://github.com/SeleniumHQ/selenium/blob/master/javascript/node/selenium-webdriver/lib/logging.js#L668

var assert = require('assert');
var csv = require('fast-csv');
const fs = require('fs'); // Built into NodeJS
const seleniumHelpers = require("../selenium-helpers.js");
const {Builder, By, Capabilities, Key, logging, until } = require ('selenium-webdriver');
const test = require('selenium-webdriver/testing');

logging.installConsoleHandler();
logging.getLogger('webdriver.http').setLevel(logging.Level.ALL);
//logging.getLogger('server').setLevel(logging.Level.ALL);

var builder = new Builder()
    .withCapabilities(Capabilities.chrome());

var driver = builder.build();

 // I’m not positive this really is the URL.  Ideally, we want the actual login page, not
 // a page we enter and get redirected to login.
  // it might be https://inet.sutherlands.com/
  // But look closely for the URL once you have been taken to the login page.
  yield driver.get(“https://inet.sutherlands.com/”);
  
     var userName = yield driver.findElement(By.id("mod_login_username"));
     yield userName.clear();
     yield userName.sendKeys("yourusername");
    
     var password = yield driver.findElement(By.id("mod_login_password"));
     yield password.clear();
     yield password.sendKeys('Your Password Do Not Leave In File');
  
     // Technically, you should be able to take any form element
     // and call .submit()
     // e.g. yield password.submit();
     // However, if someone has added functionality on the submit button's
     // click event, it wouldn't be called
     // So instead, we'll look it up
  
     var submit = yield driver.findElement(By.css('input[type="submit"]'));
     yield submit.click();
  
     // We don't need the submit button for anything, so if the above works
     // it should be just as safe to do
     // yield driver.findElement(By.css('input[type="submit"]')).click();
     // And of course, if you like seeing the text on the screen and believe it
     // won't change, you could just as easily have done
     // yield driver.findElement(By.css('input[value="Login"]')).click();
  
     // At this point, I’m hoping login is so quick and stable that you can freely
    // issue your next driver.get(“my url”);
    // without worrying about waits or such

 //https://sutherlands.com/products/prod_adm/editproduct.php?&pg=prod_edit&item=4437372

var baseUrl = "https://sutherlands.com/products/prod_adm/editproduct.php?";

async function tests (){

    var sku = "4437372";
    var url = `${baseUrl}item=${sku}`;
    var seleniumHelper = new seleniumHelpers(driver,"editscreen");
        
    await driver.get(url);

    //var productTitleElement = await driver.findElement(By.id('prod_title'));
    await driver.wait(until.titleIs(`Edit ${sku}`));

    //var productTitleElement = await getProductTitleElement(driver);
    var productTitleElement = await driver.findElement(By.id('prod_title'));
    var productTitle = await productTitleElement.getAttribute("value");

    await productTitleElement.clear();
    await productTitleElement.sendKeys("36-Inch Prefinished Imperial Oak Bifold Door"); 
    await seleniumHelper.saveScreenshot();   
    await applyAndSave(driver);

    //var productImage = await productImgArray[0].getAttribute('src');
    console.log(productTitle);

    driver.quit(); // Closes the Browser and ends the webdriver session 
};
tests ();

//function getProductTitleElement(webDriver){
//    var element =  await webDriver.findElement(By.id('prod_title'));
//    return element;
//}

async function applyAndSave(webDriver){
    var applyAndStayElements = await webDriver.findElements(By.css('.apply.btn'));
    var applyAndStayElement = applyAndStayElements[0];

    await applyAndStayElement.click();
}
