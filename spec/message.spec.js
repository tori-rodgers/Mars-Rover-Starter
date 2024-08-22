const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.
 
describe("Message class", function() {

// TEST 4
test("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    expect( function() { new Message();}).toThrow(new Error('Name required as first parameter.'));
  });

// TEST 5
test("constructor sets name", function () {
    let message = new Message("Tori");
    expect(message).toBeInstanceOf(Message);
    expect(message.name).toEqual("Tori");
});

//TEST 6
test("contains a commands array passed into the constructor as the 2nd argument", function() {
    let command1 = new Command("One", 1);
    let command2 = new Command("Two", 2);
    let commands = [command1, command2];
    let message = new Message("Three", commands);
    expect(message).toBeInstanceOf(Message);
    expect(message.commands).toEqual([command1, command2]);
});

}); 
