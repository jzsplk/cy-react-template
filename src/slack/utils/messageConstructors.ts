import { TestStatus } from "../../constants/testStatus";
import { IncomingWebhookDefaultArguments } from "@slack/webhook";

export function webhookInitialArgs(
  initialArgs: IncomingWebhookDefaultArguments,
  _status: TestStatus
) {
  let statusText: string;
  switch (_status) {
    case TestStatus.passed: {
      statusText = "test run passed";
      break;
    }
    case TestStatus.failed: {
      statusText = "test run failed";
      break;
    }
    case TestStatus.error: {
      statusText = "test build failed";
      break;
    }
    default: {
      statusText = "test status unknown";
      break;
    }
  }

  return (initialArgs = {
    text: `${statusText}`
  });
}
