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


    var dest;
    var isExpandedPair;

    var header = grunt.file.read(options.header);
    var footer = grunt.file.read(options.footer);

    var startHeadContent = options.headDelimiter[0],
        endHeadContent = options.headDelimiter[1],
        insertHeadContent = options.headDelimiter[2],
        startFooterContent = options.footerDelimiter[0],
        endFooterContent = options.footerDelimiter[1],
        insertFooterContent = options.footerDelimiter[2];

    this.files.forEach(function(filePair) {
   
      filePair.src.forEach(function(src) {
          var fileStr = grunt.file.read(src);
          var newDest = path.join(filePair.dest, src);

          var iHeadStart = fileStr.indexOf(startHeadContent),
              iHeadEnd = fileStr.indexOf(endHeadContent),
              iFooterStart = fileStr.indexOf(startFooterContent),
              iFooterEnd = fileStr.indexOf(endFooterContent),
              iInsertHead = header.indexOf(insertHeadContent),
              iInsertFooter = footer.indexOf(insertFooterContent);

          var contentHeader = fileStr.slice(iHeadStart,iHeadEnd),
                contentFooter = fileStr.slice(iFooterStart,iFooterEnd);

          var newHeader = header.slice(0,iInsertHead)+contentHeader+header.slice(iInsertHead),
              newFooter = footer.slice(0,iInsertFooter)+contentFooter+footer.slice(iInsertFooter);

          grunt.file.write(newDest,newHeader+fileStr+newFooter);
          grunt.log.writeln('Wrote file:'+newDest);
      });

    });
    
  });

};
