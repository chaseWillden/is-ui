module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      combine: {
        files: {
          'build/css/is-ui.min.css': ['src/css/normalize.css', 'src/css/**.css', 'src/css/*/**.css']
        }
      }
    },
    concat: {
      css: {
        src: ['src/css/normalize.css', 'src/css/**.css', 'src/css/*/**.css'],
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
            return 'dist/is-ui.<%= pkg.version %>.zip';
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
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'upstream',
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
  grunt.registerTask('build', ['cssmin', 'uglify', 'concat', 'bump', 'compress']);

};