import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ISKUInfo } from "../interface/sku.interface";
import { useSKUStore } from "@/store/sku.state";

const ActionCellRenderer = ({ data }: { data: ISKUInfo }) => {
  const removeSKU = useSKUStore((state) => state.removeSKU);

  const handleDelete = () => {
    removeSKU(data.skuId);
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
