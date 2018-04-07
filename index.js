console.log("hello")
var ffmpeg = require('fluent-ffmpeg')


ffmpeg("videos/dota-2-replay_2018-04-05_214857.wmv")
	.on('start', function(commandLine) {
		console.log('Spawned Ffmpeg with command: ' + commandLine);
	})
	.complexFilter([
		{
			filter: 'split',
			options: '2',
			outputs: ['a', 'b']
		},
		{
			filter: 'trim',
			
		}

		]
	);