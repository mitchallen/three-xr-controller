/**
 * Author: Mitch Allen (https://mitchallen.com)
 *
 * References: 
 *  https://developer.oculus.com/documentation/unity/unity-ovrinput/
 *  https://github.com/MozillaReality/WebXR-emulator-extension/issues/237
 */

export const CONTROLLER_PROFILE = {
  OCULUS_GO: 'oculus-go',
  OCULUS_TOUCH: 'oculus-touch'
}

export const OCULUS_GO = {
  // Values map to gamepad array positions
  // Axis2D.PrimaryTouchpad
  // Button.Back, Button.Two
  TOUCHPAD_CLICK: 2,  // Button.One, Button.PrimaryTouchpad (click)
  INDEX_TRIGGER: 0,   // Button.PrimaryIndexTrigger
  // axes
  TOUCHPAD_X:  0,     // .axes[0]
  TOUCHPAD_Y:  1,     // .axes[1]
}

export const OCULUS_QUEST =
{
  // Values map to gamepad array positions
  BUTTON_B: 5,  // RIGHT: Button.Two, RawButton.A
  BUTTON_A: 4,  // RIGHT: Button.One, RawButton.B
  BUTTON_Y: 5,  // LEFT: Button.Two, RawButton.Y, Button.Four (combined controller)
  BUTTON_X: 4,  // LEFT: Button.One, RawButton.X, Button.Three (combined controller)
  THUMBSTICK_CLICK: 3, // Select Chrome in extension???, RawButton.LThumbstick, Button.PrimaryThumbstick
  BUTTON_UNKNOWN: 2,  // Unknown on Quest, used by touchpad click on Go
  HAND_TRIGGER: 1, // Squeeze / Button.PrimaryHandTrigger (combined controller)
  INDEX_TRIGGER: 0, // Select / Button.PrimaryIndexTrigger (combined controller)
  // axes
  THUMBSTICK_X:  2,     // .axes[2]
  THUMBSTICK_Y:  3,     // .axes[3]
}

export class XRCONTROLLER {

  // Setup controller connect listeners

  static connect( spec = {} ) {

    let {
      xr = null,
    } = spec;

    if( !xr ) {
      throw new Error('.create requires xr');
    }

    let controllers = [];

    let c0 = xr.getController(0);
    let c1 = xr.getController(1);

    c0.addEventListener('connected', function (event) {
      controllers.push(event.data);
    });

    c1.addEventListener('connected', function (event) {
      controllers.push(event.data);
    });

    return {
      controllers,
      c0,
      c1,
    }

  }

  // Get the current state of the buttons

  static getState(spec = {}) {
    let {
      controllers = []
    } = spec;

    // Return object to be filled in below with current state

    let controller = {
      profile: 'unknown',
      left: {
        axes: [],
        pressed: []
      },
      right: {
        axes: [],
        pressed: []
      }
    }

    // Loop through the controller states and build the return object

    controllers.forEach(function (ctrl, ic) {

      const handedness = ctrl.handedness;
      if (!handedness) return;
      var gp = ctrl.gamepad;
      if (!gp) return;
      var profiles = ctrl.profiles;
      var axes = gp.axes;

      let deviceProfiles = [ 
        CONTROLLER_PROFILE.OCULUS_GO, 
        CONTROLLER_PROFILE.OCULUS_TOUCH,
      ];

      deviceProfiles.forEach(
        function (p) {
          if (profiles.includes(p)) {
            controller.profile = p;
          }
        });

      if (profiles && axes) {
        for (let a = 0; a < axes.length; a++) {
          controller[handedness].axes[a] = axes[a];
        }
      }

      gp.buttons.forEach(function (btn, bx) {
        controller[handedness].pressed[bx] = btn.pressed;
      })

    });

    return controller;
  }
}