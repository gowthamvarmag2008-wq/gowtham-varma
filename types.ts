
export enum TripType {
  SOLO = 'Solo Traveler',
  COUPLE = 'Couple',
  FAMILY = 'Family',
  FRIENDS = 'Friends Group',
  BUSINESS = 'Business'
}

export enum TripMood {
  RELAXED = 'Relaxed',
  ADVENTUROUS = 'Adventurous',
  CULTURAL = 'Cultural',
  LUXURY = 'Luxury',
  BUDGET = 'Budget-friendly'
}

export interface TripDetails {
  userName: string;
  age: string;
  placeVisited: string;
  dateOfVisit: string;
  tripType: TripType;
  tripMood: TripMood;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  id: string;
}

export interface DayPlan {
  time: string;
  activity: string;
  description: string;
  icon: string;
}
