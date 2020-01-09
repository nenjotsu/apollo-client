export const cleanErrorMessage = errorMessage => {
  return errorMessage.replace('GraphQL error: ', '');
};

export const getInMons = ({ months, years }) => {
  let inMons = months;
  if (years > 0) {
    inMons = inMons + years * 12;
  }
  return inMons;
};
