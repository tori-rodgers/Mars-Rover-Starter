const Command = require('../command.js');

describe("Command class", function() {

  // TEST 1
  test("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  // TEST 2
  test("constructor sets command type", function () {
    let move = new Command("MOVE");
    expect(move.commandType).toEqual("MOVE");
   
  });

  //TEST 3
  test("constructor sets a value passed in as the 2nd argument", function() {
    let move = new Command("MOVE", 12000);
    expect(move.value).toEqual(12000)
  });
});   