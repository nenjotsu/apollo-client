export const cleanErrorMessage = errorMessage => {
  return errorMessage.replace('GraphQL error: ', '');
};
