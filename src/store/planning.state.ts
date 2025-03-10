import {
  IDType,
  IJoinedPlanInfo,
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

export function getStoreGMSummary(plans: IPlanningInfo[]): IJoinedPlanInfo[] {
  const { skus, skuIdMapping } = useSKUStore.getState();
  const { stores, storeIdMapping } = useStoreState.getState();

  const storeMap: Record<
    string,
    { weeks: Record<string, { gmDollars: number; salesDollars: number }> }
  > = {};

  plans.forEach((plan) => {
    const skuData = skus[skuIdMapping[plan.skuId]];
    const storeId = plan.storeId;

    if (!storeMap[storeId]) {
      storeMap[storeId] = { weeks: {} };
    }

    months.forEach((month) => {
      weeks.forEach((week) => {
        const weekKey = `${month.field}_${week.field}`;
        const salesUnits = (plan[`${weekKey}_sales_units`] || 0) as number;
        const salesDollars = salesUnits * skuData.price;
        const gmDollars = salesDollars - salesUnits * skuData.cost;

        if (!storeMap[storeId].weeks[weekKey]) {
          storeMap[storeId].weeks[weekKey] = { gmDollars: 0, salesDollars: 0 };
        }

        storeMap[storeId].weeks[weekKey].gmDollars += gmDollars;
        storeMap[storeId].weeks[weekKey].salesDollars += salesDollars;
      });
    });
  });

  return Object.entries(storeMap).map(([storeId, data]) => {
    const storeName = stores[storeIdMapping[storeId]].store;

    return {
      storeId,
      store: storeName,
      sales: Object.entries(data.weeks).map(([week, values]) => ({
        week: week,
        gmDollars: Number(values.gmDollars.toFixed(2)),
        gmPercent:
          values.salesDollars !== 0
            ? Number(
                ((values.gmDollars / values.salesDollars) * 100).toFixed(2)
              )
            : 0,
      })),
    };
  });
}

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
