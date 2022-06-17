import { GeoLocation, Rider, Trip } from "../models/models";
import { DriverSerivice } from "./driver-service";


export class TripSerivce {
    driverService: DriverSerivice; // If we have injection of service can be ignored

    // constructor injection of service
    constructor(driverService:DriverSerivice) {
        this.driverService = driverService;
    }

    startTrip = (rider:Rider, to: GeoLocation):(Trip|string) => {
       let driver =  this.driverService.FindTheNearestDriver(rider.location);
       if(!driver) {
        return "No Drivers are available right now from the current location"
       }
       let trip= new Trip();
       trip.driver = driver;
       trip.rider = rider;
       trip.from = driver.location;
       trip.to = to;
       trip.startDate = new Date();
       return trip;
    }
    
    // Driver initiates the trip end so the trip id  will be the input
    endTrip = (tripId: number):string => {
        let trip = this.findTheTrip(tripId);
        if(!trip) {
            return "Invalid trip details"
        }
        trip.endDate = new Date();
        // TODO - persisting part;
        return "Successfully completed the trip"
    }

     findTheTrip(tripId: number) : Trip{
        // TODO - DB query to be implemented
        return new Trip()
    }
} 


