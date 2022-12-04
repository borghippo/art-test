import Flag from '@/components/canvas/Flag'
import dynamic from 'next/dynamic'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Blob = dynamic(() => import('@/components/canvas/Flag'), { ssr: false })

// Dom components go here
export default function Page(props) {
  return (
    <div className='flex flex-col items-center space-y-2'>
      <h1 className='py-2 text-2xl text-center noto'>シリアルエクスペリメンツレイン </h1>
    </div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <Flag scale={1.3} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
