import { ISKUInfo } from "@/features/sku/interface/sku.interface";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";

interface SKUStateModel {
  skus: ISKUInfo[];
  skuIdMapping: { [id: string]: number };
  addSKU: (sku: ISKUInfo) => void;
  removeSKU: (skuId: string) => void;
  updateSKU: (sku: ISKUInfo) => void;
  reorderSKUs: (skuInfo: ISKUInfo[]) => void;
}

// Initialize the state values at the top
const initialSkus: ISKUInfo[] = [];
const initialSkuIdMapping: { [id: string]: number } = {};

const addSKU = (state: SKUStateModel, sku: ISKUInfo) => {
  return produce(state, (draft) => {
    draft.skus.push(sku);
    draft.skuIdMapping[sku.skuId] = draft.skus.length - 1;
  });
};

const removeSKU = (state: SKUStateModel, skuId: string) => {
  return produce(state, (draft) => {
    const indexToRemove = draft.skus.findIndex((sku) => sku.skuId === skuId);
    if (indexToRemove !== -1) {
      draft.skus = draft.skus.filter((sku) => sku.skuId !== skuId);
      delete draft.skuIdMapping[skuId];

      draft.skus.forEach((sku, index) => {
        draft.skuIdMapping[sku.skuId] = index;
      });
    }
  });
};

const updateSKU = (state: SKUStateModel, updatedSKU: ISKUInfo) => {
  return produce(state, (draft) => {
    const index = draft.skus.findIndex((sku) => sku.skuId === updatedSKU.skuId);
    if (index !== -1) {
      draft.skus[index] = updatedSKU;
    }
  });
};

const reorderSKUs = (state: SKUStateModel, skuInfo: ISKUInfo[]) => {
  return produce(state, (draft) => {
    draft.skus = skuInfo;
    draft.skuIdMapping = skuInfo.reduce((acc, sku, index) => {
      acc[sku.skuId] = index;
      return acc;
    }, {} as { [id: string]: number });
  });
};

export const useSKUStore = create<SKUStateModel>()(
  devtools(
    persist(
      (set) => ({
        skus: initialSkus,

        skuIdMapping: initialSkuIdMapping,

        addSKU: (sku) => set((state) => addSKU(state, sku)),

        removeSKU: (skuId) => set((state) => removeSKU(state, skuId)),

        updateSKU: (updatedSKU) => set((state) => updateSKU(state, updatedSKU)),

        reorderSKUs: (skuInfo) => set((state) => reorderSKUs(state, skuInfo)),
      }),
      { name: "sku-storage" }
    )
  )
);
