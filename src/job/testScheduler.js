const schedule = require("node-schedule");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const healthScheduleJob = schedule.scheduleJob("1 * * * * *", async function() {
  console.log("Start health check from QA bot returnsenter");
  try {
    const { stdout, stderr } = await exec("yarn healthcheck");
    console.log("stdout:", stdout);
    stderr && console.error("stderr:", stderr);
  } catch (error) {
    console.error(error);
    throw error;
  }
});
