const expect = require('chai').expect;
const got   = require('got');

describe('checkbox', function() {
  describe('/api/study/create', function() {
    it('should send an error for invalid invite code', async () => {

      const response = await got.post('http://localhost:3001/api/study/create', {
        body: {
          invitecode: "NOT-RESEARCH",
          studyKind: "survey"
        },
        json:true,
        timeout: 500
      })
          
      expect(response.body).to.include("error':'Invalid invitecode'");
    });
  });
});
