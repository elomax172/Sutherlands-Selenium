"use strict";

var Page = require("../page.js");
const { By, Key, until } = require ('selenium-webdriver');


class LoginPage extends Page {

    // Astonishingly, (except for JavaScript) attempting a
    // constructor(parm){ super(parm);} completely failed.
    // So an embarrising old-school init

    init( seleniumWebDriver ){
        super.init(seleniumWebDriver);
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

    // Had some serious trouble with properties interacting w/super & await
    // These will need to be methods once completed for now
    //get username() { return driver.findElement(By.id("mod_login_username"));}
    //get password() { return this.driver.findElement(By.id("mod_login_password"));}
    //get submitButton() {return this.driver.findElement(By.css("input[type='submit']"));}

    async open(){
        await super.open("http://www.google.com");
    }

    submit(){
        console.log("not implemented");
    }
}
module.exports = LoginPage;