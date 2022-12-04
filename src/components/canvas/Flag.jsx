import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Color } from 'three'

const fragmentShader = `
uniform vec3 u_colorA;
uniform vec3 u_colorB;
varying float vZ;


void main() {
  vec3 color = mix(u_colorA, u_colorB, vZ * 2.0 + 0.5); 
  gl_FragColor = vec4(color, 1.0);
}

`

const vertexShader = `
uniform float u_time;

varying float vZ;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  modelPosition.y += sin(modelPosition.x * 5.0 + u_time * 3.0) * 0.1;
  modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 2.0) * 0.1;
  
  vZ = modelPosition.y;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}

`

export default function Flag({ ...props }) {
  const mesh = useRef()

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_colorA: { value: new Color('#f7b5e9') },
      u_colorB: { value: new Color('#ddb5f7') },
    }),
    [],
  )

  useFrame((state) => {
    const { clock } = state
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime()
  })

  return (
    <mesh ref={mesh} {...props}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
    </mesh>
  )
}
