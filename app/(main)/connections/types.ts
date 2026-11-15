export type NotificationType = "CONNECTION_REQUEST" | "CONNECTION_ACCEPTED";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message?: string | null;
  isRead: boolean;
  createdAt: Date | string;
}


export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string | null;
  location?: string | null;
  bio?: string | null;
  institution_or_job?: string | null;
  city?: string | null;
  country?: string | null;
  phone_number?: string | null;
  age?: number | null;
  is_premium?: boolean | null;
  lastSeenAt?: Date | string | null;
}

export interface Connection {
  id: string;
  senderId: string;
  receiverId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "REMOVE";
  sender?: User;
  receiver?: User;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}