module.exports = function(grunt) {
  const mozjpeg = require('imagemin-mozjpeg');
  
    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
        imagemin: {
          static: {
              options: {
                  optimizationLevel: 7,
                  svgoPlugins: [{removeViewBox: false}],
                  use: [mozjpeg()] // Example plugin usage
              }
          }, 
          dynamic: {
            files: [{
                expand: true,
                cwd: 'FroggerGame/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'FroggerGame/'
            }]
        }
      },
      uglify: {
        my_target: {
          files: {
            'Pizzeria/js/perfmatters.min.js': ['Pizzeria/js/perfmatters.js'],
            'Pizzeria/views/js/main.min.js': ['Pizzeria/views/js/main.js']
          }
        }
      },
      cssmin: {
        target: {
          files: [{
            expand: true,
            cwd: 'Pizzeria/css',
            src: ['*.css', '!*.min.css'],
            dest: 'Pizzeria/css/',
            ext: '.min.css'
          },
          {
            expand: true,
            cwd: 'Pizzeria/views/css/',
            src: ['*.css', '!*.min.css'],
            dest: 'Pizzeria/views/css/',
            ext: '.min.css'
          }]
        }
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('ugli', ['uglify']);

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('default', ['imagemin']);

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('task', ['cssmin']);

  };
