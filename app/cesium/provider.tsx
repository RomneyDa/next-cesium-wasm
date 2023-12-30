"use client"
// The URL on your server where CesiumJS's static files are hosted.

import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer, SceneMode, ProviderViewModel, ImageryLayer, KeyboardEventModifier, CameraEventType } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useEffect, useMemo, useState } from 'react';
import { Grid } from 'react-loader-spinner';

import flightData from './flightData.json';


const point1 = flightData[0]
// console.log("POINT 1", point1)

if (!process.env.NEXT_PUBLIC_CESIUM_KEY) throw new Error('No cesium key in env')
Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_KEY


async function wait(time: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null)
        }, time)
    })
}

export const CesiumContainer = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [viewer, setViewer] = useState<Viewer | null>(null)

    async function init() {
        try {
            setLoading(true)
            window.CESIUM_BASE_URL = '/cesium'

            // Initialize the Cesium Viewer in the HTML element with the `cesium-container` ID
            // const providerViewModel = new ProviderViewModel({
            //     category: 
            // })
            // const imageryLayer = new ImageryLayer(new Imagery)
            const viewer = new Viewer('cesium-container', {
                terrain: Terrain.fromWorldTerrain(),
                scene3DOnly: true,
                vrButton: false,
                animation: false,
                homeButton: false,
                sceneMode: SceneMode.SCENE3D,
                navigationHelpButton: false,
                navigationInstructionsInitiallyVisible: false,

                fullscreenButton: false,
                fullscreenElement: undefined,
                clockViewModel: undefined,
                baseLayerPicker: false,
                infoBox: false,
                timeline: false,

                // creditContainer: <div></div>,
                // baseLayer: ImageryLayer.
                // globe: true,
                // imageryProviderViewModels: [providerViewModel],
                // selectedImageryProviderViewModel: providerViewModel
            })

            // https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html
            const controller = viewer.scene.screenSpaceCameraController

            controller.bounceAnimationTime = 3 // 3
            controller.enableCollisionDetection = true // default true; When disabled, the values of maximumZoomDistance and minimumZoomDistance are ignored.
            controller.enableInputs = true // default true - disables all the other inputs

            controller.enableRotate = true
            controller.enableLook = true
            controller.enableTilt = true
            controller.enableTranslate = true
            controller.enableZoom = true

            controller.lookEventTypes = undefined
            controller.rotateEventTypes = undefined // CameraEventType.LEFT_DRAG
            controller.translateEventTypes = undefined // CameraEventType.LEFT_DRAG
            controller.tiltEventTypes = undefined // [CameraEventType.MIDDLE_DRAG, CameraEventType.PINCH, { eventType : CameraEventType.LEFT_DRAG, modifier : KeyboardEventModifier.CTRL }, { eventType : CameraEventType.RIGHT_DRAG, modifier : KeyboardEventModifier.CTRL }]

            controller.inertiaSpin = 0 // 0.9
            controller.inertiaTranslate = 0 // 0.9
            controller.inertiaZoom = 0 // 0.8

            controller.maximumMovementRatio = 0.1
            controller.maximumZoomDistance = Number.POSITIVE_INFINITY
            controller.minimumCollisionTerrainHeight = 15000.0
            controller.minimumPickingTerrainDistanceWithInertia = 4000.0
            controller.minimumPickingTerrainHeight = 150000.0
            controller.minimumTrackBallHeight = 7500000.0
            controller.minimumZoomDistance = 1.0

            // Fly the camera to San Francisco at the given longitude, latitude, and height.
            viewer.camera.flyTo({
                destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
                orientation: {
                    heading: CesiumMath.toRadians(0.0),
                    pitch: CesiumMath.toRadians(-15.0),
                }
            })

            // Add Cesium OSM Buildings, a global 3D buildings layer.
            // const buildingTileset = await createOsmBuildingsAsync()
            // viewer.scene.primitives.add(buildingTileset);

            setViewer(viewer)
        } catch (error) {
            console.error(error)
            setViewer(null)
        } finally {
            setLoading(false)
        }

    }

    const handleKeyDown = useMemo(() => (event: KeyboardEvent) => {
        console.log("VIEWER CHANGED", viewer)
        if (!viewer) return
        console.log("KEY PRESSED", event.key)
        // if(event.key === '')
        switch (event.key) {
            case 'ArrowUp': {
                // viewer.camera.
                break
            }
        }
    }, [viewer])

    useEffect(() => {
        init()

        addEventListener('keydown', handleKeyDown)
        return () => removeEventListener('keydown', handleKeyDown)
    }, [])

    // if (loading) return (
    //     <div className="flex flex-1 justify-center items-center">
    //         <Grid />
    //     </div>
    // )

    // if (!viewer) return (
    //     <div className="flex flex-1 justify-center items-center">
    //         <h1>Error loading</h1>
    //         <button
    //             className=""
    //             type="button"
    //             onClick={() => { }}
    //         >Try Again</button>
    //     </div>
    // )



    return (
        <div className="relative w-full h-full">
            <div id="cesium-container-2" />
            {loading ?
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="flex w-full h-full justify-center items-center"><Grid /></div>
                </div>
                : !viewer ?
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="flex w-full h-full justify-center items-center">
                            <h1>Error loading</h1>
                            <button
                                className=""
                                type="button"
                                onClick={() => { init() }}
                            >Try Again</button>
                        </div>
                    </div>
                    : <></>
            }
        </div >
    )
}

// export const useCesiumContext = useContext(CesiumContext)
{/* <CesiumContext.Provider value={{
    loading,
    viewer
}}>
    {children}
</CesiumContext.Provider> */}

// interface CesiumContextType {
//     loading: boolean
//     viewer: Viewer | null
// }

// const DefaultCesiumContext: CesiumContextType = {
//     loading: true,
//     viewer: null
// }

// const CesiumContext = createContext<CesiumContextType>(DefaultCesiumContext)