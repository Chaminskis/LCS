// Karma configuration
// Generated on Mon Sep 22 2014 16:55:52 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','ng-scenario'],
    
    //plugins : ['karma-ng-scenario'],

    // list of files / patterns to load in the browser
    files: [
      
      /** verdors code **/
      // 'public/js/vendors/angular.js',
      'public/js/vendors/angular-route.min.js',
      'node_modules/ng-midway-tester/src/ngMidwayTester.js',
      'node_modules/chai/chai.js',
      
      
      /** app code **/
      'public/js/admin/modules.js',
      'public/js/admin/admin.js',
      
      'public/js/admin/service/*.js',
      'public/js/admin/controller/*.js',
      
      /** test spects **/
      'test/client/admin/controller/*Spec.js',
      'test/client/admin/service/*Spec.js',
    
      'test/client/admin/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS','PhantomJS_custom'],//['Chrome', 'ChromeCanary', 'Safari', 'Firefox'],


    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          }
        },
        flags: ['--remote-debugger-port=9000']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
