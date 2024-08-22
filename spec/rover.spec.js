const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here!

  // TEST 7
  test("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382);
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  // TEST 8
  test("response returned by receiveMessage contains the name of the message", function() {
    let messageSent = new Message("Finn", []);
    let rover = new Rover(50);
    let result = (rover.receiveMessage(messageSent)).message;
    expect(result).toBe("Finn");
  });

  // TEST 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let command1 = new Command("MOVE", 123);
    let command2 = new Command("MODE_CHANGE", "LOW_POWER");
    let message = new Message("Finn", [command1, command2]);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.results).toEqual([{completed: true}, {completed: true}]);
  });

  // TEST 10
  test("responds correctly to the status check command", function () {
    let statusCommand = new Command("STATUS_CHECK");
    let message = new Message("Status", [statusCommand]);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.results).toEqual([{completed: true, roverStatus: {mode:'NORMAL', generatorWatts: 110, position: 98382}}]);
  });

  // TEST 11 
  test("responds correctly to the mode change command", function(){
    let modeCommand = new Command("MODE_CHANGE", "LOW_POWER");
    let message = new Message("Mode Change", [modeCommand]);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.results).toEqual([{completed: true}]);
    expect(rover.mode).toEqual("LOW_POWER");
  });

  // TEST 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let moveCommand = new Command("MOVE", 123);
    let message = new Message("Move", [moveCommand]);
    let rover = new Rover(802096);
    rover.mode = "LOW_POWER";
    let response = rover.receiveMessage(message);

    expect(response.results).toEqual([{completed: false}]);
    expect(rover.position).toEqual(802096);
  });

  // TEST 13
  test("responds with the position for the move command", function() {
    let moveCommand = new Command("MOVE", 123);
    let message = new Message("Move", [moveCommand]);
    let rover = new Rover(802096);
    let response = rover.receiveMessage(message);
  
    expect(response.results).toEqual([{completed: true}]);
    expect(rover.position).toEqual(123);
  });
}); 

