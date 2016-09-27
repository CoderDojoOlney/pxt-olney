
/**
 * Motors that can be driven
 */
enum Motor {
    //% block="A"
    MotorA = 0x01,
    //% block="B"
    MotorB = 0x10,
    //% block="A+B"
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
 * Motor polarities
 */
enum MotorPolarity {
    //% block="Normal"
    Normal,
    //% block="Reversed"
    Reversed
}

/**
 * A set of functions to work with DRV8835 based motor driver
 * connected to P1,2,8 & 12
 * This package deliberately uses a mix of TypeScript and C++ to explore how
 * to use the pxt capabilities and shims...
 */
//% color=270 weigth=10
namespace olney {
    let motorAReversed = false;
    let motorBReversed = false;
    let motorPWMPeriod = 200;   // Default 200uS period 

    /**
     * Sets the Motor polarity - normal or reversed, so that you don't have to re-wire them to get Forward and Reverse to be correct
     */
    //% blockId=olney_set_motor_polarity 
    //% block="motor %motor|set polarity %polarity" icon= "\uf07e"
    //% weight=10 
    //% blockGap=8
    export function setMotorPolarity(motor: Motor, polarity: MotorPolarity) {
        if (motor & <number>Motor.MotorA) {
            if (polarity == MotorPolarity.Reversed) {
                motorAReversed = true;
            } else {
                motorAReversed = false;
            }
        }
        if (motor & <number>Motor.MotorB) {
            if (polarity == MotorPolarity.Reversed) {
                motorBReversed = true;
            } else {
                motorBReversed = false;
            }
         }
    }

    /**
     * Sets the Motor PWM frequency (Hz), maximum in praxctice around 5000 Hz
     */
    //% blockId=olney_set_motor_frequency 
    //% block="motors set drive frequency (Hz) %frequency"
    //% weight=10 
    //% blockGap=8
    export function setMotorFrequency(frequency: number) {
        // Limit frequency to valid range
        if (10000 < frequency) frequency = 10000;
        if (100 > frequency) frequency = 100;

        motorPWMPeriod = 1000000 / frequency;
    }

    /**
     * Drive 2 Motors, with individual direction & PWM power control.
     * DRV8835 Driver connected A:Dir=P8, PWM=P1; B:Dir=P12, PWM=P2
     * @param motor name of the motor(s)
     * @param required motor action
     * @param power level (0-1023)
     */
    //% blockId=olney_motor_action
    //% block="motor %motor|direction %action|power %power" icon="\uf047"
    //% weight=80
    //% blockGap=8
    export function motorAction(motor: Motor, action: MotorAction, power: number) {
        let actual_action = action;
        // Limit power to valid range
        if (1023 < power) power = 1023;
        if (0 > power) power = 0;

        if (motor & <number>Motor.MotorA) {
            if (motorAReversed) {
                if (action == MotorAction.Forward) actual_action = MotorAction.Reverse;
                if (action == MotorAction.Reverse) actual_action = MotorAction.Forward;
            }
            pinAction(DigitalPin.P8, AnalogPin.P1, actual_action, power);
        }
        if (motor & <number>Motor.MotorB) {
            if (motorBReversed) {
                if (action == MotorAction.Forward) actual_action = MotorAction.Reverse;
                if (action == MotorAction.Reverse) actual_action = MotorAction.Forward;
            }            
            pinAction(DigitalPin.P12, AnalogPin.P2, actual_action, power);
        }        
    }

    //%
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
        pins.analogSetPeriod(p1, motorPWMPeriod);
    }
}
