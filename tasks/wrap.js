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
       var options = this.options({
      headDelimiter: [""],
      footerDelimiter: [""]
    });

    var dest;
    var isExpandedPair;

    var header = options.header ? grunt.file.read(options.header) : "";
    var   footer = options.footer ? grunt.file.read(options.footer) : "";

    var startHeadContent = options.headDelimiter.length === 3 ? options.headDelimiter[0] : null,
          endHeadContent = options.headDelimiter.length === 3 ? options.headDelimiter[1] : null,
       insertHeadContent = options.headDelimiter.length === 3 ? options.headDelimiter[2] : null,
       startFooterContent = options.footerDelimiter.length === 3 ? options.footerDelimiter[0] : null,
        endFooterContent = options.footerDelimiter.length === 3 ? options.footerDelimiter[1] : null,
     insertFooterContent = options.footerDelimiter.length === 3 ? options.footerDelimiter[2] : null;

    this.files.forEach(function(filePair) {
   
      filePair.src.forEach(function(src) {
          var fileStr     = grunt.file.read(src);
          var newDest = path.join(filePair.dest, src);

          var newHeader = header;
          var  newFooter = footer;

          var iHeadStart=0,
              iHeadEnd=0,
              iFooterStart=0,
              iFooterEnd=0;

          if (options.headDelimiter.length === 3){
              iHeadStart = fileStr.indexOf(startHeadContent);
                iHeadEnd = fileStr.indexOf(endHeadContent,iHeadStart);
              var iInsertHead = header.indexOf(insertHeadContent);
                var contentHeader = fileStr.slice(iHeadStart,iHeadEnd);
                 newHeader = header.slice(0,iInsertHead)+contentHeader+header.slice(iInsertHead);

                 iFooterEnd = iHeadEnd;
          }
          if (options.footerDelimiter.length === 3){
              iFooterStart = fileStr.indexOf(startFooterContent);
              iFooterEnd = fileStr.indexOf(endFooterContent,iFooterStart);
           
            var  iInsertFooter = footer.indexOf(insertFooterContent);
             var contentFooter = fileStr.slice(iFooterStart,iFooterEnd);
             newFooter = footer.slice(0,iInsertFooter)+contentFooter+footer.slice(iInsertFooter);
           }       

          fileStr = fileStr.slice(0,iHeadStart)+fileStr.slice(iHeadEnd,iFooterStart)+fileStr.slice(iFooterEnd);

          grunt.file.write(newDest,newHeader+fileStr+newFooter);
          grunt.log.writeln('Wrote file:'+newDest);
      });

    });
    
  });

};
