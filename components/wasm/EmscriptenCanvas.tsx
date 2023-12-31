"use client"

import { useRouter } from "next/navigation"
import Script from "next/script"
import { useEffect, useRef } from "react"

const EmscriptenSDLCanvas = ({ wasmSrc }: { wasmSrc: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const router = useRouter()

    // webglcontextlost not supported by react yet so will use getElementById
    const handleWebGlLost = (e: Event) => {
        router.refresh()
        e.preventDefault()
    }
    useEffect(() => {
        const canvas = document.getElementById('emscripten-canvas')
        if (canvas) canvas.addEventListener("webglcontextlost", handleWebGlLost, false)
        return () => {
            canvas?.removeEventListener("webglcontextlost", handleWebGlLost)
        }
    }, [])

    return (
        <>
            <div className="border-1 border-black border-solid bg-transparent">
                <canvas
                    ref={canvasRef}
                    id="emscripten-canvas"
                    className="border-none p-0 bg-transparent m-auto block"
                    onContextMenu={(e) => { e.preventDefault() }}
                    tabIndex={-1}
                />
            </div>
            <Script strategy="lazyOnload" type='text/javascript' src="/wasm/canvasScript.js" />
            <Script strategy="lazyOnload" async type="text/javascript" src={wasmSrc} />
        </>
    )
}

export default EmscriptenSDLCanvas