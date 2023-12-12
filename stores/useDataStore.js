import { create } from "zustand";
import { columnOptions, operatorOptions } from "../utils/constants";

export const useDataStore = create((set) => ({
  originalTableDataRows: [],
  setOriginalTableDataRows: (newOriginalTableDataRows) =>
    set((state) => ({ originalTableDataRows: newOriginalTableDataRows })),

  selectedRowIds: [],
  setSelectedRowIds: (newSelectedRowIds) =>
    set((state) => ({ selectedRowIds: newSelectedRowIds })),

  tableDataRows: [],
  setTableDataRows: (newTableDataRows) =>
    set((state) => ({ tableDataRows: newTableDataRows })),

  isFileUploaded: false,
  setFileUploaded: (newFileUploaded) =>
    set((state) => ({ isFileUploaded: newFileUploaded })),

  fileName: "",
  setFileName: (newFileName) => set((state) => ({ fileName: newFileName })),

  isDrawerOpen: false,
  setDrawerOpen: (newDrawerOpen) =>
    set((state) => ({ isDrawerOpen: newDrawerOpen })),

  selectedFilters: [],
  setSelectedFilters: (newSelectedFilters) =>
    set((state) => ({ selectedFilters: newSelectedFilters })),
  updateSelectedFilter: (type, newValue, index) =>
    set((state) => {
      if (type === "column") {
        const foundColumn = columnOptions.find(
          (option) => option.label === newValue
        );

        const updatedItem = {
          ...state.selectedFilters[index],
          column: foundColumn,
        };

        const updatedSelectedFilters = [
          ...state.selectedFilters.slice(0, index),
          updatedItem,
          ...state.selectedFilters.slice(index + 1),
        ];

        return { selectedFilters: updatedSelectedFilters };
      } else if (type === "operator") {
        const foundOperator = operatorOptions.find(
          (option) => option.label === newValue
        );

        const updatedItem = {
          ...state.selectedFilters[index],
          operator: foundOperator,
        };

        const updatedSelectedFilters = [
          ...state.selectedFilters.slice(0, index),
          updatedItem,
          ...state.selectedFilters.slice(index + 1),
        ];

        return { selectedFilters: updatedSelectedFilters };
      } else if (type === "valueText") {
        const updatedItem = {
          ...state.selectedFilters[index],
          valueText: newValue,
        };

        const updatedSelectedFilters = [
          ...state.selectedFilters.slice(0, index),
          updatedItem,
          ...state.selectedFilters.slice(index + 1),
        ];

        return { selectedFilters: updatedSelectedFilters };
      }
    }),
}));
