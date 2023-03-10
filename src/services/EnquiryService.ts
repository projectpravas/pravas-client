import { API, endPoints } from "../api/index";
import EnquiryModel from "../shared/models/enquiryModel";

class EnquiryService {
  static createEnquiry(enq: FormData | EnquiryModel) {
    return API.post(endPoints.api.enquiries.create, enq);
  } //createEnquiry

  static updateEnquiry(id: string, enq: FormData | object) {
    return API.put(endPoints.api.enquiries.update + id, { ...enq });
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
