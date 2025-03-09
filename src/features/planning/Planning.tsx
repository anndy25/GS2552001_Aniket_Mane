import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import {
  CellValueChangedEvent,
  ColDef,
  RowDragEndEvent,
} from "ag-grid-community";
import { useStoreState } from "@/store/store.state";

const Planning = () => {
  const columnDef = useMemo<ColDef[]>(
    () => [
      {
        headerName: "Store",
      },
      {
        headerName: "SKU",
      },
      {
        headerName: "",
      },
    ],
    []
  );

  return (
    <div
      className="w-full overflow-y-auto ag-theme-alpine"
      style={{ height: "80vh" }}
    >
      {/* <AgGridReact
        columnDefs={columnDef}
        rowData={stores}
        rowDragManaged={true}
        enableCellSpan={true}
        suppressMovableColumns={false}
        onRowDragEnd={onRowDragEnd}
        onCellValueChanged={handleCellValueChanged}
        domLayout={stores.length > 15 ? "normal" : "autoHeight"}
        defaultColDef={{
          flex: 1,
          resizable: true,
          suppressMovable: true,
        }}
      /> */}
    </div>
  );
};

export default Planning;
