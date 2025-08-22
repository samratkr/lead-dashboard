import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setDarkMode } from "../store/reducers/leadReducer";

export default function DarkModeSwitch() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state?.leads?.darkMode);

  const handleDarkMode = async () => {
    await dispatch(setDarkMode(!darkMode));
  };

  return (
    <button
      onClick={handleDarkMode}
      className="p-2 rounded-full border border-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
    >
      {darkMode ? (
        <Sun className="text-yellow-400" size={16} />
      ) : (
        <Moon className="text-gray-800" size={16} />
      )}
    </button>
  );
}
