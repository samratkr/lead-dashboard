import { Plus, ChevronDown } from "lucide-react";

type ToolbarProps = {
  selectedIds: string[];
  clearSelection: () => void;
};

export default function SelectedLeadsToolbar({
  selectedIds,
  clearSelection,
}: ToolbarProps) {
  if (!selectedIds.length) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow border-b border-gray-300 px-4 py-2 flex flex-wrap items-center gap-2">
      <button className="px-3 py-1 border rounded" onClick={clearSelection}>
        Clear {selectedIds.length} selected
      </button>
      <button className="px-3 py-1 border rounded flex items-center gap-1">
        Save <Plus size={16} />
      </button>
      <button className="px-3 py-1 border rounded">Email</button>
      <button className="px-3 py-1 border rounded">Sequence</button>
      <button className="px-3 py-1 border rounded">Add to list</button>
      <button className="px-3 py-1 border rounded">Export</button>
      <button className="px-3 py-1 border rounded">Research with AI</button>
      <button className="px-3 py-1 border rounded flex items-center gap-1">
        Push to CRM/ATS <ChevronDown size={16} />
      </button>
      <button className="px-3 py-1 border rounded">View Companies</button>
    </div>
  );
}
