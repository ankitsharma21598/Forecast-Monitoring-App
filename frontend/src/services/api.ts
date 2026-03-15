import axios from "axios";
import type { WindData } from "../types/wind";

const API_URL = "http://localhost:8000/api/wind";

export const fetchWindData = async (
  start: Date,
  end: Date,
  horizon: number,
): Promise<WindData[]> => {
  const response = await axios.get(API_URL, {
    params: {
      start: start.toISOString(),
      end: end.toISOString(),
      horizon,
    },
  });

  return response.data;
};
