export interface Event {
    id: string;
    name: string;
    date: Date;
    location: string;
    description: string;
    hostId: string;
    vendorIds: string[];
    guestIds: string[];
  }
  