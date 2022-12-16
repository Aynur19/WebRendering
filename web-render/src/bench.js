'use strict';

const THREE = require('three')
import * as dat from 'dat.gui';
import * as H from './helper';


/**
 * 
 * @param {THREE.TextureLoader} textureLoader 
 * @param {*} gui 
 * @returns 
 */
function getBenchLeg(textureLoader, gui) {
    const benchLegMat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });

    benchLegMat.map = textureLoader.load('./textures/LumpyWetConcrete_2K/LumpyWetConcrete_2K_Albedo.png');
    benchLegMat.normalMap = textureLoader.load('./textures/LumpyWetConcrete_2K/LumpyWetConcrete_2K_Normal.png');
    benchLegMat.roughnessMap = textureLoader.load('./textures/LumpyWetConcrete_2K/LumpyWetConcrete_2K_Roughness.png');
    benchLegMat.metalnessMap = textureLoader.load('./textures/LumpyWetConcrete_2K/LumpyWetConcrete_2K_Metallic.png');
    benchLegMat.aoMap = textureLoader.load('./textures/LumpyWetConcrete_2K/LumpyWetConcrete_2K_AO.png');

    H.wrapTextureOnMap(benchLegMat.map, H.bench.legTextScale.x, H.bench.legTextScale.y);
    H.wrapTextureOnMap(benchLegMat.normalMap, H.bench.legTextScale.x, H.bench.legTextScale.y);
    H.wrapTextureOnMap(benchLegMat.roughnessMap, H.bench.legTextScale.x, H.bench.legTextScale.y);
    H.wrapTextureOnMap(benchLegMat.metalnessMap, H.bench.legTextScale.x, H.bench.legTextScale.y);
    H.wrapTextureOnMap(benchLegMat.aoMap, H.bench.legTextScale.x, H.bench.legTextScale.y);

    const benchLegGeom = new THREE.BoxGeometry(H.bench.legW, H.bench.legL, H.bench.legH);
    const benchLegMesh = new THREE.Mesh(benchLegGeom, benchLegMat);

    return benchLegMesh;
}

/**
 * 
 * @param {THREE.TextureLoader} textureLoader 
 * @param {dat.GUI} gui 
 * @returns 
 */
function getBenchSeat(textureLoader, gui) {
    const benchSeatGeom = new THREE.BoxGeometry(H.bench.seatW, H.bench.seatL, H.bench.seatH);
    const benchSeatMat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });

    benchSeatMat.map = textureLoader.load(H.paths.benchSeatMap);
    benchSeatMat.normalMap = textureLoader.load(H.paths.benchSeatNormalMap);
    benchSeatMat.roughnessMap = textureLoader.load(H.paths.benchSeatRoughnessMap);
    benchSeatMat.aoMap = textureLoader.load(H.paths.benchSeatAOMap);

    H.wrapTextureOnMap(benchSeatMat.map, H.bench.seatTextScale.x, H.bench.seatTextScale.y);
    H.wrapTextureOnMap(benchSeatMat.normalMap, H.bench.seatTextScale.x, H.bench.seatTextScale.y);
    H.wrapTextureOnMap(benchSeatMat.roughnessMap, H.bench.seatTextScale.x, H.bench.seatTextScale.y);
    H.wrapTextureOnMap(benchSeatMat.aoMap, H.bench.seatTextScale.x, H.bench.seatTextScale.y);

    const benchSeatMesh = new THREE.Mesh(benchSeatGeom, benchSeatMat);

    return benchSeatMesh;
}

/**
 * 
 * @param {THREE.Scene} scene 
 * @param {THREE.TextureLoader} textureLoader
 * @param {dat.GUI} gui
 * @param {Array<number>} pos 
 */
