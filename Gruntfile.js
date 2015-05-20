module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }        
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      jade:{
        files: './jade/*',
        tasks: ['jade']
      }
    },

    jade: {
      compile: {
        options: {
          pretty:true,
          data: {
            debug: false
          }
        },
        files: {
          "./index.html": ["./jade/index.jade"]
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: './',
          keepalive: true
      }
    }
  }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.registerTask('build', ['sass', 'jade']);
  grunt.registerTask('default', ['build','connect','watch']);
}