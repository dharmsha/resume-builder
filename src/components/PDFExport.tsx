// src/components/PDFExport.tsx
import React from "react";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { generatePDF } from "@/utils/pdfGenerator"; // Correct import path

const PDFExport: React.FC = () => {
  const handleExport = () => {
    generatePDF("resume-template", "professional-resume");
  };

  return (
    <Button 
      variant="contained"
      startIcon={<DownloadIcon />}
      onClick={handleExport}
      size="large"
      sx={{ mt: 3 }}
    >
      Download PDF
    </Button>
  );
};

export default PDFExport;