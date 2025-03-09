import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { StoreInfo } from "@/features/store/interface/store.interface";
import { produce } from "immer";

interface StoreStateModel {
  stores: StoreInfo[];
  storeIdMapping: { [id: string]: number };
  addStore: (store: StoreInfo) => void;
  removeStore: (storeId: string) => void;
  updateStore: (store: StoreInfo) => void;
  reorderStores: (storeInfo: StoreInfo[]) => void;
}

const initialStores: StoreInfo[] = [];
const initialStoreIdMapping: { [id: string]: number } = {};

const addStore = (state: StoreStateModel, store: StoreInfo) =>
  produce(state, (draft) => {
    const newStoreIndex = draft.stores.length;
    draft.stores.push(store);
    draft.storeIdMapping[store.storeId] = newStoreIndex;
  });

const removeStore = (state: StoreStateModel, storeId: string) =>
  produce(state, (draft) => {
    draft.stores = draft.stores.filter((store) => store.storeId !== storeId);
    delete draft.storeIdMapping[storeId];

    draft.storeIdMapping = draft.stores.reduce((acc, store, index) => {
      acc[store.storeId] = index;
      return acc;
    }, {} as { [id: string]: number });
  });

const updateStore = (state: StoreStateModel, updatedStore: StoreInfo) =>
  produce(state, (draft) => {
    const storeIndex = draft.stores.findIndex(
      (store) => store.storeId === updatedStore.storeId
    );
    if (storeIndex >= 0) {
      draft.stores[storeIndex] = updatedStore;
    }
  });

const reorderStores = (storeInfo: StoreInfo[]) => {
  const newStoreIdMapping = storeInfo.reduce((acc, store, index) => {
    acc[store.storeId] = index;
    return acc;
  }, {} as { [id: string]: number });

  return {
    stores: storeInfo,
    storeIdMapping: newStoreIdMapping,
  };
};

export const useStoreState = create<StoreStateModel>()(
  devtools(
    persist(
      (set) => ({
        stores: initialStores,
        storeIdMapping: initialStoreIdMapping,

        addStore: (store) => set((state) => addStore(state, store)),

        removeStore: (storeId) => set((state) => removeStore(state, storeId)),

        updateStore: (store) => set((state) => updateStore(state, store)),

        reorderStores: (storeInfo) => set(() => reorderStores(storeInfo)),
      }),
      { name: "store-storage" }
    )
  )
);
