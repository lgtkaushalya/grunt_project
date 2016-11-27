'use strict';

module.exports = function(grunt) {

  //Time how lond tasks taken
  require('time-grunt')(grunt);
  
  //Automatically load required grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: ['Gruntfile.js', 'app/scripts/{,*/}*.js']
      }
    },
    copy: {
      dist: {
        cwd: 'app',
        src: ['**', '!**/*.css', '!**/*.js'],
        dest: 'dist',
        expand: true
      }
    },
    clean: {
      build: {
        src: ['dist']
      }
    },
    useminPrepare: {
      html: 'app/index.html',
      options: {dest: 'dist'}
    },
    concat: {
      options: {
        seperator: ';'
      },
      dist: {}
    },
    uglify: {
      dist: {}
    },
    cssmin: {
      dist: {}
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: '20'
      },
      release: {
        files: [{
          src: [
            'dist/scripts/*.js',
            'dist/styles/*.css'
            ]
        }]
      }
    },
    usemin: {
      html: ['dist/*.html'],
      css: ['dist/styles/*.css'],
      options: {
        assetsDirs: ['dist', 'dist/styles']
      }
    },
    watch: {
      copy: {
        files: ['app/**', '!app/**/*.css', '!app/**/*.js'],
        tasks: ['build']
      },
      scripts: {
        files: ['app/scripts/app.js'],
        tasks: ['build']
      },
      styles: {
        files: ['app/styles/main.css'],
        tasks: ['build']
      },
      liverelaod: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'app/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname:'localhost',
        livereload: 35729
      },
      dist: {
        options: {
          open: true,
          base: {
            path: 'dist',
            options: {
              index: 'index.html',
              maxAge: 300000
            }
          }
        }
      }
    }
  });
  
  //grunt.registerTask('build', ['clean', 'jshint', 'useminPrepare', 'concat', 'cssmin', 'uglify','copy', 'filerev', 'usemin']);

  grunt.registerTask('build', ['clean','jshint','useminPrepare', 'concat', 'cssmin', 'uglify', 'copy', 'filerev', 'usemin']);
  grunt.registerTask('serve', ['build', 'connect:dist', 'watch']);
  grunt.registerTask('default', ['build']);

};
