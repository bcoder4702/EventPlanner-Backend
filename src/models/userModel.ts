export interface User {
    id: string;
    name: string;
    email: string;
    role: 'host' | 'vendor' | 'guest';
    eventIds: string[];
  }
  