import type { Request, Response } from "express";
import {
  getActualGeneration,
  getForecastGeneration,
} from "../services/bmrsService";

import { processForecastData } from "../utils/forecastProcessor";

export const getWindData = async (req: Request, res: Response) => {
  try {
    const { start, end, horizon } = req.query;

    const actualData = await getActualGeneration(
      start as string,
      end as string,
    );

    const forecastData = await getForecastGeneration(
      start as string,
      end as string,
    );

    // console.log("actualData", actualData);
    // console.log("forecastData", forecastData);

    const merged = processForecastData(
      actualData,
      forecastData,
      Number(horizon),
    );

    res.json(merged);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch wind data",
    });
  }
};
