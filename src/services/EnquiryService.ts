import { API, endPoints } from "../api/index";
import EnquiryModel from "../shared/models/enquiryModel";

class EnquiryService {
  static createEnquiry(enq: EnquiryModel) {
    return API.post(endPoints.api.enquiries.create, enq);
  } //createEnquiry

  static updateEnquiry(id: string, enq: EnquiryModel) {
    return API.put(endPoints.api.enquiries.update + id, enq);
  } //updateEnquiry

  static deleteEnquiry(id: string) {
    return API.delete(endPoints.api.enquiries.delete + id);
  } //deleteEnquiry

  static fetchOneEnquiry(id: string) {
    return API.get(endPoints.api.enquiries.getOne + id);
  } //fetchOneEnquiry

  static fetchAllEnquiries() {
    return API.get(endPoints.api.enquiries.getAll);
  } //fetchAllEnquiries
}
export default EnquiryService;
