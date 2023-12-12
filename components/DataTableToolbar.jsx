// mui
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button } from "@mui/material";

// datastore
import { useDataStore } from "../stores/useDataStore";

function DataTableToolbar() {
  const tableDataRows = useDataStore((state) => state.tableDataRows);
  const setTableDataRows = useDataStore((state) => state.setTableDataRows);
  const selectedRowIds = useDataStore((state) => state.selectedRowIds);
  const setSelectedRowIds = useDataStore((state) => state.setSelectedRowIds);

  const isDrawerOpen = useDataStore((state) => state.isDrawerOpen);
  const setDrawerOpen = useDataStore((state) => state.setDrawerOpen);

  const handleDeleteRows = () => {
    const newTableDataRows = tableDataRows.filter(
      (row) => !selectedRowIds.includes(row.id)
    );
    setTableDataRows(newTableDataRows);

    setSelectedRowIds([]);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedRowIds.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selectedRowIds.length > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedRowIds.length} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableDataRows.length} Result{tableDataRows.length > 1 ? "s" : ""}
        </Typography>
      )}

      {selectedRowIds.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => handleDeleteRows()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <Button
            sx={{ color: "var(--color-primary)" }}
            onClick={() => {
              console.log("FILTER OPENED ", isDrawerOpen);
              setDrawerOpen(true);
            }}
          >
            <FilterListIcon />
            Filter
          </Button>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default DataTableToolbar;
