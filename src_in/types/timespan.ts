import { AppType } from "./app";

export interface TimeSpanType {

   start?: Date;
   end?: Date;

   fetchTime(app: AppType): void;
}