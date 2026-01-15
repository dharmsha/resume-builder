// src/components/CreativeTemplate.tsx
import React from "react";
import { useObserver } from "mobx-react-lite";
import { Box, Typography, Chip, Grid, Paper, Avatar } from "@mui/material";
import { resumeStore } from "@/store/resumeStore";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  Language as LanguageIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  School as SchoolIcon,
} from "@mui/icons-material";

const CreativeTemplate: React.FC = () => {
  return useObserver(() => {
    // Calculate if we have content
    const hasExperience = resumeStore.experience.length > 0;
    const hasEducation = resumeStore.education.length > 0;
    const hasSkills = resumeStore.skills.length > 0;
    const hasProjects = resumeStore.projects.length > 0;
    const hasLanguages = resumeStore.languages.length > 0;
    const hasCertifications = resumeStore.certifications.length > 0;
    const hasSummary = resumeStore.personalInfo.summary.trim().length > 0;

    // Extract name and title
    const fullName = resumeStore.personalInfo.fullName || "Your Name";
    const firstName = fullName.split(' ')[0] || "Y";
    const title = resumeStore.personalInfo.title || "Your Profession";
    
    // Safely access photo property with type assertion
    const personalInfo = resumeStore.personalInfo as any;
    const photo = personalInfo.photo || null;

    // Color palette
    const colors = {
      primary: "#FF6B6B", // Coral Red
      secondary: "#4ECDC4", // Turquoise
      accent: "#FFD166", // Yellow
      dark: "#2D3047", // Navy Blue
      light: "#F7FFF7", // Off White
      gray: "#A1A1A1",
      darkGray: "#333333"
    };

    // Fixed skill rating function
    const renderStars = (rating: number) => {
      return (
        <Box display="flex" gap={0.2}>
          {[...Array(5)].map((_, i) => (
            i < rating ? 
              <StarIcon key={i} sx={{ fontSize: 12, color: colors.accent }} /> : 
              <StarBorderIcon key={i} sx={{ fontSize: 12, color: colors.gray }} />
          ))}
        </Box>
      );
    };

    // Helper function to safely calculate skill level
    const getSkillLevel = (skillLevel?: string): number => {
      if (!skillLevel) return 3;
      
      switch(skillLevel.toLowerCase()) {
        case 'beginner': return 2;
        case 'intermediate': return 3;
        case 'advanced': return 4;
        case 'expert': return 5;
        default: return 3;
      }
    };

    // Helper function to get language proficiency width
    const getLanguageProficiencyWidth = (proficiency?: string): string => {
      if (!proficiency) return '40%';
      
      switch(proficiency.toLowerCase()) {
        case 'native': return '100%';
        case 'fluent': return '85%';
        case 'advanced': return '75%';
        case 'intermediate': return '65%';
        case 'beginner': return '40%';
        default: return '40%';
      }
    };

    // Helper function to get education icon based on type
    const getEducationIcon = (educationType: string) => {
      switch(educationType) {
        case '10th': return '🔢';
        case '12th': return '📚';
        case 'Bachelor\'s': return '🎓';
        case 'Master\'s': return '🧑‍🎓';
        case 'PhD': return '👨‍🔬';
        case 'Diploma': return '📄';
        default: return '🏫';
      }
    };

    // Get user's interests from skills (first 8 skills as interests)
    const userInterests = resumeStore.skills.slice(0, 8).map(skill => skill.name);

    return (
      <Box 
        id="resume-template"
        sx={{ 
          p: 0,
          bgcolor: colors.light,
          color: colors.darkGray,
          width: "210mm",
          minHeight: "297mm",
          margin: "0 auto",
          fontFamily: "'Poppins', 'Montserrat', 'Raleway', sans-serif",
          lineHeight: 1.6,
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.primary}20 100%)`,
            zIndex: 0
          }
        }}
      >
        {/* Decorative elements */}
        <Box sx={{
          position: 'absolute',
          top: '50px',
          left: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.secondary}20 0%, transparent 70%)`,
          zIndex: 0
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: '50px',
          right: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.accent}20 0%, transparent 70%)`,
          zIndex: 0
        }} />

        {/* Main Grid */}
        <Grid container sx={{ position: 'relative', zIndex: 1 }}>
          
          {/* Left Sidebar - Colorful */}
          <Grid item xs={4} sx={{ 
            bgcolor: colors.dark, 
            color: 'white',
            p: 4,
            minHeight: '297mm',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100px',
              background: `linear-gradient(to top, ${colors.primary}, ${colors.secondary})`,
              zIndex: 0
            }
          }}>
            {/* Profile Image Area */}
            <Box sx={{ 
              position: 'relative', 
              zIndex: 2,
              mb: 4 
            }}>
              <Box sx={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                bgcolor: colors.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                border: `4px solid ${colors.accent}`,
                overflow: 'hidden',
                position: 'relative'
              }}>
                {photo ? (
                  <Box
                    component="img"
                    src={photo}
                    alt={fullName}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: '100%',
                      height: '100%',
                      bgcolor: colors.primary,
                      fontSize: '48px',
                      fontWeight: 700
                    }}
                  >
                    {firstName.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </Box>
              
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: "32px",
                  fontWeight: 800,
                  textAlign: 'center',
                  letterSpacing: "2px",
                  lineHeight: 1.2,
                  mb: 1,
                  color: 'white'
                }}
              >
                {fullName}
              </Typography>
              
              <Box sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: colors.primary,
                px: 2,
                py: 0.75,
                borderRadius: '20px',
                mx: 'auto',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                  transform: 'translateX(-100%)',
                  animation: 'shimmer 2s infinite'
                },
                '@keyframes shimmer': {
                  '100%': { transform: 'translateX(100%)' }
                }
              }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "white",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px"
                  }}
                >
                  {title}
                </Typography>
              </Box>
            </Box>
            
            {/* Contact Info - Stylish */}
            <Box sx={{ position: 'relative', zIndex: 2, mb: 4 }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontSize: "16px",
                  fontWeight: 700,
                  mb: 3,
                  color: colors.accent,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  display: 'flex',
                  alignItems: 'center',
                  '&::after': {
                    content: '""',
                    flexGrow: 1,
                    height: '2px',
                    backgroundColor: colors.secondary,
                    ml: 2
                  }
                }}
              >
                Contact
              </Typography>
              
              <Box sx={{ '& > div': { mb: 2 } }}>
                {resumeStore.personalInfo.email && (
                  <Box display="flex" alignItems="center">
                    <Box sx={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      bgcolor: colors.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}>
                      <EmailIcon sx={{ fontSize: 18, color: 'white' }} />
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                      {resumeStore.personalInfo.email}
                    </Typography>
                  </Box>
                )}
                
                {resumeStore.personalInfo.phone && (
                  <Box display="flex" alignItems="center">
                    <Box sx={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      bgcolor: colors.secondary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}>
                      <PhoneIcon sx={{ fontSize: 18, color: 'white' }} />
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                      {resumeStore.personalInfo.phone}
                    </Typography>
                  </Box>
                )}
                
                {resumeStore.personalInfo.address && (
                  <Box display="flex" alignItems="center">
                    <Box sx={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      bgcolor: colors.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}>
                      <LocationIcon sx={{ fontSize: 18, color: colors.dark }} />
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                      {resumeStore.personalInfo.address}
                    </Typography>
                  </Box>
                )}
                
                {resumeStore.personalInfo.linkedin && (
                  <Box display="flex" alignItems="center">
                    <Box sx={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      bgcolor: '#0077B5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}>
                      <LinkedInIcon sx={{ fontSize: 18, color: 'white' }} />
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                      {resumeStore.personalInfo.linkedin}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            
            {/* Skills - Visual */}
            {hasSkills && (
              <Box sx={{ position: 'relative', zIndex: 2, mb: 4 }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontSize: "16px",
                    fontWeight: 700,
                    mb: 3,
                    color: colors.accent,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    display: 'flex',
                    alignItems: 'center',
                    '&::after': {
                      content: '""',
                      flexGrow: 1,
                      height: '2px',
                      backgroundColor: colors.secondary,
                      ml: 2
                    }
                  }}
                >
                  Skills
                </Typography>
                
                <Grid container spacing={1}>
                  {resumeStore.skills.slice(0, 6).map((skill) => {
                    const skillLevel = getSkillLevel(skill.level);
                    
                    return (
                      <Grid item xs={6} key={skill.id}>
                        <Box sx={{
                          bgcolor: 'rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          p: 1.5,
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.2)',
                            transform: 'translateY(-2px)'
                          }
                        }}>
                          <Typography variant="caption" sx={{ 
                            fontSize: "10px",
                            color: 'white',
                            fontWeight: 600
                          }}>
                            {skill.name}
                          </Typography>
                          <Box sx={{ mt: 0.5 }}>
                            {renderStars(skillLevel)}
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            )}
            
            {/* Languages */}
            {hasLanguages && (
              <Box sx={{ position: 'relative', zIndex: 2, mb: 4 }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontSize: "16px",
                    fontWeight: 700,
                    mb: 2,
                    color: colors.accent,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    display: 'flex',
                    alignItems: 'center',
                    '&::after': {
                      content: '""',
                      flexGrow: 1,
                      height: '2px',
                      backgroundColor: colors.secondary,
                      ml: 2
                    }
                  }}
                >
                  Languages
                </Typography>
                
                <Box sx={{ '& > div': { mb: 1.5 } }}>
                  {resumeStore.languages.slice(0, 4).map((lang) => {
                    const proficiencyWidth = getLanguageProficiencyWidth(lang.proficiency);
                    
                    return (
                      <Box key={lang.id}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                          <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 600 }}>
                            {lang.name}
                          </Typography>
                          <Typography variant="caption" sx={{ fontSize: "10px", color: colors.gray }}>
                            {lang.proficiency}
                          </Typography>
                        </Box>
                        <Box sx={{
                          height: '6px',
                          bgcolor: 'rgba(255,255,255,0.1)',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <Box sx={{
                            height: '100%',
                            width: proficiencyWidth,
                            bgcolor: colors.secondary,
                            borderRadius: '3px'
                          }} />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
            
            {/* Hobbies/Interests */}
            {userInterests.length > 0 && (
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontSize: "16px",
                    fontWeight: 700,
                    mb: 2,
                    color: colors.accent,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    display: 'flex',
                    alignItems: 'center',
                    '&::after': {
                      content: '""',
                      flexGrow: 1,
                      height: '2px',
                      backgroundColor: colors.secondary,
                      ml: 2
                    }
                  }}
                >
                  Interests
                </Typography>
                
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {userInterests.map((interest, i) => (
                    <Chip
                      key={i}
                      label={interest}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        borderRadius: '16px',
                        fontSize: '10px',
                        height: '24px',
                        '&:hover': {
                          bgcolor: colors.primary
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
          
          {/* Right Content Area */}
          <Grid item xs={8} sx={{ p: 4, bgcolor: colors.light }}>
            
            {/* About/Summary */}
            {hasSummary && (
              <Box sx={{ 
                mb: 5,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: '4px',
                  bgcolor: colors.primary,
                  borderRadius: '2px'
                }
              }}>
                <Box pl={3}>
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      fontSize: "20px",
                      fontWeight: 800,
                      color: colors.dark,
                      mb: 2,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-5px',
                        left: 0,
                        width: '60px',
                        height: '3px',
                        bgcolor: colors.secondary,
                        borderRadius: '2px'
                      }
                    }}
                  >
                    Professional Profile
                  </Typography>
                  
                  <Typography variant="body1" sx={{ 
                    fontSize: "13px", 
                    color: colors.darkGray,
                    lineHeight: 1.8,
                    textAlign: 'justify'
                  }}>
                    {resumeStore.personalInfo.summary}
                  </Typography>
                </Box>
              </Box>
            )}
            
            {/* Experience - Timeline Style */}
            {hasExperience && (
              <Box sx={{ mb: 5 }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: "20px",
                    fontWeight: 800,
                    color: colors.dark,
                    mb: 3,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    display: 'flex',
                    alignItems: 'center',
                    '&::before': {
                      content: '"01"',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      bgcolor: colors.primary,
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }
                  }}
                >
                  Career Timeline
                </Typography>
                
                {resumeStore.experience.map((exp, index) => (
                  <Box 
                    key={exp.id} 
                    sx={{ 
                      position: 'relative',
                      pl: 4,
                      mb: 4,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: '15px',
                        top: '8px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        bgcolor: colors.secondary,
                        border: `2px solid ${colors.light}`,
                        zIndex: 2
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: '20px',
                        top: '20px',
                        bottom: '-20px',
                        width: '2px',
                        bgcolor: colors.gray + '40',
                        display: index === resumeStore.experience.length - 1 ? 'none' : 'block'
                      }
                    }}
                  >
                    <Box sx={{
                      bgcolor: 'white',
                      borderRadius: '12px',
                      p: 3,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                        borderLeft: `4px solid ${colors.primary}`
                      }
                    }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
                        <Box>
                          <Typography variant="h3" sx={{ 
                            fontSize: "16px", 
                            fontWeight: 700,
                            color: colors.dark,
                            mb: 0.5
                          }}>
                            {exp.position}
                          </Typography>
                          <Typography variant="body1" sx={{ 
                            fontSize: "14px",
                            color: colors.primary,
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}>
                            <LocationIcon sx={{ fontSize: 14 }} />
                            {exp.company} • {exp.location}
                          </Typography>
                        </Box>
                        <Box sx={{
                          bgcolor: colors.accent + '20',
                          px: 2,
                          py: 0.75,
                          borderRadius: '20px',
                          border: `1px solid ${colors.accent}`
                        }}>
                          <Typography variant="body2" sx={{ 
                            fontSize: "11px",
                            fontWeight: 600,
                            color: colors.dark
                          }}>
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box component="ul" sx={{ 
                        pl: 0,
                        mt: 2,
                        '& li': {
                          listStyle: 'none',
                          fontSize: "12px",
                          mb: 1.5,
                          color: colors.darkGray,
                          lineHeight: 1.6,
                          display: 'flex',
                          alignItems: 'flex-start',
                          '&::before': {
                            content: '"▸"',
                            color: colors.primary,
                            fontWeight: 'bold',
                            fontSize: '14px',
                            mr: 1.5,
                            flexShrink: 0
                          }
                        }
                      }}>
                        {exp.description.split('\n').map((point, i) => (
                          point.trim() && <li key={i}>{point}</li>
                        ))}
                      </Box>
                      
                      {/* Skills used in this role */}
                      {exp.skills && exp.skills.length > 0 && (
                        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {exp.skills.slice(0, 5).map((skill: string, i: number) => (
                            <Chip
                              key={i}
                              label={skill}
                              size="small"
                              sx={{
                                bgcolor: colors.secondary + '20',
                                color: colors.dark,
                                fontSize: '9px',
                                height: '20px',
                                borderRadius: '10px'
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            
            {/* Education Section - Detailed */}
            {hasEducation && (
              <Box sx={{ mb: 5 }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: "20px",
                    fontWeight: 800,
                    color: colors.dark,
                    mb: 3,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    display: 'flex',
                    alignItems: 'center',
                    '&::before': {
                      content: '"02"',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      bgcolor: colors.secondary,
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }
                  }}
                >
                  Academic Journey
                </Typography>
                
                <Grid container spacing={2}>
                  {resumeStore.education.map((edu) => (
                    <Grid item xs={12} key={edu.id}>
                      <Paper elevation={0} sx={{ 
                        bgcolor: 'white',
                        borderRadius: '12px',
                        p: 3,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                          borderLeft: `4px solid ${edu.educationType === '10th' ? colors.primary : 
                                      edu.educationType === '12th' ? colors.secondary : 
                                      edu.educationType === 'Bachelor\'s' ? colors.accent : colors.gray}`
                        }
                      }}>
                        <Box display="flex" alignItems="flex-start" gap={2}>
                          <Box sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            bgcolor: edu.educationType === '10th' ? colors.primary + '20' : 
                                     edu.educationType === '12th' ? colors.secondary + '20' : 
                                     edu.educationType === 'Bachelor\'s' ? colors.accent + '20' : colors.gray + '20',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                          }}>
                            {getEducationIcon(edu.educationType)}
                          </Box>
                          
                          <Box sx={{ flex: 1 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                              <Box>
                                <Typography variant="h3" sx={{ 
                                  fontSize: "16px", 
                                  fontWeight: 700,
                                  color: colors.dark,
                                  mb: 0.5
                                }}>
                                  {edu.degree}
                                </Typography>
                                <Typography variant="body1" sx={{ 
                                  fontSize: "14px",
                                  color: edu.educationType === '10th' ? colors.primary : 
                                         edu.educationType === '12th' ? colors.secondary : 
                                         edu.educationType === 'Bachelor\'s' ? colors.accent : colors.gray,
                                  fontWeight: 600
                                }}>
                                  {edu.institution}
                                </Typography>
                                {edu.boardUniversity && (
                                  <Typography variant="body2" sx={{ 
                                    fontSize: "12px",
                                    color: colors.gray,
                                    mt: 0.5
                                  }}>
                                    {edu.boardUniversity}
                                  </Typography>
                                )}
                              </Box>
                              
                              <Box sx={{
                                bgcolor: edu.educationType === '10th' ? colors.primary + '10' : 
                                         edu.educationType === '12th' ? colors.secondary + '10' : 
                                         edu.educationType === 'Bachelor\'s' ? colors.accent + '10' : colors.gray + '10',
                                px: 2,
                                py: 0.75,
                                borderRadius: '20px',
                                border: `1px solid ${edu.educationType === '10th' ? colors.primary : 
                                          edu.educationType === '12th' ? colors.secondary : 
                                          edu.educationType === 'Bachelor\'s' ? colors.accent : colors.gray}`
                              }}>
                                <Typography variant="body2" sx={{ 
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  color: colors.dark
                                }}>
                                  {edu.score} {edu.scoreType}
                                </Typography>
                              </Box>
                            </Box>
                            
                            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                              <Box display="flex" alignItems="center" gap={1.5}>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                  <LocationIcon sx={{ fontSize: 14, color: colors.gray }} />
                                  <Typography variant="caption" sx={{ fontSize: "11px", color: colors.gray }}>
                                    {edu.location}
                                  </Typography>
                                </Box>
                                
                                <Box display="flex" alignItems="center" gap={0.5}>
                                  <SchoolIcon sx={{ fontSize: 14, color: colors.gray }} />
                                  <Typography variant="caption" sx={{ fontSize: "11px", color: colors.gray }}>
                                    {edu.year}
                                  </Typography>
                                </Box>
                              </Box>
                              
                              <Chip
                                label={edu.educationType}
                                size="small"
                                sx={{
                                  bgcolor: edu.educationType === '10th' ? colors.primary + '20' : 
                                           edu.educationType === '12th' ? colors.secondary + '20' : 
                                           edu.educationType === 'Bachelor\'s' ? colors.accent + '20' : colors.gray + '20',
                                  color: edu.educationType === '10th' ? colors.primary : 
                                         edu.educationType === '12th' ? colors.secondary : 
                                         edu.educationType === 'Bachelor\'s' ? colors.accent : colors.gray,
                                  fontSize: '10px',
                                  fontWeight: 600,
                                  height: '20px'
                                }}
                              />
                            </Box>
                            
                            {edu.description && (
                              <Typography variant="body2" sx={{ 
                                fontSize: "12px",
                                color: colors.darkGray,
                                mt: 2,
                                fontStyle: 'italic',
                                borderLeft: `3px solid ${colors.gray}30`,
                                pl: 2,
                                py: 0.5
                              }}>
                                {edu.description}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            
            {/* Skills & Achievements Grid */}
            <Grid container spacing={3}>
              {/* Skills Column */}
              <Grid item xs={6}>
                <Paper elevation={0} sx={{ 
                  bgcolor: 'white', 
                  borderRadius: '12px',
                  p: 3,
                  height: '100%',
                  border: `1px solid ${colors.gray}20`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      fontSize: "18px",
                      fontWeight: 700,
                      color: colors.dark,
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      '&::before': {
                        content: '"03"',
                        width: '30px',
                        height: '30px',
                        bgcolor: colors.primary,
                        borderRadius: '8px',
                        mr: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    Core Competencies
                  </Typography>
                  
                  {hasSkills ? (
                    <Grid container spacing={1}>
                      {resumeStore.skills.map((skill) => {
                        const skillLevel = getSkillLevel(skill.level);
                        return (
                          <Grid item xs={6} key={skill.id}>
                            <Box sx={{ mb: 2 }}>
                              <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                                <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 600 }}>
                                  {skill.name}
                                </Typography>
                                <Typography variant="caption" sx={{ fontSize: "10px", color: colors.gray }}>
                                  {skill.level}
                                </Typography>
                              </Box>
                              <Box sx={{
                                height: '6px',
                                bgcolor: colors.gray + '20',
                                borderRadius: '3px',
                                overflow: 'hidden'
                              }}>
                                <Box sx={{
                                  height: '100%',
                                  width: `${(skillLevel / 5) * 100}%`,
                                  bgcolor: skillLevel >= 4 ? colors.primary : 
                                           skillLevel >= 3 ? colors.secondary : colors.accent,
                                  borderRadius: '3px'
                                }} />
                              </Box>
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                  ) : (
                    <Box>
                      <Typography variant="body2" sx={{ fontSize: "13px", color: colors.gray, mb: 2 }}>
                        No skills added yet
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
              
              {/* Achievements Column */}
              <Grid item xs={6}>
                <Paper elevation={0} sx={{ 
                  bgcolor: colors.dark, 
                  borderRadius: '12px',
                  p: 3,
                  height: '100%',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      fontSize: "18px",
                      fontWeight: 700,
                      mb: 3,
                      color: colors.accent,
                      display: 'flex',
                      alignItems: 'center',
                      '&::before': {
                        content: '"🏆"',
                        mr: 1.5,
                        fontSize: '20px'
                      }
                    }}
                  >
                    {hasProjects ? "Notable Projects" : "Certifications"}
                  </Typography>
                  
                  {hasProjects ? (
                    <Box sx={{ '& > div': { mb: 2 } }}>
                      {resumeStore.projects.slice(0, 4).map((project) => (
                        <Box display="flex" alignItems="flex-start" key={project.id}>
                          <Box sx={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            bgcolor: colors.primary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            flexShrink: 0
                          }}>
                            <Typography sx={{ fontSize: "16px", color: 'white', fontWeight: 'bold' }}>📁</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 600 }}>
                              {project.name}
                            </Typography>
                            <Typography variant="caption" sx={{ fontSize: "11px", color: colors.gray }}>
                              {project.description}
                            </Typography>
                            {project.link && (
                              <Typography variant="caption" sx={{ 
                                fontSize: "10px", 
                                color: colors.secondary,
                                display: 'block',
                                mt: 0.5
                              }}>
                                {project.link}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ) : hasCertifications ? (
                    <Box sx={{ '& > div': { mb: 2 } }}>
                      {resumeStore.certifications.slice(0, 4).map((cert) => (
                        <Box display="flex" alignItems="flex-start" key={cert.id}>
                          <Box sx={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            bgcolor: colors.secondary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            flexShrink: 0
                          }}>
                            <Typography sx={{ fontSize: "16px", color: 'white', fontWeight: 'bold' }}>📜</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 600 }}>
                              {cert.name}
                            </Typography>
                            <Typography variant="caption" sx={{ fontSize: "11px", color: colors.gray }}>
                              {cert.issuer} • {cert.date}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ fontSize: "13px", color: colors.gray }}>
                      Add projects or certifications to showcase your achievements
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
            
            {/* Footer Quote */}
            <Box sx={{ 
              mt: 4,
              pt: 3,
              borderTop: `1px solid ${colors.gray}30`,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '60px',
                color: colors.primary + '10',
                fontWeight: 'bold',
                zIndex: 0,
                userSelect: 'none'
              }}>
                {fullName.split(' ')[0]?.toUpperCase() || "RESUME"}
              </Box>
              <Typography variant="body2" sx={{ 
                fontSize: "12px",
                color: colors.primary,
                fontStyle: 'italic',
                fontWeight: 500,
                mb: 1,
                position: 'relative',
                zIndex: 1
              }}>
                {resumeStore.personalInfo.title || "Professional Resume"}
              </Typography>
              <Typography variant="caption" sx={{ 
                color: colors.gray, 
                fontSize: "10px",
                letterSpacing: "0.5px",
                position: 'relative',
                zIndex: 1
              }}>
                Portfolio & References Available Upon Request • {new Date().getFullYear()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  });
};

export default CreativeTemplate;