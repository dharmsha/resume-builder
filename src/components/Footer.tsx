// src/components/Footer.tsx
"use client";

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  Divider,
  useTheme,
  Fade,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
  Email,
  Phone,
  LocationOn,
  Send,
  Favorite,
  CloudDownload,
  Security,
  Speed,
  Palette,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const features = [
    { icon: <CloudDownload />, title: 'Easy Download', desc: 'Instant PDF download' },
    { icon: <Security />, title: 'Secure', desc: 'Your data is protected' },
    { icon: <Speed />, title: 'Fast', desc: 'Build in minutes' },
    { icon: <Palette />, title: 'Beautiful', desc: 'Modern templates' },
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Templates', href: '#templates' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Privacy Policy', href: '#privacy' },
  ];

  const socialLinks = [
    { icon: <Facebook />, href: '#', color: '#1877F2' },
    { icon: <Twitter />, href: '#', color: '#1DA1F2' },
    { icon: <Instagram />, href: '#', color: '#E4405F' },
    { icon: <LinkedIn />, href: '#', color: '#0A66C2' },
    { icon: <GitHub />, href: '#', color: '#333' },
  ];

  const contactInfo = [
    { icon: <Email />, text: 'support@resumebuilder.com' },
    { icon: <Phone />, text: '+91 7404980061' },
    { icon: <LocationOn />, text: 'Mumbai, India' },
  ];

  return (
    <Fade in timeout={1000}>
      <Box
        component="footer"
        sx={{
          bgcolor: '#2D3047',
          color: 'white',
          pt: 8,
          pb: 4,
          mt: 'auto',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 50%, #FFD166 100%)',
          },
        }}
      >
        {/* Features Section */}
        <Container maxWidth="lg" sx={{ mb: 6 }}>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <IconButton
                    sx={{
                      mb: 2,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#FF6B6B',
                      },
                    }}
                  >
                    {feature.icon}
                  </IconButton>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {feature.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 6 }} />

        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: 'linear-gradient(45deg, #FF6B6B 30%, #FFD166 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ResumeBuilder
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255,255,255,0.8)' }}>
                  Build professional resumes that get you hired. Easy to use, beautiful templates, instant results.
                </Typography>
                
                {/* Social Links */}
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  {socialLinks.map((social, index) => (
                    <IconButton
                      key={index}
                      href={social.href}
                      target="_blank"
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '&:hover': {
                          bgcolor: social.color,
                          transform: 'translateY(-3px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Quick Links
              </Typography>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="hover"
                  sx={{
                    display: 'block',
                    mb: 1.5,
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#FF6B6B',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Contact Us
              </Typography>
              {contactInfo.map((info, index) => (
                <Box
                  key={index}
                  sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}
                >
                  <IconButton
                    sx={{
                      mr: 2,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      color: '#FF6B6B',
                      '&:hover': {
                        bgcolor: '#FF6B6B',
                        color: 'white',
                      },
                    }}
                  >
                    {info.icon}
                  </IconButton>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {info.text}
                  </Typography>
                </Box>
              ))}
            </Grid>

            {/* Newsletter */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Newsletter
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255,255,255,0.7)' }}>
                Subscribe to get updates on new templates and features.
              </Typography>
              <Box component="form" sx={{ display: 'flex' }}>
                <TextField
                  placeholder="Your email"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 1,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,0.4)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF6B6B',
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255,255,255,0.5)',
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: '#FF6B6B',
                    minWidth: 'auto',
                    px: 2,
                    '&:hover': {
                      bgcolor: '#FF5252',
                    },
                  }}
                >
                  <Send />
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 6 }} />

          {/* Bottom Bar */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              © {currentYear} ResumeBuilder. All rights reserved.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Made with
              </Typography>
              <Favorite sx={{ fontSize: 16, color: '#FF6B6B' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                in India
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link
                href="#privacy"
                underline="hover"
                sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms"
                underline="hover"
                sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}
              >
                Terms of Service
              </Link>
              <Link
                href="#cookies"
                underline="hover"
                sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}
              >
                Cookie Policy
              </Link>
            </Box>
          </Box>

          {/* Download Stats */}
          <Box
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.05)',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              <strong>1,234+</strong> resumes created this week • <strong>₹5</strong> per download
            </Typography>
          </Box>
        </Container>

        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,107,107,0.1) 0%, transparent 70%)',
            zIndex: 0,
          }}
        />
      </Box>
    </Fade>
  );
};

export default Footer;