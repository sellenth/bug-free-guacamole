const vertexShader = `
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;

varying highp vec4 vColor;
varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vColor = aVertexColor;


  //gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  //vTextureCoord = aTextureCoord;

  //highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
  //highp vec3 directionalLightColor = vec3(0, 1, 0.5);
  //highp vec3 directionalVector = normalize(vec3(-0.85, 0.8, 0.75));

  //highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

  //highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
  //vLighting = ambientLight + (directionalLightColor * directional);
}
`;

export default vertexShader;