import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "@/store/store.state";
import { StoreInfo } from "../interface/store.interface";

const ActionCellRenderer = ({ data }: { data: StoreInfo }) => {
  const removeStore = useStore((state) => state.removeStore);

  const handleDelete = () => {
    removeStore(data.storeId);
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
