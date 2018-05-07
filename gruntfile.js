module.exports = function(grunt) {
  const mozjpeg = require('imagemin-mozjpeg');
    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
        imagemin: {
          static: {
              options: {
                  optimizationLevel: 5,
                  svgoPlugins: [{removeViewBox: false}],
                  use: [mozjpeg()] // Example plugin usage
              },
              files: {
                  'dist/img.png': 'src/img.png'
              }
          },
          dynamic: {
              files: [{
                  expand: true,
                  cwd: 'src/',
                  src: ['**/*.{png}'],
                  dest: 'dist/'
              }]
          }
      },
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: 'src/<%= pkg.name %>.js',
          dest: 'build/<%= pkg.name %>.min.js'
        }
      }
    });
  
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
  
    // Default task(s).
    grunt.registerTask('default', ['uglify']);

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('default', ['imagemin']);
  };