import { Typography, Container, styled, Box } from "@mui/material";
import FileUpload from "../components/FileUpload";
import { useDataStore } from "../stores/useDataStore";
import DataTable from "../components/DataTable";

import { toast } from "react-toastify";
import PrimaryButton from "../components/PrimaryButton";

import DescriptionIcon from "@mui/icons-material/Description";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import DataTableToolbar from "../components/DataTableToolbar";
import FilterDrawer from "../components/FilterDrawer";

const Home = () => {
  const isFileUploaded = useDataStore((state) => state.isFileUploaded);
  const setFileUploaded = useDataStore((state) => state.setFileUploaded);
  const fileName = useDataStore((state) => state.fileName);

  const tableDataRows = useDataStore((state) => state.tableDataRows);

  const renderTable = () => {
    // Ensure that tableData has the expected structure
    if (tableDataRows.length < 1) {
      console.error("Invalid tableData structure:", tableDataRows);
      toast.error("Error displaying data", {
        position: toast.POSITION.TOP_CENTER,
      });
      return null; // or handle the error in an appropriate way
    }

    return isFileUploaded && <DataTable />;
  };

  const handleUploadAgain = () => {
    setFileUploaded(false);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mt: 3, mb: 3, color: "green" }}>
          Excel Datatable Viewer App
        </Typography>
        <CardContainer>
          {isFileUploaded ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: "30px",
                py: "30px",
              }}
            >
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <DescriptionIcon /> {fileName}
              </Typography>
              <PrimaryButton handleClick={handleUploadAgain}>
                <RestartAltIcon />
                Upload Again
              </PrimaryButton>
            </Box>
          ) : (
            <FileUpload />
          )}
          {isFileUploaded && <DataTableToolbar />}
          {tableDataRows.length > 0 && renderTable()}
        </CardContainer>
      </Container>
      <FilterDrawer />
    </>
  );
};

const CardContainer = styled("div")({
  backgroundColor: "#fff",
  borderRadius: "20px",
  boxShadow: "0 7px 15px rgba(0,0,0, 0.15)",
});

export default Home;
