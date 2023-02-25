import User from "../../../shared/models/userModel";

// Password is excluded for edit and profile
export const createFD = (values: User) => {
  const fd = new FormData();

  //append data Fields
  values?.name?.first && fd.append("name.first", values?.name?.first as string);
  values?.name?.last && fd.append("name.last", values?.name?.last as string);

  values?.mobile && fd.append("mobile", values?.mobile as string);
  values?.email && fd.append("email", values?.email as string);

  values?.address?.street &&
    fd.append("address.street", values?.address?.street as string);
  values?.address?.city &&
    fd.append("address.city", values?.address?.city as string);
  values?.address?.state &&
    fd.append("address.state", values?.address?.state as string);
  values?.address?.country &&
    fd.append("address.country", values?.address?.country as string);
  values?.address?.pincode &&
    fd.append("address.pincode", values?.address?.pincode as string);

  values?.role && fd.append("role", values?.role as string);
  values?.avatar && fd.append("avatar", values?.avatar as string);
  values?.status && fd.append("status", values?.status as string);
  values?.gender && fd.append("gender", values?.gender as string);
  values?.designation &&
    fd.append("designation", values?.designation as string);
  values?.dob && fd.append("dob", values?.dob as unknown as string);

  return fd;
};
