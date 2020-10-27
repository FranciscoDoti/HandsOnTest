const { BeforeAll, Before, After, AfterAll } = require('cucumber');

Before(async function (scenario) {
    await console.log('Running the following scenario: ' + scenario.pickle.name);
})



After(async function (scenario) {
    if (this.screenshots.toLowerCase().includes('onfail') &&
        scenario.result.status.toLowerCase().includes('fail')) {
        await this.attach(await this.driver.takeScreenshot(), 'image/png');
    }
    await this.driver.quit();
});