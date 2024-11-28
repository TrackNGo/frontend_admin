interface BusData{
    busRouteNumber:string,
    busType:string,
    price:number,
    startTime:Date,
    endTime:Date,
}
interface TimeTableType{
    startLocation:string,
    endLocation:string,
    bus:BusData[]
}

export default TimeTableType