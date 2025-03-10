export interface IList {
  name: string;
  value: string;
}

export interface IListBox {
  onChange: (value: IList) => void;
  list: IList[];
  selectedItem: IList;
}
