const { Given, When, Then , S} = require('cucumber');
const { assert, expect } = require('chai');
const { By, Key, until } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver/lib/webdriver');
const homePage = require(`${process.cwd()}/features/pages/HomePage.json`);
const searchResultsPage = require(`${process.cwd()}/features/pages/SearchResultsPage.json`);

Given('I’m on the homepage', async function () {
    await this.driver.get('https://www.google.com');
});

When(/^I type "(.*)" into the search field$/, async function(searchInput){
    await this.driver.findElement(By.xpath(homePage.searchInput)).sendKeys(searchInput);
});

When ('I click the Google Search button', async function(){
    await this.driver.findElement(By.xpath(homePage.searchButton)).click();
});

When('I click on the first suggestion in the list', async function(){
    await this.driver.wait(until.elementLocated(By.xpath(homePage.suggestionsList)));
   var suggestionsList =  await this.driver.findElements(By.xpath(homePage.suggestionsList));
   await suggestionsList[0].click();
});

Then('I go to the search results page', async function(){
    await console.log('Moving to search results page');
})


Then(/^the first result is "(.*)"$/, async function(firstResultExpected){
    this.data.set('searchResults',await this.driver.findElements(By.xpath(searchResultsPage.searchResults)));
    var firstResultCurrentTitle = await this.data.get('searchResults')[0].findElement(By.xpath('//h3/span')).getText();

    try {
        await assert(firstResultExpected == firstResultCurrentTitle,
        `Expected title : ${firstResultExpected}; Current title: ${firstResultCurrentTitle}`
            );
    } catch (error) {
        console.log(error.message);
        await this.data.set('First result title exception', error.message );
    }
})

Then('I click on the first result link', async function(){
    await this.data.get('searchResults')[0].findElement(By.xpath( '//h3/span')).click();
})

Then(/^I go to the "(.*)" page$/, async function(expectedTitle){
    await this.driver.wait(until.stalenessOf(await this.data.get('searchResults')[0]));
    var currentTitle = await this.driver.getTitle();
    await assert( expectedTitle == currentTitle ,
    `Expected title : ${expectedTitle}; Current title: ${currentTitle}`
    )
});