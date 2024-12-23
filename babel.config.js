module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // expo: {
    //   output: "static", // Exporta como contenido estático
    //   bundler: "webpack", // Usa Webpack para el bundler
    //   favicon: "./assets/favicon.png",
    // },
  };
};
