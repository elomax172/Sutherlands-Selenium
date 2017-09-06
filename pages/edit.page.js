"use strict";

var Page = require("../page.js");
const { By, Key, until } = require ('selenium-webdriver');


class EditPage extends Page {
    
        init( seleniumWebDriver ){
            super.init(seleniumWebDriver);
        }

        /**
         * Wait for page title to become given sku
         * @param {string} sku
         */           
        async waitForPageTitle( sku ){
            await super.driver.wait(
                until.titleIs(`Edit ${sku}`,1000)
            );
        }


        async getSkuText(){
            let skuElement = await super.driver.findElement(By.id("sku"));
            let skuText = await skuElement.getAttribute("value");
            return skuText;
        }

        async getVendorNumber(){
            let vendorElement = await super.driver.findElement(By.id("vendor_num"));
            let vendorText = await vendorElement.getAttribute("value");
            return vendorText;           
        }


        async userNameElement(){
            return await super.driver.findElement(By.id("lst-ib"));
        }
       
        async setUserName(userName) { 
            let element = await this.userNameElement();
            await element.sendKeys(userName + Key.ESCAPE);
            return element;
        }
    
        async getUserNameText(userNameElement){
            var usernameText = await userNameElement.getAttribute("value");
            return usernameText;
        }

   
        async open(){
            await super.open("http://www.google.com");
        }
    
        submit(){
            console.log("not implemented");
        }
    }
    module.exports = EditPage;