module.exports = function(grunt){
  var path = require('path');
  var matchde = require('matchdep');

  // load all grunt-plugin tasks
  matchde.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // init config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    globals: {
      assetDir: 'common'
    },
    // minify javascripts
    uglify: {
      scripts: {
        options: {
          preserveComments: 'some',
          banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        src: [
          '<%= globals.assetDir %>/js/src/file1.js',
          '<%= globals.assetDir %>/js/src/file2.js',
          '<%= globals.assetDir %>/js/src/file3.js'
        ],
        dest: '<%= globals.assetDir %>/js/src/script.min.js'
      }
    },
    // concat javascripts
    concat: {
      scripts: {
        src: [
          '<%= globals.assetDir %>/js/vendor/jquery-1.10.2.min.js',
          '<%= uglify.scripts.dest %>'
        ],
        dest: '<%= globals.assetDir %>/js/all.js'
      }
    },
    // build stylesheet docs
    styleguide: {
      styledocco: {
        options: {
          name: 'Project Name',
          framework: {
            name: 'styledocco'
          },
          template: {
           include: ['<%= globals.assetDir %>/css/src/doc-preview.js']
          },
        },
        src: '<%= globals.assetDir %>/css/src/**/*.scss',
        dest: '<%= globals.assetDir %>-docs'
      }
    },
    // clean document directory
    clean: ['<%= styleguide.styledocco.dest %>'],
    // compile scss to css
    compassMultiple: {
      options: {
        config: '<%= globals.assetDir %>/css/src/config.rb',
        sassDir: '<%= globals.assetDir %>/css/src/'
      },
      common: {}
    },
    // watch some files status
    watch: {
      js: {
        files: ['<%= uglify.scripts.src %>'],
        tasks: ['uglify', 'concat']
      },
      css: {
        files: ['<%= globals.assetDir %>/css/src/**/*.scss'],
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
