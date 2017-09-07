"use strict";

var Page = require("../page.js");
const { By, Key, until } = require ('selenium-webdriver');


class LoginPage extends Page {

    constructor( seleniumWebDriver ){
        // https://inet.sutherlands.com
        super(seleniumWebDriver, "http://www.google.com");
        console.log("Login Page CTOR");

        // Read environment variable in NodeJS
        let devCredentials = process.env.dev_credentials;
        if( ! devCredentials ){
            console.error('Credentials Environment Variable dev_credentials not found');           
        }
        // Convert to JavaScript object
        let credentials = JSON.parse(devCredentials);
        this.un = credentials.UN;
        this.pw = credentials.PW;     
        console.log(`Credentials: ${this.un}`)   
    }    

    // Had some serious trouble with properties interacting w/super & await
    // So everything in here is a method for now

    // Username
    async userNameElement(){
        // mod_login_username
        return await super.driver.findElement(By.id("lst-ib"));
    }
   
    async setUserName(userName = this.un){ 
        let element = await this.userNameElement();
        await element.sendKeys(userName);
        return element;
    }

    async getUserNameText(userNameElement){
        var usernameText = await userNameElement.getAttribute("value");
        return usernameText;
    }

    // password
    async passwordElement(){
        return await super.driver.findElement(By.id("mod_login_password"));
    }

    async setPassword(pw = this.pw){ 
        let element = await this.passwordElement();
        await element.sendKeys(pw);
        return element;
    }

    // submit
    async clickSubmitButton() {
        let element = await this.driver.findElement(By.css("input[type='submit']"));
        await element.click();
        return element;
    }

    async open(){
        await super.open();
    }
}
module.exports = LoginPage;