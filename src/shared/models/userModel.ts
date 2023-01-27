interface Name {
  first?: string;
  last?: string;
}

interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

interface UserActivityDetails {
  userTimeStamp?: Number;
  sentEmailTimeStamp?: Number;
  passwordTimeStamp?: Number;
}

interface UserModel {
  _id?: string;
  userId?: Number;
  name?: Name;
  mobile?: Array<Number>;
  email?: String;
  address?: Address;
  password?: String;
  role?: String;
  dob?: Date | string;
  gender?: String;
  avatar?: String | File;
  status?: String;
  userActivityDetails?: UserActivityDetails;
}

export default UserModel;
