import { Timestamp } from 'firebase/firestore';
import { GROUP_TYPE } from '../shared/enum/groupType';

export interface Group {
  id: string;
  name: string;
  members: string[];
  createdAt: Timestamp;
  type: GROUP_TYPE;
  deleted: boolean;
}
