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
  mobile?: string;
  email?: string;
  address?: Address;
  password?: string;
  role?: string;
  dob?: Date | string;
  gender?: string;
  avatar?: string | File;
  status?: string;
  userActivityDetails?: UserActivityDetails;
}

export default UserModel;
