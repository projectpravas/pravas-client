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

interface UserModel {
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
}

export default UserModel;
