enum Motor {
    //% block=1
    Motor1 = 0x01,
    //% block=2
    Motor2 = 0x10,
    //% block="1&2"
    Motor1And2 = 0x11
}

enum MotorAction {
    //% block="drive forward"
    Forward,
    //% block="drive in reverse"
    Reverse,
    //% block="brake"
    Brake
}

/**
 * A set of functions to work with DRV8835 based motor driver
 * connected to P1,2,8 & 12
 */
//% color=#00A655 weigth=2
namespace olney {
    /**
     * Controls two independant motors.
     * @param motor name of the motor(s)
     * @param required motor action
     * @param power level
     */
    //% blockId=olney_motor_drive
    //% block="motor %motor=motor_id|action %action|power %power"
    //% weight=80
    //% blockGap=8
    export function motorAction(motor: number, action: MotorAction, power: number) {
        if (motor & < number > Motor.Motor1) {
            pinAction(DigitalPin.P8, AnalogPin.P1, action, power);
        }
        if (motor & < number > Motor.Motor2) {
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
        pins.digitalWritePin(p0, p0v);
        pins.analogWritePin(p1, power);
        pins.analogSetPeriod(p1, 200);
    }

    /**
     * Converts the motor name into a number.
     * @param motor name of the motor
     */
    //% blockId=olney_motor_id
    //% block = "%motor"
    //% shim=TD_ID    
    export function motorId(motor: Motor): number {
        return motor;
    }
}
