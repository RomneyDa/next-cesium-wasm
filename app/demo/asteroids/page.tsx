import EmscriptenCanvas from '@/components/wasm/EmscriptenCanvas'
import React from 'react'

const Asteroids = () => {
    return (
        <div>
            <EmscriptenCanvas wasmSrc='/wasm/main.js' />
        </div>
    )
}

export default Asteroids