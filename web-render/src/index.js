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


// let cameraGUI = gui.addFolder('Camera');



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
}

function addPlane(scene) {
    let planeSize = {
        x: 90,
        y: 45
    };

    let plane = new THREE.PlaneGeometry(planeSize.x, planeSize.y);
    let planeMat = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xf2f2f2,
        flatShading: true,
        vertexColors: THREE.VertexColors,
        transparent: true,
        opacity: 0.7
    });
    let footballFieldMesh = new THREE.Mesh(plane, planeMat);
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