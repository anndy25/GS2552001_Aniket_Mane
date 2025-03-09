import React from "react";
import { StoreModalProps } from "../interface/store.interface";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useFormik } from "formik";
import uniqid from "uniqid";
import * as Yup from "yup";

const StoreModal: React.FC<StoreModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  storeData,
  editMode = false,
}) => {
  const formik = useFormik({
    initialValues: {
      store: "",
      city: "",
      state: "",
    },
    validationSchema: Yup.object({
      store: Yup.string().required("Store name is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
    }),

    onSubmit: (values) => {
      onSave({ ...values, storeId: uniqid() });
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
            {editMode ? "Edit Store" : "Add Store"}
          </DialogTitle>

          <form onSubmit={formik.handleSubmit} className="mt-4 space-y-5">
            <div>
              <label className="text-gray-600">Store</label>
              <input
                name="store"
                value={formik.values.store}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter store name"
                className="w-full bg-gray-100 text-gray-900 rounded-md p-2.5 mt-1 border border-gray-300 focus:ring-teal-500"
              />
              {formik.touched.store && formik.errors.store && (
                <p className="text-sm text-red-500">{formik.errors.store}</p>
              )}
            </div>

            <div>
              <label className="text-gray-600">City</label>
              <input
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter city"
                className="w-full bg-gray-100 text-gray-900 rounded-md p-2.5 mt-1 border border-gray-300 focus:ring-teal-500"
              />
              {formik.touched.city && formik.errors.city && (
                <p className="text-sm text-red-500">{formik.errors.city}</p>
              )}
            </div>

            <div>
              <label className="text-gray-600">State</label>
              <input
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter state"
                className="w-full bg-gray-100 text-gray-900 rounded-md p-2.5 mt-1 border border-gray-300 focus:ring-teal-500"
              />
              {formik.touched.state && formik.errors.state && (
                <p className="text-sm text-red-500">{formik.errors.state}</p>
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

export default StoreModal;
