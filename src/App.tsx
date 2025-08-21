import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import Loader from "./components/Loader";
import Dashboard from "./screens/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Dashboard />
      </PersistGate>
    </Provider>
  );
}

export default App;
