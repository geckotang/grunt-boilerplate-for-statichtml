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
    clean: {
      css: 'htdocs/common/css/style.css',
      styleguide: '<%= styleguide.styledocco.dest %>'
    },
    // compile scss to css
    compass: {
      dev: {
        options: {
          config: 'compass_config.rb',
          environment: 'development'
        }
      },
      prod: {
        options: {
          config: 'compass_config.rb',
          environment: 'production'
        }
      }
    },
    // watch some files status
    watch: {
      js: {
        files: ['<%= concat.script.src%>'],
        tasks: ['concat:lib', 'concat:script']
      },
      css: {
        files: ['htdocs/common/css/src/**/*.scss'],
        tasks: ['compass:dev']
      }
    }
  });

  // resiter tasks

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('build_css', [
    'clean:css',
    'compass:dev'
  ]);

  grunt.registerTask('build_mincss', [
    'clean:css',
    'compass:prod'
  ]);

  grunt.registerTask('build_guide', [
    'clean:styleguide',
    'styleguide'
  ]);

  grunt.registerTask('build', [
    'concat:minlib',
    'concat:script',
    'uglify:script',
    'clean',
    'styleguide',
    'compass:prod'
  ]);

};
