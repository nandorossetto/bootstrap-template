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

        uglify: {
            options: {
                mangle: false
            },

            target: {
                files: {
                    'static/js/build-min.js': ['static/js/application.js']
                }
            }
        },

        concat: {
            options: {
                separator: ';',
            },

            dist: {
                src: ['static/js/**/*.js'],
                dest: 'static/js/application.js',
            }
        },

        watch: {
            jshint:{
                files: '<%= jshint.files %>',
                tasks: ['jshint']
            },

            compass:{
                files: ['static/sass/**'],
                tasks: ['compass:compiling']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Building file to deploy
    grunt.registerTask('deploy', ['compass', 'concat', 'uglify']);
};
