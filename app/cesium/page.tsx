import { CesiumContainer } from './cesium'
import Wasm from './wasm'

export default function Home() {
    return (
        <main className="relative min-h-screen w-screen">
            <CesiumContainer />
            <Wasm />
        </main>
    )
}
