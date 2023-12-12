// mui
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import UploadIcon from "@mui/icons-material/Upload";

// 3rd-party
import { useDropzone } from "react-dropzone";
import { parseExcel } from "../utils/excelParser";
import { toast } from "react-toastify";
import styled from "@emotion/styled";

// datastore
import { useDataStore } from "../stores/useDataStore";

// custom components
import PrimaryButton from "./PrimaryButton";

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const UploadBox = styled(Box)`
  border: 2px dashed #0b6e4f;
  border-radius: 15px;
  background-color: white;
  padding: 30px;
  text-align: center;
  cursor: pointer;

  &.dragover {
    animation: ${pulseAnimation} 1s infinite; /* Apply the pulse animation on dragover */
  }
`;

const FileUpload = () => {
  const setFileUploaded = useDataStore((state) => state.setFileUploaded);
  const setOriginalTableDataRows = useDataStore(
    (state) => state.setOriginalTableDataRows
  );
  const setTableDataRows = useDataStore((state) => state.setTableDataRows);
  const setFileName = useDataStore((state) => state.setFileName);

  const onDrop = async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      const fileBuffer = await file.arrayBuffer();
      const data = parseExcel(fileBuffer);

      console.log("FileUpload data ", file);

      setFileName(file.name);

      const formattedData = data.slice(1).map((row) => {
        return {
          id: crypto.randomUUID(),
          app: row[0],
          category: row[1],
          rating: row[2],
          reviews: row[3],
          size: row[4],
          installs: row[5],
          type: row[6],
          price: row[7],
          contentRating: row[8],
          genres: row[9],
          lastUpdated: row[10],
          currentVersion: row[11],
          androidVersion: row[12],
        };
      });

      console.log("formattedData ", formattedData);

      setOriginalTableDataRows(formattedData);
      setTableDataRows(formattedData);
      setFileUploaded(true);

      toast.success("Data successfully uploaded!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error("Error displaying data", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".xlsx",
  });

  return (
    <Box>
      <UploadBox {...getRootProps()} className={isDragActive ? "dragover" : ""}>
        <input {...getInputProps()} />
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <strong style={{ color: "var(--color-primary)", marginRight: "5px" }}>
            Drag and drop
          </strong>
          an Excel file here or
          <PrimaryButton>
            <UploadIcon />
            Click to upload
          </PrimaryButton>
        </Typography>
      </UploadBox>
    </Box>
  );
};

export default FileUpload;
