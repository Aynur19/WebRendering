'use strict';

const THREE = require('three')
import * as dat from 'dat.gui';
import * as H from './helper';

const benchSize = {
    woodW: 0.4,
    woodH: 0.08,
    woodL: 1.5,
    stoneW: 0.15,
    stoneH: 0.4,
    stoneL: 0.4,
}

// const maxAngle = Math.PI * 2;

// function getAngle(x) {
//     return x * Math.PI / 180;
// }

function getBenchLeg(gui) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, benchSize.stoneW);
    shape.lineTo(benchSize.stoneL, benchSize.stoneW);
    shape.lineTo(benchSize.stoneL, 0);
    shape.lineTo(0, 0);

    const extrudeSettings = {
        steps: 1,
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.05,
        bevelOffset: 0.25,
        bevelSegments: 16
    };

    const benchLegMat = new THREE.MeshStandardMaterial(
        {
            color: 0x123456, 
            roughness: 0.5, 
            side: THREE.DoubleSide
        });
    const benchLegMesh = new THREE.Mesh();
    benchLegMesh.material = benchLegMat;

    function bencLegGenerate(mesh) {
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geometry.center();

        mesh.geometry = geometry;
    }


    // const benchLegGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    let benchGUI = gui.addFolder('Bench Leg Geom');
    benchGUI.add(extrudeSettings, 'steps', 0, 10, 1).onChange(function(newValue) {
        bencLegGenerate(benchLegMesh);
    }).name('Extrude Steps');

    benchGUI.add(extrudeSettings, 'depth', 0, 1, 0.001).onChange(function(newValue) {
        bencLegGenerate(benchLegMesh);
    }).name('Extrude Depth');

    benchGUI.add(extrudeSettings, 'bevelEnabled').onChange(function(newValue) {
        bencLegGenerate(benchLegMesh);
    }).name('Bevel Enable');

    benchGUI.add(extrudeSettings, 'bevelThickness', 0, 1, 0.001).onChange(function(newValue) {
        bencLegGenerate(benchLegMesh);
    }).name('Bevel Thickness');

    benchGUI.add(extrudeSettings, 'bevelSize', 0, 1, 0.001).onChange(function(newValue) {
        bencLegGenerate(benchLegMesh);
    }).name('Bevel Size');

    benchGUI.add(extrudeSettings, 'bevelOffset', 0, 1, 0.001).onChange(function(newValue) {
        bencLegGenerate(benchLegMesh);
    }).name('Bevel Offset');

    benchGUI.add(extrudeSettings, 'bevelSegments', 0, 32, 1).onChange(function(newValue) {
        bencLegGenerate(benchLegMesh);
    }).name('Bevel Segments');


    // scene.add( mesh );

    // let benchLegGeom = new THREE.BoxGeometry(benchSize.stoneW, benchSize.stoneH, benchSize.stoneL);


    console.log(`MATERIAL ${benchLegMat}`);

    bencLegGenerate(benchLegMesh);

    return benchLegMesh;
}

/**
 * 
 * @param {THREE.Scene} scene 
 * @param {THREE.TextureLoader} textureLoader
 * @param {dat.GUI} gui
 * @param {Array<number>} pos 
 */
export function addBenchLeg(scene, textureLoader, gui, name, pos) {
    let benchLegMesh = getBenchLeg(gui); 
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
    benchLegMesh.rotateX(H.getAngle(90));

    scene.add(benchLegMesh);
}
