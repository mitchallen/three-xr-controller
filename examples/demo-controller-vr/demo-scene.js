/*
 * File: demo-scene.js
 * Author: Mitch Allen
 */

import {
  XRKIT,
} from 'https://cdn.jsdelivr.net/npm/@mitchallen/three-xr-kit@1.0.13/dist/three-xr-kit.modern.js';

import {
  XRCONTROLLER,
  CONTROLLER_PROFILE,
  OCULUS_GO,
  OCULUS_QUEST,
} from 'https://cdn.jsdelivr.net/npm/@mitchallen/three-xr-controller@0.1.4/dist/three-xr-controller.modern.js';
// } from '../../dist/three-xr-controller.modern.js'

import { ShapeFactory } from './shape.js';

export class DemoSceneFactory {

  // Define a static create method to return new scenes filled with shapes
  static create() {

    var speed = 1;

    var xrApp = XRKIT.create();

    // Create a demo world group node
    const demoWorld = new THREE.Group();
    demoWorld.name = "demo";

    let mesh = ShapeFactory.createMesh({ color: "#00FF00", wireframe: true });
    
    const LEFT_X = -2.0;
    const LEFT_Y = 0.0;

    const RIGHT_X = 2.0;
    const RIGHT_Y = 0.0;

    const options = [
      { tag: 'left',  mesh, x: LEFT_X,  y: LEFT_Y,  z: 0.0 },
      { tag: 'right', mesh, x: RIGHT_X, y: RIGHT_Y, z: 0.0 },
    ]

    // Add shapes to the demo world group node 
    options.forEach(op => demoWorld.add(ShapeFactory.create(op)));

    // In VR headset / camera is locked at 0,0,0
    // So you have to move the world and not the camera

    // position the demo world
    demoWorld.translateY(1)
    demoWorld.translateZ(-5);

    // Create a new ThreeJS scene
    var scene = new THREE.Scene();

    // Add demo world to scene
    scene.add(demoWorld);

    let xrCtrl = XRCONTROLLER.connect({
      xr: xrApp.renderer.xr,
    });

    // Define a scene with methods to return
    var demoScene = {

      // Define a method on the scene to handle browser window resizing
      resize: function () {
        XRKIT.resize(xrApp);
      },

      // Define a method to be called when the scene is rendered
      step: function () {

        let controller = XRCONTROLLER.getState({ controllers: xrCtrl.controllers });

        scene.traverse(function (node) {
          if (node.name === "shape") {
            node.rotation.x += 0.005;
            node.rotation.y += 0.01 * speed;
            if (node.tag == 'left') {
              // Process left thumbstick values
              let range = 2.0;
              if (controller.profile === CONTROLLER_PROFILE.OCULUS_TOUCH) {
                // Oculus Quest
                node.position.x = LEFT_X + controller.left.axes[OCULUS_QUEST.THUMBSTICK_X] * range;
                node.position.y = LEFT_Y + controller.left.axes[OCULUS_QUEST.THUMBSTICK_Y] * -range;
                const scale = controller.left.pressed[OCULUS_QUEST.INDEX_TRIGGER] ? 2.0 : 1.0;
                node.scale.set(scale,scale,scale);
              }
            }
            if (node.tag == 'right') {
              // Process right thumbstick values
              let range = 2.0;
              if (controller.profile === CONTROLLER_PROFILE.OCULUS_TOUCH) {
                // Oculus Quest
                node.position.x = RIGHT_X + controller.right.axes[OCULUS_QUEST.THUMBSTICK_X] * range;
                node.position.y = RIGHT_Y + controller.right.axes[OCULUS_QUEST.THUMBSTICK_Y] * -range;
                const scale = controller.right.pressed[OCULUS_QUEST.INDEX_TRIGGER] ? 2.0 : 1.0;
                node.scale.set(scale,scale,scale);
              }
            }
          }
        });

        XRKIT.render({
          scene,
          ...xrApp
        });
      },

      animate: function () {
        xrApp.renderer.setAnimationLoop(this.step);
      }
    };

    return demoScene;
  }
}