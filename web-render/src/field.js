'use strict';

const THREE = require('three')
import * as dat from 'dat.gui';


const fieldSize = {
    x: 100,
    y: 50
};

const fieldTextScale = {
    x: 12,
    y: 6
};

/**
 * 
 * @param {THREE.Texture} map 
 * @param {number} scaleX
 * @param {number} scaleY 
 */
function addFiledMap(map, scaleX, scaleY) {
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(scaleX, scaleY);
}

/**
 * 
 * @param {THREE.TextureLoader} textureLoader 
 * @param {number} scaleX 
 * @param {number} scaleY
 * @returns 
 */
function getFieldMat(textureLoader, scaleX, scaleY) {
    const fieldMat = new THREE.MeshStandardMaterial({side: THREE.DoubleSide});

    fieldMat.map = textureLoader.load('./textures/Grass_1K/Grass_1K_Albedo.png');
    addFiledMap(fieldMat.map, scaleX, scaleY);
    
    fieldMat.aoMap = textureLoader.load('./textures/Grass_1K/Grass_1K_AO.png');
    addFiledMap(fieldMat.aoMap, scaleX, scaleY);
    
    fieldMat.displacementMap = textureLoader.load('./textures/Grass_1K/Grass_1K_Height.png');
    addFiledMap(fieldMat.displacementMap, scaleX, scaleY);

    fieldMat.normalMap = textureLoader.load('./textures/Grass_1K/Grass_1K_Normal.png');
    addFiledMap(fieldMat.normalMap, scaleX, scaleY);

    fieldMat.roughnessMap = textureLoader.load('./textures/Grass_1K/Grass_1K_Roughness.png');
    addFiledMap(fieldMat.roughnessMap, scaleX, scaleY);
    
    fieldMat.metalnessMap = textureLoader.load('./textures/Grass_1K/Grass_1K_Metallic.png');
    addFiledMap(fieldMat.metalnessMap, scaleX, scaleY);

    return fieldMat;
}

/**
 * 
 * @param {THREE.Scene} scene 
 * @param {THREE.TextureLoader} textureLoader
 * @param {dat.GUI} gui
 */
export function addField(scene, textureLoader, gui) {
    let fieldGeom = new THREE.PlaneGeometry(fieldSize.x, fieldSize.y);
    const fieldMat = getFieldMat(textureLoader, fieldTextScale.x, fieldTextScale.y);

    let fieldMesh = new THREE.Mesh(fieldGeom, fieldMat);
    fieldMesh.name = 'Footbal Field';

    let fieldGUI = gui.addFolder('Football Field');
    fieldGUI.add(fieldMesh.position, 'x', -300, 300, 1)
    .onChange(function(newValue) {
        fieldMesh.position.setX(newValue);
    }).name('Position X');

    fieldGUI.add(fieldMesh.position, 'y', -300, 300, 1)
    .onChange(function(newValue) {
        fieldMesh.position.setY(newValue);
    }).name('Position Y');
    
    fieldGUI.add(fieldMesh.position, 'z', -300, 300, 1)
    .onChange(function(newValue) {
        fieldMesh.position.setZ(newValue);
    }).name('Position Z');

    fieldGUI.add(fieldMesh.rotation, 'x', 0, Math.PI*2, 0.01)
    .onChange(function(newValue) {
        fieldMesh.rotateX(newValue);
    }).name('Rotation X');
    
    fieldGUI.add(fieldMesh.rotation, 'y', 0, Math.PI*2, 0.01)
    .onChange(function(newValue) {
        fieldMesh.rotateY(newValue);
    }).name('Rotation Y');
    
    fieldGUI.add(fieldMesh.rotation, 'z', 0, Math.PI*2, 0.01)
    .onChange(function(newValue) {
        fieldMesh.rotateZ(newValue);
    }).name('Rotation Z');

    fieldGUI.add(fieldMesh, 'visible')
    .onChange(function(newValue) {
        fieldMesh.visible = newValue;
    }).name(`${fieldMesh.name} is visible`);

    fieldGUI.open();

    fieldMesh.position.set(0, 0, 0);
    // fieldMesh.visible = false;

    scene.add(fieldMesh);
}
