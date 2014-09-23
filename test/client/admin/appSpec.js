describe("Testing Modules", function() {
  
  var expect = chai.expect;
  
  describe("LCS Admin:", function() {

    var module;
    
    before(function() {
      module = angular.module("lcs-admin");
    });

    it("should exits", function() {
      expect(module).not.to.equal(null);
    });
  });
  
  describe('App',function(){
        
    var appControllers;
    
    before(function() {
      module = angular.module("app.controllers");
    });
    
    it("should exits", function() {
      expect(appControllers).not.to.equal(null);
    });
    
    var appService;
    
    before(function() {
      module = angular.module("app.services");
    });
    
    it("should exits", function() {
      expect(appService).not.to.equal(null);
    });
    
    describe('Dependencies',function(){
      
      var deps;
      
      var hasModule = function(module) {
        return deps.indexOf(module) >= 0;
      };
      
      before(function() {
        deps = angular.module("app.controllers").requires;
        
        console.log(deps);  
      });
      
      it("should have app.services as a dependency", function() {
        expect(hasModule('app.services')).to.equal(true);
      });
      
    });
  });
  
});