/*
 * grunt-wrap
 * https://github.com/alex-seville/grunt-wrap
 *
 * Copyright (c) 2013 alex-seville
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task
  // creation: https://github.com/gruntjs/grunt/blob/devel/docs/toc.md

  grunt.registerMultiTask('wrap', 'Your task description goes here.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();

    var copyOptions = {
      process: options.processContent,
      noProcess: options.processContentExclude
    };

    var dest;
    var isExpandedPair;

    var header = grunt.file.read(options.header);
    var footer = grunt.file.read(options.footer);

    this.files.forEach(function(filePair) {
   
      filePair.src.forEach(function(src) {
          var fileStr = grunt.file.read(src);
          var newDest = path.join(filePair.dest, src);
          grunt.file.write(newDest,header+fileStr+footer);
          grunt.log.writeln('Wrote file:'+newDest);
      });

    });
    
  });

};
