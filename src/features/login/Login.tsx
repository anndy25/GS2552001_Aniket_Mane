import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const validEmail = import.meta.env.VITE_VALID_EMAIL;
const validPassword = import.meta.env.VITE_VALID_PASSWORD;

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      if (values.email === validEmail && values.password === validPassword) {
        localStorage.setItem("authentication", JSON.stringify(values));
        navigate("/stores");
      } else {
        alert("Invalid email or password");
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/30">
      <div className="w-full p-6 text-gray-900 bg-white rounded-lg shadow-lg sm:max-w-md">
        <h2 className="text-xl font-semibold text-gray-800">Login</h2>

        <form onSubmit={formik.handleSubmit} className="mt-4 space-y-5">
          <div>
            <label className="text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter email"
              className="w-full bg-gray-100 text-gray-900 rounded-md p-2.5 mt-1 border border-gray-300 focus:ring-teal-500"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter password"
              className="w-full bg-gray-100 text-gray-900 rounded-md p-2.5 mt-1 border border-gray-300 focus:ring-teal-500"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="reset"
              onClick={() => formik.resetForm()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2.5 rounded-md"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-gray-800 text-white px-6 py-2.5 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
