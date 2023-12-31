"use client"
import { wait } from "@/utils/time";
import { useContext, createContext, ReactNode, useState, useEffect } from "react";
import { Grid } from "react-loader-spinner";

const getOutput = async () => 'hello'

interface ThisContextType {
    output: string
}

const ThisContext = createContext<ThisContextType | null>(null)

export const WasmModuleProvider = ({ children }: { children?: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [output, setOutput] = useState<string>()

    const load = async () => {
        try {
            setLoading(true)
            const out = await getOutput()
            setOutput(out)
        } catch (error) {
            console.error(error)
            setOutput(undefined)
        } finally {
            setLoading(false)
        }
    }

    const tryAgain = async () => {
        setLoading(true)
        await wait(400)
        await load()
    }

    useEffect(() => {
        load()
    }, [])

    if (loading) return (
        <div className="flex flex-col flex-1 justify-center items-center gap-2">
            <Grid />
        </div>
    )
    if (!output) return (
        <div className="flex flex-col flex-1 justify-center items-center gap-2">
            <h1>There was an error</h1>
            <button
                className="rounded-lg p-2 border-[2px] border-solid"
                type="button"
                onClick={tryAgain}
            >Try Again</button>
        </div>
    )

    return (
        <ThisContext.Provider value={{
            output
        }}>
            {children}
        </ThisContext.Provider>
    )
}


export const useThisContext = () => useContext(ThisContext)