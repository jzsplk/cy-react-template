const schedule = require('node-schedule');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const healthScheduleJob = schedule.scheduleJob('1 15 * * * *', async function(){
	console.log('Start health check from QA bot returnsenter');
	try {
		const { stdout, stderr } = await exec('yarn healthcheck');
		console.log('stdout:', stdout);
		console.error('stderr:', stderr);

	} catch (error) {
		console.error(error)
		throw(error);
	}
	// try {
	// 	await exec(`yarn healthcheck`, (err, sdtout, stderr) => {
	// 		if (err) {
	// 			console.error(err);
	// 			return
	// 			// exec('kill $(jobs -p) || true')
	// 		} else {
	// 			console.log(`stdout: ${sdtout}`)
	// 			stderr && console.log(`stderr: ${stderr}`)
	// 			exec('kill $(jobs -p) || true')
	// 		}
	// 	});
	// } catch (error) {
	// 	console.error(error)
	// 	throw(error);
	// }
});