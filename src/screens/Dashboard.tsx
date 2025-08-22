import Layout from "../components/Layout";
import Filters from "../components/Filters";
import LeadTable from "../components/LeadTable";
import Header from "../components/Header";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import {
  Plus,
  Sparkles,
  Mail,
  ListFilterPlusIcon,
  SendHorizontal,
  Download,
  CloudUpload,
  Ellipsis,
} from "lucide-react";
import { Lead, saveLeads } from "../store/reducers/leadReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import ToastMessage from "../components/ToastMessage";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const [sort, setSort] = useState<{ field: string; order: "asc" | "desc" }>({
    field: "Relevance",
    order: "asc",
  });
  const hideFilter = useSelector(
    (state: RootState) => state?.leads?.hideFilter
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [toastOpen, setToastOpen] = useState(false);

  const clearSelection = () => setSelectedIds([]);

  const handleSave = () => {
    const leadsToSave = selectedLeads.filter((lead: any) =>
      selectedIds.includes(lead?.email)
    );
    dispatch(saveLeads(leadsToSave));
    setSelectedIds([]);
    setSelectedLeads([]);
    setToastOpen(true);
  };

  const SelectedActions = ({
    selectedIds,
    clearSelection,
  }: {
    selectedIds: string[];
    clearSelection: () => void;
  }) => {
    const allButtons = [
      {
        label: `Clear ${selectedIds.length} selected`,
        onClick: clearSelection,
        icon: null,
        style: "border",
      },
      {
        label: "Save",
        onClick: handleSave,
        icon: <Plus size={20} />,
        style: "bg-yellow-200",
      },
      { label: "Email", icon: <Mail size={16} />, style: "border" },
      {
        label: "Sequence",
        icon: <SendHorizontal size={16} />,
        style: "border",
      },
      {
        label: "Add to list",
        icon: <ListFilterPlusIcon size={16} />,
        style: "border",
      },
      { label: "Export", icon: <Download size={16} />, style: "border" },
      {
        label: "Research with AI",
        icon: <Sparkles size={16} />,
        style: "gradient",
      },
      {
        label: "Push to CRM/ATS",
        icon: <CloudUpload size={16} />,
        style: "border",
      },
      { label: "View Companies", icon: null, style: "border" },
    ];

    const maxVisible = 8;
    const visibleButtons = allButtons.slice(0, maxVisible);
    const overflowButtons = allButtons.slice(maxVisible);

    const isDark = useSelector((state: RootState) => state?.leads?.darkMode);

    return (
      <div
        className={`${
          isDark ? "bg-primary-dark text-white" : "bg-primary text-gray-800"
        } fixed top-10 left-[22%] z-50 w-[77.2%] max-w-6xl rounded-xl p-2 flex items-center gap-2 border border-gray-200 overflow-hidden`}
      >
        {visibleButtons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={`${
              isDark ? "bg-primary-dark text-white" : "bg-primary text-gray-800"
            } px-3 py-1 flex items-center gap-1 cursor-pointer rounded-md text-gray-700 text-sm font-medium ${
              btn.style === "gradient"
                ? "bg-gradient-to-r from-[#7b8eca] to-[#ec6dadff] text-white"
                : btn.style === "bg-yellow-200"
                ? "bg-yellow-300 border border-gray-300"
                : "border border-gray-300 hover:bg-gray-300"
            }`}
          >
            {btn.icon} {btn.label}
          </button>
        ))}

        {overflowButtons.length > 0 && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className={`${
                  isDark
                    ? "bg-primary-dark text-white"
                    : "bg-primary text-gray-800"
                } px-3 py-1 rounded-md cursor-pointer border border-gray-300 hover:bg-gray-300 flex items-center text-gray-700 text-sm font-medium`}
              >
                <Ellipsis size={20} />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              className={`${
                isDark
                  ? "bg-primary-dark text-white"
                  : "bg-primary text-gray-800"
              }  border cursor-pointer border-gray-300 rounded-md shadow-lg p-2 flex flex-col gap-1 mr-3 mt-2`}
            >
              {overflowButtons.map((btn, idx) => (
                <DropdownMenu.Item
                  key={idx}
                  onClick={btn.onClick}
                  className={` ${
                    isDark
                      ? "bg-primary-dark text-white"
                      : "bg-primary text-gray-800"
                  } px-3 py-1 flex items-center gap-1 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-100 ${
                    btn.style === "gradient"
                      ? "bg-gradient-to-r from-[#7b8eca] to-[#ec6dadff] text-white"
                      : btn.style === "bg-yellow-200"
                      ? "bg-[#ebf212] border border-gray-300"
                      : ""
                  }`}
                >
                  {btn.icon} {btn.label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </div>
    );
  };
  const isDark = useSelector((state: RootState) => state?.leads?.darkMode);
  return (
    <Layout>
      <div
        className={`${
          isDark ? "bg-primary-dark text-white" : "bg-primary text-gray-800"
        } flex flex-col h-screen relative`}
      >
        {selectedIds.length > 0 && (
          <SelectedActions
            selectedIds={selectedIds}
            clearSelection={clearSelection}
          />
        )}
        <div className="shrink-0 sticky top-0 z-40 bg-white shadow-sm w-full">
          <Header setSearchTerm={setSearchTerm} setSort={setSort} />
        </div>
        <div
          className={`flex-1 overflow-hidden w-full grid ${
            hideFilter ? "grid-cols-1" : "grid-cols-[250px_1fr]"
          }`}
        >
          {!hideFilter && (
            <div className="border-r border-gray-100 overflow-y-auto h-full">
              <Filters />
            </div>
          )}
          <div className="overflow-y-auto h-full">
            <LeadTable
              searchTerm={searchTerm}
              sort={sort}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              setSelectedLeads={setSelectedLeads}
            />
          </div>
        </div>
      </div>
      <ToastMessage
        message="Contact saved successfully!"
        open={toastOpen}
        setOpen={setToastOpen}
      />
    </Layout>
  );
}
