export interface ISKUInfo {
  skuId: string;
  sku: string;
  price: number;
  cost: number;
}

export interface SKUModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (store: ISKUInfo) => void;
}
