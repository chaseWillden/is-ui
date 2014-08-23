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
          livereload: true,
        },
      },
      js: {
        files: 'src/js/**.js',
        tasks: ['uglify', 'concat', 'compress'],
        options: {
          livereload: true
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
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-bump');

  // npm install grunt-bump --save-dev

  // Default task(s).
  grunt.registerTask('default', ['cssmin', 'uglify', 'concat', 'watch']);
  grunt.registerTask('patch', ['cssmin', 'uglify', 'concat', 'bump:patch']);
  grunt.registerTask('minor', ['cssmin', 'uglify', 'concat', 'bump:minor']);
  grunt.registerTask('major', ['cssmin', 'uglify', 'concat', 'bump:major']);
  grunt.registerTask('build', ['compress']);
};