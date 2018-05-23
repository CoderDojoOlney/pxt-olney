# Olney package

A set of functions to work with CoderDojo Olney projects

## Motor Driver Board

The Motor driver board allows control of 2 motors with power control

* Move both motors forward at power of 1000
```blocks
input.onButtonPressed(Button.A, () => {
    olney.motorAction(Motor.MotorA, MotorAction.Forward, 0)
})
input.onButtonPressed(Button.B, () => {
    olney.motorAction(Motor.MotorB, MotorAction.Forward, 0)
})
input.onButtonPressed(Button.AB, () => {
    olney.motorAction(Motor.MotorAandB, MotorAction.Brake, 0)
})
```

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

## License

MIT
