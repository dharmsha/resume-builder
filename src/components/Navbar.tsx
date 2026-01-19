"use client";

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Tooltip,
  useMediaQuery,
  useTheme,
  Fade,
  CircularProgress
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Person,
  School,
  Work,
  Build,
  Code,
  Description,
  Download,
  Settings,
  Logout,
  Notifications,
  AccountCircle,
  RocketLaunch,
  ArrowUpward,
  DarkMode,
  LightMode,
  Share,
  CloudUpload,
} from '@mui/icons-material';

interface NavbarProps {
  onSectionChange?: (section: string) => void;
  onDownload?: () => void;
  onShare?: () => void;
  onReset?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onSectionChange,
  onDownload,
  onShare,
  onReset
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', label: 'Home', icon: <Home />, color: '#FF6B6B' },
    { id: 'personal', label: 'Personal', icon: <Person />, color: '#4ECDC4' },
    { id: 'education', label: 'Education', icon: <School />, color: '#FFD166' },
    { id: 'experience', label: 'Experience', icon: <Work />, color: '#6A5ACD' },
    { id: 'skills', label: 'Skills', icon: <Build />, color: '#20B2AA' },
    { id: 'projects', label: 'Projects', icon: <Code />, color: '#FF6347' },
    { id: 'preview', label: 'Preview', icon: <Description />, color: '#9370DB' },
  ];

  const notifications = [
    { id: 1, text: 'Resume saved successfully', time: '5 min ago' },
    { id: 2, text: 'New template available', time: '1 hour ago' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => setNotificationsAnchor(event.currentTarget);
  const handleNotificationsClose = () => setNotificationsAnchor(null);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setDrawerOpen(false);
    if (onSectionChange) onSectionChange(sectionId);
    
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <Fade in={scrolled}>
        <IconButton
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
            bgcolor: '#FF6B6B', color: 'white',
            '&:hover': { bgcolor: '#FF5252' },
          }}
        >
          <ArrowUpward />
        </IconButton>
      </Fade>

      <AppBar
        position="fixed"
        sx={{
          // FIXED: Transparent ki jagah shuru se hi dark rakha hai taaki white font dikhe
          bgcolor: scrolled ? 'rgba(45, 48, 71, 0.98)' : 'rgba(45, 48, 71, 0.85)',
          backdropFilter: 'blur(10px)',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.2)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          {/* Logo */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', mr: 2, cursor: 'pointer' }}
            onClick={() => handleSectionClick('home')}
          >
            <Avatar sx={{ bgcolor: '#FF6B6B', mr: 1, width: 35, height: 35 }}>
              <RocketLaunch fontSize="small" />
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                color: 'white', // Bright White font
                display: { xs: 'none', sm: 'block' }
              }}
            >
              RESUME<span style={{ color: '#FF6B6B' }}>.</span>AI
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, gap: 0.5 }}>
            {sections.map((section) => (
              <Button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                sx={{
                  color: activeSection === section.id ? section.color : 'white',
                  fontWeight: activeSection === section.id ? 700 : 500,
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
                }}
              >
                {section.label}
              </Button>
            ))}
          </Box>

          {/* Right Side Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={onDownload}
              sx={{
                bgcolor: '#FF6B6B',
                fontWeight: 'bold',
                borderRadius: '8px',
                display: { xs: 'none', sm: 'flex' },
                '&:hover': { bgcolor: '#ee5253' }
              }}
            >
              Download
            </Button>

            <IconButton onClick={handleNotificationsOpen} sx={{ color: 'white' }}>
              <Badge badgeContent={notifications.length} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ color: 'white' }}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>

            <IconButton onClick={handleMenuOpen} sx={{ color: 'white' }}>
              <AccountCircle />
            </IconButton>

            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, bgcolor: '#2D3047', color: 'white' } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>Menu</Typography>
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
          <List>
            {sections.map((section) => (
              <ListItem 
                key={section.id} 
                onClick={() => handleSectionClick(section.id)}
                sx={{ 
                    bgcolor: activeSection === section.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                    borderRadius: '10px',
                    my: 0.5
                }}
              >
                <ListItemIcon sx={{ color: section.color }}>{section.icon}</ListItemIcon>
                <ListItemText primary={section.label} />
              </ListItem>
            ))}
          </List>
          <Button 
            fullWidth variant="contained" 
            sx={{ mt: 2, bgcolor: '#FF6B6B' }} 
            onClick={onDownload}
          >
            Download PDF
          </Button>
        </Box>
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { bgcolor: '#2D3047', color: 'white', minWidth: 150, mt: 1 } }}
      >
        <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
        <MenuItem onClick={onReset}>Reset Resume</MenuItem>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
        <MenuItem onClick={handleMenuClose} sx={{ color: '#FF6B6B' }}>Logout</MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        PaperProps={{ sx: { bgcolor: '#2D3047', color: 'white', width: 280, mt: 1 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>Notifications</Typography>
          {notifications.map(n => (
            <Box key={n.id} sx={{ mb: 1.5, borderBottom: '1px solid rgba(255,255,255,0.05)', pb: 1 }}>
              <Typography variant="body2">{n.text}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.6 }}>{n.time}</Typography>
            </Box>
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default Navbar;