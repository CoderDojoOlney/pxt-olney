/**
 * Motors that can be driven
 */
enum Motor {
    //% block="A"
    MotorA = 0x01,
    //% block="B"
    MotorB = 0x10,
    //% block="A&B"
    MotorAandB = 0x11
}

/**
 * Actions that we can do with the Motors
 */
enum MotorAction {
    //% block="Forward"
    Forward,
    //% block="Reverse"
    Reverse,
    //% block="Brake"
    Brake
}

/**
 * A set of functions to work with DRV8835 based motor driver
 * connected to P1,2,8 & 12
 */
//% color=#00A655 weigth=2
namespace olney {
    /**
     * Drive 2 Motors, direction & with PWM power control,
     * DRV8835 Driver connected A:Dir=P8, PWM=P1; B:Dir=P12, PWM=P2
     * @param motor name of the motor(s)
     * @param required motor action
     * @param power level (0-1023)
     */
    //% blockId=olney_motor_drive
    //% block="Motor %motor|direction %action|power %power"
    //% weight=80
    //% blockGap=8
    export function motorAction(motor: Motor, action: MotorAction, power: number) {
        if (motor & < number > Motor.MotorA) {
            pinAction(DigitalPin.P8, AnalogPin.P1, action, power);
        }
        if (motor & < number > Motor.MotorB) {
            pinAction(DigitalPin.P12, AnalogPin.P2, action, power);
        }
    }

    function pinAction(p0: DigitalPin, p1: AnalogPin, action: MotorAction, power: number) {
        let p0v = 0;
        switch (action) {
            case MotorAction.Forward: p0v = 1; break;
            case MotorAction.Reverse: p0v = 0; break;
            case MotorAction.Brake: power = 0; break;
            default:
        }
        /**
         * PWM using a 200uS period to achive 5KHz
         * unfortunately this only gives around 50 levels
         */
        pins.digitalWritePin(p0, p0v);
        pins.analogWritePin(p1, power);
        pins.analogSetPeriod(p1, 200);
    }

}
