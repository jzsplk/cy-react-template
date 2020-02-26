const schedule = require('node-schedule');

const {exec} = require('child_process');

const healthScheduleJob = schedule.scheduleJob('30 * * * *', function(){
	console.log('Start health check from QA bot returnsenter');
	exec(`yarn healthcheck`, (err, sdtout, stderr) => {
		if (err) {
			console.error(err);
			exec('kill $(jobs -p) || true')
		} else {
			console.log(`stdout: ${sdtout}`)
			stderr && console.log(`stderr: ${stderr}`)
			exec('kill $(jobs -p) || true')
		}
	});
});