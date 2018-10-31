var should = require('should');

describe('User', function () {
  describe('Create user', function () {
    it('Should create and save without error', function (done) {
      var user = { password: 1 };
      user.should.not.have.property('password');
      done();
    })
  })
})
