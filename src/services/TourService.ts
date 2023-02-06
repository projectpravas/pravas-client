import "../api/index";
import { API, endPoints } from "../api/index";

class TourService {
  static createTour(tour: object | FormData) {
    return API.post(endPoints.api.tours.create, tour);
  } //createTour

  static updateTour(id: string, tour: object | FormData) {
    return API.put(endPoints.api.tours.update + id, tour);
  } //updateTour

  static deleteTour(id: string) {
    return API.delete(endPoints.api.tours.delete + id);
  } //deleteTour

  static fetchOneTour(id: string) {
    return API.get(endPoints.api.tours.getOne + id);
  } //fetchOneTour

  static fetchAllTours() {
    return API.get(endPoints.api.tours.getAll);
  } //fetchAllTours
}
export default TourService;
