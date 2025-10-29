// karma.conf.js
// Intenta obtener la config de webpack de react-scripts
let webpackConfig;
try {
  webpackConfig = require('./node_modules/react-scripts/config/webpack.config.js')('development');
} catch (e) {
  console.error("Error al cargar webpack.config.js de react-scripts. Asegúrate de que las dependencias estén instaladas.");
  // Configuración mínima de fallback si falla la carga
  webpackConfig = {
    module: { rules: [] },
    resolve: { extensions: ['.js', '.jsx'] },
    mode: 'development',
  };
  devtool: 'inline-source-map'
}

// Asegurarse de que Babel procese JSX y JS moderno
webpackConfig.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-react', '@babel/preset-env'] // Asegúrate de tener @babel/preset-env si usas JS moderno
  }
});
// Añadir regla para CSS si tus componentes lo importan
webpackConfig.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
});


module.exports = function(config) {
  config.set({
    // Frameworks: Jasmine y Webpack
    frameworks: ['jasmine', 'webpack'],

    // Archivos a cargar/probar:
    // Busca TODOS los archivos .spec.js dentro de la carpeta tests/
    files: [
      'tests/**/*.spec.js'
    ],

    // Preprocesadores: Pasa los archivos de prueba por Webpack
    preprocessors: {
      'tests/**/*.spec.js': ['webpack', 'sourcemap']
    },

    // Configuración de Webpack (restaurada y necesaria para React)
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      mode: 'development',
      devtool: 'inline-source-map',
    },

    webpackMiddleware: {
      noInfo: true,
    },

    // Reporteros
    reporters: ['progress'],

    // Puerto
    port: 9876,

    // Colores
    colors: true,

    // Nivel de log
    logLevel: config.LOG_INFO,

    // Auto-observación (útil durante el desarrollo)
    autoWatch: true,

    // Navegadores (ya lo tenías configurado para Opera)
    browsers: ['ChromeHeadless'], // Cambiado a ChromeHeadless para mayor compatibilidad

    // Ejecución única o continua
    singleRun: false, // Déjalo en false mientras escribes pruebas

    // Concurrencia
    concurrency: Infinity
  });
};