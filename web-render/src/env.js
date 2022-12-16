'use strict';

// Imports Threejs.
// const THREE = require('three');
const THREE = require('three')
import * as H from './helper';


/**
 * 
 * @param {THREE.Scene} scene 
 */
export function addEnvMap(scene) {
    scene.background = new THREE.CubeTextureLoader()
        .setPath(H.paths.envMap)
        .load(H.paths.envMapExts);
}