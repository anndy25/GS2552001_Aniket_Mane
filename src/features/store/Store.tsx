import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { StoreInfo } from "./interface/store.interface";
import StoreModal from "./components/StoreModal";
import {
  CellValueChangedEvent,
  ColDef,
  RowDragEndEvent,
} from "ag-grid-community";
import { useStore } from "@/store/store.state";
import ActionCellRenderer from "./components/ActionCellRendere";

const Store: React.FC = () => {
  const stores = useStore((state) => state.stores);
  const addStore = useStore((state) => state.addStore);
  const updateStore = useStore((state) => state.updateStore);
  const reorderStores = useStore((state) => state.reorderStores);
  const [showModal, setShowModal] = useState(false);
  const columnDef = useMemo<ColDef[]>(
    () => [
      {
        headerName: "Store ID",
        field: "storeId",
        rowDrag: true,
      },
      {
        headerName: "Store",
        field: "store",
        editable: true,
      },
      {
        headerName: "State",
        field: "state",
        editable: true,
      },
      {
        headerName: "City",
        field: "city",
        editable: true,
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

  const addNewStore = (store: StoreInfo) => {
    addStore(store);
  };

  const handleCellValueChanged = (params: CellValueChangedEvent<StoreInfo>) => {
    updateStore(params.data);
  };

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
