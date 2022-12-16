'use strict';

const THREE = require('three')


export const maxAngle = Math.PI * 2;
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
};

export function getAngle(x) {
    return x * Math.PI / 180;
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