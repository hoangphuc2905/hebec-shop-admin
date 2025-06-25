const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#12a5aa",
              "@btn-primary-color": "#fff",
              "@btn-primary-bg": "@blue-6",
              "@border-radius-base": "4px",
              "@table-padding-vertical": "10px",
              "@table-padding-horizontal": "10px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
