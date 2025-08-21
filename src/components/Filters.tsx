import {
  mdiAccountOutline,
  mdiMenuDown,
  mdiMenuUp,
  mdiOfficeBuildingOutline,
  mdiSortVariant,
} from "@mdi/js";
import { default as MDIIcon } from "@mdi/react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Activity,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  CopyCheck,
  Cpu,
  DollarSign,
  FileSearch,
  FileText,
  Globe,
  List,
  Mail,
  MailOpen,
  PieChart,
  PiggyBank,
  Settings,
  Tags,
  Trash2,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setShowSaved } from "../store/reducers/leadReducer";

const filterCategories = [
  {
    name: "Lists",
    icon: List,
    type: "people",
    options: ["CTO", "Marketing Manager", "Software Engineer", "Sales Lead"],
  },
  {
    name: "Persona",
    icon: User,
    type: "companies",
    options: ["TechCorp", "FinEdge", "InnoSoft", "HealthAI"],
  },
  {
    name: "Email Status",
    icon: Mail,
    type: "other",
    options: ["Opened", "Not Opened", "Bounced"],
  },
  {
    name: "Job Titles",
    icon: Briefcase,
    type: "people",
    options: ["CTO", "Marketing Manager", "Software Engineer", "Sales Lead"],
  },
  {
    name: "Company",
    icon: Building2,
    type: "companies",
    options: ["TechCorp", "FinEdge", "InnoSoft", "HealthAI"],
  },
  {
    name: "Company Lookalikes",
    icon: CopyCheck,
    type: "other",
    options: ["Software", "Finance", "Healthcare", "Retail"],
  },
  {
    name: "#Employees",
    icon: Users,
    type: "people",
    options: ["1-10", "11-50", "51-200", "200+"],
  },
  {
    name: "Industry & Keywords",
    icon: Tags,
    type: "companies",
    options: ["Tech", "Finance", "Healthcare", "Retail"],
  },
  {
    name: "Market Segments",
    icon: PieChart,
    type: "other",
    options: ["SMB", "Mid-Market", "Enterprise"],
  },
  {
    name: "SIC NAICS",
    icon: FileSearch,
    type: "people",
    options: ["Code 1", "Code 2", "Code 3"],
  },
  {
    name: "AI Filters",
    icon: Cpu,
    type: "companies",
    options: ["AI Driven", "Non-AI"],
  },
  {
    name: "Scores",
    icon: TrendingUp,
    type: "other",
    options: ["High", "Medium", "Low"],
  },
  {
    name: "Owner",
    icon: User,
    type: "people",
    options: ["You", "Team", "Others"],
  },
  {
    name: "Technologies",
    icon: Cpu,
    type: "companies",
    options: ["React", "Node.js", "Python"],
  },
  {
    name: "Revenue",
    icon: DollarSign,
    type: "other",
    options: ["<$1M", "$1M-$10M", "$10M+"],
  },
  {
    name: "Funding",
    icon: PiggyBank,
    type: "people",
    options: ["Seed", "Series A", "Series B+"],
  },
  {
    name: "Job Postings",
    icon: FileText,
    type: "companies",
    options: ["Active", "Inactive"],
  },
  {
    name: "Signals",
    icon: Activity,
    type: "other",
    options: ["Growth", "Churn Risk"],
  },
  {
    name: "Website Visitors",
    icon: Globe,
    type: "people",
    options: ["1000+", "5000+", "10k+"],
  },
  {
    name: "Email Opened",
    icon: MailOpen,
    type: "companies",
    options: ["Yes", "No"],
  },
  {
    name: "Person Deleted",
    icon: Trash2,
    type: "other",
    options: ["Yes", "No"],
  },
];

