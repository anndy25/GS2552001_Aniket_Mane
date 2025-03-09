import {
  IDType,
  IPlanningInfo,
  PlanInfo,
} from "@/features/planning/interfaces/planning.interface";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useSKUStore } from "./sku.state";
import { useStoreState } from "./store.state";
import { months, weeks } from "@/features/planning/constants/planning.constant";
import { produce } from "immer";
import { StoreInfo } from "@/features/store/interface/store.interface";
import { ISKUInfo } from "@/features/sku/interface/sku.interface";

interface PlanningStateModel {
  plans: IPlanningInfo[];
  addPlanning: (plans: PlanInfo) => void;
  removePlanning: (plan: PlanInfo) => void;
  updatePlanning: (plan: IPlanningInfo) => void;
}

const initialStores: IPlanningInfo[] = [];

const generateSellingUnits = () => {
  return months.reduce((acc, month) => {
    weeks.forEach((week) => {
      acc[`${month.field}_${week.field}_sales_units`] = Math.round(
        Math.random() * 1000
      );
    });
    return acc;
  }, {} as Record<string, number>);
};

const addPlanning = (state: PlanningStateModel, plans: PlanInfo) => {
  const skus = useSKUStore.getState().skus;
  const stores = useStoreState.getState().stores;

  if (!skus.length || !stores.length) return { plans: state.plans };

  const randomPlan =
    plans.type === IDType.SkuID
      ? stores[Math.floor(Math.random() * stores.length)]
      : skus[Math.floor(Math.random() * skus.length)];

  const updatedPlan =
    plans.type === IDType.SkuID
      ? {
          storeId: (randomPlan as StoreInfo).storeId,
          skuId: plans.id,
          ...generateSellingUnits(),
        }
      : {
          storeId: plans.id,
          skuId: (randomPlan as ISKUInfo).skuId,
          ...generateSellingUnits(),
        };

  return produce(state, (draft) => {
    draft.plans.push(updatedPlan);
  });
};

const removePlan = (state: PlanningStateModel, plans: PlanInfo) => {
  return produce(state, (draft) => {
    draft.plans = draft.plans.filter((p) => p[plans.type] !== plans.id);
  });
};

const updatePlanning = (state: PlanningStateModel, plan: IPlanningInfo) => {
  return produce(state, (draft) => {
    const index = draft.plans.findIndex(
      (p) => p.storeId === plan.siteId && p.skuId === plan.skuId
    );
    if (index !== -1) {
      draft.plans[index] = plan;
    }
  });
};

export const usePlanningStore = create<PlanningStateModel>()(
  devtools(
    persist(
      (set) => ({
        plans: initialStores,

        addPlanning: (plan: PlanInfo) =>
          set((state) => addPlanning(state, plan)),

        removePlanning: (plan: PlanInfo) =>
          set((state) => removePlan(state, plan)),

        updatePlanning: (plan) => set((state) => updatePlanning(state, plan)),
      }),
      { name: "planning-storage" }
    )
  )
);
