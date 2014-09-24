/*
 *
 * api test: https://github.com/visionmedia/supertest
 * assert library : http://chaijs.com/
 *
 **/

var request = require("supertest");

var chai = require('chai');
 
var expect = chai.expect;

chai.should();

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
        expect(5).to.equal(5);
    })
  })
});

describe('Web Service',function(){
    
    var api = request('http://lcs.blageek.net/');
    
    it('Show default response',function(done){
        
        api.get('app/service/').send()
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err,response){
            
            expect(err).to.equal(null);
            
            response.text.should.include('nice');
            
            response.body.nice.should.equal(4);
            
            done();
        });
        
    });
    
});