export default function Filters() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );
  const dispatch = useDispatch();

  const totalLeadsLength = useSelector(
    (state: RootState) => state?.leads?.leads?.length
  );
  const newLeadsLength = useSelector(
    (state: RootState) => state?.leads?.leads?.length
  );
  const savedLeadsLength = useSelector(
    (state: RootState) => state?.leads?.savedLeads?.length
  );
  const handleNotSave = async () => {
    await dispatch(setShowSaved(false));
  };

  const handleShowSave = async () => {
    await dispatch(setShowSaved(true));
  };

  const statsButtons = [
    {
      label1: "Total",
      value: totalLeadsLength,
      id: 1,
      onClick: handleNotSave,
    },
    {
      label1: "Net New",
      value: newLeadsLength,
      id: 2,
      onClick: handleNotSave,
    },
    {
      label1: "Saved",
      value: savedLeadsLength,
      id: 3,
      onClick: handleShowSave,
    },
  ];

  const [activeId, setActiveId] = useState<number | null>(1);

  const [activeTab, setActiveTab] = useState<"people" | "companies">("people");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleSection = (name: string) => {
    setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="bg-white border-t border-gray-100 flex flex-col h-full">
      <div className="bg-white border border-gray-100 p-0.5 m-2 rounded flex gap-0.5">
        {statsButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => {
              setActiveId(btn.id);
              btn.onClick();
            }}
            className={`flex flex-col items-center cursor-pointer justify-center p-1 rounded w-25 text-sm text-gray-700 
            ${
              activeId === btn.id
                ? "bg-[#ECF3FE] text-white"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            <span
              className={`${
                activeId === btn.id
                  ? "text-[#367CC2] font-medium"
                  : "text-gray-700 font-medium"
              }`}
            >
              {btn.label1}
            </span>

            <span
              className={`mt-1 px-1 text-xs rounded-full ${
                activeId === btn.id
                  ? "bg-white text-gray-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {btn.value}
            </span>
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {filterCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.name} className="border-t border-gray-300">
              <button
                onClick={() => toggleSection(category.name)}
                className="flex justify-between cursor-pointer items-center w-full text-sm text-left text-gray-800 font-medium h-12 px-3"
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gray-800" />
                  {category.name}
                </span>
                {openSections[category.name] ? (
                  <MDIIcon path={mdiMenuUp} size={1} />
                ) : (
                  <MDIIcon path={mdiMenuDown} size={1} />
                )}
              </button>

              {category.name === "Lists" && openSections["Lists"] && (
                <div className="px-3 space-y-3 mb-3">
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab("people")}
                      className={`flex-1 px-3 py-2 text-sm font-medium flex gap-1 items-center ${
                        activeTab === "people"
                          ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                          : "text-gray-500 border-b-2 border-white hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <MDIIcon path={mdiAccountOutline} size={0.8} />
                      People
                    </button>

                    <button
                      onClick={() => setActiveTab("companies")}
                      className={`flex-1 px-3 py-2 text-sm font-medium flex items-center gap-1 ${
                        activeTab === "companies"
                          ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                          : "text-gray-500 border-b-2 border-white hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <MDIIcon path={mdiOfficeBuildingOutline} size={0.6} />
                      Companies
                    </button>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label className="flex gap-1 items-center text-xs text-blue-600">
                        <Settings size={12} />
                        Include lists
                      </label>
                      <label className="flex gap-1 items-center text-xs text-blue-600">
                        <MDIIcon path={mdiSortVariant} size={0.5} />
                        Most Recent
                      </label>
                    </div>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="px-2 py-1 justify-between cursor-pointer w-full text-sm border border-gray-300 hover:bg-gray-200 text-gray-700 font-normal rounded-md flex items-center gap-1">
                          Select Lists
                          <MDIIcon path={mdiMenuDown} size={1} />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content
                        align="start"
                        className="bg-white w-full font-normal border border-gray-300 rounded-md shadow-lg text-sm"
                      >
                        {category.options.map((opt) => (
                          <DropdownMenu.Item className="px-3 w-full py-1.5 hover:bg-gray-200 cursor-pointer">
                            {opt}
                          </DropdownMenu.Item>
                        ))}
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </div>

                  <div>
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                    >
                      Advanced Settings
                      <ChevronDown size={12} />
                    </button>
                    {showAdvanced && (
                      <div className="mt-2 space-y-2">
                        <div>
                          <label className="text-xs text-gray-600">
                            Include All
                          </label>
                          {/* <select className="w-full border rounded p-1 text-sm border-gray-300">
                            <option>Option A</option>
                            <option>Option B</option>
                          </select> */}

                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                              <button className="px-2 py-1 justify-between cursor-pointer w-full text-sm border border-gray-300 hover:bg-gray-200 text-gray-700 font-normal rounded-md flex items-center gap-1">
                                Option A
                                <MDIIcon path={mdiMenuDown} size={1} />
                              </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content
                              align="start"
                              className="bg-white w-full font-normal border border-gray-300 rounded-md shadow-lg text-sm"
                            >
                              <DropdownMenu.Item className="px-3 w-full py-1.5 hover:bg-gray-200 cursor-pointer">
                                Option A
                              </DropdownMenu.Item>
                              <DropdownMenu.Item className="px-3 w-full py-1.5 hover:bg-gray-200 cursor-pointer">
                                Option B
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Root>
                        </div>
                        <div>
                          <label className="text-xs text-gray-600">
                            Exclude
                          </label>
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                              <button className="px-2 py-1 justify-between cursor-pointer w-full text-sm border border-gray-300 hover:bg-gray-200 text-gray-700 font-normal rounded-md flex items-center gap-1">
                                Option X
                                <MDIIcon path={mdiMenuDown} size={1} />
                              </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content
                              align="start"
                              className="bg-white w-full font-normal border border-gray-300 rounded-md shadow-lg text-sm"
                            >
                              <DropdownMenu.Item className="px-3 w-full py-1.5 hover:bg-gray-200 cursor-pointer">
                                Option X
                              </DropdownMenu.Item>
                              <DropdownMenu.Item className="px-3 w-full py-1.5 hover:bg-gray-200 cursor-pointer">
                                Option Y
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Root>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {category.name === "Email Status" &&
                openSections[category.name] && (
                  <div className="mt-2 pl-3 space-y-2">
                    <div className="flex gap-2 border-b border-gray-100 pb-2 mb-2">
                      {category.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2 text-xs text-gray-600"
                        >
                          <Checkbox.Root className="flex h-2 w-4 items-center justify-center rounded border border-gray-400 data-[state=checked]:bg-blue-600">
                            <Checkbox.Indicator>
                              <Check className="h-2 w-3 text-white" />
                            </Checkbox.Indicator>
                          </Checkbox.Root>
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center shrink-0 border-t border-gray-100 px-4 gap-4 text-sm my-2">
        <span className="w-20 rounded py-2 text-gray-700 px-3 shadow hover:bg-red-400 cursor-pointer">
          Clear All
        </span>
        <span className="rounded py-2 text-gray-700 px-3 shadow hover:bg-gray-70 cursor-pointer">
          More Filters
        </span>
      </div>
    </div>
  );
}
