"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, TextField } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // ✅ SOLUTION: Lazy Initialization
  // useState ke andar function pass karne se ye sirf "initial mount" pe chalta hai.
  // Ye synchronous hai aur renders ko cascade nahi karta.
  const [particles] = useState<Particle[]>(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 90) + 5,
      y: Math.floor(Math.random() * 90) + 5,
      size: Math.floor(Math.random() * 30) + 10,
    }))
  );

  const rotatingTexts = [
    "Build Your Resume",
    "Land Your Dream Job",
    "Showcase Your Skills",
    "Stand Out from Crowd",
    "Career Acceleration"
  ];

  // Mouse move effect (Side Effect - allowed in useEffect)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Text rotation (Side Effect - allowed in useEffect)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById('builder-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ minHeight: "100vh", width: "100%", bgcolor: "#0a0a0f", color: "white", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
      
      {/* Background Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: "rgba(102, 126, 234, 0.2)",
            borderRadius: "50%",
            filter: "blur(30px)",
            zIndex: 1,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 4 + (particle.id % 5), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Mouse Glow */}
      <Box
        component={motion.div}
        animate={{ x: mousePosition.x - 150, y: mousePosition.y - 150 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        sx={{
          position: "fixed", width: 300, height: 300,
          background: "radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="overline" sx={{ letterSpacing: 3, color: "#667eea", fontWeight: "bold" }}>
            FUTURE READY RESUMES
          </Typography>

          <Typography variant="h1" sx={{ fontSize: { xs: "3rem", md: "5rem" }, fontWeight: 900, mb: 2, background: "linear-gradient(90deg, #fff 0%, #667eea 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Elevate Your Career
          </Typography>

          <Box sx={{ height: "3.5rem", mb: 4 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTextIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h4" sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                  {rotatingTexts[activeTextIndex]}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "center", maxWidth: 600, mx: "auto" }}>
            <TextField
              fullWidth placeholder="Enter email to start" variant="outlined" size="small" value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                bgcolor: "rgba(255,255,255,0.05)", borderRadius: "12px",
                "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { borderColor: "rgba(255,255,255,0.2)" }, "&:hover fieldset": { borderColor: "#667eea" } }
              }}
            />
            <Button type="submit" variant="contained" size="large" sx={{ px: 4, borderRadius: "12px", bgcolor: "#667eea", fontWeight: "bold", textTransform: "none", minWidth: "150px" }}>
              Start Building
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;