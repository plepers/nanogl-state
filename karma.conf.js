// Karma configuration
// Generated on Sat Dec 19 2015 12:50:43 GMT+0100 (CET)

module.exports = function (config) {

  var glversion = 1;


  if( config.webglVersion !== undefined ){
    glversion = config.webglVersion;
  }

  
  var invgrep;
  if( glversion === 1 ){
    invgrep = '@WEBGL2';
  }
  else {
    invgrep = '@WEBGL1';
  }

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'mocha'],


    // list of files / patterns to load in the browser
    files: [
      'test/*.js',
      { pattern: 'test/assets/*.*', watched: false, included: false, served: true, nocache: false }
    ],

    proxies: {
      '/assets/': '/base/test/assets/'
    },


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: [
        ["babelify", { "presets": ["@babel/preset-env"] }],
        ['stringify', { 'extensions': ['.vert', '.frag'] }]
      ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],//, 'Firefox', 'Safari'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity,


    // SL and travis config
    sauceLabs: {
      startConnect: true,
      testName: 'nanogl-state unit tests'
    },

    // define SL browsers
    customLaunchers: {


      'SL_Chrome78_OSX10_13': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '78.0',
        platform: 'macOS 10.13',
        webgl2: true
      },
      'SL_Chrome78_WIN10': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '78.0',
        platform: 'Windows 10',
        webgl2: true
      },


      'SL_Chrome65_WIN10': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '65.0',
        platform: 'Windows 10',
        webgl2: true
      },

      // 'SL_win10_Edge': {
      //   base: 'SauceLabs',
      //   browserName: 'MicrosoftEdge',
      //   platform: 'Windows 10',
      //   version: '18.17763'
      // },
      // 'SL_win10_FF': {
      //   base: 'SauceLabs',
      //   browserName: 'firefox',
      //   platform: 'Windows 10',
      //   version: '70.0'
      // },
    },
  });

  if( process.env.TRAVIS ) {

    var browsers = [];
    for( var browser in config.customLaunchers ){
      
      // skip browser not supporting webgl2
      var bdata = config.customLaunchers[browser];
      if( glversion !== 1 && bdata.webgl2 !== true ) 
        continue; 

      browsers.push( browser );
    }
    console.log( browsers );
    config.browsers = browsers;

    config.autoWatch = false;
    config.singleRun = true;

  }
};
