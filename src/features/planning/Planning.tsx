import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import {
  CellValueChangedEvent,
  ColDef,
  RowDragEndEvent,
} from "ag-grid-community";
import { useStoreState } from "@/store/store.state";
import { useSKUStore } from "@/store/sku.state";
import { usePlanningStore } from "@/store/planning.state";
import { IPlanningInfo } from "./interfaces/planning.interface";
import { months, weeks } from "./constants/planning.constant";

const Planning = () => {
  const plans = structuredClone(usePlanningStore((state) => state.plans));
  const skuIdMapping = useSKUStore((state) => state.skuIdMapping);
  const skus = useSKUStore((state) => state.skus);
  const storeIdMapping = useStoreState((state) => state.storeIdMapping);
  const stores = useStoreState((state) => state.stores);
  const updatePlanning = usePlanningStore((state) => state.updatePlanning);
  const columnDef = useMemo<ColDef[]>(() => {
    return [
      {
        headerName: "Store",
        valueGetter: (params: any) =>
          stores[storeIdMapping[params.data.storeId]].store,
        width: 230,
      },
      {
        headerName: "SKU",
        valueGetter: (params: any) => skus[skuIdMapping[params.data.skuId]].sku,
        width: 230,
      },
      ...months.map((month) => ({
        headerName: month.name,
        children: [
          ...weeks.map((week) => ({
            headerName: week.name,
            children: [
              {
                headerName: "Sales Units",
                field: `${month.field}_${week.field}_sales_units`,
                editable: true,
              },
              {
                headerName: "Sales Dollars",
                valueGetter: (params: any) => {
                  const salesUnit =
                    params.data[`${month.field}_${week.field}_sales_units`];
                  const price = skus[skuIdMapping[params.data.skuId]].price;
                  return salesUnit * price;
                },
                valueFormatter: (params: any) => {
                  return `$${params.value?.toFixed(2)}`;
                },
              },
              {
                headerName: "GM Dollars",
                valueGetter: (params: any) => {
                  const salesUnit =
                    params.data[`${month.field}_${week.field}_sales_units`];
                  const price = skus[skuIdMapping[params.data.skuId]].price;
                  const cost = skus[skuIdMapping[params.data.skuId]].cost;
                  return salesUnit * (price - cost);
                },
                valueFormatter: (params: any) => {
                  return `$${params.value?.toFixed(2)}`;
                },
              },
              {
                headerName: "GM %",
                valueGetter: (params: any) => {
                  const salesDollars =
                    params.data[`${month.field}_${week.field}_sales_units`] *
                    skus[skuIdMapping[params.data.skuId]].price;
                  const gmDollars =
                    params.data[`${month.field}_${week.field}_sales_units`] *
                    (skus[skuIdMapping[params.data.skuId]].price -
                      skus[skuIdMapping[params.data.skuId]].cost);
                  return salesDollars !== 0 ? gmDollars / salesDollars : 0;
                },
                cellClassRules: {
                  "bg-green-400": (params: any) => params.value >= 0.4,
                  "bg-yellow-400": (params: any) =>
                    params.value >= 0.1 && params.value < 0.4,
                  "bg-orange-400": (params: any) =>
                    params.value >= 0.05 && params.value < 0.1,
                  "bg-red-400": (params: any) => params.value <= 0.05,
                  "red-background": (params: any) => params.value <= 0.05,
                },
                valueFormatter: (params: any) => {
                  return `${(params.value * 100).toFixed(2)}%`;
                },
              },
            ],
          })),
        ],
      })),
    ];
  }, [skus, skuIdMapping, stores, storeIdMapping, months, weeks]);

  const handleCellValueChanged = (
    params: CellValueChangedEvent<IPlanningInfo>
  ) => {
    updatePlanning(params.data);
  };

  return (
    <div
      className="w-full overflow-auto ag-theme-alpine"
      style={{ height: "80vh" }}
    >
      <AgGridReact
        columnDefs={columnDef}
        rowData={plans}
        rowDragManaged={true}
        enableCellSpan={true}
        suppressMovableColumns={false}
        domLayout={stores.length > 15 ? "normal" : "autoHeight"}
        onCellValueChanged={handleCellValueChanged}
        defaultColDef={{
          resizable: true,
          suppressMovable: true,
          width: 150,
        }}
      />
    </div>
  );
};

export default Planning;
