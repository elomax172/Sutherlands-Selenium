 // I’m not positive this really is the URL.  Ideally, we want the actual login page, not
 // a page we enter and get redirected to login.
  // it might be https://inet.sutherlands.com/
  // But look closely for the URL once you have been taken to the login page.
   yield driver.get(“https://inet.sutherlands.com/index.php”);
 
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