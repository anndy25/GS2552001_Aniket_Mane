export interface IPlanningInfo {
  skuId: string;
  storeId: string;
  [key: string]: string | number;
}

export interface IPlanSales {
  week: string;
  gmDollars: number;
  gmPercent: number;
}

export interface IJoinedPlanInfo {
  store: string;
  storeId: string;
  sales: IPlanSales[];
}

export enum IDType {
  StoreID = "storeId",
  SkuID = "skuId",
}

export interface PlanInfo {
  id: string;
  type: IDType;
}
