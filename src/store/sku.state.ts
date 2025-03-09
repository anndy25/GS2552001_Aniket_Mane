import { ISKUInfo } from "@/features/sku/interface/sku.interface";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SKUStateModel {
  skus: ISKUInfo[];
  addSKU: (sku: ISKUInfo) => void;
  removeSKU: (skuId: string) => void;
  updateSKU: (sku: ISKUInfo) => void;
  reorderSKUs: (skuInfo: ISKUInfo[]) => void;
}

const addSKU = (state: SKUStateModel, sku: ISKUInfo) => ({
  skus: [...state.skus, sku],
});

const removeSKU = (state: SKUStateModel, skuId: string) => ({
  skus: state.skus.filter((s) => s.skuId !== skuId),
});

const updateSKU = (state: SKUStateModel, updatedSKU: ISKUInfo) => ({
  skus: state.skus.map((sku) =>
    sku.skuId === updatedSKU.skuId ? updatedSKU : sku
  ),
});

export const useSKUStore = create<SKUStateModel>()(
  devtools(
    persist(
      (set) => ({
        skus: [],
        addSKU: (sku) => set((state) => addSKU(state, sku)),
        removeSKU: (skuId) => set((state) => removeSKU(state, skuId)),
        updateSKU: (updatedSKU) => set((state) => updateSKU(state, updatedSKU)),
        reorderSKUs: (skuInfo: ISKUInfo[]) => set(() => ({ skus: skuInfo })),
      }),
      { name: "sku-storage" }
    )
  )
);
