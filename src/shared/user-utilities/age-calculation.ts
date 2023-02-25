function getAge(dob: Date | string | number) {
  const birthDate = new Date(dob);
  const today = Date.now();

  return Math.floor((today - new Date(birthDate).getTime()) / 3.15576e10);
}

export default getAge;
