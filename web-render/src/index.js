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
import * as benchObj from './bench';
import * as H from './helper';
import * as env from './env'
import * as camHelper from './camera'



let gui = new dat.GUI({name: 'Settings'});
let camera, scene, renderer, light;
let orbitControls, flyControls;
let stats = new Stats();

const textureLoader = new THREE.TextureLoader();


// function settingCamera() {
//     const fov = 50;
//     const aspect = window.innerWidth / window.innerHeight;
//     const near = 0.1;
//     const far = 2000;

//     camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

//     let cameraGUI = gui.addFolder('Camera');
//     cameraGUI.add(camera, 'fov', 0, 100, 1).onChange(function(newValue) {
//         camera.fov = newValue;
//         camera.updateProjectionMatrix();
//     }).name('Field of View');
//     cameraGUI.add(camera, 'far', 0, 3000, 1).onChange(function(newValue) {
//         camera.far = newValue;
//         camera.updateProjectionMatrix();
//     }).name('Depth of View');
//     cameraGUI.add(camera, 'near', 0, 50, 0.1).onChange(function(newValue) {
//         camera.near = newValue;
//         camera.updateProjectionMatrix();
//     }).name('Near of View');
//     cameraGUI.add(camera, 'aspect', 0, 4, 0.05).onChange(function(newValue) {
//         camera.aspect = newValue;
//         camera.updateProjectionMatrix();
//     }).name('Aspect Ratio');
//     cameraGUI.add(camera.position, 'x', -300, 300, 1).onChange(function(newValue) {
//         camera.position.setX(newValue);
//     }).name('Position X');
//     cameraGUI.add(camera.position, 'y', -300, 300, 1).onChange(function(newValue) {
//         camera.position.setY(newValue);
//     }).name('Position Y');
//     cameraGUI.add(camera.position, 'z', -300, 300, 1).onChange(function(newValue) {
//         camera.position.setZ(newValue);
//     }).name('Position Z');
//     cameraGUI.open();

//     camera.position.set(H.camera.initPos.x, H.camera.initPos.y, H.camera.initPos.z);
// }

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

    camera.controls = orbitControls;
}

function settingLight() {
    light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(-600, 600, 1000);
}

function sceneInit() {
    // settingCamera();
    camera = camHelper.settingCamera(gui);
    settingRenderer();

    window.addEventListener('resize', onWindowResize, false);

    settingOrbitControls();
    settingLight();

    scene = new THREE.Scene();
    scene.add(light);

    env.addEnvMap(scene);
    fieldObj.addField(scene, textureLoader, gui);
    let ball = ballObj.addBall(scene, textureLoader, gui, 'Ball', [0, H.ballR, 0]);
    gateLeavesObj.addGateLeaves(scene, textureLoader, gui, 'Gate Leaves 1', [0, 0, -40]);
    gateLeavesObj.addGateLeaves(scene, textureLoader, gui, 'Gate Leaves 2', [0, 0, 40]);
 
    benchObj.addBench(scene, textureLoader, gui, 4, [-15, -20]);


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


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();
    render();

    window.requestAnimationFrame(tick);
}

sceneInit();
tick();

// render();