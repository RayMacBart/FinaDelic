import { SubmitUtilsType } from "./submitUtils";
import { dataType, bagContentType } from "./data";
import { AppType } from "./app";
import { TimeSpanType } from "./timespan";


export interface AppDataType {

   revisitFlag: symbol;
   utils: SubmitUtilsType;
   username?: string;
   data?: dataType;

   fetchUserData(app: AppType): Promise<void>;
   getDeepestPaths(): string[];
   setBagAmounts(timespan: TimeSpanType): void;
   getBagPath(): string;
   changeCurrentBagProp(newName: null | string): void;
   changeFlow(flowId: number, date: null | string, desc: null | string, amount: null | number): void;
   setCurrentBag(bagName: string, stepUp: boolean): void;
   getData(): dataType | bagContentType | Record<string, never>
}