import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

// Lazy load Features
const StoresFeature = lazy(() => import("./features/store/Store"));
const SKUsFeature = lazy(() => import("./features/sku/SKU"));
const PlanningFeature = lazy(() => import("./features/planning/Planning"));
const ChartsFeature = lazy(() => import("./features/chart/Chart"));

// Define routes in an array
const routes = [
  { path: "stores", component: StoresFeature },
  { path: "skus", component: SKUsFeature },
  { path: "planning", component: PlanningFeature },
  { path: "charts", component: ChartsFeature },
];

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/stores" replace />} />
          {routes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
