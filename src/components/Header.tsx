import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ChevronDown,
  Search,
  Settings,
  Settings2,
  Sheet,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import SearchSettings from "./SettingsDrawer";
import SortDropdown from "./SortDropDown";
import { useDispatch, useSelector } from "react-redux";
import { setHideFilterAction } from "../store/reducers/leadReducer";
import { RootState } from "../store/store";

export default function Header({
  setSearchTerm,
  setSort,
}: {
  setSearchTerm: (val: string) => void;
  setSort: (sort: { field: string; order: "asc" | "desc" }) => void;
}) {
  const dispatch = useDispatch();
  const hideFilter = useSelector(
    (state: RootState) => state?.leads?.hideFilter
  );
  const toggleHideFilter = async () => {
    console.log("Hedkahdkjh");
    await dispatch(setHideFilterAction(!hideFilter));
  };
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleSort = (field: string, order: "asc" | "desc") => {
    setSort({ field, order });
  };

  return (
    <header className="flex flex-col w-full bg-white px-3 py-2 ">
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-gray-800 font-semibold ml-1">People</h1>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center cursor-pointer gap-2 px-2 py-1.5 text-sm text-white font-medium rounded-md border transition-all duration-500"
            style={{
              background: "linear-gradient(to right, #7b8eca, #ec6dadff)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to right, #a0acd3ff, #dfadc6ff)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to right, #7b8eca, #ec6dadff)")
            }
          >
            <Sparkles size={16} /> Research with AI <ChevronDown size={16} />
          </button>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="px-2 py-1.5 cursor-pointer text-sm border border-gray-300 hover:bg-gray-200 text-gray-700 font-medium rounded-md flex items-center gap-1">
                Import <ChevronDown size={16} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white border rounded-md shadow-lg text-sm mr-3 mt-2 border-gray-300">
              <DropdownMenu.Item className="px-3 py-1.5 hover:bg-gray-200 cursor-pointer">
                Single Contact
              </DropdownMenu.Item>
              <DropdownMenu.Item className="px-3 py-1.5 hover:bg-gray-200 cursor-pointer">
                CSV
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="px-2 py-1.5 text-sm text-gray-700 font-medium cursor-pointer rounded-md flex items-center gap-1 hover:bg-gray-200">
                <Sheet size={16} /> Default View <ChevronDown size={16} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white border rounded-md shadow-lg text-sm">
              <DropdownMenu.Item className="px-3 py-1.5 hover:bg-gray-200 cursor-pointer">
                Compact
              </DropdownMenu.Item>
              <DropdownMenu.Item className="px-3 py-1.5 hover:bg-gray-200 cursor-pointer">
                Detailed
              </DropdownMenu.Item>
              <DropdownMenu.Item className="px-3 py-1.5 hover:bg-gray-200 cursor-pointer">
                Table
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <label
            onClick={toggleHideFilter}
            className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer text-sm hover:bg-gray-200 rounded-md py-1.5 px-2"
          >
            <Settings2 size={16} />
            <span>Hide Filters</span>
          </label>

          <div className="relative w-48 ml-2 rounded-md">
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-800"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by name..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 pr-2 py-1.5 border border-gray-300 text-sm rounded-md w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="px-2 py-1.5 text-sm border cursor-pointer text-gray-700 font-medium border-gray-300 hover:bg-gray-200 rounded-md flex items-center gap-1">
                <Zap size={16} /> Create Workflow <ChevronDown size={16} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white border rounded-md shadow-lg text-sm border-gray-300 w-full mt-2 p-2">
              <DropdownMenu.Item className="px-3 py-1.5 hover:bg-gray-200 rounded-md cursor-pointer">
                Auto-add to sequence
              </DropdownMenu.Item>
              <DropdownMenu.Item className="px-3 py-1.5 hover:bg-gray-200 rounded-md cursor-pointer">
                Auto-add to lists
              </DropdownMenu.Item>
              <DropdownMenu.Item className="px-3 py-1.5 hover:bg-gray-200 rounded-md cursor-pointer">
                Auto-update records
              </DropdownMenu.Item>
              <DropdownMenu.Item className="px-3 py-1.5 hover:bg-gray-200 rounded-md cursor-pointer">
                Email Outreach
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <button
            onClick={() => {
              setOpenDrawer(true);
            }}
            className="px-2 py-1.5 text-sm cursor-pointer text-gray-700 font-medium border border-gray-300 rounded-md hover:bg-gray-200"
          >
            Save as new search
          </button>

          <SortDropdown onApply={handleSort} />

          <button
            onClick={() => {
              setOpenDrawer(true);
            }}
            className="p-1.5 cursor-pointer hover:bg-gray-200 flex items-center gap-2 text-gray-700 font-medium cursor-pointer text-sm rounded-md"
          >
            <Settings size={16} />
            <span>Search Setting</span>
          </button>
        </div>
      </div>
      {openDrawer && <SearchSettings setOpenDrawer={setOpenDrawer} />}
    </header>
  );
}
