import Script from "next/script"
import { ReactNode } from "react"

const Wasm = ({ children }: { children: ReactNode }) => {
    // WebAssembly.instantiateStreaming(
    //     // Fetch the file and stream into the WebAssembly runtime
    //     fetch('/wasm/add.wasm')
    //   ).then((result) => result.instance.exports.add(1, 1)) // = 2

    return (
        <>
            <Script src="./toWasm" />
            <Script src="./fromWasm" />
            {children}
        </>
    )
}

export default Wasm