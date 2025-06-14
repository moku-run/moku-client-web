export const loadingGuardService = (isLoading, element) => {
  return isLoading ? null : element;
};
