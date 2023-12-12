import { useState } from "react";

// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Drawer, TextField } from "@mui/material";

// datastore
import { useDataStore } from "../stores/useDataStore";

// constants
import { headCells, columnOptions, operatorOptions } from "../utils/constants";

// 3rd-party
import { toast } from "react-toastify";

// custom components
import Dropdown from "./Dropdown";
import PrimaryButton from "./PrimaryButton";

function FilterDrawer() {
  const [column, setColumn] = useState(columnOptions[0]);
  const [operator, setOperator] = useState(operatorOptions[0]);
  const [valueText, setValueText] = useState("");

  const originalTableDataRows = useDataStore(
    (state) => state.originalTableDataRows
  );
  const setTableDataRows = useDataStore((state) => state.setTableDataRows);

  const isDrawerOpen = useDataStore((state) => state.isDrawerOpen);
  const setDrawerOpen = useDataStore((state) => state.setDrawerOpen);
  const selectedFilters = useDataStore((state) => state.selectedFilters);
  const setSelectedFilters = useDataStore((state) => state.setSelectedFilters);
  const updateSelectedFilter = useDataStore(
    (state) => state.updateSelectedFilter
  );

  console.log("isDrawerOpen ", isDrawerOpen);

  const handleSetDropdownOption = (type, value) => {
    switch (type) {
      case "column":
        const foundColumn = columnOptions.find(
          (option) => option.label === value
        );
        setColumn(foundColumn);
        return;
      case "operator":
        const foundOperator = operatorOptions.find(
          (option) => option.label === value
        );
        setOperator(foundOperator);
        return;
      default:
        return;
    }
  };

  const renderOperatorOptions = (numeric) => {
    if (!numeric) {
      return operatorOptions.filter(
        (option) => option.id === "equal" || option.id === "not_equal"
      );
    }

    return operatorOptions;
  };

  const handleAddFilter = () => {
    const foundColumnOption = columnOptions.find(
      (item) => item.label === column?.label
    );
    const foundOperatorOption = operatorOptions.find(
      (item) => item.label === operator?.label
    );

    let newSelectedFilters = [
      ...selectedFilters,
      { column: foundColumnOption, operator: foundOperatorOption, valueText },
    ];
    setSelectedFilters(newSelectedFilters);

    setColumn(columnOptions[0]);
    setOperator(operatorOptions[0]);
    setValueText("");
  };

  const handleDeleteFilter = (currentFilter) => {
    const newSelectedFilters = selectedFilters.filter(
      (filter) =>
        filter.column.label !== currentFilter.column.label &&
        filter.valueText !== currentFilter.valueText
    );

    setSelectedFilters(newSelectedFilters);
  };

  const isInvalidFilterInputs = () => {
    if (valueText === "") {
      return true;
    }

    return false;
  };

  const computeFilterQuery = (row, filter) => {
    const columnValue = row[filter?.column?.id];

    switch (filter?.operator?.label) {
      case "contains":
        if (filter?.column?.id === "app") {
          return row[filter?.column?.id]
            ?.toLowerCase()
            ?.includes(filter?.valueText?.toLowerCase());
        } else {
          return row[filter?.column?.id] === filter?.valueText;
        }

      case "not contain":
        if (filter?.column?.id === "app") {
          return row[filter?.column?.id]
            ?.toLowerCase()
            ?.includes(filter?.valueText?.toLowerCase());
        } else {
          return (
            row[filter?.column?.id]?.toLowerCase() ===
            filter?.valueText?.toLowerCase()
          );
        }
      case ">":
        return columnValue > filter?.valueText;
      case "<":
        return columnValue < filter?.valueText;
      default:
        return;
    }
  };

  const handleApplyFilter = () => {
    const generateFilterFunction = (filters) => {
      return (row) => {
        const computedFilters = filters.every((filter) => {
          const conditionMet = computeFilterQuery(row, filter);
          if (conditionMet) {
            return true;
          } else {
            return false;
          }
        });

        return computedFilters;
      };
    };

    const filteredTableDataRows = originalTableDataRows.filter(
      generateFilterFunction(selectedFilters)
    );

    setTableDataRows(filteredTableDataRows);

    toast.success("Filter has been applied", {
      position: toast.POSITION.TOP_CENTER,
    });
    setDrawerOpen(false);
  };

  const handleResetNewFilterInputs = () => {
    setColumn(columnOptions[0]);
    setOperator(operatorOptions[0]);
    setValueText("");
  };

  const renderSelectedFilters = () => {
    return selectedFilters?.map((filter, index) => {
      return (
        <>
          {index > 0 && (
            <Box key={filter.id} sx={{ display: "flex", gap: "10px", mb: 3 }}>
              <Typography
                sx={{
                  textAlign: "center",
                  width: "100%",
                  color: "var(--color-primary)",
                  fontWeight: "500",
                  flex: "95%",
                }}
              >
                - AND -
              </Typography>
              <Box sx={{ flex: "5%" }}></Box>
            </Box>
          )}
          <Box key={filter.id} sx={{ display: "flex", gap: "10px", mb: 3 }}>
            <Dropdown
              label={"Column"}
              sx={{ flex: "35%" }}
              selectedOption={filter?.column || column}
              options={headCells}
              handleChange={(e) =>
                updateSelectedFilter("column", e.target.value, index)
              }
            />
            <Dropdown
              label={"Operator"}
              sx={{ flex: "20%" }}
              selectedOption={filter?.operator || operator}
              options={renderOperatorOptions(filter?.column?.numeric)}
              handleChange={(e) =>
                updateSelectedFilter("operator", e.target.value, index)
              }
            />
            <TextField
              label="Value"
              sx={{ flex: "5%" }}
              variant="outlined"
              value={filter.valueText || valueText}
              onChange={(e) =>
                updateSelectedFilter("valueText", e.target.value, index)
              }
            />
            <IconButton
              aria-label="Delete a Filter"
              onClick={() => handleDeleteFilter(filter)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </>
      );
    });
  };

  return (
    <Drawer
      anchor={"right"}
      open={isDrawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={() => setDrawerOpen(false)}
          sx={{
            height: "fit-content",
          }}
        >
          <CloseIcon
            sx={{
              color: "var(--color-primary)",
            }}
          />
        </IconButton>
        <Typography variant="h5" sx={{ padding: "15px", fontWeight: "500" }}>
          Filters ({selectedFilters.length})
        </Typography>
      </Box>
      <Box sx={{ padding: "15px" }}>
        {selectedFilters.length > 0 ? (
          renderSelectedFilters()
        ) : (
          <Typography
            variant="p"
            sx={{ display: "block", marginBottom: "20px" }}
          >
            No Filters applied yet
          </Typography>
        )}

        <hr />
        <Typography
          variant="p"
          sx={{ fontWeight: "500", color: "var(--color-primary)" }}
        >
          New Filter
        </Typography>
        <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
          <Box sx={{ display: "flex", gap: "10px", mb: 3 }}>
            <Dropdown
              label={"Column"}
              sx={{ flex: "40%" }}
              selectedOption={column}
              options={columnOptions}
              handleChange={(e) =>
                handleSetDropdownOption("column", e.target.value)
              }
            />
            <Dropdown
              label={"Operator"}
              sx={{ flex: "20%" }}
              selectedOption={operator}
              options={renderOperatorOptions(column?.numeric)}
              handleChange={(e) =>
                handleSetDropdownOption("operator", e.target.value)
              }
            />
            <TextField
              label="Value"
              sx={{ flex: "40%" }}
              variant="outlined"
              value={valueText}
              onChange={(e) => setValueText(e.target.value)}
            />
            <IconButton onClick={() => handleResetNewFilterInputs()}>
              <RestartAltIcon
                sx={{
                  color: "var(--color-primary)",
                }}
              />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            sx={{
              width: "200px",
              border: "solid 1px var(--color-primary)",
              color: "var(--color-primary)",
              fontFamily: "'Poppins' !important",
              textTranform: "capitalize !important",
              "&:hover": {
                border: "solid 1px var(--color-primary)",
                color: "var(--color-primary)",
              },
            }}
            variant="outlined"
            disabled={isInvalidFilterInputs()}
            onClick={handleAddFilter}
          >
            Add Filter
          </Button>
          <PrimaryButton
            fullWidth
            handleClick={handleApplyFilter}
            disabled={selectedFilters.length < 1}
          >
            <CheckIcon />
            Apply
          </PrimaryButton>
        </Box>
      </Box>
    </Drawer>
  );
}

export default FilterDrawer;
