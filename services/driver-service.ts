import { DRIVER_STATUS, MAX_DISTANCE } from "../config/config";
import { Driver, GeoLocation } from "../models/models";



export class DriverSerivice {
    driverMap: Map<string|number,Driver>; // Cache purpose as we dont have the db conneciton

    constructor() {
        this.driverMap = new Map<string|number,Driver>();
    }

    isDriverRegistered(driver:Driver):boolean {
        return this.driverMap.get(driver.email) !== undefined || this.driverMap.get(driver.mobile) !== undefined;   
    }

    // Check and Register the driver
    Register(driver:Driver):string {
        if(!this.isDriverRegistered(driver)) { // Checking whether the driver was already registerd in our system
            // Database saving part;
            this.driverMap.set(driver.mobile, driver);
            this.driverMap.set(driver.id, driver);
            this.driverMap.set(driver.email, driver); // Updating the cache
            return "Registration is Successful"
        }
        return "Registration is Unsuccessful, Another User Exists With The Given Details"
    }

    // To Turn of the Driver's Availability - Input params driver id from the app
    MarkTheDriverAsUnAvailable(driverId:number):string {
        let driver = this.driverMap.get(driverId);
        if(driver == undefined) {
            return "Action Unsucessful, Driver is not available"
        }
        driver.status =DRIVER_STATUS.NOTAVAILABLE
        return "Succesfully marked the driver as unavailable"
    }

    // To Turn of the Driver as Availabile - Input params driver id from the app and the current location
    MarkTheDriverAsAvailable(driverId:number, location:GeoLocation):string {
        let driver = this.driverMap.get(driverId);
        if(driver == undefined) {
            return "Action Unsucessful, Driver is not available"
        }
        driver.status =DRIVER_STATUS.AVAILABLE
        driver.location = location;

        return "Succesfully marked the driver as available"
    }
    
    // To Find the Nearest driver based on rider's location
    FindTheNearestDriver(riderLocation:GeoLocation): Driver | undefined {
        let nearestDriver: Driver = new Driver();
        for (const driverEntry of this.driverMap) {
            let nearestDriverDistance = MAX_DISTANCE+1;
            const driver = driverEntry[1]
            if(driver.status == DRIVER_STATUS.AVAILABLE ) {
               const distance =  this.getTheDistance(riderLocation,driver.location)
                if(nearestDriverDistance > distance ) {
                    nearestDriverDistance = distance;
                    nearestDriver = driver;
                } 
            }
        }
        return nearestDriver.email === '' ? undefined : nearestDriver;
    }

    getTheDistance(riderLocation: GeoLocation, location: GeoLocation): number {
        const  distance =  Math.sqrt( Math.pow( location.x-riderLocation.x,2) + Math.pow( location.y-riderLocation.y,2) )
        return Math.abs(distance) 
    }

}
