import React from 'react'
import vertexShader from './shaderProgram/vertexShader'
import fragmentShader from './shaderProgram/fragmentShader'
import { mat4 } from 'gl-matrix'
import { initBuffers, initShaderProgram } from './utilities'


function init() {
    const canvas = document.querySelector("#glCanvas");
    const gl = canvas.getContext("webgl");

    //only continue if WebGL is available and working
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }


    const shaderProgram = initShaderProgram(gl, vertexShader, fragmentShader);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    }

    const referenceVariables = {
        cubeRotation: 0,
        numTriangles: 0,
    };


    const buffers = initBuffers(gl, referenceVariables);

    initializeVertexAttrib(gl, 4, gl.FLOAT, false, 0, 0, 
        buffers.color, programInfo.attribLocations.vertexColor)
    initializeVertexAttrib(gl, 3, gl.FLOAT, false, 0, 0, 
        buffers.position, programInfo.attribLocations.vertexPosition)

    let then = 0;

    // Draw the scene repeatedly
    function render(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;

        drawScene(gl, programInfo, buffers, deltaTime, referenceVariables);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);


}

function clearBuffer(gl){
    gl.clearColor(1.0, 1.0, 1.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function createProjectionMatrix(gl, rv) {
    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar);

    return projectionMatrix;
}

function initializeVertexAttrib( gl, numComponents, type, normalize, stride, offset, bufferData, attribPointer){
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferData);
        gl.vertexAttribPointer(
            attribPointer,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(attribPointer);
    }
}

function drawScene(gl, programInfo, buffers, deltaTime, rv) {

    clearBuffer(gl)
    const projectionMatrix = createProjectionMatrix(gl);

    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix,     // destination matrix
        modelViewMatrix,     // matrix to translate
        [0.0, 0.0, -1.2]);  // amount to translate        


    mat4.rotate(modelViewMatrix,  // destination matrix
        modelViewMatrix,  // matrix to rotate
        rv.cubeRotation,   // amount to rotate in radians
        [0, 0, 1]);       // axis to rotate around


    // Tell WebGL to use our program when drawing

    gl.useProgram(programInfo.program);

    // Set the shader uniforms

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);

    // Tell WebGL which indices to use to index the vertices
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);

    {
        const vertexCount = rv.numTriangles * 3;
        const offset = 0;
        gl.drawArrays(gl.TRIANGLES, offset, vertexCount);
    }

    rv.cubeRotation += deltaTime;
}




const OpenGLcanvas = () => {
    React.useEffect(() => {
        init();
    }, []);

    return (
        <canvas id="glCanvas" width="1280" height="640"></canvas>
    )
};

export default OpenGLcanvas;