module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            files: [
                'Gruntfile.js',
                'static/js/*.js'
            ],

            globals: {
                jQuery: true
            }
        },

        compass: {
            compiling: {
                options: {
                    basePath: 'static',
                    httpPath: '/',
                    sassDir: 'sass',
                    cssDir: 'css',
                    imagesDir: 'images',
                    javascriptDir: 'js',
                    fontsDir: 'fonts',
                    noLineComments: true,
                    relativeAssets: true,
                    outputStyle: 'compressed'
                }
            }
        },

        sass: {
            dist: {
                src: 'static/sass/application.scss',
                dest: 'static/css/application.css'
            }
        },

        uglify: {
            options: {
                mangle: false
            },

            target: {
                files: {
                    'static/js/build-min.js': ['static/js/build.js']
                }
            }
        },

        clean: {
            js: ['static/js/build.js']
        },

        concat: {
            options: {
                separator: ';'
            },

            dist: {
                src: ['static/js/**/*.js'],
                dest: 'static/js/build.js'
            }
        },

        usemin: {
            html: 'index.html'
        },

        connect: {
            server: {
                options: {
                    port: 5000,
                    hostname: '127.0.0.1'
                }
            }
        },

        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },

            dist: {
                files: [{
                    expand: true,
                    cwd: 'static/js/es6/',
                    src: ['**/*.js'],
                    dest: 'static/js/dest/'
                }]
            }
        },

        watch: {
            jshint: {
                files: '<%= jshint.files %>',
                tasks: ['jshint']
            },

            sass: {
                files: ['static/sass/**'],
                tasks: ['sass']
            },

            babel: {
                files: ['static/js/es6/**'],
                tasks: ['babel']
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('dev', ['sass', 'connect', 'babel', 'watch']);
    grunt.registerTask('deploy', ['compass', 'concat', 'uglify', 'clean', 'usemin']);
};
