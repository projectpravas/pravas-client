import User from "../../models/userModel";

const defineInitialUser = ({
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
}) => {
  const initialUser: User = {};
  const name: any = {};
  const address: any = {};

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

  if (hasStatus) initialUser.status = "inactive";

  if (hasRole) initialUser.role = "";
  if (hasAvatar) initialUser.avatar = "";
  if (hasGender) initialUser.gender = "";

  if (hasDob) initialUser.dob = "";

  if (hasPassword) initialUser.password = "";

  return initialUser;
};

export default defineInitialUser;
