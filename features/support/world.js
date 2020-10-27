const { setWorldConstructor, setDefaultTimeout, setDefinitionFunctionWrapper } = require('cucumber');
const seleniumWebdriver = require ('selenium-webdriver');
const chromedriver = require('chromedriver');
const chrome = require('selenium-webdriver/chrome');


function ThisWorld ({attach}) {

    setDefaultTimeout('60000');
    this.driver =  new seleniumWebdriver.Builder()
        .forBrowser('chrome').build();
    this.data = new Map();
    this.screenshots = 'onFail';
    this.attach= attach;
};

setWorldConstructor(ThisWorld);

setDefinitionFunctionWrapper((fn) => {
   
    return async function () {
      
      await fn.apply(this, arguments);
      if (this.screenshots !== undefined && this.screenshots.toLowerCase().includes("always")) {
        try {
          await this.attach(await this.driver.takeScreenshot(), "image/png");
        } catch (ex) {
          log.error(ex);
        }
      }
    };
});