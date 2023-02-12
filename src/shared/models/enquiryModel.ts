interface TravelDates {
  from: string;
  to: string;
}

interface Meals {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

interface Destinations {
  place: string;
}
interface Participants {
  name: string;
  age: number;
}

interface EnquiryModel {
  enquiryId?: number;
  destinations?: Destinations[];
  travelDates?: TravelDates;
  travelDuration?: number;
  participants?: Participants[];
  hotelCategory?: string;
  rooms?: number;
  meals?: Meals;
  anythingElse?: string;
}
export default EnquiryModel;
