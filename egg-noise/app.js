'use strict';
// npm install knex --save    安装knex库
const knex = require('knex')({
  client: 'mysql',
});

module.exports = app => {
  app.beforeStart(function* () {
    const hasUser = yield app.mysql.query(knex.schema.hasTable('voice').toString());
    if (hasUser.length === 0) {
      const userSchema = knex.schema.createTableIfNotExists('voice', function(table) {
        table.increments();
        table.string('key').notNullable().defaultTo('');
        table.string('voice').notNullable().defaultTo('');
        table.timestamp('create_at').defaultTo(knex.fn.now());
        table.charset('utf8');
      });
      yield app.mysql.query(userSchema.toString());
    }
  });
};
