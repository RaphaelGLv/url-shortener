export const isStatusCodeError = (statusCode: number): boolean => {
  return statusCode >= 400;
};