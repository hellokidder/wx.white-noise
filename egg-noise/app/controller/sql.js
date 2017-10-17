'use strict';

module.exports = app => {
  class StartController extends app.Controller {
    * add() {
      this.ctx.body = yield this.service.sql.create(this.ctx.request.body);
    }
    * get() {
      this.ctx.body = yield this.service.sql.get(this.ctx.request.body);
    }
  }
  return StartController;
};
