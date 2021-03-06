class BallClock {
  run(numBalls = false, numMinutes = false) {
    if (numMinutes) {
      this.modeOne(numBalls, numMinutes);
    } else if (numBalls) {
      this.modeTwo(numBalls);
    }
  }

  runTests() {
    console.log("Test: it runs mode two correctly");
    let test = this.modeTwo(30) === 15 && this.modeTwo(45) === 378;
    console.log(test ? "Test  passed." : "Test  failed.");

    document.getElementById("result").innerHTML = test
      ? "Test  passed."
      : "Test  failed.";

    console.log(test ? "ALL TESTS PASS." : "TESTS FAIL.");

    return test;
  }

  /* INTERNAL METHODS */

  initialize(numBalls) {
    if (numBalls < 27 || numBalls > 127) {
      const error = "ERROR: MUST CHOOSE NUMBER OF BALLS BETWEEN 27 AND 127";
      console.log(error);
      document.getElementById("completed").innerHTML =
        error && "ERROR: MUST CHOOSE NUMBER OF BALLS BETWEEN 27 AND 127";
      document.getElementById("result").innerHTML = "Test  failed.";

      return { success: false, error };
    }
    this.totalMinutes = 0;
    this.numBalls = numBalls;
    this.min = [];
    this.fiveMin = [];
    this.hour = [];
    this.main = [];
    this.original = [];
    for (let i = 1; i <= numBalls; i++) {
      this.main.push(i);
      this.original.push(i);
    }
    return { success: true };
  }

  arraysEqual(one, two) {
    return one.length === two.length && one.every((v, i) => v === two[i]);
  }

  /* NAIVE ALGORITHM */

  tick() {
    this.totalMinutes++;
    let releasedBall = this.main.shift();
    if (this.min.length < 4) {
      this.min.push(releasedBall);
    } else if (this.fiveMin.length < 11) {
      while (this.min[0]) {
        this.main.push(this.min.pop());
      }
      this.fiveMin.push(releasedBall);
    } else if (this.hour.length < 11) {
      while (this.min[0]) {
        this.main.push(this.min.pop());
      }
      while (this.fiveMin[0]) {
        this.main.push(this.fiveMin.pop());
      }
      this.hour.push(releasedBall);
    } else {
      while (this.min[0]) {
        this.main.push(this.min.pop());
      }
      while (this.fiveMin[0]) {
        this.main.push(this.fiveMin.pop());
      }
      while (this.hour[0]) {
        this.main.push(this.hour.pop());
      }
      this.main.push(releasedBall);
    }
  }

  count(numMinutes) {
    for (let i = 1; i <= numMinutes; i++) {
      this.tick();
    }
    return {
      min: this.min,
      fiveMin: this.fiveMin,
      hour: this.hour,
      main: this.main,
    };
  }

  /* Algo: MAP TRANSFORMATIONS */

  MapValue(numBalls) {
    this.initialize(numBalls);
    return this.count(12 * 60).main;
  }

  transform(original, map) {
    let array = [];
    map.forEach((ballNum) => {
      array.push(original[ballNum - 1]);
    });
    return array;
  }

  countCycles(numBalls) {
    let cycles = 1;
    const cycleMap = this.MapValue(numBalls); // no error handling needed
    let main = cycleMap; // getting the cycle map initializes the arrays
    while (!this.arraysEqual(main, this.original)) {
      main = this.transform(main, cycleMap);
      cycles++;
    }
    return cycles / 2;
  }

  /* MODES */

  modeOne(numBalls, numMinutes) {
    let initialized = this.initialize(numBalls); // keep error handling at user input level
    if (!initialized.success) {
      return initialized.error;
    }
    let start = performance.now();
    let result = JSON.stringify(this.count(numMinutes));
    let end = performance.now();
    console.log(`${numBalls} balls were cycled over ${numMinutes} minutes.`);
    
    console.log(result);
    let mil = Math.floor(end - start);
    let sec = mil / 1000;

    console.log(`Completed in ${mil} milliseconds (${sec} seconds)`);
    return result;
  }

  // map transform algorithm
  modeTwo(numBalls) {
    let initialized = this.initialize(numBalls); 
    if (!initialized.success) {
      return initialized.error;
    }
    let start = performance.now();
    let days = this.countCycles(numBalls);
    let end = performance.now();
    console.log(`${numBalls} balls cycle after ${days} days.`);
    let mil = Math.floor(end - start);
    let sec = mil / 1000;
    console.log(`Completed in ${mil} milliseconds (${sec} seconds)`);
    document.getElementById(
      "completed"
    ).innerHTML = `Completed in ${mil} milliseconds (${sec} seconds)`;
    return days;
  }
}

function getNumber() {
  var number = document.getElementById("number").value;
  console.log("num", number);
  const ballClock = new BallClock();
  ballClock.runTests();
  ballClock.run(number);
}
