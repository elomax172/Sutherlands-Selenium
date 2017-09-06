"use strict";

var Page = require("../page.js");
const { By, Key, until } = require ('selenium-webdriver');


class LoginPage extends Page {

    // Astonishingly, (except for JavaScript) attempting a
    // constructor(parm){ super(parm);} completely failed.
    // So an embarrising old-school init

    init( seleniumWebDriver ){
        super.init(seleniumWebDriver);

        // Set Environment Variable dev_credentials
        // This PC, Properties, Advanced System Settings, Environment Variables... 
        // User variables, New...
        // dev_credentials {"UN": "Jeff", "PW": "drowssap"}
        // CLOSE VS Code, Powershell, Cmd Prompts, reopen      
        
        // Read environment variable in NodeJS
        let devCredentials = process.env.dev_credentials;
        if( ! devCredentials ){
            console.error('Credentials Environment Variable dev_credentials not found');           
        }
        let credentials = JSON.parse(devCredentials);
        this.un = credentials.UN;
        this.pw = credentials.PW;
    }

    // Username
    async userNameElement(){
        // mod_login_username
        return await super.driver.findElement(By.id("lst-ib"));
    }
   
    async setUserName(userName = this.un) { 
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

    async setPassword(pw = this.pw) { 
        let element = await this.passwordElement();
        await element.sendKeys(pw);
        return element;
    }

    // Had some serious trouble with properties interacting w/super & await
    // These will need to be methods once completed for now
    //get submitButton() {return this.driver.findElement(By.css("input[type='submit']"));}

    async open(){
        // https://inet.sutherlands.com
        await super.open("http://www.google.com");
    }

    submit(){
        console.log("not implemented");
    }
}
module.exports = LoginPage;