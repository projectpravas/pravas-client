interface TourModel {
  tourId?: number;
  title?: string;
  category?: string;
  price?: number;
  duration?: { days?: number; nights?: number };
  tourType?: string;
  tourDesc?: string;
  tourInfo?: string;
  maxPersons?: string;
  participants?: Array<string>;
  tourLocation?: string;
  featured?: Boolean;
  images?: Array<string>;
  tourPlan?: {
    scheduleDate: Array<Date>;
    itinerary: [
      {
        day: number;
        planTitle: string;
        PlanDesc: string;
        meals: Array<string>;
      }
    ];
    hotels: Array<string>;
    includes: Array<string>;
    excludes: Array<string>;
    tourNotes: Array<string>;
  };
  customized?: Boolean;
  tourStatus?: string;
  feedbacks?: [
    {
      pravasiId: string;
      liked: Boolean;
      comment: string;
    }
  ];
}

export default TourModel;
