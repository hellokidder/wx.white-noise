
/**
 * 这里是关于数据库的操作
 */
'use strict';

module.exports = app => {
  class Sql extends app.Service {
    * create(a) {
      try {
        yield app.mysql.insert('voice', a);
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return true;
    }
    * get(a) {
      let res;
      try {
        res = yield app.mysql.get('voice', a);
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return res.voice;
    }
  }
  return Sql;

};
