
describe("A suite", function() {
  
  var expect = chai.expect;
  
  it("Should be fine :D",function(){
    var foo = 'nice';
    
    expect(foo).to.have.length(4);
  });

});