module.exports = {
  devServer: {
    // see https://cli.vuejs.org/config/#devserver for more options
    proxy: {
      "^/api": {
        autoRewrite: true,
        target: "http://127.0.0.1:5000/"
      }
    }
  }
};
