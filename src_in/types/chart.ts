import { bagContentType } from "./data";
import { AppDataType } from "./appData";
import { AppType } from "./app";

export interface ChartType {

   type: 'pie' | 'line';
   bags: {[key: string]: bagContentType};
   appData: AppDataType;

   fetchChartPaths(app: AppType): void;
}