import { useMemo, useState } from "react";
import { AgCharts } from "ag-charts-react";

import ListBox from "@/components/ListBox";
import { getStoreGMSummary, usePlanningStore } from "@/store/planning.state";
import { IList } from "@/components/interfaces/listbox.interface";
import { CHART_GM_AXES, GM_BAR_AND_LINE } from "./constants/chart.constant";

const Chart = () => {
  const plans = usePlanningStore((state) => state.plans);

  const { joinedPlans, optionList } = useMemo(() => {
    const joinedPlans = getStoreGMSummary(plans);
    return {
      optionList: joinedPlans.map((plan) => ({
        value: plan.storeId,
        name: plan.store,
      })),
      joinedPlans,
    };
  }, []);
  const [selectedItem, setSelectedItem] = useState(optionList[0]);
  const [selectedPlan, setSelectedPlan] = useState(joinedPlans[0]);

  const gmChart = useMemo(
    () => ({
      data: selectedPlan.sales,
      title: {
        text: `Gross Margin of ${selectedPlan.store}`,
      },
      series: GM_BAR_AND_LINE,
      axes: CHART_GM_AXES,
    }),
    [selectedPlan]
  );

  const onOptionChange = (selected: IList) => {
    const storeId = selected.value;
    const data = joinedPlans.find((plan) => plan.storeId === storeId);
    if (data) {
      setSelectedPlan(data);
      setSelectedItem(selected);
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      <ListBox
        list={optionList}
        onChange={onOptionChange}
        selectedItem={selectedItem}
      />
      <div>
        <AgCharts options={gmChart} style={{ height: "64vh" }} />
      </div>
    </div>
  );
};

export default Chart;
