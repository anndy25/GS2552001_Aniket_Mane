export interface IPlanningInfo {
  skuId: string;
  storeId: string;
  [key: string]: string | number;
}

export enum IDType {
  StoreID = "storeId",
  SkuID = "skuId",
}

export interface PlanInfo {
  id: string;
  type: IDType;
}
