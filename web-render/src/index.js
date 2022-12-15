'use strict';

// Imports Threejs.
// const THREE = require('three');
const THREE = require('three')
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as Stats from '../node_modules/stats-js/build/stats';
import * as dat from 'dat.gui';

let gui = new dat.GUI({name: 'Settings'});
let camera, scene, renderer, light;
let orbitControls;
let stats = new Stats();


function addBall(scene) {
    const textureLoader = new THREE.TextureLoader();
    let ballGeom = new THREE.SphereGeometry(1, 128, 128);
    let ballMat = new THREE.MeshStandardMaterial({color: 0x0000ff, roughness: 0});
    ballMat.map = textureLoader.load('./textures/ball.png');
    ballMat.map.wrapS = ballMat.map.wrapT = THREE.WrapAroundEnding;
    ballMat.map.repeat.set(2, 2);

    let ballMesh = new THREE.Mesh(ballGeom, ballMat);
    ballMesh.position.set(0, 0, 2);
    ballMesh.name = 'Ball';

    let ballGUI = gui.addFolder('Ball');
    
    ballGUI.add(ballMesh.position, 'x', -300, 300, 1)
    .onChange(function(newValue) {
        ballMesh.position.setX(newValue);
    }).name('Position X');
    
    ballGUI.add(ballMesh.position, 'y', -300, 300, 1)
    .onChange(function(newValue) {
        ballMesh.position.setY(newValue);
    }).name('Position Y');
    
    ballGUI.add(ballMesh.position, 'z', -300, 300, 1)
    .onChange(function(newValue) {
        ballMesh.position.setZ(newValue);
    }).name('Position Z');

    ballGUI.add(ballMesh.rotation, 'x', 0, Math.PI*2, 0.01)
    .onChange(function(newValue) {
        ballMesh.rotateX(newValue);
    }).name('Rotation X');
    
    ballGUI.add(ballMesh.rotation, 'y', 0, Math.PI*2, 0.01)
    .onChange(function(newValue) {
        ballMesh.rotateY(newValue);
    }).name('Rotation Y');
    
    ballGUI.add(ballMesh.rotation, 'z', 0, Math.PI*2, 0.01)
    .onChange(function(newValue) {
        ballMesh.rotateZ(newValue);
    }).name('Rotation Z');


    ballGUI.add(ballMesh, 'visible')
    .onChange(function(newValue) {
        ballMesh.visible = newValue;
    }).name(`${ballMesh.name} is visible`);

    scene.add(ballMesh);
}

function addStats() {
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);    
}

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

    addPlane(scene);
    addBall(scene);
}

function addMap(map, scale) {
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(scale.x, scale.y);
}

function getFieldMat(textureLoader, textScale) {
    const fieldMat = new THREE.MeshStandardMaterial();

    fieldMat.map = textureLoader.load('./textures/Grass_1K/Grass_1K_Albedo.png');
    addMap(fieldMat.map, textScale);
    
    fieldMat.aoMap = textureLoader.load('./textures/Grass_1K/Grass_1K_AO.png');
    addMap(fieldMat.aoMap, textScale);
    
    fieldMat.displacementMap = textureLoader.load('./textures/Grass_1K/Grass_1K_Height.png');
    addMap(fieldMat.displacementMap, textScale);

    fieldMat.normalMap = textureLoader.load('./textures/Grass_1K/Grass_1K_Normal.png');
    addMap(fieldMat.normalMap, textScale);

    fieldMat.roughnessMap = textureLoader.load('./textures/Grass_1K/Grass_1K_Roughness.png');
    addMap(fieldMat.roughnessMap, textScale);
    
    fieldMat.metalnessMap = textureLoader.load('./textures/Grass_1K/Grass_1K_Metallic.png');
    addMap(fieldMat.metalnessMap, textScale);

    return fieldMat;
}

function addPlane(scene) {
    let planeSize = {
        x: 90,
        y: 45
    };

    let plane = new THREE.PlaneGeometry(planeSize.x, planeSize.y);

    const textScale = {
        x: 10, 
        y: 5
    };
    const textureLoader = new THREE.TextureLoader();
    const fieldMat = getFieldMat(textureLoader, textScale);

    let footballFieldMesh = new THREE.Mesh(plane, fieldMat);
    let footballFieldGUI = gui.addFolder('Football Field');
    footballFieldGUI.add(footballFieldMesh.position, 'x', -300, 300, 1)
    .onChange(function(newValue) {
        footballFieldMesh.position.setX(newValue);
    }).name('Position X');
    footballFieldGUI.add(footballFieldMesh.position, 'y', -300, 300, 1)
    .onChange(function(newValue) {
        footballFieldMesh.position.setY(newValue);
    }).name('Position Y');
    footballFieldGUI.add(footballFieldMesh.position, 'z', -300, 300, 1)
    .onChange(function(newValue) {
        footballFieldMesh.position.setZ(newValue);
    }).name('Position Z');

    footballFieldGUI.add(footballFieldMesh.rotation, 'x', 0, Math.PI*2, 0.01)
    .onChange(function(newValue) {
        footballFieldMesh.rotateX(newValue);
    }).name('Rotation X');
    footballFieldGUI.add(footballFieldMesh.rotation, 'y', 0, Math.PI*2, 0.01)
    .onChange(function(newValue) {
        footballFieldMesh.rotateY(newValue);
    }).name('Rotation Y');
    footballFieldGUI.add(footballFieldMesh.rotation, 'z', 0, Math.PI*2, 0.01)
    .onChange(function(newValue) {
        footballFieldMesh.rotateZ(newValue);
    }).name('Rotation Z');

    footballFieldMesh.position.set(0, 0, 0);
    footballFieldMesh.name = 'foorballField';
    scene.add(footballFieldMesh);
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