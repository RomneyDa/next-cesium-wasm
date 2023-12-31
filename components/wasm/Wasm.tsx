"use client"

import Script from "next/script"
import { useState } from "react"

const Wasm = () => {
    const [loading, setLoading] = useState<boolean>(false)

    // WebAssembly.instantiateStreaming(
    //     // Fetch the file and stream into the WebAssembly runtime
    //     fetch('/wasm/add.wasm')
    //   ).then((result) => result.instance.exports.add(1, 1)) // = 2

    return (
        <div className="absolute w-full h-full z-30 top-0 left-0" >
            <p>Hello</p>
            {/* <Script src="@/wasm/toWasm" /> */}
        </div>
    )
}

export default Wasm