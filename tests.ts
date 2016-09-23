// tests go here; this will not be compiled when this package is used as a library

// back and forth
olney.motorAction(Motor.Motor1And2, MotorAction.Forward, 1200);
basic.pause(2000);
olney.motorAction(Motor.Motor1And2, MotorAction.Brake, 0); 
basic.pause(100);
olney.motorAction(Motor.Motor1And2, MotorAction.Reverse, 800);
basic.pause(2000);
  