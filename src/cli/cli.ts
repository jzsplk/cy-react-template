#!/usr/bin/env node
/// <reference path='../../node_modules/cypress/types/cypress-npm-api.d.ts'/>
import * as CypressApi from "cypress";
import { sendMessage } from "../slack/utils/slack";
import { omit } from "lodash";

const marge = require("mochawesome-report-generator");
const { merge } = require("mochawesome-merge");
const del = require("del");
const yargs = require("yargs");

function generateReport(options: any) {
  return merge(options).then((report: any) => marge.create(report, options));
}

const parsedArgs = omit(yargs.parse(process.argv.slice(2)), "_", "$0");

const options = {
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mocha-junit-reporter, mochawesome",
    mochaJunitReporterReporterOptions: {
      mochaFile: "cypress/reports/junit/test_results[hash].xml",
      toConsole: false
    },
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports/mocha",
      quiet: true,
      overwrite: false,
      html: false,
      json: true
    }
  },
  ...parsedArgs
};

console.log("running with option", options);

CypressApi.run(options)
  .then(async results => {
    const generatedReport = await Promise.resolve(
      generateReport({
        files: ["cypress/reports/mocha/*.json"],
        inline: true,
        saveJson: true
      })
    );
    console.log("Merged report", generatedReport);
    return generatedReport;
  })
  .then(
    async delFiles => await del(["cypress/reports/mocha/mochawesome_*.json"])
  )
  .then(async generatedReport => {
    console.log("report here is", generatedReport);
    // send report to slack
    await sendMessage("mochawesome-report");
  })
  .catch(err => console.log(err));
