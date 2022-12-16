'use strict';

const THREE = require('three')
import * as dat from 'dat.gui';
import * as H from './helper';

const glSizes = {
    w: 7.32,
    h: 2.44,
    d: 0.12
}

const gatePath = [
    new THREE.Vector3(0, -glSizes.w / 2, 0),
    new THREE.Vector3(0, -glSizes.w / 2, glSizes.h),
    new THREE.Vector3(0, glSizes.w / 2, glSizes.h),
    new THREE.Vector3(0, glSizes.w / 2, 0),
];


function getGateLeaves() {
    let gateLeavesPath = new THREE.CurvePath();

    const gateLeftCurve = new THREE.LineCurve3(gatePath[0], gatePath[1]);
    const gateTopCurve = new THREE.LineCurve3(gatePath[1], gatePath[2]);
    const gateRightCurve = new THREE.LineCurve3(gatePath[2], gatePath[3]);

    gateLeavesPath.add(gateLeftCurve);
    gateLeavesPath.add(gateTopCurve);
    gateLeavesPath.add(gateRightCurve);

    const tubularSegments = 1024;  // ui: tubularSegments
    const radius = glSizes.d/2;  // ui: radius
    const radialSegments = 32;  // ui: radialSegments
    const closed = false;  // ui: closed

    const gateLeavesGeom = new THREE.TubeGeometry(gateLeavesPath, tubularSegments, 
        radius, radialSegments, closed);

    let gateLeavesMat = new THREE.MeshStandardMaterial(
        {
            color: 0xffffff, 
            roughness: 0.5, 
            side: THREE.DoubleSide
        });
    let gateLeavesMesh = new THREE.Mesh(gateLeavesGeom, gateLeavesMat);

    return gateLeavesMesh;
}

/**
 * 
 * @param {THREE.Scene} scene 
 * @param {THREE.TextureLoader} textureLoader
 * @param {dat.GUI} gui
 * @param {Array<number>} pos 
 */
export function addGateLeaves(scene, textureLoader, gui, name, pos) {
    let gateLeavesMesh = getGateLeaves(); 
    gateLeavesMesh.name = name;
    let gateLeavesGUI = gui.addFolder(name);

    gateLeavesGUI.add(gateLeavesMesh.position, 'x', -300, 300, 1)
    .onChange(function(newValue) {
        gateLeavesMesh.position.setX(newValue);
    }).name('Position X');
    
    gateLeavesGUI.add(gateLeavesMesh.position, 'y', -300, 300, 1)
    .onChange(function(newValue) {
        gateLeavesMesh.position.setY(newValue);
    }).name('Position Y');
    
    gateLeavesGUI.add(gateLeavesMesh.position, 'z', -300, 300, 1)
    .onChange(function(newValue) {
        gateLeavesMesh.position.setZ(newValue);
    }).name('Position Z');

    gateLeavesGUI.add(gateLeavesMesh.rotation, 'x', 0, Math.PI*2, 0.01)
    .onChange(function(newValue) {
        gateLeavesMesh.rotateX(newValue);
    }).name('Rotation X');
    
    gateLeavesGUI.add(gateLeavesMesh.rotation, 'y', 0, Math.PI*2, 0.01)
    .onChange(function(newValue) {
        gateLeavesMesh.rotateY(newValue);
    }).name('Rotation Y');
    
    gateLeavesGUI.add(gateLeavesMesh.rotation, 'z', 0, Math.PI*2, 0.01)
    .onChange(function(newValue) {
        gateLeavesMesh.rotateZ(newValue);
    }).name('Rotation Z');


    gateLeavesGUI.add(gateLeavesMesh, 'visible')
    .onChange(function(newValue) {
        gateLeavesMesh.visible = newValue;
    }).name(`${gateLeavesMesh.name} is visible`);
   
    gateLeavesGUI.open();
    gateLeavesMesh.position.set(0, 0, 0);
    gateLeavesMesh.rotateZ(H.degInRad(90));
    gateLeavesMesh.rotateY(H.degInRad(90));

    gateLeavesMesh.position.set(pos[0], pos[1], pos[2]);

    scene.add(gateLeavesMesh);
}
