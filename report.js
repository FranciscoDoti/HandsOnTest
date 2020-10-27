const reporter = require('cucumber-html-reporter');
const jsonfile = require('jsonfile');

const reportName = () => {

  return `Cucumber Report`;
};

const options = {
  theme: 'bootstrap',
  jsonFile: `${process.cwd()}/reports/cucumber_report.json`,
  output: `${process.cwd()}/reports/${reportName()}.html`,
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: jsonfile.readFileSync(`${process.cwd()}/reports/cucumber_report.json`)[0].metadata,
};

reporter.generate(options);
process.exit();
