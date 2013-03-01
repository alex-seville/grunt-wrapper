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
      options:{
         headDelimiter: ['// Please',' // creation','Permission'],
          footerDelimiter: ['Wrote','newDest','Permission']
        },
      default_options: {
        options: {
          header: 'LICENSE-MIT',
          footer: 'LICENSE-MIT'
         
        },
        files: {
          'tmp/': [ 'tasks/*.js']
        },
      },
      default_options2: {
        options: {
           footerDelimiter: [""],
            headDelimiter: [""],
          header: '',
          footer: 'LICENSE-MIT'
         
        },
        files: {
          'tmp/': [ 'tasks/*.js']
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
