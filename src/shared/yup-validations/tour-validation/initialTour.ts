import { array, string } from "yup";
import TourModel from "../../models/tourModel";

const defineInitialTour = ({
  has_id = false,
  hasTourId = false,
  hasTitle = false,
  hasCategory = false,
  hasPrice = false,

  hasDays = false,
  hasNights = false,

  hasTourType = false,
  hasTourDesc = false,
  hasTourInfo = false,
  hasMaxPersons = false,
  hasParticipants = false,
  hasTourLocation = false,
  hasFeatured = false,
  hasImages = false,

  hasScheduleDate = false,
  hasDay = false,
  hasPlanTitle = false,
  hasPlanDesc = false,
  hasMeals = false,

  hasHotels = false,
  hasIncludes = false,
  hasExcludes = false,
  hasTourNotes = false,

  hasCustomized = false,
  hasTourStatus = false,
  hasPackageStatus = false,

  hasPravasiId = false,
  hasLiked = false,
  hasComment = false,
}) => {
  const initialTour: TourModel = {};
  const tourPlanObj: any = {};
  const itineraryObj: any = {};
  const feedbackobj: any = {};

  if (has_id) initialTour._id = "";
  if (hasTourId) initialTour.tourId = NaN;
  if (hasTitle) initialTour.title = "";
  if (hasCategory) initialTour.category = "";
  if (hasPrice) initialTour.price = 0;

  if (hasDays || hasNights) initialTour.duration = { days: 0, nights: 0 };

  if (hasTourType) initialTour.tourType = [];
  if (hasTourDesc) initialTour.tourDesc = "";
  if (hasTourInfo) initialTour.tourInfo = "";
  if (hasMaxPersons) initialTour.maxPersons = 0;
  if (hasParticipants) initialTour.participants = [];
  if (hasTourLocation) initialTour.tourLocation = "";
  if (hasFeatured) initialTour.featured = false;
  if (hasImages) initialTour.images = [];

  if (hasScheduleDate) tourPlanObj.scheduleDate = [];

  if (hasDay) itineraryObj.day = "";
  if (hasPlanTitle) itineraryObj.planTitle = "";
  if (hasPlanDesc) itineraryObj.planDesc = "";
  if (hasMeals)
    itineraryObj.meals = {
      breakfast: false,
      dinner: false,
      lunch: false,
    };
  if (hasDay || hasPlanTitle || hasPlanDesc || hasMeals)
    tourPlanObj.itinerary = [itineraryObj];

  if (hasHotels) tourPlanObj.hotels = [{ city: "", hotelNames: "" }];
  if (hasIncludes) tourPlanObj.includes = [{ include: "" }];
  if (hasExcludes) tourPlanObj.excludes = [{ exclude: "" }];
  if (hasTourNotes) tourPlanObj.tourNotes = [{ note: "" }];

  if (
    hasScheduleDate ||
    hasDay ||
    hasPlanTitle ||
    hasPlanDesc ||
    hasMeals ||
    hasHotels ||
    hasIncludes ||
    hasExcludes ||
    hasTourNotes
  )
    initialTour.tourPlan = tourPlanObj;

  if (hasCustomized) initialTour.customized = false;
  if (hasTourStatus) initialTour.tourStatus = "";
  if (hasPackageStatus) initialTour.packageStatus = "";

  if (hasPravasiId) feedbackobj.pravasiId = "";
  if (hasLiked) feedbackobj.liked = false;
  if (hasComment) feedbackobj.comment = "";
  if (hasPravasiId || hasLiked || hasComment)
    initialTour.feedbacks = feedbackobj;

  return initialTour;
};

export default defineInitialTour;
