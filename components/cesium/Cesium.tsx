"use client"
import { Ion, Math as CesiumMath, Viewer } from 'cesium';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Grid } from 'react-loader-spinner';
import { getViewer } from './viewer';         
import "cesium/Build/Cesium/Widgets/widgets.css";

if (!process.env.NEXT_PUBLIC_CESIUM_KEY) throw new Error('No cesium key in env')
Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_KEY


const MOVE_DISTANCE = 20 // meters
const LOOK_ANGLE = CesiumMath.toRadians(0.8) //


export const CesiumContainer = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [viewer, setViewer] = useState<Viewer | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    async function init() {
        try {
            setLoading(true)
            window.CESIUM_BASE_URL = '/cesium'

            viewer?.destroy()

            if (!containerRef.current) throw new Error("Cesium container not found")
            containerRef.current.innerHTML = ''

            const newViewer = await getViewer(containerRef.current)
            setViewer(newViewer)
        } catch (error) {
            console.error(error)
            setViewer(null)
        } finally {
            setLoading(false)
        }
    }

    const keyFns: Record<string, Function> = {
        'ArrowUp': () => viewer?.camera.moveForward(MOVE_DISTANCE),
        'ArrowDown': () => viewer?.camera.moveBackward(MOVE_DISTANCE),
        'ArrowLeft': () => viewer?.camera.moveLeft(MOVE_DISTANCE),
        'ArrowRight': () => viewer?.camera.moveRight(MOVE_DISTANCE),
        'w': () => viewer?.camera.lookUp(LOOK_ANGLE),
        'a': () => viewer?.camera.lookLeft(LOOK_ANGLE),
        's': () => viewer?.camera.lookDown(LOOK_ANGLE),
        'd': () => viewer?.camera.lookRight(LOOK_ANGLE),
    }
    const acceptedKeys = Object.keys(keyFns)
    const pressedKeys = useRef<Record<string, boolean>>({}).current
    const executeKeyFunctions = () => {
        Object.keys(keyFns).forEach(key => {
            if (pressedKeys[key]) keyFns[key]()
        })
    }
    const handleKeyUp = (event: KeyboardEvent) => {
        const k = event.key
        if (acceptedKeys.includes(k)) pressedKeys[k] = false
        executeKeyFunctions()
    }
    const handleKeyDown = (event: KeyboardEvent) => {
        const k = event.key
        if (acceptedKeys.includes(k)) pressedKeys[k] = true
        executeKeyFunctions()
    }

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        addEventListener('keydown', handleKeyDown)
        addEventListener('keyup', handleKeyUp)
        return () => {
            removeEventListener('keydown', handleKeyDown)
            removeEventListener('keyup', handleKeyUp)
        }
    }, [viewer])

    return (
        <div className="flex-1 relative min-w-[1000px] bg-black">
            <div
                className="w-full"
                ref={containerRef}
            />
            {(loading || !viewer) &&
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="flex flex-col w-full h-full justify-center items-center gap-2">
                        {loading ?
                            <Grid />
                            : !viewer ?
                                <>
                                    <h1>Error loading Cesium</h1>
                                    <button
                                        className="rounded-lg p-2 border-[2px] border-solid border-black dark:border-white"
                                        type="button"
                                        onClick={init}
                                    >Try Again</button>
                                </>
                                :
                                <></>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
