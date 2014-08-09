module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      combine: {
        files: {
          'build/css/is-ui.min.css': ['src/css/normalize.css', 'src/css/**.css']
        }
      }
    },
    concat: {
      js: {
        src: ['src/css/normalize.css', 'src/css/**.css'],
        dest: 'build/css/is-ui.css'
      },
      css: {
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
        files: 'src/css/**.css',
        tasks: ['cssmin', 'concat'],
        options: {
          livereload: true,
        },
      },
      js: {
        files: 'src/js/**.js',
        tasks: ['uglify', 'concat'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['cssmin', 'uglify', 'concat', 'watch']);

};