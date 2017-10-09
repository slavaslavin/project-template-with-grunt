/**
 * Created by Alexej Schwarz on 05.10.2017.
 */

module.exports = function (grunt) {

	'use strict';

	// Automatically load npm tasks from package.json
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		less: {
			dev: {
				options: {
					sourceMap: true,
					compress: false,
					yuicompress: true,
					optimization: 2
				},
				files: {
					'<%= pkg.name %>/<%= pkg.cssDir %>/<%= pkg.name %>.css': '<%= pkg.name %>/<%= pkg.lessDir %>/<%= pkg.name %>.less'
				}
			}
		},
		// LESS-Fehler
		lesslint: {
			src: ['<%= pkg.name %>/<%= pkg.lessDir %>/<%= pkg.name %>.less'],
			options: {
				imports: [
					'<%= pkg.name %>/<%= pkg.lessDir %>/base/*.less',
					'<%= pkg.name %>/<%= pkg.lessDir %>/modules/*.less'
				],
				csslint: {
					// We need this to supress warnings from bootstrap itself
					'font-sizes': false,
					'overqualified-elements': false,
					'box-model': false,
					'unique-headings': false,
					'floats': false,
					'adjoining-classes': false,
					'unqualified-attributes': false,
					'important': false,
					'duplicate-properties': false,
					'shorthand': false,
					'duplicate-background-images': false,
					'selector-max-approaching': false,
					'selector-max': false,
					'ids': false,
					'fallback-colors': false,
					'outline-none': false

				},
				failOnError: true
			}
		},

		lessToSass: {

			convert: {
				files: [{
					expand: true,
					cwd: '<%= pkg.name %>/<%= pkg.lessDir %>',
					src: ['*.less'],
					ext: '.scss',
					dest: '<%= pkg.name %>/<%= pkg.scssDir %>/less-to-scss'
				}]
			}
		},

		// SASS
		sass: {
			dev: {
				files: {
					'<%= pkg.name %>/<%= pkg.cssDir %>/<%= pkg.name %>.css': '<%= pkg.name %>/<%= pkg.scssDir %>/<%= pkg.name %>.scss'
				},
				options: {
					sourceMap: true,
					style: 'nested'
				}
			},
			prod: {
				files: {
					'<%= pkg.name %>/<%= pkg.cssDir %>/<%= pkg.name %>.css': '<%= pkg.name %>/<%= pkg.scssDir %>/<%= pkg.name %>.scss'
				},
				options: {
					style: 'compressed',
					sourcemap: 'none'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9', 'opera 12', 'ff 15', 'chrome 25']
			},
			your_target: {
				// Target-specific file lists and/or options go here.
			},

			dist: {
				files: { '<%= pkg.name %>/<%= pkg.cssDir %>/<%= pkg.name %>.css' : '<%= pkg.name %>/<%= pkg.cssDir %>/<%= pkg.name %>.css' }
			}
		},

		// CSS Minifizierung
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'<%= pkg.name %>/<%= pkg.cssDir %>/<%= pkg.name %>.min.css': '<%= pkg.name %>/<%= pkg.cssDir %>/<%= pkg.name %>.css'
				}
			}
		},

		// JS
		// JS Fehler
		jshint: {
			all: [
				'Gruntfile.js',
				'<%= pkg.name %>/<%= pkg.jsDir %>/js/src/*.js'
			],
			options: {
				"curly": true,
				"eqnull": true,
				"eqeqeq": true,
				"globals": {"jQuery": true}
			}
		},
		// JS Verkettung und Minifizierung
		concat: {
			options: {
				stripBanners: {
					block: false,
					line: false
				},
				// Переместит 'use strict' из всех js файлов в начало выходного файла project.js
				banner: "'use strict';\n",
				process: function (src, filepath) {
					return '// Source: ' + filepath + '\n' +
						src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
				}
			},
			// Concat all osp js files
			dist: {
				src: [
					'<%= pkg.name %>/<%= pkg.jsDir %>/src/*.js'
				],
				dest: '<%= pkg.name %>/<%= pkg.jsDir %>/dist/<%= pkg.name %>.js'
			},

			// Concat all vendor files to one vendor.js. Since order matters all js files are listed explicit
			vendor: {
				src: [
					// Bibliotheken
					//'<%= pkg.name %>/<%= pkg.jsDir %>/vendor/jquery-2.1.0.min.js'
				],
				dest: '<%= pkg.name %>/<%= pkg.jsDir %>/dist/vendor.js'
			}
		},
		// JS Minifizierung
		uglify: {
			options: {},
			app_min: {
				files: {
					 '<%= pkg.name %>/<%= pkg.jsDir %>/dist/<%= pkg.name %>.min.js': ['<%= pkg.name %>/<%= pkg.jsDir %>/dist/<%= pkg.name %>.js'],
					 '<%= pkg.name %>/<%= pkg.jsDir %>/dist/vendor.min.js': ['<%= pkg.name %>/<%= pkg.jsDir %>/dist/vendor.js']
				}
			}
		},
		// Zum Schutz von minify AngularJS Abhängigkeit Infektion
		ngAnnotate: {
			options: {
				remove: true,
				add: true,
				singleQuotes: true
			},
			app: {
				files: {
					'<%= pkg.name %>/<%= pkg.jsDir %>/dist/<%= pkg.name %>.js':
					'<%= pkg.name %>/<%= pkg.jsDir %>/dist/<%= pkg.name %>.js'
				}
			}
		},

		watch: {
			styles: {
				files: [
					'<%= pkg.name %>/<%= pkg.lessDir %>/*.less',
					'<%= pkg.name %>/<%= pkg.lessDir %>/**/*.less',
					'<%= pkg.name %>/<%= pkg.lessDir %>/**/**/*.less',
					'<%= pkg.name %>/<%= pkg.lessDir %>/**/**/**/*.less',

					'<%= pkg.name %>/<%= pkg.jsDir %>/vendor/*.js',
					'<%= pkg.name %>/<%= pkg.jsDir %>/src/*.js'
				],
				// für LESS grunt.loadNpmTasks('grunt-contrib-less') auskommentieren
				tasks: ['less:dev', 'autoprefixer', 'cssmin', 'jshint', 'concat:dist', 'concat:vendor', 'ngAnnotate', 'uglify'],
				// für SASS grunt.loadNpmTasks('grunt-contrib-sass') auskommentieren
				//tasks: ['sass:dev', 'autoprefixer', 'cssmin', 'jshint', 'concat:dist', 'concat:vendor', 'ngAnnotate', 'uglify'],

				options: {nospawn: true}
			}
		}

	});

	//grunt.loadNpmTasks('');
	//grunt.loadNpmTasks('grunt-lesslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	//grunt.loadNpmTasks('grunt-contrib-sass');
	//grunt.loadNpmTasks('grunt-less-to-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);

	grunt.registerTask('prod', ['less:dev', 'autoprefixer', 'cssmin', 'jshint', 'concat:dist', 'concat:vendor', 'ngAnnotate', 'uglify']);
};