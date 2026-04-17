import { TimeSpanType } from "./timespan";
import { AppDataType } from "./appData";
import { ModalType } from "./Modal";
import { ChartType } from "./chart";
import { RouterType } from "./router";
import { LazyLoaderType } from "./lazyloader";



export interface AppType {
   
   timespan: TimeSpanType;
   appData: AppDataType;
   modal: ModalType;
   chart: ChartType;
   router: RouterType;
   lazyLoader: LazyLoaderType;
   
   setAppData(): void;
   continueConstruction1(): void;
   continueConstruction2(): void;
   makeIconHoverEffect(iconName: string): void;
}


type populateExportVariables = (app: AppType) => void;