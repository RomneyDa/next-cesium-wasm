export const constrainCircular = (val: number, lower: number, upper: number) => {
    if (upper <= lower) throw Error("Invalid constraint bounds")
    const range = upper - lower
    if (val < lower) {
        const below = lower - val
        const excess = below % range
        return upper - excess
    }
    if (val > upper) {
        const above = upper - val
        const excess = above % range
        return lower + excess
    }
    return val
}
export const constrainLat = (val: number) => {
    return constrainCircular(val, -90, 90)
}
export const constrainLon = (val: number) => {
    return constrainCircular(val, -180, 180)
}