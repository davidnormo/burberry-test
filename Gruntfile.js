module.exports = function(grunt) {

	grunt.initConfig({
		serve: { 
			options: {
				port: 9000
			}
		},
		dox: {
			options: {
				title: 'Past Climate Documentation' 
			},
			files: {
				src: ['js/model', 'js/view', 'js/collection', 'js/app.js'],
				dest: 'docs'
			}
		}
	});

	grunt.loadNpmTasks('grunt-serve');
	grunt.loadNpmTasks('grunt-dox');

	grunt.registerTask('default', ['serve']);
	grunt.registerTask('docs', ['dox']);
};
