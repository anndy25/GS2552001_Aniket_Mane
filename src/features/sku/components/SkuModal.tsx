import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useFormik } from "formik";
import uniqid from "uniqid";
import * as Yup from "yup";
import { SKUModalProps } from "../interface/sku.interface";

const SKUModal: React.FC<SKUModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
}) => {
  const formik = useFormik({
    initialValues: {
      sku: "",
      cost: 1,
      price: 1,
    },
    validationSchema: Yup.object({
      sku: Yup.string().required("SKU is required"),
      cost: Yup.number()
        .typeError("Cost must be a number")
        .min(1, "Cost must be at least 1 dollar")
        .required("Cost is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .min(1, "Price must be at least 1 dollar")
        .required("Price is required"),
    }),
    onSubmit: (values) => {
      onSave({ ...values, skuId: uniqid().toUpperCase() });
      formik.resetForm();
      onRequestClose();
    },
  });

  const onCloseHandler = () => {
    formik.resetForm();
    onRequestClose();
  };

  return (
    <Dialog open={isOpen} onClose={onRequestClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/30">
        <DialogPanel className="w-full p-6 text-gray-900 bg-white rounded-lg shadow-lg sm:max-w-lg">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add SKU
          </DialogTitle>

          <form onSubmit={formik.handleSubmit} className="mt-4 space-y-5">
            <div>
              <label className="text-gray-600">SKU</label>
              <input
                name="sku"
                value={formik.values.sku}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter SKU"
                className="w-full bg-gray-100 text-gray-900 rounded-md p-2.5 mt-1 border border-gray-300 focus:ring-teal-500"
              />
              {formik.touched.sku && formik.errors.sku && (
                <p className="text-sm text-red-500">{formik.errors.sku}</p>
              )}
            </div>

            <div>
              <label className="text-gray-600">Cost</label>
              <input
                name="cost"
                type="number"
                value={formik.values.cost}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter cost"
                className="w-full bg-gray-100 text-gray-900 rounded-md p-2.5 mt-1 border border-gray-300 focus:ring-teal-500"
              />
              {formik.touched.cost && formik.errors.cost && (
                <p className="text-sm text-red-500">{formik.errors.cost}</p>
              )}
            </div>

            <div>
              <label className="text-gray-600">Price</label>
              <input
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter price"
                className="w-full bg-gray-100 text-gray-900 rounded-md p-2.5 mt-1 border border-gray-300 focus:ring-teal-500"
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-sm text-red-500">{formik.errors.price}</p>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onCloseHandler}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2.5 rounded-md"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-gray-800 text-white px-6 py-2.5 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SKUModal;
