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
  userId?: number;
  name?: Name;
  mobile?: string;
  email?: string;
  address?: Address;
  password?: string;
  tours?: Array<any>;
  role?: string;
  dob?: Date | string;
  gender?: string;
  avatar?: string | File;
  status?: string;
  designation?: String;
  userActivityDetails?: UserActivityDetails;
}

export default UserModel;
