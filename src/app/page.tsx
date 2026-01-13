// src/app/page.tsx (v5 compatible)
"use client";

import React, { useState } from "react";
import { 
  Container, 
  Grid, 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button 
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PersonalForm from "@/components/PersonalForm";
import ProfessionalTemplate from "@/components/ProfessionalTemplate";
import PDFExport from "@/components/PDFExport";
import { observer } from "mobx-react-lite";
import { resumeStore } from "@/store/resumeStore";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" }
  }
});

const HomePage = observer(() => {
  const [activeSection, setActiveSection] = useState("personal");

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Professional Resume Builder
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => resumeStore.reset()}
          >
            Reset
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column - Forms */}
          <Grid item xs={12} md={5} lg={4}>
            <Box sx={{ position: "sticky", top: 80 }}>
              {/* Navigation Tabs */}
              <Box sx={{ mb: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
                {["personal", "education", "experience", "skills"].map((section) => (
                  <Button
                    key={section}
                    variant={activeSection === section ? "contained" : "outlined"}
                    onClick={() => setActiveSection(section)}
                    sx={{ textTransform: "capitalize", mb: 1 }}
                  >
                    {section}
                  </Button>
                ))}
              </Box>

              {/* Dynamic Form Display */}
              <Box>
                {activeSection === "personal" && <PersonalForm />}
                {/* Add other forms similarly */}
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
              p: 2
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