import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useStoreState } from "@/store/store.state";
import { StoreInfo } from "../interface/store.interface";
import { usePlanningStore } from "@/store/planning.state";
import { IDType } from "@/features/planning/interfaces/planning.interface";

const ActionCellRenderer = ({ data }: { data: StoreInfo }) => {
  const removeStore = useStoreState((state) => state.removeStore);
  const removePlanning = usePlanningStore((state) => state.removePlanning);

  const handleDelete = () => {
    removeStore(data.storeId);
    removePlanning({ id: data.storeId, type: IDType.StoreID });
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className="transition duration-300 cursor-pointer text-slate-700 hover:text-red-700"
        onClick={handleDelete}
        title="Delete Store"
      >
        <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
      </div>
    </div>
  );
};

export default ActionCellRenderer;
