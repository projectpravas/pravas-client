import "../api/index";
import { API, endpoints } from "../api/index";

class TourService {
  static createTour(tour: object) {
    return API.post(endpoints.api.tours.create, tour);
  } //createTour

  static updateTour(id: string, tour: object) {
    return API.put(endpoints.api.tours.update + id, tour);
  } //updateTour

  static deleteTour(id: string) {
    return API.delete(endpoints.api.tours.delete + id);
  } //deleteTour

  static fetchOneTour(id: string) {
    return API.get(endpoints.api.tours.getOne + id);
  } //fetchOneTour

  static fetchAllTours() {
    return API.get(endpoints.api.tours.getAll);
  } //fetchAllTours
}
export default TourService;
