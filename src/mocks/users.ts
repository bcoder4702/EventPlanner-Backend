import { ROLES as User_Type } from '../shared/enum/index';

export const usersMockData: object[] = [
    {
        id: '1',
        name: 'Carlos',
        deleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        mobile: '9876543212',
        email: 'carlos@gmail.com',
        photo: 'https://url.com/to/avatar',
        role: User_Type.ORGANIZER,
        events: [],
    },
    {
      id: '2',
      name: 'Jane',
      deleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mobile: '8876545679',
      email: 'jane@gmail.com',
      photo: 'https://url.com/to/avatar',
      role: User_Type.ORGANIZER,
      events: [],
    },
    {
      id: '3',
      name: 'Bob',
      deleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mobile: '1234567890',
      email: 'bob@gmail.com',
      photo: 'https://url.com/to/avatar',
      role: User_Type.ORGANIZER,
      events: [],
    },
  ];
  