module.exports = {
  "bundles": {
    "scripts/app-build": {
      "includes": [
        "[**/*.js]",
        "**/*.html!text",
        "**/*.css!text"
      ],
      "options" : {
        "inject"  : true,
        "minify"  : true,
        "depCache": true,
        "rev"     : false
      }
    },
    "scripts/vendor"   : {
      "includes": [
        "npm:get-prop",
        "systemjs/plugin-text",
        "humane-js/themes/flatty.css!text",
        "aurelia-api",
        "aurelia-dependency-injection",
        "aurelia-fetch-client",
        "aurelia-framework",
        "aurelia-bootstrapper",
        "aurelia-fetch-client",
        "aurelia-polyfills",
        "aurelia-history-browser",
        "aurelia-i18n",
        "aurelia-loader",
        "aurelia-loader-default",
        "aurelia-logging-console",
        "aurelia-notification",
        "aurelia-pal",
        "aurelia-pal-browser",
        "aurelia-polyfills",
        "aurelia-router",
        "aurelia-templating-binding",
        "aurelia-templating-resources",
        "aurelia-templating-router",
        "aurelia-validation",
        "bootstrap",
        "remove-accents",
        "moment",
        "moment-round",
        "d3",
        "c3",
        "homefront",
        "raf",
        "intl",
        "webcomponents/webcomponentsjs/MutationObserver",
        "fetch",
        "i18next-xhr-backend",
        "jquery",
        "screenfull",
        "aurelia-configuration"
      ],
      "options" : {
        "inject"  : true,
        "minify"  : true,
        "depCache": false,
        "rev"     : false
      }
    }
  }
};
