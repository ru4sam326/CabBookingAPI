import { Rider } from "../models/models";


export class RiderService {
    // For caching the riders as we are having using the database connection in this project
    riderMap: Map<string|number,Rider>;
    
    constructor() {
        this.riderMap = new Map<string|number,Rider>();
    }

     isRiderRegistered(rider:Rider):boolean {
        return this.riderMap.get(rider.email) !== undefined || this.riderMap.get(rider.mobile) !== undefined;   
    }

    // Check and Register the rider
     Register(rider:Rider):string {
        if(!this.isRiderRegistered(rider)) { // Checking whether the rider was already registerd in our system
            // Database saving part;
            this.riderMap.set(rider.mobile, rider);
            this.riderMap.set(rider.id, rider);
            this.riderMap.set(rider.email, rider); // Updating the cache
            return "Registration is Successful"
        }
        return "Registration is Unsuccessful, Another User Exists With The Given Details"
    }
}