export function addBenchLeg(scene, textureLoader, gui, name, pos) {
    let benchLegMesh = getBenchLeg(textureLoader, gui); 
    benchLegMesh.name = name;

    let benchGUI = gui.addFolder(name);

    //#region Bench Leg Position
    benchGUI.add(benchLegMesh.position, 'x', -50, 50, 0.01).onChange(function(newValue) {
        benchLegMesh.position.setX(newValue);
    }).name('Position X');
    
    benchGUI.add(benchLegMesh.position, 'y', -25, 25, 0.01).onChange(function(newValue) {
        benchLegMesh.position.setY(newValue);
    }).name('Position Y');
    
    benchGUI.add(benchLegMesh.position, 'z', 0, 5, 0.01).onChange(function(newValue) {
        benchLegMesh.position.setZ(newValue);
    }).name('Position Z');
    //#endregion

    //#region Bench Leg Rotation
    benchGUI.add(benchLegMesh.rotation, 'x', -H.maxAngle, H.maxAngle, 0.01).onChange(function(newValue) {
        benchLegMesh.rotateX(H.getAngle(newValue));
    }).name('Rotation X');
    
    benchGUI.add(benchLegMesh.rotation, 'y', -H.maxAngle, H.maxAngle, 0.01).onChange(function(newValue) {
        benchLegMesh.rotateY(H.getAngle(newValue));
    }).name('Rotation Y');
    
    benchGUI.add(benchLegMesh.rotation, 'z', -H.maxAngle, H.maxAngle, 0.01).onChange(function(newValue) {
        benchLegMesh.rotateZ(H.getAngle(newValue));
    }).name('Rotation Z');
    //#endregion

    benchGUI.add(benchLegMesh, 'visible')
    .onChange(function(newValue) {
        benchLegMesh.visible = newValue;
    }).name(`${benchLegMesh.name} is visible`);
   
    benchGUI.open();

    benchLegMesh.position.set(pos[0], pos[1], pos[2]);

    scene.add(benchLegMesh);
}

/**
 * 
 * @param {THREE.Scene} scene 
 * @param {THREE.TextureLoader} textureLoader
 * @param {dat.GUI} gui
 * @param {Array<number>} pos 
 */
export function addBenchSeat(scene, textureLoader, gui, name, pos) {
    let benchSeatMesh = getBenchSeat(textureLoader, gui); 
    benchSeatMesh.name = name;

    let benchGUI = gui.addFolder(name);

    //#region Bench Leg Position
    benchGUI.add(benchSeatMesh.position, 'x', -50, 50, 0.01).onChange(function(newValue) {
        benchSeatMesh.position.setX(newValue);
    }).name('Position X');
    
    benchGUI.add(benchSeatMesh.position, 'y', -25, 25, 0.01).onChange(function(newValue) {
        benchSeatMesh.position.setY(newValue);
    }).name('Position Y');
    
    benchGUI.add(benchSeatMesh.position, 'z', 0, 5, 0.01).onChange(function(newValue) {
        benchSeatMesh.position.setZ(newValue);
    }).name('Position Z');
    //#endregion

    //#region Bench Leg Rotation
    benchGUI.add(benchSeatMesh.rotation, 'x', -H.maxAngle, H.maxAngle, 0.01).onChange(function(newValue) {
        benchSeatMesh.rotateX(H.getAngle(newValue));
    }).name('Rotation X');
    
    benchGUI.add(benchSeatMesh.rotation, 'y', -H.maxAngle, H.maxAngle, 0.01).onChange(function(newValue) {
        benchSeatMesh.rotateY(H.getAngle(newValue));
    }).name('Rotation Y');
    
    benchGUI.add(benchSeatMesh.rotation, 'z', -H.maxAngle, H.maxAngle, 0.01).onChange(function(newValue) {
        benchSeatMesh.rotateZ(H.getAngle(newValue));
    }).name('Rotation Z');
    //#endregion

    benchGUI.add(benchSeatMesh, 'visible')
    .onChange(function(newValue) {
        benchSeatMesh.visible = newValue;
    }).name(`${benchSeatMesh.name} is visible`);
   
    benchGUI.open();

    benchSeatMesh.position.set(pos[0], pos[1], pos[2]);

    scene.add(benchSeatMesh);
}

/**
 * 
 * @param {THREE.Scene} scene 
 * @param {THREE.TextureLoader} textureLoader
 * @param {dat.GUI} gui
 * @param {Array<number>} pos 
 */
export function addBench(scene, textureLoader, gui, count, pos) {

    let i = 0;

    for (let i = 0; i < count; i++) {
        let x = H.bench.distFromCenter + H.bench.distBetweenBench * (i - i % 2);
        
        if(i % 2 == 0) {
            x = -x;
        }
        
        addBenchLeg(scene, textureLoader, gui, `Bench ${i} (Leg 1)`, [x - 1, H.bench.initPosY, H.bench.legH / 2]);
        addBenchLeg(scene, textureLoader, gui, `Bench ${i} (Leg 2)`, [x + 1, H.bench.initPosY, H.bench.legH / 2]);
        addBenchSeat(scene, textureLoader, gui, `Bench Seat ${i}`, [x, H.bench.initPosY, H.bench.legH + H.bench.seatH / 2]);
    }
}

