'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.post('/create', 'sql.add');
  app.post('/get', 'sql.get');
};
