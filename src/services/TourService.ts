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

  static fetchOneTour(id: string) {
    return API.get(endPoints.api.tours.getOne + id);
  } //fetchOneTour

  static fetchAllTours(query: string) {
    return API.get(endPoints.api.tours.getAll + query);
  } //fetchAllTours
}
export default TourService;
