import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function SearchSettings({ setOpenDrawer }: any) {
  const isDark = useSelector((state: RootState) => state?.leads?.darkMode);
  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0" onClick={() => setOpenDrawer(false)} />

      <div
        className={`${
          isDark ? "bg-primary-dark text-white" : "bg-primary text-gray-800"
        } absolute top-0 right-0 h-full w-100 shadow-lg flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold">Search Settings</h2>
          <button
            onClick={() => setOpenDrawer(false)}
            className="hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              People Filter
            </label>
            <select className="w-full border rounded px-2 py-1 text-sm">
              <option>All</option>
              <option>Leads</option>
              <option>Prospects</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Companies Filter
            </label>
            <select className="w-full border rounded px-2 py-1 text-sm">
              <option>All</option>
              <option>Startups</option>
              <option>Enterprises</option>
            </select>
          </div>

          <details className="border rounded p-2">
            <summary className="cursor-pointer text-sm font-medium">
              Advanced Settings
            </summary>
            <div className="mt-2 space-y-2">
              <select className="w-full border rounded px-2 py-1 text-sm">
                <option>Include All</option>
                <option>Only Verified</option>
              </select>
              <select className="w-full border rounded px-2 py-1 text-sm">
                <option>Exclude None</option>
                <option>Exclude Blocked</option>
              </select>
            </div>
          </details>
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={() => setOpenDrawer(false)}
            className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button className="px-3 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
