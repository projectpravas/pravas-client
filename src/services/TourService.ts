import "../api/index";
import { API, endPoints } from "../api/index";
import TourModel from "../shared/models/tourModel";

class TourService {
  static createTour(tour: TourModel | FormData) {
    return API.post(endPoints.api.tours.create, tour);
  } //createTour

  static updateTour(id: string, tour: TourModel | FormData) {
    return API.put(endPoints.api.tours.update + id, tour);
  } //updateTour

  static deleteTour(id: string) {
    return API.delete(endPoints.api.tours.delete + id);
  } //deleteTour

  static fetchAllTours(query = "") {
    return API.get(endPoints.api.tours.getAll + query);
  } //fetchAllTours

  static fetchOneTour(id: string) {
    return API.get(endPoints.api.tours.getOne + id);
  } //fetchOneTour

  static updateReview(id: string, review: TourModel | FormData | Object) {
    return API.put(endPoints.api.tours.updateReview + id, review);
  } //updateTour

  static fetchUpcomingTours(packageId = "0") {
    return API.get(endPoints.api.tours.getUpcoming + packageId);
  } //fetchAllTours
}
export default TourService;
