import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { IListBox } from "./interfaces/listbox.interface";

const ListBox: React.FC<IListBox> = ({ list, onChange, selectedItem }) => {
  return (
    <Listbox value={selectedItem} onChange={onChange}>
      <div className="relative text-sm">
        <ListboxButton className="flex items-center justify-between p-3 text-black bg-white border rounded-md w-96">
          <span className="font-medium text-slate-800">
            {selectedItem?.name}
          </span>
          <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" />
        </ListboxButton>
        <ListboxOptions className="absolute z-40 border-2 shadow-md px-2 py-1 mt-1 overflow-auto bg-white rounded-lg w-96  data-[focus]:outline-none cursor-pointer">
          {list?.map((data, index) => (
            <ListboxOption
              key={index}
              value={data}
              className="data-[focus]:bg-blue-100 p-2 my-1 rounded-lg"
            >
              {data.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default ListBox;
