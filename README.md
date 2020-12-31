
@mitchallen/three-xr-controller
==
ThreeJS XR Controller Library
--

* * * 

<p align="left">
  <a href="https://npmjs.com/package/@mitchallen/three-xr-controller">
    <img src="http://img.shields.io/npm/dt/@mitchallen/three-xr-controller.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/@mitchallen/three-xr-controller">
    <img src="http://img.shields.io/npm/v/@mitchallen/three-xr-controller.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://npmjs.com/package/@mitchallen/three-xr-controller">
    <img src="https://img.shields.io/npm/l/@mitchallen/three-xr-controller.svg?style=flat-square" alt="License">
  </a>
  <a href="https://www.jsdelivr.com/package/npm/@mitchallen/three-xr-controller">
    <img src="https://data.jsdelivr.com/v1/package/npm/@mitchallen/three-xr-controller/badge" alt="jsdelivr">
  </a>
</p>

# Usage

## Get from npm via jsdelivr 

```js
import {
  XRCONTROLLER,
} from 'https://cdn.jsdelivr.net/npm/@mitchallen/three-xr-controller@0.1.4/dist/three-xr-controller.modern.js'
```

* * *

# Example code

See the repo examples folder.

# Video Demo

A video of the example code, recorded on an Oculus Quest 2 can be found here:

* https://www.youtube.com/watch?v=hD2eemFEOMs

# Live VR demos

To see live VR demos using this package, browse to:

* https://vrmitch.com
* https://vrmitch.com/demo/threejs-quest-thumbstick-vr/src/ 
  * Oculus Quest Thumbstick Demo based on the project in the repo **examples/demo-controller-vr** folder
* The demo is also listed here:
  * https://vrmitch.com/demo/

If you browse to this site in your VR headset you can click the **Enter VR** button.

This package has been tested on:

* Oculus Go - the current demo only works on the Quest
* Oculus Quest 2

* * *

# WebXR Chrome Extension Issues

Please note that at the time of this writing there are issue with the button mapping of the WebXR Chrome Extension.

The button mappings in this package were confirmed on actual devices.

* * *

# Publishing

To publish your version of the package you must first setup an account and project in NPM.

This will boost the version number, push and publish:

```sh
git add .
git commit -m "updated code"
npm run pub:patch
```

As an alternative:

```sh
git add .
git commit -m "updated code"
npm version patch -m "Upgrade to %s for reasons"
```

* * * 

# References

* https://www.jsdelivr.com/

