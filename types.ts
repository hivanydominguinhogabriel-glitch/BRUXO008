
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  neighborhood: string;
  interests: string[];
  photos: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface Match {
  id: string;
  user: UserProfile;
  lastMessage?: string;
  unreadCount: number;
}

export enum AppScreen {
  DISCOVERY = 'DISCOVERY',
  MATCHES = 'MATCHES',
  CHAT = 'CHAT',
  PROFILE = 'PROFILE',
  DATE_SPOTS = 'DATE_SPOTS'
}
