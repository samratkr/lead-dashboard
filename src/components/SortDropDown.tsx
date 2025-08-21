import {
  ArrowDownAZ,
  ArrowDownZA,
  ChevronDown,
  Info,
  Plus,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export default function SortDropdown({
  onApply,
}: {
  onApply: (field: string, order: "asc" | "desc") => void;
}) {
  const [field, setField] = useState("Relevance");
  const [order, setOrder] = useState("asc");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="px-2 py-1.5 cursor-pointer text-sm text-gray-700 font-medium rounded-md flex items-center gap-1 hover:bg-gray-200">
          {order === "asc" ? (
            <ArrowDownAZ size={16} />
          ) : (
            <ArrowDownZA size={16} />
          )}{" "}
          {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
          <ChevronDown size={16} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="bg-white border border-gray-300 rounded-md shadow-lg text-sm p-3 w-60"
        sideOffset={5}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 font-medium">Sort by</span>
          <Info size={14} className="text-gray-400" />
        </div>
        <select
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-2 py-1 mb-3 text-sm"
        >
          <option value="Relevance">Relevance</option>
          <option value="location">Location</option>
          <option value="company">Company</option>
          <option value="email">Email</option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-2 py-1 mb-3 text-sm"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <hr className="my-2 text-gray-300" />
        <div className="flex justify-end mt-2">
          <DropdownMenu.Item asChild>
            <button
              onClick={() => onApply(field, order as "asc" | "desc")}
              className="px-3 flex items-center py-1.5 bg-yellow-200 border border-gray-300 text-black text-sm rounded-md hover:bg-yellow-200"
            >
              <Plus size={20} />
              Save
            </button>
          </DropdownMenu.Item>
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
