import User from "../../models/userModel";

const defineInitialUser = ({
  has_id = false,
  hasUserId = false,
  hasFirst = false,
  hasLast = false,
  hasMobile = false,
  hasEmail = false,
  hasStreet = false,
  hasCity = false,
  hasState = false,
  hasCountry = false,
  hasPincode = false,
  hasStatus = false,
  hasRole = false,
  hasAvatar = false,
  hasGender = false,
  hasDob = false,
  hasPassword = false,
  hasUserActivityDetails = false,
}) => {
  const initialUser: User = {};
  const name: any = {};
  const address: any = {};
  const userActivityDetails: any = {};

  if (has_id) initialUser._id = "";
  if (hasUserId) initialUser.userId = undefined;

  if (hasFirst) name.first = "";
  if (hasLast) name.last = "";
  if (hasFirst || hasLast) initialUser.name = name;

  if (hasMobile) initialUser.mobile = [];

  if (hasEmail) initialUser.email = "";

  if (hasStreet) address.street = "";
  if (hasCity) address.city = "";
  if (hasState) address.state = "";
  if (hasCountry) address.country = "";
  if (hasPincode) address.pincode = "";
  if (hasStreet || hasCity || hasState || hasCountry || hasPincode)
    initialUser.address = address;

  if (hasPassword) initialUser.password = "";

  if (hasStatus) initialUser.status = "inactive";

  if (hasRole) initialUser.role = "";
  if (hasAvatar) initialUser.avatar = "";
  if (hasGender) initialUser.gender = "";
  if (hasDob) initialUser.dob = "";

  if (hasUserActivityDetails) {
    userActivityDetails.userTimeStamp = 0;
    userActivityDetails.sentEmailTimeStamp = 0;
    userActivityDetails.passwordTimeStamp = 0;
    initialUser.userActivityDetails = userActivityDetails;
  }

  return initialUser;
};

export default defineInitialUser;
