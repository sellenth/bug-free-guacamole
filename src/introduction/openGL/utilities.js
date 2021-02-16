function createSubTriangles(minX, maxX, minY, maxY, rv, depth, invert = false) {
    depth--;
    const diffX = maxX - minX;
    const diffY = maxY - minY;

    const leftMid = [minX + (diffX / 4), minY + (diffY / 2)]
    const botMid = [minX + (diffX / 2), minY]
    const topMid = [minX + (diffX / 2), maxY]
    const rightMid = [maxX - (diffX / 4), minY + (diffY / 2)]

    let triangles = [];


    if (depth <= 0) {
        if (invert) {
            triangles.push(
                //Top left
                minX, maxY, 0.0,
                ...leftMid, 0.0,
                ...topMid, 0.0,

                //top right
                ...topMid, 0.0,
                ...rightMid, 0.0,
                maxX, maxY, 0.0,
            )
        } else {
            triangles.push(
                //Bot left
                minX, minY, 0.0,
                ...leftMid, 0.0,
                ...botMid, 0.0,

                //bot right
                ...botMid, 0.0,
                ...rightMid, 0.0,
                maxX, minY, 0.0,
            )

        }
        triangles.push(
            //top mid
            ...leftMid, 0.0,
            ...topMid, 0.0,
            ...rightMid, 0.0,


            //bot mid
            ...leftMid, 0.0,
            ...botMid, 0.0,
            ...rightMid, 0.0,
        )

    }

    else {
        if (invert) {
            triangles.
                push(...createSubTriangles(
                    minX, minX + (diffX / 2), minY + (diffY / 2), maxY, rv, depth, true));
            triangles.
                push(...createSubTriangles(
                    minX + (diffX / 2), maxX, minY + (diffY / 2), maxY, rv, depth, true));
        } else {
            triangles.
                push(...createSubTriangles(
                    minX, minX + (diffX / 2), minY, minY + (diffY / 2), rv, depth));
            triangles.
                push(...createSubTriangles(
                    minX + (diffX / 2), maxX, minY, minY + (diffY / 2), rv, depth));
        }
        triangles.
            push(...createSubTriangles(
                minX + (diffX / 4), maxX - (diffX / 4), minY + (diffY / 2), maxY, rv, depth));
        triangles.
            push(...createSubTriangles(
                minX + (diffX / 4), maxX - (diffX / 4), minY, maxY - (diffY / 2), rv, depth, true));
    }

    return triangles;
}

function generateTriangles(rv) {
    let depth = 4;
    let result = createSubTriangles(-0.5, 0.5, -0.5, 0.5, rv, depth);
    rv.numTriangles = 4 ** depth;
    normalizeTriangles(result, 1);
    return result
}

function normalizeTriangles(triangles, length){
    let center = [0.0, 0.0, 1];

    for(let i = 0; i < triangles.length; i += 3){
        let dx = center[0] - triangles[i];
        let dy = center[1] - triangles[i+1];
        let dz = center[2] - triangles[i+2];

        let norm = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);

        dx = dx * length / norm;
        dy = dy * length / norm;
        dz = dz * length / norm;

        triangles[i] = dx;
        triangles[i+1] = dy;
        triangles[i+2] = dz;
    }
}

function generateColors(rv) {
    const colors = [];

    for (let i = 0; i < rv.numTriangles; i++) {
        let color1 = Math.random();
        let color2 = Math.random();
        let color3 = Math.random();
        colors.push(color1, color2, color3, 1.0);
        colors.push(color1, color2, color3, 1.0);
        colors.push(color1, color2, color3, 1.0);
    }

    console.log(colors)

    return colors;
}

export function initBuffers(gl, rv) {

    // Now create an array of positions for the square.

    const vertices = generateTriangles(rv);

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW);

    //==========

    const colors = generateColors(rv);

    const colorsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);

    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(colors),
        gl.STATIC_DRAW);

    //==========

    return {
        position: vertexBuffer,
        color: colorsBuffer
    };

}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
export function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
export function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture.
//
export function initTexture(gl) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Because images have to be downloaded over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        width, height, border, srcFormat, srcType,
        pixel);

    // Turn off mips and set  wrapping to clamp to edge so it
    // will work regardless of the dimensions of the video.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    return texture;
}

export function updateTexture(gl, texture, video) {
    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        srcFormat, srcType, video);
}

export function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}

export function setupVideo(url, flags) {
    const video = document.createElement('video');

    var playing = false;
    var timeupdate = false;

    video.autoplay = true;
    video.muted = true;
    video.loop = true;

    // Waiting for these 2 events ensures
    // there is data in the video

    video.addEventListener('playing', function () {
        playing = true;
        checkReady();
    }, true);

    video.addEventListener('timeupdate', function () {
        timeupdate = true;
        checkReady();
    }, true);

    video.src = url;
    video.play();

    function checkReady() {
        if (playing && timeupdate) {
            flags.videoLoadedFlag = true;
        }
    }

    return video;
}
