import * as yup from "yup";

interface YupschemaInterface {
  hasFirst?: boolean;
  hasLast?: boolean;

  hasMobile?: boolean;
  hasEmail?: boolean;

  hasStreet?: boolean;
  hasCity?: boolean;
  hasState?: boolean;
  hasCountry?: boolean;
  hasPincode?: boolean;

  hasPassword?: boolean;
  hasRole?: boolean;
  hasDob?: boolean;
  hasGender?: boolean;
  hasAvatar?: boolean;
  hasStatus?: boolean;
  hasDesignation?: boolean;
}

const defineUserYupValidation = ({
  hasFirst = false,
  hasLast = false,

  hasMobile = false,
  hasEmail = false,

  hasStreet = false,
  hasCity = false,
  hasState = false,
  hasCountry = false,
  hasPincode = false,

  hasPassword = false,
  hasRole = false,
  hasDob = false,
  hasGender = false,
  hasAvatar = false,
  hasStatus = false,
  hasDesignation = false,
}: YupschemaInterface) => {
  const schemaObj: any = {};
  const nameObj: any = {};
  const addressObj: any = {};

  if (hasFirst) nameObj.first = yup.string().required("First Name is required");
  if (hasLast) nameObj.last = yup.string().required("Last Name is required");
  if (hasFirst || hasLast) schemaObj.name = yup.object(nameObj);

  if (hasMobile)
    schemaObj.mobile = yup
      .string()
      .required()
      .matches(/^[0-9]{10}$/, "Mobile Must be 10 Digit");

  if (hasEmail)
    schemaObj.email = yup
      .string()
      .required()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/, "Enter valid Email Address");

  if (hasStreet)
    addressObj.street = yup.string().required("Street is required");
  if (hasCity) addressObj.city = yup.string().required("Address is required");
  if (hasState) addressObj.state = yup.string().required("State is required");
  if (hasCountry)
    addressObj.country = yup.string().required("Country is required");
  if (hasPincode)
    addressObj.pincode = yup.string().required("Pincode is required");
  if (hasStreet || hasCity || hasState || hasCountry || hasPincode)
    schemaObj.address = yup.object(addressObj);

  if (hasPassword)
    schemaObj.password = yup
      .string()
      .required()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must have min 8 characters and 1 cap & small letter, Symbol"
      );

  if (hasRole) schemaObj.role = yup.string().required("Role is required");

  if (hasDob)
    schemaObj.dob = yup
      .date()
      .required("Birth date is required")
      .min(
        new Date(Date.now() - 3.784e12),
        "Date is too old, must be within 120 year back than now"
      )
      .max(new Date(Date.now()), "Date is greater than todays Date");

  if (hasGender) schemaObj.gender = yup.string().required("Gender is required");
  if (hasAvatar) schemaObj.avatar = yup.string().required("Avatar is required");
  if (hasStatus) schemaObj.status = yup.string().required("Status is required");
  if (hasDesignation)
    schemaObj.designation = yup.string().required("Designation is required");

  return yup.object().shape(schemaObj);
};

export default defineUserYupValidation;
