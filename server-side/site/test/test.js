const expect = require('chai').expect;
const got   = require('got');

describe('checkbox', function() {
  describe('/api/study/listing', function() {
    it('should return empty studies array and 200 status code', async () => {

      const response = await got(`http://localhost:${APP_PORT}/api/study/listing`, {
        timeout: 500
      });
      
      expect(response.statusCode).to.be(200);
      expect(response.body).to.include('"studies": []');
    });
  });
});
