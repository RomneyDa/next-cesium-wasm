import flightDataJson from "./flightData.json";

interface FlightPoint {
    longitude: number;
    latitude: number;
    height: number;
}

export const flightData: FlightPoint[] = flightDataJson;

const point1 = flightData[0]
console.log("POINT 1", point1.latitude, point1.longitude, point1.height)