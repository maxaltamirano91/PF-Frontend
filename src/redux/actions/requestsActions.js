import { HANDLE_SUCCESS, HANDLE_ERROR } from "../types";

export const handleSuccess = () => ({
    type: HANDLE_SUCCESS,
  });

export const handleError = () => ({
    type: HANDLE_ERROR,
  });