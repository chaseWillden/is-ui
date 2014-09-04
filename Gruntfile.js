module.exports = function(grunt) {
  var version = grunt.file.readJSON('package.json').version;
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      combine: {
        files: {
          'build/css/is-ui.min.css': ['src/vendor/normalize.css', 'src/css/**.css', 'src/css/*/**.css']
        }
      }
    },
    concat: {
      css: {
        src: ['src/vendor/normalize.css', 'src/css/**.css', 'src/css/*/**.css'],
        dest: 'build/css/is-ui.css'
      },
      js: {
        src: ['src/js/**.js'],
        dest: 'build/js/is-ui.js'
      },
      less: {
        src: ['src/less/var.less', 'src/less/**/*.less'],
        dest: 'build/less/is-ui.css'
      }
    },
    uglify: {
      my_target: {
        files: {
          'build/js/is-ui.min.js': ['src/js/**.js']
        }
      }
    },
    watch: {
      css: {
        files: ['src/css/**.css', 'src/css/*/**.css'],
        tasks: ['cssmin', 'concat', 'compress'],
        options: {
          livereload: 5050,
        },
      },
      js: {
        files: 'src/js/**.js',
        tasks: ['uglify', 'concat', 'compress'],
        options: {
          livereload: 5050
        }
      },
      less: {
        files: 'src/less/**/**.less',
        tasks: ['concat:less', 'less'],
        options: {
          livereload: 5050
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: function(){
            return 'dist/is-ui.' + version + '.zip';
          }
        },
        files: [
          {src: ['build/js/**.js'], flatten: true},
          {src: ['build/css/**.css'], flatten: true},
          {src: ['build/include/**'], flatten: true}
        ]
      }
    },
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: false,
        createTag: false,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: '',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },
    csslint: {
      options: {
        formatters: [
          {id: 'csslint-xml', dest: 'report/csslint.xml'}
        ]
      },
      strict: {
        options: {
          import: 2
        },
        src: ['src/**/*.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['src/**/*.css']
      }
    },
    less: {
      development: {
        files: {
          "build/less/is-ui.css": "build/less/is-ui.css"
        }
      },
      production: {
        options: {
          paths: ["assets/css"],
          cleancss: false,
          // modifyVars: {
          //   imgPath: '"http://mycdn.com/path/to/images"',
          //   bgColor: 'red'
          // }
        },
        files: {
          "build/less/is-ui.css": "build/less/is-ui.css"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bump');

  // npm install grunt-bump --save-dev

  // Default task(s).
  grunt.registerTask('default', ['cssmin', 'uglify', 'concat', 'watch']);
  grunt.registerTask('patch', ['cssmin', 'uglify', 'concat', 'bump:patch']);
  grunt.registerTask('minor', ['cssmin', 'uglify', 'concat', 'bump:minor']);
  grunt.registerTask('major', ['cssmin', 'uglify', 'concat', 'bump:major']);
  grunt.registerTask('build', ['compress']);
  grunt.registerTask('lint', ['csslint']);
  grunt.registerTask('l', ['concat:less', 'less', 'watch:less']);
};