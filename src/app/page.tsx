// src/app/page.tsx
"use client";

import React, { useState } from "react";
import { 
  Container, 
  Grid, 
  Box, 
  Button, 
  Typography 
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PersonalForm from "@/components/PersonalForm";
import ProfessionalTemplate from "@/components/ProfessionalTemplate";
import PDFExport from "@/components/PDFExport";
import { observer } from "mobx-react-lite";
import { resumeStore } from "@/store/resumeStore";

// सुनिश्चित करें कि ये components exist करते हैं
// या temporary placeholder components बनाएं

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }
});

// Temporary Placeholder Components (अगर missing हों तो)
const EducationForm = () => (
  <Box sx={{ p: 2, border: "1px dashed #ccc", borderRadius: 1 }}>
    <Typography variant="h6" gutterBottom>Education Form</Typography>
    <Typography>Education form will appear here</Typography>
  </Box>
);

const ExperienceForm = () => (
  <Box sx={{ p: 2, border: "1px dashed #ccc", borderRadius: 1 }}>
    <Typography variant="h6" gutterBottom>Experience Form</Typography>
    <Typography>Experience form will appear here</Typography>
  </Box>
);

const SkillsForm = () => (
  <Box sx={{ p: 2, border: "1px dashed #ccc", borderRadius: 1 }}>
    <Typography variant="h6" gutterBottom>Skills Form</Typography>
    <Typography>Skills form will appear here</Typography>
  </Box>
);

const HomePage = observer(() => {
  const [activeSection, setActiveSection] = useState("personal");

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Professional Resume Builder
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => {
              if (resumeStore && resumeStore.reset) {
                resumeStore.reset();
              } else {
                console.log("Resume Store not available");
              }
            }}
          >
            Reset
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column - Forms */}
          <Grid item xs={12} md={5} lg={4}>
            <Box sx={{ 
              position: "sticky", 
              top: 80,
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 2,
              boxShadow: 1
            }}>
              {/* Navigation Tabs */}
              <Box sx={{ mb: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
                {["personal", "education", "experience", "skills"].map((section) => (
                  <Button
                    key={section}
                    variant={activeSection === section ? "contained" : "outlined"}
                    onClick={() => setActiveSection(section)}
                    sx={{ 
                      textTransform: "capitalize", 
                      mb: 1,
                      fontSize: { xs: "0.8rem", sm: "0.875rem" }
                    }}
                    size="small"
                  >
                    {section}
                  </Button>
                ))}
              </Box>

              {/* Dynamic Form Display */}
              <Box sx={{ minHeight: 300 }}>
                {activeSection === "personal" && <PersonalForm />}
                {activeSection === "education" && <EducationForm />}
                {activeSection === "experience" && <ExperienceForm />}
                {activeSection === "skills" && <SkillsForm />}
              </Box>

              {/* Export Button */}
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <PDFExport />
              </Box>
            </Box>
          </Grid>
          
          {/* Right Column - Preview */}
          <Grid item xs={12} md={7} lg={8}>
            <Box sx={{ 
              position: "sticky", 
              top: 80,
              display: "flex",
              justifyContent: "center",
              p: 2,
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              minHeight: "calc(100vh - 100px)"
            }}>
              <ProfessionalTemplate />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
});

export default HomePage;