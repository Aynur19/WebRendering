'use strict';

const THREE = require('three')
import * as dat from 'dat.gui';
import * as H from './helper';

const benchSize = {
    woodW: 0.4,
    woodH: 0.08,
    woodL: 1.5,
    stoneW: 0.07,
    stoneH: 0.3,
    stoneL: 0.4,
};

const branchLegTextScale = { x: 4, y: 4 };

// /**
//  * 
//  * @param {THREE.Texture} map 
//  * @param {number} scaleX 
//  * @param {number} scaleY 
//  */
// function wrapBrenchLegMap(map, scaleX, scaleY) {
//     map.wrapS = map.wrapT = THREE.wrap;
//     map.repeat.set(scaleX, scaleY);
// }

/**
 * 
 * @param {THREE.TextureLoader} textureLoader 
 * @param {*} gui 
 * @returns 
 */
function getBenchLeg(textureLoader, gui) {
    // const shape = new THREE.Shape();
    // shape.moveTo(0, 0);
    // shape.lineTo(0, benchSize.stoneW);
    // shape.lineTo(benchSize.stoneL, benchSize.stoneW);
    // shape.lineTo(benchSize.stoneL, 0);
    // shape.lineTo(0, 0);

    // const extrudeSettings = {
    //     steps: 1,
    //     depth: 0.1,
    //     bevelEnabled: true,
    //     bevelThickness: 0.01,
    //     bevelSize: 0.05,
    //     bevelOffset: 0.25,
    //     bevelSegments: 16
    // };

    // const benchLegMat = new THREE.ShaderMaterial({ side: THREE.DoubleSide });
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

    // benchLegMat.map.needsUpdate = true;

    const benchLegGeom = new THREE.BoxGeometry(H.bench.legW, H.bench.legL, H.bench.legH);
 
    const benchLegMesh = new THREE.Mesh(benchLegGeom, benchLegMat);
    // benchLegMesh.material = benchLegMat;
    // benchLegMesh.geometry = benchLegGeom;

    // function bencLegGenerate(mesh) {
    //     const geometry = new THREE.Box3() .ExtrudeGeometry(shape, extrudeSettings);
    //     geometry.center();

    //     mesh.geometry = geometry;
    // }


    // const benchLegGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    // let benchGUI = gui.addFolder('Bench Leg Geom');
    // benchGUI.add(extrudeSettings, 'steps', 0, 10, 1)
    // .onChange(function(newValue) {
    //     bencLegGenerate(benchLegMesh);
    // }).name('Extrude Steps');

    // benchGUI.add(extrudeSettings, 'depth', 0, 1, H.eps)
    // .onChange(function(newValue) {
    //     bencLegGenerate(benchLegMesh);
    // }).name('Extrude Depth');

    // benchGUI.add(extrudeSettings, 'bevelEnabled')
    // .onChange(function(newValue) {
    //     bencLegGenerate(benchLegMesh);
    // }).name('Bevel Enable');

    // benchGUI.add(extrudeSettings, 'bevelThickness', 0, 1, H.eps)
    // .onChange(function(newValue) {
    //     bencLegGenerate(benchLegMesh);
    // }).name('Bevel Thickness');

    // benchGUI.add(extrudeSettings, 'bevelSize', 0, 1, H.eps)
    // .onChange(function(newValue) {
    //     bencLegGenerate(benchLegMesh);
    // }).name('Bevel Size');

    // benchGUI.add(extrudeSettings, 'bevelOffset', 0, 1, H.eps)
    // .onChange(function(newValue) {
    //     bencLegGenerate(benchLegMesh);
    // }).name('Bevel Offset');

    // benchGUI.add(extrudeSettings, 'bevelSegments', 0, 32, 1)
    // .onChange(function(newValue) {
    //     bencLegGenerate(benchLegMesh);
    // }).name('Bevel Segments');

    // console.log(`MATERIAL ${benchLegMat}`);

    // bencLegGenerate(benchLegMesh);
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
    // benchLegMesh.rotateX(H.getAngle(90));
    // benchLegMesh.rotateY(H.getAngle(90));

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
    // benchLegMesh.rotateX(H.getAngle(90));
    // benchLegMesh.rotateY(H.getAngle(90));

    scene.add(benchSeatMesh);
}

// /**
//  * 
//  * @param {THREE.Scene} scene 
//  * @param {THREE.TextureLoader} textureLoader
//  * @param {dat.GUI} gui
//  * @param {Array<number>} pos 
//  */
// export function addBench(scene, textureLoader, gui, name, pos) {
//     const benchLegMat = new THREE.MeshStandardMaterial({ color: '#444444', side: THREE.DoubleSide });
//     const benchSeatMat = new THREE.MeshStandardMaterial({ color: '#243568', side: THREE.DoubleSide });
//     const meshFaceMaterial = new THREE.MeshBasicMaterial    ([benchLegMat, benchSeatMat]);


//     const benchLegGeom = new THREE.BoxGeometry(H.bench.legW, H.bench.legL, H.bench.legH);
//     const benchSeatGeom = new THREE.BoxGeometry(H.bench.seatW, H.bench.seatL, H.bench.seatH);
//     benchSeatGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 5, 0));

//     for (let face in benchLegMat.faces) {
//         benchLegMat.faces[face].materialIndex = 0;
//     }
    

//     let mergeGeometry = new THREE.Geometry();
//     mergeGeometry.merge(benchLegGeom, benchLegGeom.matrix);
//     mergeGeometry.merge(benchSeatGeom, benchSeatGeom.matrix, 1);

//     let mesh = new THREE.Mesh(mergeGeometry, meshFaceMaterial);
//     scene.add(mesh);

//     // benchSeatMesh.position.set(pos[0], pos[1], pos[2]);
//     // benchLegMesh.rotateX(H.getAngle(90));
//     // benchLegMesh.rotateY(H.getAngle(90));

//     // scene.add(benchSeatMesh);
// }
