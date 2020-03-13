module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({

    copy: {
      build: {
        cwd: 'src',
        src: [ '**', '!**/*.styl', '!**/*.coffee', '!**/*.jade' ],
        dest: 'build',
        expand: true
      },
    },

    clean: {
      build: {
        src: [ 'build' ]
      },
      stylesheets: {
        src: [ 'build/**/*.css' ]
      },
      scripts: {
        src: [ 'build/js/**/*.js' ]
      },
    },

    stylus: {
      build: {
        options: {
          linenos: true,
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: [ '**/*.styl' ],
          dest: 'build',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      build: {
        expand: true,
        cwd: 'build',
        src: [ '**/*.css' ],
        dest: 'build'
      }
    },

    cssmin: {
      build: {
        files: {
          'build/css/application.css': [ 'build/css/style.css', 'build/css/font-awesome.css', 'build/css/droid-sans.css' ]
        }
      }
    },

    coffee: {
      build: {
        expand: true,
        cwd: 'src',
        src: [ '**/*.coffee' ],
        dest: 'build',
        ext: '.js'
      }
    },

    uglify: {
      build: {
        files: [{
            expand: true,
            cwd: 'src',
            src: '**/*.js',
            dest: 'build'
        }]
      }
    },

    jade: {
      compile: {
        options: {
          data: {}
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: [ '**/*.jade' ],
          dest: 'build',
          ext: '.html'
        }]
      }
    },

    watch: {
      stylesheets: {
        files: 'src/**/*.styl',
        tasks: [ 'stylesheets' ]
      },
      scripts: {
        files: 'src/**/*.coffee',
        tasks: [ 'scripts' ]
      },
      jade: {
        files: 'src/**/*.jade',
        tasks: [ 'jade' ]
      },
      copy: {
        files: [ 'src/**', '!src/**/*.styl', '!src/**/*.coffee', '!src/**/*.jade' ],
        tasks: [ 'copy' ]
      }
    }

  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // define the tasks
  grunt.registerTask(
    'stylesheets',
    'Compiles the stylesheets.',
    [ 'stylus', 'autoprefixer', 'cssmin' ]
  );

  grunt.registerTask(
    'scripts',
    'Compiles the JavaScript files.',
    [ 'clean:scripts', 'coffee', 'uglify' ]
  );

  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the build directory.',
    [ 'clean:build', 'copy', 'stylesheets', 'scripts', 'jade' ]
  );

  grunt.registerTask(
    'default',
    'Watches the project for changes, automatically builds them and runs a server.',
    [ 'build', 'watch' ]
  );
};
