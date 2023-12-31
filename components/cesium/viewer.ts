import { constrainLat, constrainLon } from "@/utils/numbers";
import { Camera, Cartesian3, SceneMode, Terrain, Viewer, createOsmBuildingsAsync, Rectangle } from "cesium";

Camera.DEFAULT_VIEW_FACTOR = 0
const DEFAULT_VIEW_WIDTH = 0.005
const DEFAULT_START_LON = -122.4175 // deg lon
const DEFAULT_START_LAT = 37.655 // deg lat
const DEFAULT_START_HEIGHT = 400 // m above ellipsoid (?)
const DEFAULT_START_POINT = Cartesian3.fromDegrees(DEFAULT_START_LON, DEFAULT_START_LAT, DEFAULT_START_HEIGHT)

const W = DEFAULT_VIEW_WIDTH / 2
Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(
    constrainLon(DEFAULT_START_LON - W),
    constrainLat(DEFAULT_START_LAT - W),
    constrainLon(DEFAULT_START_LON + W),
    constrainLat(DEFAULT_START_LAT + W)
)

/**
 * Docs:
 * -    Camera: https://cesium.com/learn/cesiumjs/ref-doc/Camera.html
 * -    Screen Space Camera Controller: https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html
 * @param containerRef 
 * 
 * @returns 
 */

export async function getViewer(containerRef: HTMLDivElement): Promise<Viewer> {
    const viewer = new Viewer(containerRef, {
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
        geocoder: false,

        // creditContainer: <div></div>,
        // baseLayer: ImageryLayer.
        // globe: true,
        // imageryProviderViewModels: [providerViewModel],
        // selectedImageryProviderViewModel: providerViewModel
    })

    const controller = viewer.scene.screenSpaceCameraController

    controller.bounceAnimationTime = 3 // 3
    controller.enableCollisionDetection = true // default true; When disabled, the values of maximumZoomDistance and minimumZoomDistance are ignored.
    controller.enableInputs = false // default true - disables all the other inputs

    controller.enableRotate = false
    controller.enableLook = false
    controller.enableTilt = false
    controller.enableTranslate = false
    controller.enableZoom = false

    // controller.lookEventTypes = undefined // { eventType : CameraEventType.LEFT_DRAG, modifier : KeyboardEventModifier.SHIFT }
    // controller.rotateEventTypes = undefined // CameraEventType.LEFT_DRAG
    // controller.translateEventTypes = undefined // CameraEventType.LEFT_DRAG
    // controller.tiltEventTypes = undefined // [CameraEventType.MIDDLE_DRAG, CameraEventType.PINCH, { eventType : CameraEventType.LEFT_DRAG, modifier : KeyboardEventModifier.CTRL }, { eventType : CameraEventType.RIGHT_DRAG, modifier : KeyboardEventModifier.CTRL }]
    // controller.zoomEventTypes = undefined // [CameraEventType.RIGHT_DRAG, CameraEventType.WHEEL, CameraEventType.PINCH]

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

    // // Add Cesium OSM Buildings, a global 3D buildings layer.
    // const buildingTileset = await createOsmBuildingsAsync()
    // viewer.scene.primitives.add(buildingTileset);

    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    // viewer.camera.flyTo({
    //     destination: DEFAULT_START_POINT,
    //     orientation: {
    //         heading: CesiumMath.toRadians(0.0),
    //         pitch: CesiumMath.toRadians(-15.0),
    //     }
    // })

    return viewer
}