export class ParkEvent {
    name: string;
    date: string;
    location: string;
    description: string;
    

    constructor(name: string, date: string, location: string, description: string) {
        this.name = name;
        this.date = date;
        this.location = location;
        this.description = description;
    }

}