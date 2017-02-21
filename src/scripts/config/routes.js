export default [
  {
    route   : '',
    name    : 'index',
    moduleId: 'page/index',
    nav     : true,
    title   : 'Home',
    icon    : 'home'
  },
  {
    route   : '/stations',
    name    : 'Stations',
    moduleId: 'page/stations',
    nav     : true,
    title   : 'Stations',
    icon    : 'bicycle'
  },
  {
    route   : '/map',
    name    : 'Map',
    moduleId: 'page/map',
    nav     : true,
    title   : 'Map',
    icon    : 'map-o'
  },
  {
    route   : '/livecam',
    name    : 'Livecam',
    moduleId: 'page/livecam',
    nav     : true,
    title   : 'Livecam',
    icon    : 'cctv-o'
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
