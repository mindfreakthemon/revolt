var path = require('path');

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			main: [
				'Gruntfile.js',
				'server.js',
				'server/**/*.js'
			]
		},

		connect: {
			main: {
				options: {
					port: 80,
					keepalive: true,
					base: '.'
				}
			}
		},

		nodemon: {
			server: {
				script: 'server.js',
				options: {
					ignore: ['node_modules/**'],
					watch: [
						'server.js',
						'server/**/*.js'
					],
					legacyWatch: true
				}
			}
		},

		clean: ['static/css', 'static/js/templates.js'],

		jade: {
			templates: {
				files: {
					'static/js/templates.js': 'src/jade/**/*.jade'
				},
				options: {
					amd: true,
					client: true,
					processName: function (name) {
						return path.basename(name, '.jade');
					}
				}
			}
		},

		stylus: {
			css: {
				expand: true,
				cwd: 'src/styl',
				src: ['**/*.styl'],
				dest: 'static/css',
				ext: '.css'
			}
		},

		watch: {
			jshint: {
				files: [
					'Gruntfile.js',
					'server.js',
					'server/**/*.js'
				],
				tasks: ['jshint:main']
			},

			templates: {
				files: ['src/jade/**/*.jade'],
				tasks: ['jade:templates'],
				options: {
					atBegin: true
				}
			},

			stylus: {
				files: ['src/styles/**/*.styl'],
				tasks: ['stylus:css'],
				options: {
					atBegin: true
				}
			},

			livereload: {
				files: ['src/**', 'server/views/**'],
				options: {
					livereload: true
				}
			}
		},

		concurrent: {
			watch: {
				tasks: ['watch:templates', 'watch:less', 'watch:livereload']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('test', 'jshint');
	grunt.registerTask('default', ['concurrent:watch']);
};