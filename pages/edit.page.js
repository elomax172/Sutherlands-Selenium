"use strict";

var Page = require("../page.js");
const { By, Key, until } = require ('selenium-webdriver');

class EditPage extends Page {
    
// This is not tested
// TODO: Build URL

    constructor( seleniumWebDriver ){
        // https://inet.sutherlands.com
        super(seleniumWebDriver, "http://www.google.com");
        console.log("Edit Page CTOR");
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

    async open(sku){
        //await super.open("http://www.google.com");
        console.log("not implemented");       
    }
    
    submit(){
        console.log("not implemented");
    }
}
module.exports = EditPage;