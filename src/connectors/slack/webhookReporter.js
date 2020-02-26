require("dotenv").config();

const fs = require("fs");
const SlackWebhook = require("slack-webhook");

// const slack = new SlackWebhook(process.env.SLACK_WEBHOOK_URL);
const slack = new SlackWebhook(process.env.SLACK_WEEBHOOK_URL_PROJ_RC);

function parseReport() {
  const report = fs.readFileSync("health-check.json", "utf-8");
  const data = JSON.parse(report);

  return data;
}

const data = parseReport();

console.log('data',data);

let title;
let result;

if (typeof data !== "undefined" && data.failures.length) {
  const { failures } = data;
  title = `<!channel> Failing ${failures.length} ${
    failures.length > 1 ? "tests" : "test"
  } for admine2e.returnscenter.com`;

  result = failures.map(fail => {
    return {
      fallback: "Test summary",
      color: "danger",
      text: `:x: ${fail.title} on :fire:`
    };
  });
} else {
  title = "Health check for admine2e.returnscenter.com";
  result = data.passes.map(pass => {
    return {
      fallback: "Health check summary",
      color: "good",
      text: `:white_check_mark: ${pass.fullTitle}. `
    };
  });
}

slack.send({
  text: title,
  attachments: result
});
