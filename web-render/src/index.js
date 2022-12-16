'use strict';

// Imports Threejs.
// const THREE = require('three');
const THREE = require('three')
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as Stats from '../node_modules/stats-js/build/stats';
import * as dat from 'dat.gui';
import * as fieldObj from './field';
import * as ballObj from './ball';
import * as gateLeavesObj from './gateLeaves';

let gui = new dat.GUI({name: 'Settings'});
let camera, scene, renderer, light;
let orbitControls;
let stats = new Stats();

const textureLoader = new THREE.TextureLoader();

// class CustomSinCurve extends THREE.Curve {
//     constructor(scale) {
//       super();
//       this.scale = scale;
//     }
//     getPoint(t) {
//       const tx = t * 3 - 1.5;
//       const ty = Math.sin(2 * Math.PI * t);
//       const tz = 0;
//       return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
//     }
// }
  
// const path = new CustomSinCurve(1);
// const tubularSegments = 20;  // ui: tubularSegments
// const radius = 1;  // ui: radius
// const radialSegments = 8;  // ui: radialSegments
// const closed = false;  // ui: closed
// const geometry = new THREE.TubeGeometry(path, tubularSegments, radius, radialSegments, closed);


// function addVor(scene) {
//     class CustomSinCurve extends THREE.Curve {
//         constructor(scale) {
//           super();
//           this.scale = scale;
//         }

//         getPoint(t) {
//         //   const tx = t * 3 - 1.5;
//           const tx = t - t;
//           const ty = t;//Math.sin(2 * Math.PI * t);
//           const tz = t - t;
//           return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
//         }
//     }
      
//     const path = new CustomSinCurve(7.32);
//     const tubularSegments = 256;  // ui: tubularSegments
//     const radius = 0.06;  // ui: radius
//     const radialSegments = 32;  // ui: radialSegments
//     const closed = false;  // ui: closed
//     const geometry = new THREE.TubeGeometry(path, tubularSegments, radius, radialSegments, closed);

//     const textureLoader = new THREE.TextureLoader();
//     let vorMat = new THREE.MeshStandardMaterial({color: 0x0000ff, roughness: 0, side: THREE.DoubleSide});
//     // ballMat.map = textureLoader.load('./textures/ball.png');
//     // ballMat.map.wrapS = ballMat.map.wrapT = THREE.WrapAroundEnding;
//     // ballMat.map.repeat.set(2, 2);

//     let vorMesh = new THREE.Mesh(geometry, vorMat);
//     vorMesh.name = 'Vor';

//     let vorGUI = gui.addFolder('Vor');
    
//     vorGUI.add(vorMesh.position, 'x', -300, 300, 1)
//     .onChange(function(newValue) {
//         vorMesh.position.setX(newValue);
//     }).name('Position X');
    
//     vorGUI.add(vorMesh.position, 'y', -300, 300, 1)
//     .onChange(function(newValue) {
//         vorMesh.position.setY(newValue);
//     }).name('Position Y');
    
//     vorGUI.add(vorMesh.position, 'z', -300, 300, 1)
//     .onChange(function(newValue) {
//         vorMesh.position.setZ(newValue);
//     }).name('Position Z');

//     vorGUI.add(vorMesh.rotation, 'x', 0, Math.PI*2, 0.01)
//     .onChange(function(newValue) {
//         vorMesh.rotateX(newValue);
//     }).name('Rotation X');
    
//     vorGUI.add(vorMesh.rotation, 'y', 0, Math.PI*2, 0.01)
//     .onChange(function(newValue) {
//         vorMesh.rotateY(newValue);
//     }).name('Rotation Y');
    
//     vorGUI.add(vorMesh.rotation, 'z', 0, Math.PI*2, 0.01)
//     .onChange(function(newValue) {
//         vorMesh.rotateZ(newValue);
//     }).name('Rotation Z');


//     vorGUI.add(vorMesh, 'visible')
//     .onChange(function(newValue) {
//         vorMesh.visible = newValue;
//     }).name(`${vorMesh.name} is visible`);
   
//     vorGUI.open();

//     vorMesh.position.set(0, 0, 20);
//     scene.add(vorMesh);
// }



