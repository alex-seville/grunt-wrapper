/*
 * grunt-wrap
 * https://github.com/alex-seville/grunt-wrap
 *
 * Copyright (c) 2013 alex-seville
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

   

    // Configuration to be run (and then tested).
    wrap: {
      default_options: {
        options: {
          header: 'LICENSE-MIT',
          footer: 'package.json'
        },
        files: {
          'tmp/': [ 'node_modules/**/*.js']
        },
      }
    },

   

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');


  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

};
