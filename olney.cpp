#include "pxt.h"

using namespace pxt;

//% color=270 weight=10
namespace olney {
    // --------------------------
    // Motor Driver
    // --------------------------
    bool motorEnabled = false;
    bool motorAReversed = false;
    bool motorBReversed = false;

    enum MotorPolarity {
        //% block="Normal"
        Normal,
        //% block="Reversed"
        Reversed
    }

    /**
     * Sets the Motor polarity - normal or reversed, so that you don't have to re-wire them to get Forward and Reverse to be correct'
     */
     //% help=olney/set-motor-polarity
     //% weight=10 
     //% blockGap=8
     //% blockId=olney_set_motor_polarity block="Motor %motor|set polarity %polarity"
     void setMotorPolarity(Motor motor, MotorPolarity polarity) {
         if (motor & Motor.MotorA) {
             motorAReversed = (MotorPolarity.Reversed == polarity);
         }
         if (motor & Motor.MotorB) {
             motorBReversed = (MotorPolarity.Reversed == polarity);
         }
     }
}
