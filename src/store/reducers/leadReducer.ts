import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dummyLeads from "../../dummyLeads.json";
export interface Lead {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  employees: number;
  industries: string;
  keywords: string;
}

export interface SearchParams {
  query?: string;
  location?: string;
  industries?: string;
  employeesRange?: [number, number];
}

export interface LeadState {
  leads: Lead[];
  savedLeads: Lead[];
  searchParams: SearchParams;
  showSaved: Boolean;
  hideFilter: Boolean;
  darkMode:Boolean
}

const initialState: LeadState = {
  leads: dummyLeads?.Leads,
  savedLeads: [],
  searchParams: {},
  showSaved: false,
  hideFilter: false,
  darkMode:true
};

const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.push(action.payload);
    },
    removeLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter((lead) => lead.email !== action.payload);
    },
    updateLead: (
      state,
      action: PayloadAction<{ email: string; updates: Partial<Lead> }>
    ) => {
      const index = state.leads.findIndex(
        (lead) => lead.email === action.payload.email
      );
      if (index !== -1) {
        state.leads[index] = {
          ...state.leads[index],
          ...action.payload.updates,
        };
      }
    },
    saveLeads: (state, action: PayloadAction<Lead[]>) => {
      if (!state.savedLeads) state.savedLeads = [];
      action.payload.forEach((lead) => {
        const index = state.savedLeads.findIndex((l) => l.email === lead.email);
        if (index > -1) {
          state.savedLeads[index] = lead;
        } else {
          state.savedLeads.push(lead);
        }
      });
    },
    setShowSaved: (state, action: PayloadAction<Boolean>) => {
      state.showSaved = action.payload;
    },
    setSearchParams: (state, action: PayloadAction<SearchParams>) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    clearSearchParams: (state) => {
      state.searchParams = {};
    },
    setHideFilterAction: (state, action: PayloadAction<Boolean>) => {
      state.hideFilter = action.payload;
    },
    setDarkMode:(state, action:PayloadAction<Boolean>)=>{
      state.darkMode = action.payload;
    }
  },
});

export const {
  addLead,
  removeLead,
  updateLead,
  setSearchParams,
  clearSearchParams,
  saveLeads,
  setShowSaved,
  setDarkMode,
  setHideFilterAction,
} = leadSlice.actions;

export default leadSlice.reducer;
