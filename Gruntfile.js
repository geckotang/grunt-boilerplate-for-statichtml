module.exports = function(grunt){
  var path = require('path');
  var matchdep = require('matchdep');

  // load all grunt-plugin tasks
  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // init config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // minify javascripts
    uglify: {
      script: {
        options: {
          preserveComments: 'some',
          banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        src: ['<%= concat.script.dest%>'],
        dest: 'htdocs/common/js/script.min.js'
      }
    },
    // concat javascripts
    concat: {
      // ライブラリやプラグイン
      lib: {
        src: [
          'htdocs/common/js/vendor/jquery-1.10.2.js'
        ],
        dest: 'htdocs/common/js/lib.js'
      },
      // minify済みのライブラリやプラグイン
      minlib: {
        src: [
          'htdocs/common/js/vendor/jquery-1.10.2.min.js'
        ],
        dest: 'htdocs/common/js/lib.min.js'
      },
      // 作成したJavaScript
      script: {
        src: [
          'htdocs/common/js/src/file1.js',
          'htdocs/common/js/src/file2.js',
          'htdocs/common/js/src/file3.js'
        ],
        dest: 'htdocs/common/js/script.js'
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
           include: ['htdocs/common/css/src/doc-preview.js']
          },
        },
        src: [
          // サブディレクトリも含めドキュメント化
          'htdocs/common/css/**/*.scss',
          // ライブラリなどは除外
          '!htdocs/common/css/vendor/**/*.scss'
        ],
        dest: 'htdocs/common-docs'
      }
    },
    // clean document directory
    clean: ['<%= styleguide.styledocco.dest %>'],
    // compile scss to css
    compassMultiple: {
      options: {
        config: 'htdocs/common/css/src/config.rb',
        sassDir: 'htdocs/common/css/src'
      },
      common: {}
    },
    // watch some files status
    watch: {
      js: {
        files: ['<%= concat.script.src%>'],
        tasks: ['concat:lib', 'concat:script']
      },
      css: {
        files: ['htdocs/common/css/src/**/*.scss'],
        tasks: ['compassMultiple']
      }
    }
  });

  // resiter tasks
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', [
    'concat:minlib',
    'concat:script',
    'uglify:script',
    'compassMultiple',
    'clean',
    'styleguide'
  ]);
};
