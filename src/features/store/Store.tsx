import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { StoreInfo } from "./interface/store.interface";
import StoreModal from "./components/StoreModal";
import {
  CellValueChangedEvent,
  ColDef,
  RowDragEndEvent,
} from "ag-grid-community";
import { useStoreState } from "@/store/store.state";
import ActionCellRenderer from "./components/ActionCellRendere";
import { usePlanningStore } from "@/store/planning.state";
import { IDType } from "../planning/interfaces/planning.interface";

const Store: React.FC = () => {
  const stores = structuredClone(useStoreState((state) => state.stores));
  const addStore = useStoreState((state) => state.addStore);
  const updateStore = useStoreState((state) => state.updateStore);
  const reorderStores = useStoreState((state) => state.reorderStores);
  const addPlan = usePlanningStore((state) => state.addPlanning);
  const [showModal, setShowModal] = useState(false);
  const columnDef = useMemo<ColDef[]>(
    () => [
      {
        headerName: "Store ID",
        field: "storeId",
        rowDrag: true,
        editable: false,
      },
      {
        headerName: "Store",
        field: "store",
        editable: true,
        cellEditor: "agTextCellEditor",
      },
      {
        headerName: "State",
        field: "state",
        editable: true,
        cellEditor: "agTextCellEditor",
      },
      {
        headerName: "City",
        field: "city",
        editable: true,
        cellEditor: "agTextCellEditor",
      },
      {
        headerName: "",
        cellRenderer: ActionCellRenderer,
        editable: false,
      },
    ],
    []
  );

  const handleAdd = () => {
    setShowModal(true);
  };

  const addNewStore = (store: StoreInfo) => {
    addStore(store);
    addPlan({ id: store.storeId, type: IDType.StoreID });
  };

  const handleCellValueChanged = useCallback(
    (params: CellValueChangedEvent<StoreInfo>) => {
      updateStore(params.data);
    },
    []
  );

  const onRowDragEnd = (event: RowDragEndEvent) => {
    const updatedRowList = event.overNode?.parent?.childrenAfterSort?.map(
      (rowData) => rowData.data
    );

    if (updatedRowList) {
      reorderStores(updatedRowList);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-3">
        <button
          className="w-[120px] px-4 py-2.5 text-white bg-gray-800 rounded-md "
          onClick={handleAdd}
        >
          Add Store
        </button>

        <div
          className="w-full overflow-y-auto ag-theme-alpine"
          style={{ height: "80vh" }}
        >
          <AgGridReact
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
          />
        </div>
      </div>
      <StoreModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        onSave={addNewStore}
      />
    </>
  );
};

export default Store;
