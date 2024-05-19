import { Timestamp } from 'firebase/firestore';
import { MEMBER_ROLE_TYPE } from '../shared/enum/index';

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: MEMBER_ROLE_TYPE;
  createdAt: Timestamp;
}
