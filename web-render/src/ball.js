'use strict';

const THREE = require('three')
import * as dat from 'dat.gui';


/**
 * 
 * @param {THREE.Scene} scene 
 * @param {THREE.TextureLoader} textureLoader
 * @param {dat.GUI} gui
 */
export function addBall(scene, textureLoader, gui) {
    let ballGeom = new THREE.SphereGeometry(0.11, 128, 128);
    let ballMat = new THREE.MeshStandardMaterial({color: 0x0000ff, roughness: 0.5});
    
    ballMat.map = textureLoader.load('./textures/ball.png');
    ballMat.map.wrapS = ballMat.map.wrapT = THREE.WrapAroundEnding;
    ballMat.map.repeat.set(2, 2);

    let ballMesh = new THREE.Mesh(ballGeom, ballMat);
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
   
    ballGUI.open();

    // ballMesh.visible = false;
    ballMesh.position.set(0, 0, 2);

    scene.add(ballMesh);
}
