export class Header {
    id: number
    costName: string
    typeBaseLineSimulation: number
    typeId: number
    headerId: number
    doe: Date
    userId: number
    modifyDate: Date
    modifyBy: number
    status: boolean
    baseLineName: string
    baseLineYear: number
    simulationName: string
    simulationYear: number
}

export class AddHeader {
    typeId: number
    typeBaseLineSimulation: number
    headerId: number
    userId: number
    costName: string
}
export class UpdateIndirecCosttHeader {
    typeId: number
    typeBaseLineSimulation: number
    headerId: number
    userId: number
    costName: string
    id: number
}
export class DdlBindHeaderName {

    id: number
    name: string
}
