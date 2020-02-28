require("dotenv").config();

const fs = require("fs");

const { IncomingWebhook } = require("@slack/webhook");
const slack = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL_ME);
// const slack = new IncomingWebhook(process.env.SLACK_WEEBHOOK_URL_MONITOR_RETURNS_PROD, {
//   icon_emoji: ':bowtie:',
// });

const reportToSlack = async function(title, result) {
  await slack.send({
    text: title,
    attachments: result
  });
};

function parseReport() {
  const report = fs.readFileSync("cypress/reports/mocha/index.json", "utf-8");
  const data = JSON.parse(report);

  return data;
}

const data = parseReport();

// for slack to use
let title;
let result;

const { results: reportResults } = data;
const failResults = reportResults.filter(result => {
  return result.failures.length > 0;
});

if (typeof data !== "undefined" && failResults.length > 0) {
  title = `<!channel> Failing ${failResults.length} ${
    failResults.length > 1 ? "tests" : "test"
  } for admine2e.returnscenter.com`;

  result = failResults.map(fail => {
    return {
      fallback: "Test summary",
      color: "danger",
      text: `:x: ${fail.tests[0].title} on :fire:`
    };
  });

  reportToSlack(title, result);
} else {
  title = "Health check for admine2e.returnscenter.com";
  result = data.results.map(pass => {
    return {
      fallback: "Health check summary",
      color: "good",
      text: `:white_check_mark: ${pass.file}. `
    };
  });
}

//  reportToSlack(title, result)
