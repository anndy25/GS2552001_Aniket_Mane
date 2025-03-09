import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  CellValueChangedEvent,
  ColDef,
  RowDragEndEvent,
} from "ag-grid-community";

import ActionCellRenderer from "./components/ActionCellRendere";
import SKUModal from "./components/SkuModal";
import { ISKUInfo } from "./interface/sku.interface";
import { useSKUStore } from "@/store/sku.state";
import { usePlanningStore } from "@/store/planning.state";
import { IDType } from "../planning/interfaces/planning.interface";

const SKU: React.FC = () => {
  const skus = useSKUStore((state) => state.skus);
  const addSKU = useSKUStore((state) => state.addSKU);
  const updateSKU = useSKUStore((state) => state.updateSKU);
  const reorderSKUs = useSKUStore((state) => state.reorderSKUs);
  const addPlan = usePlanningStore((state) => state.addPlanning);
  const [showModal, setShowModal] = useState(false);
  const columnDef = useMemo<ColDef[]>(
    () => [
      {
        headerName: "SKU ID",
        field: "skuId",
        rowDrag: true,
      },
      {
        headerName: "SKU",
        field: "sku",
        editable: true,
      },
      {
        headerName: "Cost",
        field: "cost",
        editable: true,
        cellEditor: "agNumberCellEditor",
        valueGetter: (params) => `$${params.data.cost || 1}`,
        valueSetter: (params) => {
          const newValue = parseFloat(params.newValue);
          if (!isNaN(newValue)) {
            params.data.cost = newValue;
            return true;
          }
          return false;
        },
      },
      {
        headerName: "Price",
        field: "price",
        editable: true,
        cellEditor: "agNumberCellEditor",
        valueGetter: (params) => `$${params.data.price || 1}`,
        valueSetter: (params) => {
          const newValue = parseFloat(params.newValue);
          if (!isNaN(newValue)) {
            params.data.price = newValue;
            return true;
          }
          return false;
        },
      },
      {
        headerName: "",
        cellRenderer: ActionCellRenderer,
      },
    ],
    []
  );

  const handleAdd = () => {
    setShowModal(true);
  };

  const addNewSKU = (sku: ISKUInfo) => {
    addSKU(sku);
    addPlan({ id: sku.skuId, type: IDType.SkuID });
  };

  const handleCellValueChanged = (params: CellValueChangedEvent<ISKUInfo>) => {
    updateSKU(params.data);
  };

  const onRowDragEnd = (event: RowDragEndEvent) => {
    const updatedRowList = event.overNode?.parent?.childrenAfterSort?.map(
      (rowData) => rowData.data
    );

    if (updatedRowList) {
      reorderSKUs(updatedRowList);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-3">
        <button
          className="w-[120px] px-4 py-2.5 text-white bg-gray-800 rounded-md "
          onClick={handleAdd}
        >
          Add SKU
        </button>

        <div
          className="w-full overflow-y-auto ag-theme-alpine"
          style={{ height: "80vh" }}
        >
          <AgGridReact
            columnDefs={columnDef}
            rowData={skus}
            rowDragManaged={true}
            enableCellSpan={true}
            suppressMovableColumns={false}
            onRowDragEnd={onRowDragEnd}
            domLayout={skus.length > 15 ? "normal" : "autoHeight"}
            onCellValueChanged={handleCellValueChanged}
            defaultColDef={{
              flex: 1,
              resizable: true,
              suppressMovable: true,
            }}
          />
        </div>
      </div>
      <SKUModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        onSave={addNewSKU}
      />
    </>
  );
};

export default SKU;
