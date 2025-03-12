module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Opções do Jasmine, se necessário
      },
    },
    jasmineHtmlReporter: {
      suppressAll: true // Remove duplicações
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/projeto-certificado'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],
    customLaunchers: {
      Chrome: {
        base: 'ChromeHeadless',
        flags: [
          '--remote-debugging-port=9222',
          '--disable-gpu',
          '--no-sandbox',  // Pode ser necessário para WSL
          '--headless'  // Se não quiser a interface gráfica, mantenha o --headless
        ]
      }
    },
    restartOnFileChange: true
  });
};
