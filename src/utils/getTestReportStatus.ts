import { TestStatus } from "../constants/testStatus";
import * as fs from "fs";
import { getFiles } from "./getFiles";

export function reportParser(reportDir: string) {
  const reportFile = getFiles(reportDir, ".json", []);
  let status = TestStatus.error;
  if (reportFile.length === 0) {
    throw new Error(`Cannot find json test report @ ${reportDir}`);
  } else if (reportFile.length >= 2) {
    throw new Error(
      "Multiple json reports found, please run mochawesome-merge to provide a single report"
    );
  } else {
    const rawData = fs.readFileSync(reportFile[0]);
    const parsedData = JSON.parse(rawData.toString());
    const reportStats = parsedData.stats;
    const totalSuites = reportStats.suites;
    const totalTests = reportStats.tests;
    const totalPasses = reportStats.passes;
    const totalFailures = reportStats.failures;
    const totalDuration = reportStats.duration;
    if (totalTests === undefined || totalTests === 0) {
      status = TestStatus.error;
    } else if (totalFailures > 0 || totalPasses === 0) {
      status = TestStatus.failed;
    } else if (totalFailures === 0) {
      status = TestStatus.passed;
    }

    const result = {
      totalSuites,
      totalTests,
      totalPasses,
      totalFailures,
      totalDuration,
      reportFile,
      status
    };
    console.log("parsed", result);
    return result;
  }
}
