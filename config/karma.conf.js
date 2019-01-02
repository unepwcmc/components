const wpConf = require('./webpack/test.js')
wpConf.devtool = "inline-source-map"

module.exports = config => {
  config.set({
    basePath: "",
    browsers:      ["ChromeHeadless"],
    files:         ["../app/javascript/components/**/*.spec.js"],
    frameworks:    ["mocha", "chai"],
    reporters:     ['spec', 'coverage'],
    plugins:       [
        "karma-chai",
        "karma-chrome-launcher",
        'karma-coverage',
        "karma-mocha",
        "karma-sourcemap-loader",
        'karma-spec-reporter',
        "karma-webpack"
    ],
    logLevel: config.LOG_INFO,
    preprocessors: {"../app/javascript/components/**/*.spec.js": ["webpack", "sourcemap"]},
    reporters:     ["dots"],
    singleRun:     false,
    autoWatch:     true,
    webpack:       wpConf,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
})
}