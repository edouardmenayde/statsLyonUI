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
    route   : '/station/:id',
    name    : 'station',
    moduleId: 'page/station',
    nav     : false,
    title   : 'Station'
  }
];
