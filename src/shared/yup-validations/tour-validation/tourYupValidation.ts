import * as yup from "yup";

interface TourYupSchemaInterface {
  hasTourId?: boolean;
  hasTitle?: boolean;
  hasCategory?: boolean;
  hasPrice?: boolean;
  hasDays?: boolean;
  hasNights?: boolean;
  hasTourType?: boolean;
  hasTourDesc?: boolean;
  hasTourInfo?: boolean;
  hasMaxPersons?: boolean;
  hasParticipants?: boolean;
  hasTourLocation?: boolean;
  hasTourDate?: boolean;
  hasFeatured?: boolean;
  hasImages?: boolean;
  hasScheduleDate?: boolean;
  hasDay?: boolean;
  hasPlanTitle?: boolean;
  hasPlanDesc?: boolean;
  hasMeals?: boolean;
  hasHotels?: boolean;
  hasCity?: boolean;
  hasHotelNames?: boolean;
  hasIncludes?: boolean;
  hasExcludes?: boolean;
  hasTourNotes?: boolean;
  hasCustomized?: boolean;
  hasTourStatus?: boolean;
  hasPackageStatus?: boolean;
  hasPravasiId?: boolean;
  hasLiked?: boolean;
  hasComment?: boolean;
}

const defineTourYupSchema = ({
  hasTourId = false,
  hasTitle = false,
  hasCategory = false,
  hasPrice = false,

  hasDays = false,
  hasNights = false,

  hasTourType = false,
  hasTourDesc = false,
  hasTourInfo = false,
  hasTourDate = false,
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
  hasCity = false,
  hasHotelNames = false,

  hasIncludes = false,
  hasExcludes = false,
  hasTourNotes = false,

  hasCustomized = false,
  hasTourStatus = false,
  hasPackageStatus = false,

  hasPravasiId = false,
  hasLiked = false,
  hasComment = false,
}: TourYupSchemaInterface) => {
  const tourSchemaObj: any = {};
  const durationObj: any = {};
  const itineraryObj: any = {};
  const tourPlanObj: any = {};
  const hotelsObject: any = {};
  const feedbacksObj: any = {};

  if (hasTourId)
    tourSchemaObj.tourId = yup.number().required("Tour-Id is required");
  if (hasTitle)
    tourSchemaObj.title = yup.string().required("Title is required");
  if (hasTourDate)
    tourSchemaObj.tourDate = yup
      .date()
      .required("Tour Date is required")
      .min(new Date(Date.now()), "Date couldn't be less than today");
  if (hasCategory)
    tourSchemaObj.category = yup.string().required("Category is required");
  if (hasPrice)
    tourSchemaObj.price = yup
      .number()
      .required("Price is required")
      .positive("-ve/zero Number is not allowed");

  if (hasDays)
    durationObj.days = yup
      .number()
      .required("Days required")
      .positive("-ve/zero Number is not allowed")
      .max(30, "Max 30 day are allowed");
  if (hasNights)
    durationObj.nights = yup
      .number()
      .required("Nights required")
      .positive("-ve/zero Number is not allowed");
  if (hasDays || hasNights) tourSchemaObj.duration = yup.object(durationObj);

  if (hasTourType)
    tourSchemaObj.tourType = yup.array().min(1, "TourType can't be empty");
  if (hasTourDesc)
    tourSchemaObj.tourDesc = yup
      .string()
      .required("Tour Description is required");
  if (hasTourInfo)
    tourSchemaObj.tourInfo = yup
      .string()
      .required("Tour Information is required");
  if (hasMaxPersons)
    tourSchemaObj.maxPersons = yup
      .number()
      .required("Total Seats are required")
      .positive("-ve/zero Number is not allowed");
  if (hasParticipants)
    tourSchemaObj.participants = yup
      .string()
      .required("Total Seats Number is required");
  if (hasTourLocation)
    tourSchemaObj.tourLocation = yup
      .string()
      .required("Tour Loacation is required");
  if (hasFeatured)
    tourSchemaObj.featured = yup.boolean().required("Featured is required");
  if (hasImages)
    tourSchemaObj.images = yup.array().required("Tour Images is required");

  if (hasScheduleDate)
    tourPlanObj.scheduleDate = yup
      .array()
      .required("Tour Plan Dates are required");

  if (hasDay) itineraryObj.day = yup.string().required("Day is Required");
  if (hasPlanTitle)
    itineraryObj.planTitle = yup.string().required("Plan Title is Required");
  if (hasPlanDesc)
    itineraryObj.planDesc = yup
      .string()
      .required("Plan Description is Required");
  if (hasMeals) itineraryObj.meals = yup.object().required("Meals is Required");
  if (hasDay || hasPlanTitle || hasPlanDesc || hasMeals)
    tourPlanObj.itinerary = yup.object(itineraryObj);

  if (hasHotels)
    tourPlanObj.hotels = yup.array().required("Hotels are required");
  if (hasCity) hotelsObject.city = yup.string().required("City is required");
  if (hasHotelNames)
    hotelsObject.hotelNames = yup.string().required("Hotel Names are required");
  if (hasIncludes)
    tourPlanObj.includes = yup.array().required("Includes are required");
  if (hasExcludes)
    tourPlanObj.excludes = yup.array().required("Excludes are required");
  if (hasTourNotes)
    tourPlanObj.tourNotes = yup.array().required("Tour Notes are required");

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
    tourSchemaObj.tourPlan = yup.object(tourPlanObj);

  if (hasCustomized)
    tourSchemaObj.customized = yup.boolean().required("Cutomised is required");
  if (hasTourStatus)
    tourSchemaObj.tourStatus = yup.string().required("Tour Status is required");
  if (hasPackageStatus)
    tourSchemaObj.packageStatus = yup
      .string()
      .required("Package Status is required");

  if (hasPravasiId)
    feedbacksObj.pravasiId = yup.string().required("Pravasi Id is required");
  if (hasLiked)
    feedbacksObj.liked = yup.boolean().required("Tour like is required");
  if (hasComment)
    feedbacksObj.comment = yup.array().required("Tour comment is required");
  if (hasPravasiId || hasLiked || hasComment)
    tourSchemaObj.feedbacks = yup.object(feedbacksObj);

  return yup.object().shape(tourSchemaObj);
};

export default defineTourYupSchema;
