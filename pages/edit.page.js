"use strict";

var Page = require("../page.js");
const { By, Key, until } = require ('selenium-webdriver');

class EditPage extends Page {
    
// This is not tested
// TODO: Build URL

    constructor( seleniumWebDriver ){
        // https://inet.sutherlands.com
        super(seleniumWebDriver, "");
        console.log("Edit Page CTOR");
        this.baseUrl = "https://sutherlands.com/products/prod_adm/editproduct.php?";
    }

    /**
    * Return page url.  Overridden to add item = sku
    */     
    getPageUrl(){
        var url = `${this.baseUrl}item=${this.sku}`;
        return url;
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
        this.sku = sku;
        await super.open();
    }
    
    submit(){
        console.log("not implemented");
    }
}
module.exports = EditPage;