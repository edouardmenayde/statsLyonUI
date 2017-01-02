export default [
  {
    route   : '',
    name    : 'index',
    moduleId: 'page/index',
    nav     : true,
    title   : 'Home'
  },
  {
    route   : '/map',
    name    : 'Map',
    moduleId: 'page/map',
    nav     : true,
    title   : 'Map'
  },
  {
    route   : '/livecam',
    name    : 'Livecam',
    moduleId: 'page/livecam',
    nav     : true,
    title   : 'Livecam'
  },
  {
    route   : '/station/:id',
    name    : 'station',
    moduleId: 'page/station',
    nav     : false,
    title   : 'Station'
  },
  {
    route   : '/404',
    name    : 'not-found',
    moduleId: 'page/not-found',
    nav     : false,
    title   : '404'
  }
];
