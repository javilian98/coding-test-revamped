import { useState, useMemo } from "react";

// mui
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

// datastore
import { useDataStore } from "../stores/useDataStore";

// constants
import { headCells } from "../utils/constants";

// custom components
import DataTableHead from "./DataTableHead";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function DataTable() {
  const tableDataRows = useDataStore((state) => state.tableDataRows);
  const selectedRowIds = useDataStore((state) => state.selectedRowIds);
  const setSelectedRowIds = useDataStore((state) => state.setSelectedRowIds);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = tableDataRows.map((n) => n.id);
      setSelectedRowIds(newSelected);

      return;
    }

    setSelectedRowIds([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedRowIds.indexOf(id);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRowIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRowIds.slice(1));
    } else if (selectedIndex === selectedRowIds.length - 1) {
      newSelected = newSelected.concat(selectedRowIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRowIds.slice(0, selectedIndex),
        selectedRowIds.slice(selectedIndex + 1)
      );
    }

    setSelectedRowIds(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selectedRowIds.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableDataRows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(tableDataRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, tableDataRows]
  );

  return (
    <Box sx={{ width: "100%", overFlow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "70vh" }}>
        <Table
          stickyHeader
          sx={{ minWidth: 1000 }}
          aria-labelledby="tableTitle"
          size={"medium"}
        >
          <DataTableHead
            headCells={headCells}
            numSelected={selectedRowIds.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={tableDataRows.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onClick={(event) => handleClick(event, row.id)}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                    align="left"
                    width={"500px"}
                    sx={{ minWidth: "350px" }}
                  >
                    {row.app}
                  </TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">{row.rating}</TableCell>
                  <TableCell align="right">{row.reviews}</TableCell>
                  <TableCell align="right">{row.size}</TableCell>
                  <TableCell align="right">{row.installs}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.contentRating}</TableCell>
                  <TableCell align="right">{row.genres}</TableCell>
                  <TableCell align="right">{row.lastUpdated}</TableCell>
                  <TableCell align="right">{row.currentVersion}</TableCell>
                  <TableCell align="right">{row.androidVersion}</TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableDataRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
