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

interface PlanningStateModel {
  plans: IPlanningInfo[];
  addPlanning: (plans: PlanInfo) => void;
  removePlanning: (plan: PlanInfo) => void;
  updatePlanning: (siteId: string, skuId: string, plan: IPlanningInfo) => void;
}

const initialStores: IPlanningInfo[] = [];

const generateSellingUnits = () => {
  return months.reduce((acc, month) => {
    weeks.forEach((week) => {
      acc[`${month.field}_${week.field}_selling_units`] = Math.round(
        Math.random() * 10000
      );
    });
    return acc;
  }, {} as Record<string, number>);
};

const addPlanning = (state: PlanningStateModel, plans: PlanInfo) => {
  const skus = useSKUStore.getState().skus;
  const stores = useStoreState.getState().stores;

  if (!skus.length || !stores.length) return { plans: state.plans };

  const updatedPlans =
    plans.type === IDType.SkuID
      ? stores.map((store) => ({
          storeId: store.storeId,
          skuId: plans.id,
          ...generateSellingUnits(),
        }))
      : skus.map((sku) => ({
          storeId: plans.id,
          skuId: sku.skuId,
          ...generateSellingUnits(),
        }));

  return produce(state, (draft) => {
    draft.plans.push(...updatedPlans);
  });
};

const removePlan = (state: PlanningStateModel, plans: PlanInfo) => {
  return produce(state, (draft) => {
    draft.plans = draft.plans.filter((p) => p[plans.type] !== plans.id);
  });
};

const updatePlanning = (
  state: PlanningStateModel,
  siteId: string,
  skuId: string,
  plan: IPlanningInfo
) => {
  return produce(state, (draft) => {
    const index = draft.plans.findIndex(
      (p) => p.storeId === siteId && p.skuId === skuId
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

        updatePlanning: (siteId, skuId, plan) =>
          set((state) => updatePlanning(state, siteId, skuId, plan)),
      }),
      { name: "planning-storage" }
    )
  )
);
