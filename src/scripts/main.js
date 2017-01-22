import 'fetch'; // Fetch polyfill
import 'intl'; // Intl polyfill
import routes from "config/routes";
import appConfig from "config/app";
import Backend from "i18next-xhr-backend";
import {Router} from "aurelia-router";
import {AureliaConfiguration} from 'aurelia-configuration';
import "bootstrap";
import "font-awesome/css/font-awesome.min.css!text";

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()

    .plugin('aurelia-configuration', config => {
      config.setEnvironments({
        staging    : ['stats-lyon.localhost'],
        development: ['localhost'],
        production : ['stats-lyon.fr', 'www.stats-lyon.fr']
      });
      config.setDirectory('/scripts');
      config.setConfig('app.json');
    })

    .plugin('aurelia-api', builder => {
      let endpoints = aurelia.container.get(AureliaConfiguration).get('endpoints');
      endpoints.forEach(endpoint => {
        builder.registerEndpoint(endpoint.name, endpoint.endpoint, endpoint.config);

        if (endpoint.default) {
          builder.setDefaultEndpoint(endpoint.name);
        }
      });
    })

    .plugin('aurelia-notification', config => {
      config.configure({
        translate    : true,
        notifications: {
          'success': 'humane-flatty-success',
          'error'  : 'humane-flatty-error',
          'info'   : 'humane-flatty-info'
        }
      });
    })

    .plugin('aurelia-i18n', instance => {
      instance.i18next.use(Backend);
      instance.setup({
        backend    : {
          loadPath: 'scripts/config/locale/{{lng}}/{{ns}}.json'
        },
        lng        : appConfig.defaultLocale.language,
        attributes : ['t'],
        fallbackLng: appConfig.defaultLocale.language,
        debug      : false
      });
    })

    .plugin('aurelia-notification', configuration => {
      configuration.configure({
        translate    : true,
        notifications: {
          'success': 'humane-libnotify-success',
          'error'  : 'humane-libnotify-error',
          'info'   : 'humane-libnotify-info'
        }
      });
    })

    .globalResources('component/search')
    .globalResources('component/datamap')
    .globalResources('component/tooltip')
    .globalResources('component/results')
    .globalResources('component/datapie')
    .globalResources('component/chart')

    .globalResources('tool/floatFormatValueConverter')
    .globalResources('tool/dateFormatValueConverter')
    .globalResources('tool/hourFormatValueConverter')
    .globalResources('tool/titleFormatValueConverter')
  ;

  aurelia.use.developmentLogging();

  aurelia.start().then(a => {
    a.container.get(Router).configure(configureRouter);
    a.setRoot('app');
  });
}

function configureRouter(config) {
  config.title = appConfig.title;

  config.options.pushState = true;

  config.options.root = '/';

  config.map(routes);

  config.fallbackRoute('/404'); // Be careful to put a real route not name of the route !
}
