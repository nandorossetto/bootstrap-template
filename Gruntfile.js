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

        //run server using grunt connect::keepalive
        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: '0.0.0.0'
                }
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

    require('load-grunt-tasks')(grunt);

    //Building file to deploy
    grunt.registerTask('deploy', ['compass', 'concat', 'uglify', 'clean', 'usemin']);
};
