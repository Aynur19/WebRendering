'use strict';

const THREE = require('three')


export const maxAngle = Math.PI;
export const rotStep = 0.01;


export const maxX = 50;
export const maxY = 25;
export const maxZ = 5;

export const posStep = 0.01;

export const ballR = 0.11;

export const eps = 0.001;

export const paths = {
    benchSeatMap: './textures/Wood_2K/Wood_2K_Diffuse.jpg',
    benchSeatAOMap: './textures/Wood_2K/Wood_2K_AO.jpg',
    benchSeatDispMap: './textures/Wood_2K/Wood_2K_Displacement.jpg',
    benchSeatNormalMap: './textures/Wood_2K/Wood_2K_Normal.jpg',
    benchSeatRoughnessMap: './textures/Wood_2K/Wood_2K_Roughness.jpg',

    envMap: './textures/CubeMaps/',
    envMapExts: ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
};

export const camera = {
    pos: { x: 0, y: 1, z: 4 },
    rot: { x: 0, y: 1, z: 4 },
    fov: 50,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 2000,
    name: 'Camera',
}

export const bench = {
    legH: 0.4,
    legW: 0.07,
    legL: 0.3,
    
    seatH: 0.05,
    seatL: 0.4,
    seatW: 2.15,

    seatTextScale: {
        x: (2 / 0.45),
        y: 1,
    },

    legTextScale: { 
        x: 4, 
        y: 4 
    },

    distFromCenter: 15,
    distBetweenBench: 2,
    initPosY: -20,
};

export function getAngleDiff(curRads, x) {
    return (x * Math.PI / 180) - curRads;
};

export function getPosDiff(curPos, x) {
    return x - curPos;
};


/**
 * 
 * @param {THREE.Texture} map 
 * @param {number} scaleX 
 * @param {number} scaleY 
 */
export function wrapTextureOnMap(map, scaleX, scaleY) {
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(scaleX, scaleY);
}

export function degInRad(x) {
    return x * Math.PI / 180;
}