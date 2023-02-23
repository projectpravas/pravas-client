import TourModel from "../../../shared/models/tourModel";

export const createFD = (
  images: string[] | any,
  category: "tour" | "package",
  tourId: string
) => {
  // get values from the localStorage
  let basicTourData = JSON.parse(localStorage.getItem("basicTourData") as any);
  let tourPlanData: any = {};
  let itineraryData = JSON.parse(localStorage.getItem("itineraryData") as any);
  let hotelsData = JSON.parse(localStorage.getItem("hotelsData") as any);
  let includesData = JSON.parse(localStorage.getItem("includesData") as any);
  let excludesData = JSON.parse(localStorage.getItem("excludesData") as any);
  let notesData = JSON.parse(localStorage.getItem("notesData") as any);

  // Clear unwanted fields and restucture data to create FormData
  //  set basicTourData
  basicTourData.images = images;
  basicTourData.category = category;
  if (category == "package") basicTourData.packageStatus = "active";
  if (category == "tour") {
    basicTourData.packageId = tourId;
  } else {
    delete basicTourData?.packageId;
    delete basicTourData?.tourDate;
  }

  basicTourData.customized = basicTourData?.tourType?.includes("Customize");

  // Set Day by day data to state

  let itineraryResult: any = [];
  let day = 1;

  for (let obj of itineraryData) {
    const dayplan: any = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (key.includes("planTitle")) {
        dayplan.planTitle = value as string;
      } else if (key.includes("planDesc")) {
        dayplan.planDesc = value as string;
      } else if (key.includes("meals")) {
        dayplan.meals = value as string;
      } else if (key.includes("day")) {
        dayplan.day = day as number;
      }
    });
    itineraryResult = [...itineraryResult, dayplan];
    day++;
  }
  itineraryData = itineraryResult;

  /// hotels data
  let hotelsResult: any = [];

  for (let obj of hotelsData) {
    const dayplan: any = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (key.includes("city")) {
        dayplan.city = value as string;
      } else if (key.includes("hotelNames")) {
        dayplan.hotelNames = value as string;
      }
    });
    hotelsResult = [...hotelsResult, dayplan];
  }
  hotelsData = hotelsResult;

  /// includes data
  let includesResult: any = [];

  for (let obj of includesData) {
    const dayplan: any = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (key.includes("include")) {
        dayplan.include = value as string;
      }
    });
    includesResult = [...includesResult, dayplan];
  }
  includesData = includesResult;

  /// excludes data
  let excludesResult: any = [];

  for (let obj of excludesData) {
    const dayplan: any = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (key.includes("exclude")) {
        dayplan.exclude = value as string;
      }
    });
    excludesResult = [...excludesResult, dayplan];
  }
  excludesData = excludesResult;

  /// Notes data
  let notesResult: any = [];

  for (let obj of notesData) {
    const dayplan: any = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (key.includes("note")) {
        dayplan.note = value as string;
      }
    });
    notesResult = [...notesResult, dayplan];
  }
  notesData = notesResult;

  ////////////////// Final data  //////////////

  tourPlanData = {
    itinerary: itineraryData,
    hotels: hotelsData,
    includes: includesData,
    excludes: excludesData,
    tourNotes: notesData,
  };

  const tourObj: TourModel = {
    ...basicTourData,
    tourPlan: tourPlanData,
  };

  console.log(tourObj);
  /////////////////////////////////////
  const fd = new FormData();

  //append data Fields
  tourObj?.title && fd.append("title", tourObj?.title);
  tourObj?.category && fd.append("category", tourObj?.category);
  tourObj?.packageStatus && fd.append("packageStatus", tourObj?.packageStatus);
  tourObj?.price && fd.append("price", tourObj?.price as any);
  tourObj?.customized && fd.append("customized", tourObj?.customized as any);
  tourObj?.tourStatus && fd.append("tourStatus", tourObj?.tourStatus as any);

  tourObj?.tourDate && fd.append("tourDate", tourObj?.tourDate as string);
  tourObj?.packageId && fd.append("packageId", tourObj?.packageId as string);

  if (tourObj?.duration) {
    fd.append("duration", JSON.stringify(tourObj?.duration) as string);
  }

  if (tourObj?.tourType && Array.isArray(tourObj?.tourType)) {
    for (const obj of tourObj?.tourType) {
      fd.append("tourType", obj as any);
    }
  }

  tourObj?.tourDesc && fd.append("tourDesc", tourObj?.tourDesc);

  tourObj?.tourInfo && fd.append("tourInfo", tourObj?.tourInfo);
  tourObj?.maxPersons && fd.append("maxPersons", tourObj?.maxPersons as any);

  tourObj?.participants &&
    fd.append("participants", tourObj?.participants as any);

  tourObj?.tourLocation &&
    fd.append("tourLocation", tourObj?.tourLocation as any);

  tourObj?.featured != undefined &&
    fd.append("featured", tourObj?.featured as any);

  if (Array.isArray(tourObj?.images)) {
    for (const file of tourObj?.images) {
      fd.append("images", file);
    }
  }

  tourObj?.feedbacks &&
    fd.append("feedbacks", JSON.stringify(tourObj?.feedbacks) as string);

  // tourPlan object
  if (tourObj?.tourPlan) {
    fd.append("tourPlan", JSON.stringify(tourObj?.tourPlan) as string);
  }

  return fd;
};
