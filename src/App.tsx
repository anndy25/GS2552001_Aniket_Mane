import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./layouts/PrivateRoute";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import ErrorBoundary from "./components/handler/ErrorHander";
import LoadingFallback from "./components/handler/LoadingFallback";

ModuleRegistry.registerModules([AllCommunityModule]);

const StoresFeature = lazy(() => import("./features/store/Store"));
const SKUsFeature = lazy(() => import("./features/sku/SKU"));
const PlanningFeature = lazy(() => import("./features/planning/Planning"));
const ChartsFeature = lazy(() => import("./features/chart/Chart"));
const LoginPage = lazy(() => import("./features/login/Login"));

const routes = [
  { path: "stores", component: StoresFeature },
  { path: "skus", component: SKUsFeature },
  { path: "planning", component: PlanningFeature },
  { path: "charts", component: ChartsFeature },
];

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/stores" replace />} />

        {/* Protect all routes under MainLayout */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/stores" replace />} />
            {routes.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingFallback />}>
                      <Component />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
