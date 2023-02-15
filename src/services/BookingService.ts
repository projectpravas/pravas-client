import "../api/index";
import { API, endPoints } from "../api/index";

class BookingService {
  static createOrder(amount: string) {
    return API.post(endPoints.api.bookingOrders.bookNow, { amount: amount });
  } //createOrder

  static verifyOrder(idObj: any) {
    return API.post(endPoints.api.bookingOrders.verify, idObj);
  } //verifyOrder
}
export default BookingService;
