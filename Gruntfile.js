module.exports = function(grunt){
  var path = require('path');
  var matchde = require('matchdep');

  // load all grunt-plugin tasks
  matchde.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // init config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // build stylesheet docs
    styleguide: {
      styledocco: {
        options: {
          framework: {
            name: 'styledocco'
          },
          name: 'Project Name',
          // プレビューエリア用のcssやjs(インラインで埋め込まれる)
          template: {
            include: ['src/doc-preview.js']
          }
        },
        files: {
          'docs': 'src/scss/**/*.scss'
        }
      }
    },
    // clean document directory
    clean: ['docs'],
    // compile scss to css
    compassMultiple: {
      options: {
        config: 'config.rb',
        sassDir: 'src/scss/'
      },
      common: {}
    },
    // watch some files status
    watch: {
      app: {
        files: ['src/scss/**/*.scss'],
        tasks: ['compassMultiple']
      }
    }
  });

  // resiter tasks
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['compassMultiple', 'clean', 'styleguide']);
};