// function addStats() {
//     stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
//     document.body.appendChild(stats.dom);    
// }

function settingCamera() {
    const fov = 50;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 2000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    let cameraGUI = gui.addFolder('Camera');
    cameraGUI.add(camera, 'fov', 0, 100, 1).onChange(function(newValue) {
        camera.fov = newValue;
        camera.updateProjectionMatrix();
    }).name('Field of View');
    cameraGUI.add(camera, 'far', 0, 3000, 1).onChange(function(newValue) {
        camera.far = newValue;
        camera.updateProjectionMatrix();
    }).name('Depth of View');
    cameraGUI.add(camera, 'near', 0, 50, 0.1).onChange(function(newValue) {
        camera.near = newValue;
        camera.updateProjectionMatrix();
    }).name('Near of View');
    cameraGUI.add(camera, 'aspect', 0, 4, 0.05).onChange(function(newValue) {
        camera.aspect = newValue;
        camera.updateProjectionMatrix();
    }).name('Aspect Ratio');
    cameraGUI.add(camera.position, 'x', -300, 300, 1).onChange(function(newValue) {
        camera.position.setX(newValue);
    }).name('Position X');
    cameraGUI.add(camera.position, 'y', -300, 300, 1).onChange(function(newValue) {
        camera.position.setY(newValue);
    }).name('Position Y');
    cameraGUI.add(camera.position, 'z', -300, 300, 1).onChange(function(newValue) {
        camera.position.setZ(newValue);
    }).name('Position Z');
    cameraGUI.open();

    camera.position.set(0, 0, 80);
}

function settingRenderer() {
    const canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function settingOrbitControls() {
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enablePan = true;
    orbitControls.enableKeys = false;
    orbitControls.update();
    orbitControls.addEventListener('change', render);

    // Adding orbit controls to camera (expected by AMI image widgets).
    camera.controls = orbitControls;
}

function settingLight() {
    light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(-600, 600, 1000);
}

function sceneInit() {
    settingCamera();
    settingRenderer();

    window.addEventListener('resize', onWindowResize, false);

    settingOrbitControls();
    settingLight();

    scene = new THREE.Scene();
    scene.add(light);

    fieldObj.addField(scene, textureLoader, gui);
    ballObj.addBall(scene, textureLoader, gui);
    gateLeavesObj.addGateLeaves(scene, textureLoader, gui, 'Gate Leaves 1', [-40, 0, 0.65]);
    gateLeavesObj.addGateLeaves(scene, textureLoader, gui, 'Gate Leaves 2', [40, 0, 0.65]);
    // addVor(scene);
}

function render() {
    stats.update();
    gui.updateDisplay();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render()
}




// let SprayBrush = (function () {
//     function SprayBrush(radius, color) {
//         this.radius = radius;
//         this.color = color;
//         this._canvasContext = null;
//         this._density = 70;
//     };

//     SprayBrush.prototype.startStroke = function (canvas, position) {
//         this._canvasContext = canvas.getContext('2d');
//         this._canvasContext.beginPath();
//         this._canvasContext.save(); // Assumption: nobody else will call this until the stroke is finished
//         this._canvasContext.fillStyle = this.color;
//     };

//     SprayBrush.prototype.continueStoke = function (position) {
//         if (this._canvasContext) {
//             for (var i = this._density; i--;) {
//                 var dotRadius = Chameleon.getRandomFloat(0, this.radius);
//                 var angle = Chameleon.getRandomFloat(0, Math.PI * 2);
//                 var dotWidth = Chameleon.getRandomFloat(1, 2);
//                 this._canvasContext.globalAlpha = Math.random();
//                 this._canvasContext.fillRect(position.x + dotRadius * Math.cos(angle), position.y + dotRadius * Math.sin(angle), dotWidth, dotWidth);
//             }
//         }
//     };

//     SprayBrush.prototype.finishStroke = function () {
//         if (this._canvasContext) {
//             this._canvasContext.restore();
//             this._canvasContext = null;
//         }
//     };

//     return SprayBrush;
// })();

// let SB = new SprayBrush(5, '#000000');





/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();
    render();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

sceneInit();
tick();

// render();