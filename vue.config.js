// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  outputDir: 'dist',
  indexPath: '../views/index.blade.php',

  transpileDependencies: [
    'vuetify',
  ],
};
