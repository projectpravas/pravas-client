interface Duration {
  days?: number;
  nights?: number;
}

interface Itinerary {
  day?: number;
  planTitle?: string;
  planDesc?: string;
  meals?: {
    breakfast?: boolean;
    dinner?: boolean;
    lunch?: boolean;
  };
  _id: false;
}

interface Hotels {
  city: string;
  hotelNames: string;
  _id: false;
}

interface Includes {
  include: string;
  _id: false;
}

interface Excludes {
  exclude: string;
  _id: false;
}

interface Notes {
  note: string;
  _id: false;
}

interface TourPlan {
  scheduleDate?: Array<Date>;
  itinerary?: Array<Itinerary>;
  hotels?: Array<Hotels>;
  includes?: Array<Includes>;
  excludes?: Array<Excludes>;
  tourNotes?: Array<Notes>;
  _id: false;
}

interface Feedbacks {
  pravasiId?: string;
  name?: string;
  rating?: number;
  liked?: Boolean;
  comment?: string;
  date?: Date;
}

interface TourModel {
  _id?: string;
  tourId?: number;
  packageId?: String;
  tourDate?: String;
  title?: string;
  category?: string;
  price?: number;
  duration?: Duration;
  tourType?: Array<string>;
  tourDesc?: string;
  tourInfo?: string;
  maxPersons?: number;
  participants?: Array<string>;
  tourLocation?: string;
  featured?: Boolean;
  images?: Array<string | Blob>;
  tourPlan?: TourPlan;
  customized?: Boolean;
  tourStatus?: string;
  packageStatus?: string;
  feedbacks?: Array<Feedbacks>;
}

export default TourModel;
