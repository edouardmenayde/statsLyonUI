System.config({
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "*": "scripts/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  map: {
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.1",
    "aurelia-api": "npm:aurelia-api@3.0.0-rc9",
    "aurelia-authentication": "npm:aurelia-authentication@3.0.0-rc9",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0",
    "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.0",
    "aurelia-framework": "npm:aurelia-framework@1.0.3",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
    "aurelia-i18n": "npm:aurelia-i18n@1.1.2",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
    "aurelia-notification": "npm:aurelia-notification@1.0.0-rc5",
    "aurelia-orm": "npm:aurelia-orm@3.0.0-rc7",
    "aurelia-pal": "npm:aurelia-pal@1.0.0",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.1.1",
    "aurelia-router": "npm:aurelia-router@1.0.3",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0",
    "aurelia-validation": "npm:aurelia-validation@0.11.0",
    "bluebird": "npm:bluebird@3.4.1",
    "bootstrap": "github:twbs/bootstrap@3.3.7",
    "fetch": "github:github/fetch@1.0.0",
    "font-awesome": "npm:font-awesome@4.6.3",
    "get-prop": "npm:get-prop@0.0.10",
    "humane-js": "npm:humane-js@3.2.2",
    "i18next-xhr-backend": "npm:i18next-xhr-backend@0.6.0",
    "jquery": "npm:jquery@2.2.4",
    "systemjs/plugin-text": "github:systemjs/plugin-text@0.0.8",
    "text": "github:systemjs/plugin-text@0.0.8",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.9"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:twbs/bootstrap@3.3.7": {
      "jquery": "npm:jquery@2.2.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.0"
    },
    "npm:aurelia-api@3.0.0-rc9": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.0",
      "aurelia-framework": "npm:aurelia-framework@1.0.3",
      "aurelia-path": "npm:aurelia-path@1.0.0",
      "extend": "npm:extend@3.0.0"
    },
    "npm:aurelia-authentication@3.0.0-rc9": {
      "aurelia-api": "npm:aurelia-api@3.0.0-rc9",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0",
      "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0",
      "aurelia-router": "npm:aurelia-router@1.0.3",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0",
      "extend": "npm:extend@3.0.0",
      "jwt-decode": "npm:jwt-decode@2.1.0"
    },
    "npm:aurelia-binding@1.0.4": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0"
    },
    "npm:aurelia-bootstrapper@1.0.0": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0",
      "aurelia-framework": "npm:aurelia-framework@1.0.3",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.0.3",
      "aurelia-templating": "npm:aurelia-templating@1.1.0",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0"
    },
    "npm:aurelia-dependency-injection@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-event-aggregator@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0"
    },
    "npm:aurelia-framework@1.0.3": {
      "aurelia-binding": "npm:aurelia-binding@1.0.4",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.0"
    },
    "npm:aurelia-history-browser@1.0.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-i18n@1.1.2": {
      "aurelia-binding": "npm:aurelia-binding@1.0.4",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0",
      "i18next": "npm:i18next@3.4.2",
      "intl": "npm:intl@1.2.4"
    },
    "npm:aurelia-loader-default@1.0.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-loader@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0"
    },
    "npm:aurelia-logging-console@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0"
    },
    "npm:aurelia-metadata@1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-notification@1.0.0-rc5": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-i18n": "npm:aurelia-i18n@1.1.2",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "extend": "npm:extend@3.0.0",
      "humane-js": "npm:humane-js@3.2.2"
    },
    "npm:aurelia-orm@3.0.0-rc7": {
      "aurelia-api": "npm:aurelia-api@3.0.0-rc9",
      "aurelia-binding": "npm:aurelia-binding@1.0.4",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.0",
      "aurelia-validation": "npm:aurelia-validation@0.6.6",
      "get-prop": "npm:get-prop@0.0.10",
      "typer": "npm:typer@1.1.0"
    },
    "npm:aurelia-pal-browser@1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-polyfills@1.1.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-route-recognizer@1.0.0": {
      "aurelia-path": "npm:aurelia-path@1.0.0"
    },
    "npm:aurelia-router@1.0.3": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0"
    },
    "npm:aurelia-task-queue@1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-templating-binding@1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.4",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.0"
    },
    "npm:aurelia-templating-resources@1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.4",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.0"
    },
    "npm:aurelia-templating-router@1.0.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0",
      "aurelia-router": "npm:aurelia-router@1.0.3",
      "aurelia-templating": "npm:aurelia-templating@1.1.0"
    },
    "npm:aurelia-templating@1.1.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.4",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0"
    },
    "npm:aurelia-validation@0.11.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.4",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.0"
    },
    "npm:aurelia-validation@0.6.6": {
      "aurelia-binding": "npm:aurelia-binding@1.0.4",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.0"
    },
    "npm:bluebird@3.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:font-awesome@4.6.3": {
      "css": "github:systemjs/plugin-css@0.1.27"
    },
    "npm:i18next@3.4.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:intl@1.2.4": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:jwt-decode@2.1.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:process@0.11.9": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  },
  depCache: {
    "app.js": [
      "aurelia-framework",
      "aurelia-router",
      "aurelia-authentication"
    ],
    "config/entities.js": [
      "../entity/user"
    ],
    "entity/user.js": [
      "aurelia-orm"
    ],
    "main.js": [
      "config/routes",
      "config/app",
      "config/auth",
      "config/entities",
      "i18next-xhr-backend",
      "aurelia-router",
      "aurelia-authentication",
      "bootstrap",
      "font-awesome/css/font-awesome.min.css!text"
    ],
    "page/auth/login.js": [
      "aurelia-dependency-injection",
      "aurelia-authentication",
      "aurelia-notification"
    ],
    "page/auth/logout.js": [
      "aurelia-authentication",
      "aurelia-dependency-injection"
    ]
  },
  bundles: {
    "app-build.js": [
      "app.html!github:systemjs/plugin-text@0.0.8.js",
      "app.js",
      "component/core/nav-bar.html!github:systemjs/plugin-text@0.0.8.js",
      "config/app.js",
      "config/auth.js",
      "config/entities.js",
      "config/routes.js",
      "entity/user.js",
      "main.js",
      "page/auth/login.html!github:systemjs/plugin-text@0.0.8.js",
      "page/auth/login.js",
      "page/auth/logout.html!github:systemjs/plugin-text@0.0.8.js",
      "page/auth/logout.js",
      "page/index.html!github:systemjs/plugin-text@0.0.8.js",
      "page/index.js"
    ],
    "vendor.js": [
      "github:github/fetch@1.0.0.js",
      "github:github/fetch@1.0.0/fetch.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "github:systemjs/plugin-text@0.0.8.js",
      "github:systemjs/plugin-text@0.0.8/text.js",
      "github:twbs/bootstrap@3.3.7.js",
      "github:twbs/bootstrap@3.3.7/css/bootstrap.css!github:systemjs/plugin-text@0.0.8.js",
      "github:twbs/bootstrap@3.3.7/js/bootstrap.js",
      "npm:aurelia-api@3.0.0-rc9.js",
      "npm:aurelia-api@3.0.0-rc9/aurelia-api.js",
      "npm:aurelia-authentication@3.0.0-rc9.js",
      "npm:aurelia-authentication@3.0.0-rc9/aurelia-authentication.js",
      "npm:aurelia-authentication@3.0.0-rc9/authFilterValueConverter.js",
      "npm:aurelia-authentication@3.0.0-rc9/authenticatedFilterValueConverter.js",
      "npm:aurelia-authentication@3.0.0-rc9/authenticatedValueConverter.js",
      "npm:aurelia-authentication@3.0.0-rc9/index.js",
      "npm:aurelia-binding@1.0.4.js",
      "npm:aurelia-binding@1.0.4/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.0.js",
      "npm:aurelia-bootstrapper@1.0.0/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.0.0.js",
      "npm:aurelia-dependency-injection@1.0.0/aurelia-dependency-injection.js",
      "npm:aurelia-event-aggregator@1.0.0.js",
      "npm:aurelia-event-aggregator@1.0.0/aurelia-event-aggregator.js",
      "npm:aurelia-fetch-client@1.0.0.js",
      "npm:aurelia-fetch-client@1.0.0/aurelia-fetch-client.js",
      "npm:aurelia-framework@1.0.3.js",
      "npm:aurelia-framework@1.0.3/aurelia-framework.js",
      "npm:aurelia-history-browser@1.0.0.js",
      "npm:aurelia-history-browser@1.0.0/aurelia-history-browser.js",
      "npm:aurelia-history@1.0.0.js",
      "npm:aurelia-history@1.0.0/aurelia-history.js",
      "npm:aurelia-i18n@1.1.2.js",
      "npm:aurelia-i18n@1.1.2/aurelia-i18n.js",
      "npm:aurelia-i18n@1.1.2/base-i18n.js",
      "npm:aurelia-i18n@1.1.2/defaultTranslations/relative.time.js",
      "npm:aurelia-i18n@1.1.2/df.js",
      "npm:aurelia-i18n@1.1.2/i18n.js",
      "npm:aurelia-i18n@1.1.2/nf.js",
      "npm:aurelia-i18n@1.1.2/relativeTime.js",
      "npm:aurelia-i18n@1.1.2/rt.js",
      "npm:aurelia-i18n@1.1.2/t.js",
      "npm:aurelia-i18n@1.1.2/utils.js",
      "npm:aurelia-loader-default@1.0.0.js",
      "npm:aurelia-loader-default@1.0.0/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0.js",
      "npm:aurelia-loader@1.0.0/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0.js",
      "npm:aurelia-logging-console@1.0.0/aurelia-logging-console.js",
      "npm:aurelia-logging@1.0.0.js",
      "npm:aurelia-logging@1.0.0/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.0.js",
      "npm:aurelia-metadata@1.0.0/aurelia-metadata.js",
      "npm:aurelia-notification@1.0.0-rc5.js",
      "npm:aurelia-notification@1.0.0-rc5/aurelia-notification.js",
      "npm:aurelia-orm@3.0.0-rc7.js",
      "npm:aurelia-orm@3.0.0-rc7/aurelia-orm.js",
      "npm:aurelia-orm@3.0.0-rc7/component/association-select.html!github:systemjs/plugin-text@0.0.8.js",
      "npm:aurelia-orm@3.0.0-rc7/component/association-select.js",
      "npm:aurelia-orm@3.0.0-rc7/component/paged.html!github:systemjs/plugin-text@0.0.8.js",
      "npm:aurelia-orm@3.0.0-rc7/component/paged.js",
      "npm:aurelia-orm@3.0.0-rc7/index.js",
      "npm:aurelia-pal-browser@1.0.0.js",
      "npm:aurelia-pal-browser@1.0.0/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.0.0.js",
      "npm:aurelia-pal@1.0.0/aurelia-pal.js",
      "npm:aurelia-path@1.0.0.js",
      "npm:aurelia-path@1.0.0/aurelia-path.js",
      "npm:aurelia-polyfills@1.1.1.js",
      "npm:aurelia-polyfills@1.1.1/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.0.0.js",
      "npm:aurelia-route-recognizer@1.0.0/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.0.3.js",
      "npm:aurelia-router@1.0.3/aurelia-router.js",
      "npm:aurelia-task-queue@1.0.0.js",
      "npm:aurelia-task-queue@1.0.0/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.0.0.js",
      "npm:aurelia-templating-binding@1.0.0/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.0.0.js",
      "npm:aurelia-templating-resources@1.0.0/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.0.0/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.0.0/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0/aurelia-hide-style.js",
      "npm:aurelia-templating-resources@1.0.0/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.0.0/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.0.0/binding-signaler.js",
      "npm:aurelia-templating-resources@1.0.0/compose.js",
      "npm:aurelia-templating-resources@1.0.0/css-resource.js",
      "npm:aurelia-templating-resources@1.0.0/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0/dynamic-element.js",
      "npm:aurelia-templating-resources@1.0.0/focus.js",
      "npm:aurelia-templating-resources@1.0.0/hide.js",
      "npm:aurelia-templating-resources@1.0.0/html-resource-plugin.js",
      "npm:aurelia-templating-resources@1.0.0/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.0.0/if.js",
      "npm:aurelia-templating-resources@1.0.0/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.0.0/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.0.0/repeat.js",
      "npm:aurelia-templating-resources@1.0.0/replaceable.js",
      "npm:aurelia-templating-resources@1.0.0/sanitize-html.js",
      "npm:aurelia-templating-resources@1.0.0/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0/show.js",
      "npm:aurelia-templating-resources@1.0.0/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0/with.js",
      "npm:aurelia-templating-router@1.0.0.js",
      "npm:aurelia-templating-router@1.0.0/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.0.0/route-href.js",
      "npm:aurelia-templating-router@1.0.0/route-loader.js",
      "npm:aurelia-templating-router@1.0.0/router-view.js",
      "npm:aurelia-templating@1.1.0.js",
      "npm:aurelia-templating@1.1.0/aurelia-templating.js",
      "npm:aurelia-validation@0.11.0.js",
      "npm:aurelia-validation@0.11.0/aurelia-validation.js",
      "npm:aurelia-validation@0.11.0/property-info.js",
      "npm:aurelia-validation@0.11.0/validate-binding-behavior.js",
      "npm:aurelia-validation@0.11.0/validate-trigger.js",
      "npm:aurelia-validation@0.11.0/validation-controller.js",
      "npm:aurelia-validation@0.11.0/validation-error.js",
      "npm:aurelia-validation@0.11.0/validation-errors-custom-attribute.js",
      "npm:aurelia-validation@0.11.0/validation-renderer-custom-attribute.js",
      "npm:aurelia-validation@0.11.0/validation-renderer.js",
      "npm:aurelia-validation@0.11.0/validator.js",
      "npm:aurelia-validation@0.6.6.js",
      "npm:aurelia-validation@0.6.6/debouncer.js",
      "npm:aurelia-validation@0.6.6/decorators.js",
      "npm:aurelia-validation@0.6.6/index.js",
      "npm:aurelia-validation@0.6.6/path-observer.js",
      "npm:aurelia-validation@0.6.6/strategies/twbootstrap-view-strategy.js",
      "npm:aurelia-validation@0.6.6/utilities.js",
      "npm:aurelia-validation@0.6.6/validate-custom-attribute.js",
      "npm:aurelia-validation@0.6.6/validation-config.js",
      "npm:aurelia-validation@0.6.6/validation-group-builder.js",
      "npm:aurelia-validation@0.6.6/validation-group.js",
      "npm:aurelia-validation@0.6.6/validation-locale.js",
      "npm:aurelia-validation@0.6.6/validation-property.js",
      "npm:aurelia-validation@0.6.6/validation-result.js",
      "npm:aurelia-validation@0.6.6/validation-rules-collection.js",
      "npm:aurelia-validation@0.6.6/validation-rules.js",
      "npm:aurelia-validation@0.6.6/validation-view-strategy.js",
      "npm:aurelia-validation@0.6.6/validation.js",
      "npm:extend@3.0.0.js",
      "npm:extend@3.0.0/index.js",
      "npm:get-prop@0.0.10.js",
      "npm:get-prop@0.0.10/getprop.js",
      "npm:humane-js@3.2.2.js",
      "npm:humane-js@3.2.2/humane.js",
      "npm:humane-js@3.2.2/themes/jackedup.css!github:systemjs/plugin-text@0.0.8.js",
      "npm:i18next-xhr-backend@0.6.0.js",
      "npm:i18next-xhr-backend@0.6.0/dist/commonjs/index.js",
      "npm:i18next-xhr-backend@0.6.0/dist/commonjs/utils.js",
      "npm:i18next-xhr-backend@0.6.0/index.js",
      "npm:i18next@3.4.2.js",
      "npm:i18next@3.4.2/dist/commonjs/BackendConnector.js",
      "npm:i18next@3.4.2/dist/commonjs/CacheConnector.js",
      "npm:i18next@3.4.2/dist/commonjs/EventEmitter.js",
      "npm:i18next@3.4.2/dist/commonjs/Interpolator.js",
      "npm:i18next@3.4.2/dist/commonjs/LanguageUtils.js",
      "npm:i18next@3.4.2/dist/commonjs/PluralResolver.js",
      "npm:i18next@3.4.2/dist/commonjs/ResourceStore.js",
      "npm:i18next@3.4.2/dist/commonjs/Translator.js",
      "npm:i18next@3.4.2/dist/commonjs/compatibility/v1.js",
      "npm:i18next@3.4.2/dist/commonjs/defaults.js",
      "npm:i18next@3.4.2/dist/commonjs/i18next.js",
      "npm:i18next@3.4.2/dist/commonjs/index.js",
      "npm:i18next@3.4.2/dist/commonjs/logger.js",
      "npm:i18next@3.4.2/dist/commonjs/postProcessor.js",
      "npm:i18next@3.4.2/dist/commonjs/utils.js",
      "npm:i18next@3.4.2/index.js",
      "npm:jquery@2.2.4.js",
      "npm:jquery@2.2.4/dist/jquery.js",
      "npm:jwt-decode@2.1.0.js",
      "npm:jwt-decode@2.1.0/lib/atob.js",
      "npm:jwt-decode@2.1.0/lib/base64_url_decode.js",
      "npm:jwt-decode@2.1.0/lib/index.js",
      "npm:process@0.11.9.js",
      "npm:process@0.11.9/browser.js",
      "npm:typer@1.1.0.js",
      "npm:typer@1.1.0/index.js"
    ]
  }
});