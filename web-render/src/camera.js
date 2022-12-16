'use strict';

const THREE = require('three')
import * as H from './helper';
import * as dat from 'dat.gui';

let camData = H.camera;


/**
 * 
 * @param {dat.GUI} gui 
 */
export function settingCamera(gui) {
    let camera = new THREE.PerspectiveCamera(camData.fov, camData.aspect, camData.near, camData.far);

    let cameraGUI = gui.addFolder(camData.name);
    
    //#region Settings
    cameraGUI.add(camera, 'fov', 0, 100, 1)
    .onChange(function(newValue) {
        camera.fov = newValue;
        camera.updateProjectionMatrix();
    }).name('Field of View');
    
    cameraGUI.add(camera, 'far', 0, 3000, 1)
    .onChange(function(newValue) {
        camera.far = newValue;
        camera.updateProjectionMatrix();
    }).name('Depth of View');
    
    cameraGUI.add(camera, 'near', 0, 50, 0.1)
    .onChange(function(newValue) {
        camera.near = newValue;
        camera.updateProjectionMatrix();
    }).name('Near of View');
    
    cameraGUI.add(camera, 'aspect', 0, 4, 0.05)
    .onChange(function(newValue) {
        camera.aspect = newValue;
        camera.updateProjectionMatrix();
    }).name('Aspect Ratio');
    //#endregion

    //#region Position
    cameraGUI.add(camera.position, 'x', -H.maxX, H.maxX, H.posStep)
    .onChange(function(newValue) {
        camera.position.setX(camera.position.x, newValue);
    }).name('Position X');
    
    cameraGUI.add(camera.position, 'y', -H.maxY, H.maxY, H.posStep)
    .onChange(function(newValue) {
        camera.position.setY(camera.position.y, newValue);
    }).name('Position Y');
    
    cameraGUI.add(camera.position, 'z', -H.maxZ, H.maxZ, H.posStep)
    .onChange(function(newValue) {
        camera.position.setZ(camera.position.z, newValue);
    }).name('Position Z');
    //#endregion 

    //#region Rotation
    cameraGUI.add(camera.rotation, 'x', -H.maxAngle, H.maxAngle, H.rotStep)
    .onChange(function(newValue) {
        if(newValue > camera.rotation.x) {
            camera.rotateOnAxis((new THREE.Vector3(1, 0, 0)).normalize(), H.degInRad(1));
        }
        else {
            camera.rotateOnAxis((new THREE.Vector3(1, 0, 0)).normalize(), H.degInRad(-1));
        }
    }).name('Rotation X');

    cameraGUI.add(camera.rotation, 'y', -H.maxAngle, H.maxAngle, H.rotStep)
    .onChange(function(newValue) {
        if(newValue > camera.rotation.y) {
            camera.rotateOnAxis((new THREE.Vector3(0, 1, 0)).normalize(), H.degInRad(1));
        }
        else {
            camera.rotateOnAxis((new THREE.Vector3(0, 1, 0)).normalize(), H.degInRad(-1));
        }
    }).name('Rotation Y');

    cameraGUI.add(camera.rotation, 'z', -H.maxAngle, H.maxAngle, H.rotStep)
    .onChange(function(newValue) {
        if(newValue > camera.rotation.z) {
            camera.rotateOnAxis((new THREE.Vector3(0, 0, 1)).normalize(), H.degInRad(1));
        }
        else {
            camera.rotateOnAxis((new THREE.Vector3(0, 0, 1)).normalize(), H.degInRad(-1));
        }
    }).name('Rotation Z');
    //#endregion

    cameraGUI.open();

    camera.position.set(camData.pos.x, camData.pos.y, camData.pos.z);

    return camera;
}

