import { theme } from "antd";

export const API_URL = import.meta.env.VITE_API_URL as string;
export const USER_INFO_KEY = import.meta.env.VITE_USER_INFO_KEY as string;
export const themeConfig = {
  algorithm: theme.defaultAlgorithm
};
