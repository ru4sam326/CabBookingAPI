// To represent the Geo Location
export class GeoLocation  {
    x: number;
    y:number;
}


// Driver's class
export class Driver {
    id: number;
    firstName:string;
    lastName:string;
    email:string;
    mobile:string;
    status:string; // AVAILABLE/NOT-AVAILABLE / ACTIVE/IN-ACTIVE
    location:GeoLocation; // Current Driver's location
}


// Rider's class
export class Rider {
    id: number;
    firstName:string;
    lastName:string;
    email:string;
    mobile:string;
    status:string; // ACTIVE/IN-ACTIVE
    location:GeoLocation; // Current Rider's location
}

// Trip details
export class Trip {
    id:number;
    from: GeoLocation;
    to:GeoLocation;
    rider:Rider;
    driver: Driver;
    startDate: Date;
    endDate: Date; 
    fare: number;
}
