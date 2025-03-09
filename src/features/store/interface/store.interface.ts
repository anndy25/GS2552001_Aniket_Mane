export interface StoreModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (store: StoreInfo) => void;
}

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (store: any) => void;
  storeData?: any;
  editMode?: boolean;
}

export interface StoreInfo {
  storeId: string;
  store: string;
  state: string;
  city: string;
}
