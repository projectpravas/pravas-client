import "../api/index";
import { API, endpoints } from "../api/index";
import TourModel from "../shared/models/tourModel";

class TourService {
  static createTour(tour: TourModel | FormData) {
    return API.post(endpoints.api.tours.create, tour);
  } //createTour

  static updateTour(id: string, tour: TourModel | FormData) {
    return API.put(endpoints.api.tours.update + id, tour);
  } //updateTour

  static deleteTour(id: string) {
    return API.delete(endpoints.api.tours.delete + id);
  } //deleteTour

  static fetchOneTour(id: string) {
    return API.get(endpoints.api.tours.getOne + id);
  } //fetchOneTour

  static fetchAllTours(query: string) {
    return API.get(endpoints.api.tours.getAll + query);
  } //fetchAllTours
}
export default TourService;
