"use client";

import React, { useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { observer } from "mobx-react-lite";

// Aapke Components
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection"; // Hero section import kiya
import PersonalForm from "@/components/PersonalForm";
import ProfessionalTemplate from "@/components/ProfessionalTemplate";
import PDFExport from "@/components/PDFExport";

import { resumeStore } from "@/store/resumeStore";

// Temporary Forms (Inhe aap actual components se replace karein)
const EducationForm = () => <Box sx={{ p: 2 }}>Education Details Content...</Box>;
const ExperienceForm = () => <Box sx={{ p: 2 }}>Experience Details Content...</Box>;
const SkillsForm = () => <Box sx={{ p: 2 }}>Skills Details Content...</Box>;

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
  },
});

const HomePage = observer(() => {
  const [activeSection, setActiveSection] = useState("personal");

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* 1. Navbar: Har waqt top pe rahega */}
        <Navbar 
          onSectionChange={(section) => setActiveSection(section)} 
          onReset={() => resumeStore?.reset()}
        />

        {/* 2. Hero Section: IT Company wala look */}
        <HeroSection />

        {/* 3. Main Content: Resume Builder UI */}
        <Container maxWidth="xl" id="builder-section" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            
            {/* LEFT SIDE: Input Forms */}
            <Grid item xs={12} md={5}>
              <Box sx={{ 
                p: 3, 
                border: "1px solid #eee", 
                borderRadius: 4, 
                bgcolor: "white",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                position: "sticky",
                top: "100px",
                zIndex: 10
              }}>
                <Box sx={{ minHeight: "450px" }}>
                  {activeSection === "personal" && <PersonalForm />}
                  {activeSection === "education" && <EducationForm />}
                  {activeSection === "experience" && <ExperienceForm />}
                  {activeSection === "skills" && <SkillsForm />}
                  
                  {activeSection === "home" && (
                    <Box sx={{ textAlign: 'center', mt: 5 }}>
                      <h2 style={{ color: '#2D3047' }}>Ready to Start?</h2>
                      <p>Select a category from the navbar to update your resume.</p>
                    </Box>
                  )}
                </Box>

                <Box sx={{ mt: 3, borderTop: "1px solid #f0f0f0", pt: 2, textAlign: "center" }}>
                  <PDFExport />
                </Box>
              </Box>
            </Grid>

            {/* RIGHT SIDE: Live Preview */}
            <Grid item xs={12} md={7}>
              <Box sx={{ 
                bgcolor: "#525659", 
                p: { xs: 1, md: 4 }, 
                borderRadius: 4,
                display: "flex",
                justifyContent: "center",
                minHeight: "100vh",
                boxShadow: "inset 0 0 50px rgba(0,0,0,0.2)"
              }}>
                <ProfessionalTemplate />
              </Box>
            </Grid>

          </Grid>
        </Container>

        {/* 4. Footer */}
       
        
      </Box>
    </ThemeProvider>
  );
});

export default HomePage;