import "../api/index";
import { API, endpoints } from "../api/index";
import User from "../shared/models/userModel";

class UserService {
  static createUser(user: FormData | User) {
    return API.post(endpoints.api.users.create, user);
  } //createUser

  static updateUser(id: string, user: FormData | User) {
    return API.put(endpoints.api.users.update + id, user);
  } //updateUser

  static deleteUser(id: string) {
    return API.delete(endpoints.api.users.delete + id);
  } //deleteUser

  static fetchOneUser(id: string) {
    return API.get(endpoints.api.users.getOne + id);
  } //fetchOneUser

  static fetchAllUsers() {
    return API.get(endpoints.api.users.getAll);
  } //fetchAllUsers
}
export default UserService;
