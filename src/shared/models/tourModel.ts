interface Duration {
  days?: number;
  nights?: number;
}

interface Itinerary {
  day?: number;
  planTitle?: string;
  planDesc?: string;
  meals?: Object;
}

interface TourPlan {
  scheduleDate?: Array<Date>;
  itinerary?: Array<Itinerary>;
  hotels?: Array<string>;
  includes?: Array<string>;
  excludes?: Array<string>;
  tourNotes?: Array<string>;
}

interface Feedbacks {
  pravasiId?: string;
  liked?: Boolean;
  comment?: string;
}

interface TourModel {
  _id?: string;
  tourId?: number;
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
  feedbacks?: Array<Feedbacks>;
}

export default TourModel;
