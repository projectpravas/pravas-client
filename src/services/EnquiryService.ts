import { API, endpoints } from "../api/index";
import EnquiryModel from "../shared/models/enquiryModel";

class EnquiryService {
  static createEnquiry(enq: EnquiryModel) {
    return API.post(endpoints.api.enquiries.create, enq);
  } //createEnquiry

  static updateEnquiry(id: string, enq: EnquiryModel) {
    return API.put(endpoints.api.enquiries.update + id, enq);
  } //updateEnquiry

  static deleteEnquiry(id: string) {
    return API.delete(endpoints.api.enquiries.delete + id);
  } //deleteEnquiry

  static fetchOneEnquiry(id: string) {
    return API.get(endpoints.api.enquiries.getOne + id);
  } //fetchOneEnquiry

  static fetchAllEnquiries() {
    return API.get(endpoints.api.enquiries.getAll);
  } //fetchAllEnquiries
}
export default EnquiryService;
