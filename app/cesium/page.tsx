import { CesiumContainer } from './provider'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4">
            <div className="flex h-full w-full items-center justify-between">
                <CesiumContainer />
            </div>
        </main>
    )
}
