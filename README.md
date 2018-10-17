# Olney package

A set of functions to work with CoderDojo Olney projects using DRV8835 Motor Driver wired with A:Dir = P8, PWM = P1 & B:Dir = P12, PWM = P2.

## Motor Driver Board

The Motor driver board allows control of 2 motors with direction and power control from 0-1023

* Move both motors forward at power of 1000
```blocks
input.onButtonPressed(Button.AB, () => {
    olney.motorAction(Motor.MotorAandB, MotorAction.Brake, 1000)
})
```

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

## License

MIT
