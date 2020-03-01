import { TestStatus } from "../../constants/testStatus";
import { IncomingWebhook, IncomingWebhookSendArguments } from "@slack/webhook";
import { MessageAttachment } from "@slack/types";
import { reportParser } from "../../utils/getTestReportStatus";
import { webhookInitialArgs } from "./messageConstructors";
import { config } from "dotenv";
config();

// add webhook url in env
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL_ME;

console.log("the webhook url is", SLACK_WEBHOOK_URL);

export async function sendMessage(_reportDir: string) {
  // process the test report
  const reportParsed = reportParser(_reportDir);
  await constructMessage(reportParsed);
}

export async function constructMessage(
  parsedReport: ReturnType<typeof reportParser>
) {
  const { status: _status } = parsedReport;
  const sendArgs: IncomingWebhookSendArguments = {};
  const webhookInitialArguments = webhookInitialArgs({}, _status);
  const webhook = new IncomingWebhook(
    SLACK_WEBHOOK_URL ?? "",
    webhookInitialArguments
  );
  const reports = attachmentReports(parsedReport);
  switch (_status) {
    case TestStatus.error: {
      const sendArguments = webhookSendArgs(sendArgs, [reports]);
      try {
        return await webhook.send(sendArguments);
      } catch (e) {
        console.log(e);
      }
      break;
    }
    case TestStatus.failed: {
      const sendArguments = webhookSendArgs(sendArgs, [reports]);
      try {
        await webhook.send(sendArguments);
      } catch (e) {
        console.log(e);
      }
      break;
    }
    case TestStatus.passed:
      // we don not send report on pass by now
      break;
    default: {
      throw new Error("An error occurred getting the status of the test run");
    }
  }
}

export function webhookSendArgs(
  argsWebhookSend: IncomingWebhookSendArguments,
  messageAttachments: MessageAttachment[]
) {
  argsWebhookSend = {
    attachments: messageAttachments,
    unfurl_links: false,
    unfurl_media: false
  };
  return argsWebhookSend;
}

export function attachmentReports(
  parsedReport: ReturnType<typeof reportParser>
): MessageAttachment {
  const {
    status: _status,
    totalPasses,
    totalTests,
    totalFailures
  } = parsedReport;

  switch (_status) {
    case TestStatus.passed: {
      return {
        color: "#36a64f",
        // fallback: `Report available at ${reportHTMLUrl}`,
        text: `Total Passed:  ${totalPasses}`
      };
    }
    case TestStatus.failed: {
      return {
        color: "#ff0000",
        // fallback: `Report available at ${reportHTMLUrl}`,
        title: `Total Failed: ${totalFailures}`,
        // text: `Total Tests: ${totalTests}\nTotal Passed:  ${totalPasses} `,
        text: `details`,
        actions: [
          {
            text: `job details`,
            type: 'button',
            url: `https://travis-ci.org/${process.env.TRAVIS_REPO_SLUG}/jobs/${process.env.TRAVIS_JOB_ID}`,
          },
          {
            text: `${process.env.TRAVIS_BUILD_WEB_URL}`,
            type: 'button',
            url: `${process.env.TRAVIS_BUILD_WEB_URL}`,
          },
          {
            text: `${process.env.TRAVIS_APP_HOST}`,
            type: 'button',
            url: `${process.env.TRAVIS_APP_HOST}`,
          },
          {
            text: `${process.env.TRAVIS_BUILD_DIR}`,
            type: 'button',
            url: `${process.env.TRAVIS_BUILD_DIR}`,
          },
          {
            text: `${process.env.TRAVIS_COMMIT}`,
            type: 'button',
            url: `${process.env.TRAVIS_COMMIT}`,
          },
        ]
      };
    }
    case TestStatus.error: {
      return {
        color: "#ff0000",
        // fallback: `Build Log available at ${CI_BUILD_URL}`,
        text: `Total Passed:  ${totalPasses} `
      };
    }
    default: {
      break;
    }
  }
  return {};
}
