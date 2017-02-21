const root       = 'src/';
const scriptRoot = root + 'scripts/';
const devRoot    = '.dev/';
const tmpRoot    = '.tmp/';
const distRoot   = 'dist/';

module.exports = {
  root        : root,
  scriptRoot  : scriptRoot,
  source      : scriptRoot + '**/*.js',
  html        : scriptRoot + '**/*.html',
  css         : scriptRoot + '**/*.css',
  sass        : root + 'styles/**/*.scss',
  font        : root + 'fonts/*',
  json        : root + '**/*.json',
  style       : root + 'styles/**/*.css',
  image       : root + 'images/**/*.+(png|jpg|jpeg)',
  images      : 'images/',
  fonts       : 'fonts/',
  styles      : 'styles/',
  scripts     : 'scripts/',
  locales     : 'scripts/config/locale/',
  devRoot     : devRoot,
  tmpRoot     : tmpRoot,
  distRoot    : distRoot,
  clean       : [tmpRoot, devRoot, distRoot],
  config      : root + 'config.js',
  index       : root + 'index.html',
  jspmPackages: root + 'jspm_packages',
  doc         : './doc',
  e2eSpecsSrc : 'test/e2e/src/**/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
