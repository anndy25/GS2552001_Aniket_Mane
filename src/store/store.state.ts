import { create } from "zustand";
import uniqid from "uniqid";
import { devtools, persist } from "zustand/middleware";
import { StoreInfo } from "@/features/store/interface/store.interface";

interface Store {
  stores: StoreInfo[];
  addStore: (store: StoreInfo) => void;
  removeStore: (storeId: string) => void;
  updateStore: (store: StoreInfo) => void;
  reorderStores: (storeInfo: StoreInfo[]) => void;
}

const initialStores: StoreInfo[] = [
  { storeId: uniqid(), store: "D-Mart", city: "Delhi", state: "Delhi" },
  { storeId: uniqid(), store: "V-Mart", city: "Ahmedabad", state: "Gujarat" },
];

const addStore = (state: Store, store: StoreInfo) => ({
  stores: [...state.stores, store],
});

const removeStore = (state: Store, storeId: string) => ({
  stores: state.stores.filter((s) => s.storeId !== storeId),
});

const updateStore = (state: Store, updatedStore: StoreInfo) => ({
  stores: state.stores.map((store) =>
    store.storeId === updatedStore.storeId ? updatedStore : store
  ),
});

export const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        stores: initialStores,

        addStore: (store) => set((state) => addStore(state, store)),

        removeStore: (storeId) => set((state) => removeStore(state, storeId)),

        updateStore: (updatedStore) =>
          set((state) => updateStore(state, updatedStore)),

        reorderStores: (storeInfo: StoreInfo[]) =>
          set(() => ({ stores: storeInfo })),
      }),
      { name: "store-storage" }
    )
  )
);
