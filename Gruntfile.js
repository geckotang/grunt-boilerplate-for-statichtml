module.exports = function(grunt){
  var path = require('path');
  var matchde = require('matchdep');

  // load all grunt-plugin tasks
  matchde.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // init config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // concat javascripts
    concat: {
      scripts: {
        src: [
          'common/js/src/vendor/jquery.min.js',
          'common/js/src/script.min.js'
        ],
        dest: 'common/js/all.js'
      }
    },
    // minify javascripts
    uglify: {
      scripts: {
        options: {
          preserveComments: 'some'
        },
        dist: {
          src: [
              'common/js/src/file1.js',
              'common/js/src/file2.js',
              'common/js/src/file3.js'
            ],
          dest: 'common/js/script.min.js'
        }
      }
    },
    // build stylesheet docs
    styleguide: {
      styledocco: {
        options: {
          framework: {
            name: 'styledocco'
          },
          name: 'Project Name',
          template: {
           include: ['common/css/src/doc-preview.js']
          },
        },
        files: {
          'common-docs': 'common/css/src/**/*.scss'
        }
      }
    },
    // clean document directory
    clean: ['common-docs'],
    // compile scss to css
    compassMultiple: {
      options: {
        config: 'common/css/src/config.rb',
        sassDir: 'common/css/src/'
      },
      common: {}
    },
    // watch some files status
    watch: {
      js: {
        files: ['common/js/src/*.js'],
        tasks: ['uglify', 'concat']
      },
      css: {
        files: ['common/css/src/**/*.scss'],
        tasks: ['compassMultiple']
      }
    }
  });

  // resiter tasks
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', [
    'uglify',
    'concat',
    'compassMultiple',
    'clean',
    'styleguide'
  ]);
};
