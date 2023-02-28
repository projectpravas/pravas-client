import "../api/index";
import { API, endPoints } from "../api/index";

class BookingService {
  static createOrder(amount: string) {
    return API.post(endPoints.api.bookingOrders.bookNow, { amount: amount });
  } //createOrder

  static verifyOrder(idObj: any) {
    return API.post(endPoints.api.bookingOrders.verify, idObj);
  } //verifyOrder

  static getPaymentHistory(queryObj: {
    from: string | Date;
    to: string | Date;
    last: string | number;
  }) {
    return API.post(endPoints.api.bookingOrders.getPaymentHistory, queryObj);
  } //verifyOrder

  static refund(refundObj: { pId: string; amount: string }) {
    return API.post(endPoints?.api.bookingOrders.refund, refundObj);
  } //refund
}
export default BookingService;
