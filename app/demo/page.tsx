import { CesiumContainer } from '@/components/cesium/Cesium'
import Wasm from '@/components/wasm/Wasm'

export default function Home() {
    return (
        <main className="relative min-h-screen w-screen">
            <CesiumContainer />
            <Wasm />
        </main>
    )
}
