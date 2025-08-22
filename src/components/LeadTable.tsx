import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  ListFilterPlusIcon,
  SendHorizontal,
  SquareArrowRight,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Lead } from "../store/reducers/leadReducer";

export default function LeadTable({
  searchTerm,
  sort,
  selectedIds,
  setSelectedIds,
  setSelectedLeads,
}: {
  searchTerm: string;
  sort: { field: string; order: "asc" | "desc" };
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
}) {
  const showSavedLeads = useSelector(
    (state: RootState) => state?.leads?.showSaved
  );
  const leads = useSelector((state: RootState) =>
    !showSavedLeads ? state?.leads?.leads : state?.leads?.savedLeads
  );

  const [columns, setColumns] = useState([
    { key: "name", label: "NAME", sticky: true, width: 180 },
    { key: "title", label: "JOB TITLE", sticky: false, width: 160 },
    { key: "company", label: "COMPANY", sticky: false, width: 160 },
    { key: "email", label: "EMAILS", sticky: false, width: 220 },
    { key: "phone", label: "PHONE NUMBERS", sticky: false, width: 160 },
    { key: "actions", label: "ACTIONS", sticky: false, width: 90 },
    { key: "links", label: "LINKS", sticky: false, width: 120 },
    { key: "location", label: "LOCATION", sticky: false, width: 180 },
    {
      key: "employees",
      label: "COMPANY . NUMBER OF EMPLOYEES",
      sticky: false,
      width: 120,
    },
    {
      key: "industries",
      label: "COMPANY . INDUSTRIES",
      sticky: false,
      width: 180,
    },
    { key: "keywords", label: "COMPANY . KEYWORDS", sticky: false, width: 180 },
  ]);

  const filteredLeads = useMemo(() => {
    let result = leads;

    if (searchTerm) {
      result = result.filter((lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const { field, order } = sort;

    if (field !== "Relevance") {
      result = [...result].sort((a: any, b: any) => {
        const valA = (a[field] || "").toString().toLowerCase();
        const valB = (b[field] || "").toString().toLowerCase();
        return order === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
    } else {
      result = [...result].sort((a: any, b: any) => {
        const valA = (a["name"] || "").toString().toLowerCase();
        const valB = (b["name"] || "").toString().toLowerCase();
        return order === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
    }

    return result;
  }, [leads, searchTerm, sort]);

  const itemsPerPage = 25;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredLeads?.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentLeads = filteredLeads?.slice(startIdx, endIdx);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const toggleSelectAll = () => {
    if (selectedIds?.length === currentLeads?.length) {
      setSelectedIds([]);
      setSelectedLeads([]);
    } else {
      setSelectedIds(currentLeads?.map((l: any) => l.email));
      setSelectedLeads(currentLeads?.map((l: any) => l));
    }
  };

  const toggleSelect = (lead: Lead) => {
    setSelectedIds((prev) =>
      prev.includes(lead.email)
        ? prev.filter((x) => x !== lead.email)
        : [...prev, lead.email]
    );

    setSelectedLeads((prev) =>
      prev.some((l) => l.email === lead.email)
        ? prev.filter((l) => l.email !== lead.email)
        : [...prev, lead]
    );
  };

  const moveColumn = (index: number, direction: "left" | "right") => {
    const newCols = [...columns];
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= columns.length) return;
    [newCols[index], newCols[targetIndex]] = [
      newCols[targetIndex],
      newCols[index],
    ];
    setColumns(newCols);
  };

  const toggleFreezeColumn = (index: number) => {
    const newCols = [...columns];
    newCols[index].sticky = !newCols[index].sticky;
    setColumns(newCols);
  };

  const editColumn = (index: number) => {
    const newLabel = prompt("Enter new column name", columns[index].label);
    if (newLabel) {
      const newCols = [...columns];
      newCols[index].label = newLabel;
      setColumns(newCols);
    }
  };
  const isDark = useSelector((state: RootState) => state?.leads?.darkMode);

  return (
    <div
      className={`${
        isDark ? "bg-primary-dark text-white" : "bg-primary text-gray-800"
      } flex flex-col h-full border border-gray-100 shadow relative`}
    >
      <div className="flex-1 overflow-y-auto overflow-x-auto">
        <table
          className={`${
            isDark ? "bg-primary-dark text-white" : "bg-primary text-gray-800"
          } w-full text-sm text-left table-auto`}
        >
          <thead className="sticky top-0 z-10 text-xs font-diatype">
            <tr
              className={`${
                isDark ? "bg-primary-dark" : "bg-white"
              } font-light cursor-pointer border-b border-gray-300`}
            >
              <th
                className={`${
                  isDark ? "bg-primary-dark" : "bg-white"
                } px-5 z-10 font-light min-w-[180px] sticky left-0 top-0 border-r border-gray-300`}
              >
                <DropdownMenu.Root>
                  <div className="flex items-center justify-between w-full cursor-pointer select-none">
                    <div className="flex items-center gap-2">
                      <label className="relative flex items-center">
                        <input
                          type="checkbox"
                          className="peer w-4 h-4 appearance-none border border-gray-300 rounded cursor-pointer checked:bg-black checked:border-black"
                          checked={
                            selectedIds?.length === currentLeads?.length &&
                            currentLeads.length > 0
                          }
                          ref={(e) => {
                            if (e) {
                              e.indeterminate =
                                selectedIds.length > 0 &&
                                selectedIds.length < currentLeads.length;
                            }
                          }}
                          onChange={toggleSelectAll}
                        />
                        <span
                          className="absolute left-0 top-0 w-4 h-4 flex items-center justify-center text-xs font-bold transition-transform 
             peer-checked:scale-100 scale-0"
                        >
                          {selectedIds.length > 0 &&
                          selectedIds.length < currentLeads.length
                            ? "−"
                            : "✓"}
                        </span>
                      </label>

                      <span>NAME</span>
                    </div>
                  </div>
                </DropdownMenu.Root>
              </th>

              {columns.slice(1).map((col, idx) => (
                <th
                  key={col.key}
                  className={`px-5 py-2 z-10 min-w-[${
                    col.width
                  }px] border-b border-gray-300 
      ${
        col.sticky
          ? `sticky ${isDark ? "bg-primary-dark" : "bg-white"} left-0 border-r`
          : ""
      } 
      font-light`}
                >
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <div className="w-full cursor-pointer select-none flex items-center justify-between">
                        <span>{col.label}</span>
                      </div>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content
                      align="start"
                      className={`${
                        isDark
                          ? "bg-primary-dark text-white"
                          : "bg-primary text-gray-800"
                      } min-w-[160px] border border-gray-300 shadow-md rounded p-2`}
                      sideOffset={5}
                    >
                      <DropdownMenu.Item
                        className="px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-gray-100 text-sm rounded"
                        onClick={() => moveColumn(idx + 1, "left")}
                      >
                        <ArrowLeft size={16} /> Move Left
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-gray-100 text-sm rounded"
                        onClick={() => moveColumn(idx + 1, "right")}
                      >
                        <ArrowRight size={16} /> Move Right
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="px-2 py-1 cursor-pointer hover:bg-gray-100 text-sm rounded"
                        onClick={() => toggleFreezeColumn(idx + 1)}
                      >
                        {col.sticky ? "Unfreeze Column" : "Freeze Column"}
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="px-2 py-1 cursor-pointer hover:bg-gray-100 text-sm rounded"
                        onClick={() => editColumn(idx + 1)}
                      >
                        Edit Column
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-300 group">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-5 py-3 min-w-[${
                      col.width
                    }px] truncate group-hover:${
                      isDark ? "bg-gray-500" : "bg-gray-300"
                    } 
            ${
              col.sticky
                ? `sticky ${
                    isDark ? "bg-primary-dark" : "bg-white"
                  } left-0 border-r border-gray-300`
                : ""
            }`}
                  >
                    {col.key === "name" ? (
                      <div className="flex gap-2 items-center">
                        <label className="relative flex items-center">
                          <input
                            type="checkbox"
                            className="peer w-4 h-4 appearance-none border border-gray-300 rounded cursor-pointer checked:bg-black checked:border-black"
                            checked={selectedIds.includes(lead.email)}
                            onChange={() => toggleSelect(lead)}
                          />
                          <span className="absolute left-0 top-0 w-4 h-4 flex items-center justify-center text-xs font-bold scale-0 peer-checked:scale-100 transition-transform">
                            ✓
                          </span>
                        </label>
                        <span className="underline">{lead.name}</span>
                      </div>
                    ) : col.key === "actions" ? (
                      <div className="flex items-center gap-2">
                        <ListFilterPlusIcon size={20} />
                        <SendHorizontal size={20} />
                        <SquareArrowRight size={20} />
                        <Ellipsis size={20} />
                      </div>
                    ) : col.key === "business" ? (
                      <BriefcaseBusiness size={20} />
                    ) : (
                      lead[col.key as keyof Lead]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className={`${
          isDark ? "bg-primary-dark text-white" : "bg-primary text-gray-800"
        } shrink-0 border-t border-gray-100 p-2 flex items-center gap-3 text-sm sticky bottom-0`}
      >
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-2">
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <span>of {totalPages}</span>
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </button>
        <span className="text-center text-sm">
          Showing {startIdx + 1} – {Math.min(endIdx, filteredLeads.length)} of{" "}
          {filteredLeads.length}
        </span>
      </div>
    </div>
  );
}
