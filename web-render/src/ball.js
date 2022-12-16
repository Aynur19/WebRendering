'use strict';

const THREE = require('three')
import * as dat from 'dat.gui';
import * as H from './helper';

/**
 * 
 * @param {THREE.Scene} scene 
 * @param {THREE.TextureLoader} textureLoader
 * @param {dat.GUI} gui
 */
export function addBall(scene, textureLoader, gui, name, pos) {
    let ballGeom = new THREE.SphereGeometry(H.ballR, 128, 128);
    let ballMat = new THREE.MeshStandardMaterial({color: 0x0000ff, roughness: 0.5});
    
    ballMat.map = textureLoader.load('./textures/ball.png');
    ballMat.map.wrapS = ballMat.map.wrapT = THREE.WrapAroundEnding;
    ballMat.map.repeat.set(2, 2);

    let ballMesh = new THREE.Mesh(ballGeom, ballMat);
    ballMesh.name = name;

    let ballGUI = gui.addFolder(name);
    
    //#region Ball Position
    ballGUI.add(ballMesh.position, 'x', -H.maxX, H.maxX, H.posStep)
    .onChange(function(newValue) {
        ballMesh.position.setX(newValue);
    }).name('Position X');
    
    ballGUI.add(ballMesh.position, 'y', -H.maxY, H.maxY, H.posStep)
    .onChange(function(newValue) {
        ballMesh.position.setY(newValue);
    }).name('Position Y');
    
    ballGUI.add(ballMesh.position, 'z', -H.maxZ, H.maxZ, H.posStep)
    .onChange(function(newValue) {
        ballMesh.position.setZ(newValue);
    }).name('Position Z');
    //#endregion

    //#region Ball Rotation
    ballGUI.add(ballMesh.rotation, 'x', -H.maxAngle, H.maxAngle, 0.01)
    .onChange(function(newValue) {
        ballMesh.rotateX(newValue);
    }).name('Rotation X');
    
    ballGUI.add(ballMesh.rotation, 'y', -H.maxAngle, H.maxAngle, 0.01)
    .onChange(function(newValue) {
        ballMesh.rotateY(newValue);
    }).name('Rotation Y');
    
    ballGUI.add(ballMesh.rotation, 'z', -H.maxAngle, H.maxAngle, 0.01)
    .onChange(function(newValue) {
        ballMesh.rotateZ(newValue);
    }).name('Rotation Z');
    //#endregion 

    ballGUI.add(ballMesh, 'visible').onChange(function(newValue) {
        ballMesh.visible = newValue;
    }).name(`${ballMesh.name} is visible`);
   
    ballMesh.position.set(pos[0], pos[1], pos[2]);

    scene.add(ballMesh);
}
