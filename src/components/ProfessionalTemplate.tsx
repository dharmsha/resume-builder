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
} from "@mui/icons-material";

const CreativeTemplate: React.FC = () => {
  return useObserver(() => {
    // Calculate if we have content
    const hasExperience = resumeStore.experience.length > 0;
    const hasEducation = resumeStore.education.length > 0;
    const hasSkills = resumeStore.skills.length > 0;
    const projects = (resumeStore as any).projects || [];
    const hasProjects = projects.length > 0;
    const languages = (resumeStore as any).languages || [];
    const hasLanguages = languages.length > 0;

    // Extract name and title
    const fullName = resumeStore.personalInfo.fullName || "JOHN DOE";
    const firstName = fullName.split(' ')[0];
    const title = resumeStore.personalInfo.title || "Creative Copywriter";
    
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
    const getSkillLevel = (skillLevel?: number | string): number => {
      if (!skillLevel) return 3;
      
      if (typeof skillLevel === 'string') {
        switch(skillLevel.toLowerCase()) {
          case 'beginner': return 2;
          case 'intermediate': return 3;
          case 'advanced': return 4;
          case 'expert': return 5;
          default: return 3;
        }
      }
      
      return Math.min(5, Math.max(1, Math.floor(skillLevel)));
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
                    const skillLevel = getSkillLevel((skill as any).level);
                    
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
                  {languages.slice(0, 4).map((lang: any, index: number) => {
                    const proficiencyWidth = getLanguageProficiencyWidth(lang.proficiency);
                    
                    return (
                      <Box key={index}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                          <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 600 }}>
                            {lang.name || `Language ${index + 1}`}
                          </Typography>
                          <Typography variant="caption" sx={{ fontSize: "10px", color: colors.gray }}>
                            {lang.proficiency || "Native"}
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
                {['Creative Writing', 'Content Strategy', 'Digital Marketing', 'Brand Development', 
                  'Photography', 'Travel', 'Music', 'Design'].map((interest, i) => (
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
          </Grid>
          
          {/* Right Content Area */}
          <Grid item xs={8} sx={{ p: 4, bgcolor: colors.light }}>
            
            {/* About/Summary */}
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
                  {resumeStore.personalInfo.summary || 
                    "Creative visionary with a passion for storytelling and brand development. With 5+ years of experience in crafting compelling narratives, I specialize in transforming complex ideas into engaging content that resonates with audiences. My expertise spans across SEO optimization, digital marketing strategy, and multi-platform content creation. Award-winning writer with proven track record of increasing engagement and driving business growth through innovative content strategies."}
                </Typography>
              </Box>
            </Box>
            
            {/* Experience - Timeline Style */}
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
              
              {hasExperience ? (
                resumeStore.experience.map((exp, index) => (
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
                            {exp.company} • {(exp as any).location || 'Remote'}
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
                      {(exp as any).skills && (
                        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {((exp as any).skills || []).slice(0, 5).map((skill: string, i: number) => (
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
                ))
              ) : (
                <>
                  {/* Example Experience 1 */}
                  <Box 
                    sx={{ 
                      position: 'relative',
                      pl: 4,
                      mb: 4
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
                            Lead Copywriter
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
                            Burton Agency • New York, NY
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
                            01/2022 - Present
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
                        <li>Led content strategy for major clients, increasing social media engagement by 45% across platforms</li>
                        <li>Managed a team of 5 junior writers, improving content quality and reducing turnaround time by 30%</li>
                        <li>Developed brand voice guidelines for 10+ major clients, ensuring consistent messaging across all channels</li>
                        <li>Increased client retention rate by 25% through data-driven content performance analysis</li>
                      </Box>
                      
                      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {['Content Strategy', 'Team Leadership', 'Brand Development', 'SEO', 'Data Analysis'].map((skill, i) => (
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
                    </Box>
                  </Box>
                  
                  {/* Example Experience 2 */}
                  <Box 
                    sx={{ 
                      position: 'relative',
                      pl: 4,
                      mb: 4
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
                        borderLeft: `4px solid ${colors.secondary}`
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
                            Senior Content Writer
                          </Typography>
                          <Typography variant="body1" sx={{ 
                            fontSize: "14px",
                            color: colors.secondary,
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}>
                            <LocationIcon sx={{ fontSize: 14 }} />
                            Think Co. • San Francisco, CA
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
                            03/2018 - 12/2021
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
                            color: colors.secondary,
                            fontWeight: 'bold',
                            fontSize: '14px',
                            mr: 1.5,
                            flexShrink: 0
                          }
                        }
                      }}>
                        <li>Created SEO-optimized content that increased organic traffic by 75% year-over-year</li>
                        <li>Produced award-winning blog series that generated 500k+ monthly readers</li>
                        <li>Collaborated with marketing team to develop content calendar and strategy</li>
                        <li>Trained 3 junior writers on SEO best practices and content creation techniques</li>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
            
            {/* Education & Achievements Grid */}
            <Grid container spacing={3}>
              {/* Education Column */}
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
                        content: '""',
                        width: '8px',
                        height: '8px',
                        bgcolor: colors.secondary,
                        borderRadius: '50%',
                        mr: 1.5
                      }
                    }}
                  >
                    Education & Certifications
                  </Typography>
                  
                  {hasEducation ? (
                    resumeStore.education.map((edu) => (
                      <Box key={edu.id} mb={3} pb={2} sx={{ borderBottom: `1px solid ${colors.gray}20` }}>
                        <Typography variant="h3" sx={{ 
                          fontSize: "14px", 
                          fontWeight: 700,
                          color: colors.dark,
                          mb: 0.5
                        }}>
                          {edu.degree}
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          fontSize: "13px",
                          color: colors.primary,
                          fontWeight: 600,
                          mb: 1
                        }}>
                          {edu.institution}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="caption" sx={{ fontSize: "11px", color: colors.gray }}>
                            {edu.location}
                          </Typography>
                          <Box sx={{
                            bgcolor: colors.accent + '20',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '12px'
                          }}>
                            <Typography variant="caption" sx={{ 
                              fontSize: "10px",
                              fontWeight: 600,
                              color: colors.dark
                            }}>
                              {edu.year}
                            </Typography>
                          </Box>
                        </Box>
                        {edu.score && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" sx={{ 
                              fontSize: "11px", 
                              fontWeight: 600,
                              color: colors.secondary
                            }}>
                              GPA: {edu.score}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Box mb={3} pb={2} sx={{ borderBottom: `1px solid ${colors.gray}20` }}>
                      <Typography variant="h3" sx={{ 
                        fontSize: "14px", 
                        fontWeight: 700,
                        color: colors.dark,
                        mb: 0.5
                      }}>
                        BA in Journalism & Communications
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontSize: "13px",
                        color: colors.primary,
                        fontWeight: 600,
                        mb: 1
                      }}>
                        University of California, Berkeley
                      </Typography>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ fontSize: "11px", color: colors.gray }}>
                          Berkeley, CA
                        </Typography>
                        <Box sx={{
                          bgcolor: colors.accent + '20',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '12px'
                        }}>
                          <Typography variant="caption" sx={{ 
                            fontSize: "10px",
                            fontWeight: 600,
                            color: colors.dark
                          }}>
                            2014 - 2018
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="caption" sx={{ 
                          fontSize: "11px", 
                          fontWeight: 600,
                          color: colors.secondary
                        }}>
                          Honors: Magna Cum Laude
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  
                  {/* Certifications */}
                  <Box mt={3}>
                    <Typography variant="body2" sx={{ 
                      fontSize: "12px",
                      fontWeight: 600,
                      color: colors.dark,
                      mb: 1.5
                    }}>
                      Certifications
                    </Typography>
                    <Box component="ul" sx={{ 
                      pl: 1.5, 
                      mb: 0,
                      '& li': {
                        fontSize: "11px",
                        color: colors.darkGray,
                        mb: 0.75,
                        display: 'flex',
                        alignItems: 'center',
                        '&::before': {
                          content: '"✓"',
                          color: colors.primary,
                          fontWeight: 'bold',
                          mr: 1
                        }
                      }
                    }}>
                      <li>Google Analytics Certification (2023)</li>
                      <li>HubSpot Content Marketing Certified (2022)</li>
                      <li>SEO Specialist - Moz Academy (2021)</li>
                      <li>Copywriting Masterclass - AWAI (2020)</li>
                    </Box>
                  </Box>
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
                    Key Achievements
                  </Typography>
                  
                  <Box sx={{ '& > div': { mb: 2 } }}>
                    <Box display="flex" alignItems="flex-start">
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
                        <StarIcon sx={{ fontSize: 16, color: 'white' }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 600 }}>
                          Content Performance
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: "11px", color: colors.gray }}>
                          Increased social engagement by 34% and boosted sales by 67% in 4 months
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box display="flex" alignItems="flex-start">
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
                        <LanguageIcon sx={{ fontSize: 16, color: 'white' }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 600 }}>
                          Global Reach
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: "11px", color: colors.gray }}>
                          Created bilingual content reaching 100k+ readers across 15 countries weekly
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box display="flex" alignItems="flex-start">
                      <Box sx={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        bgcolor: colors.accent,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0
                      }}>
                        <Typography sx={{ fontSize: "16px", color: colors.dark, fontWeight: 'bold' }}>🏆</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 600 }}>
                          Awards & Recognition
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: "11px", color: colors.gray }}>
                          2022 Content Marketing Award • 3x "Best Blog" nominee
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box display="flex" alignItems="flex-start">
                      <Box sx={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        bgcolor: '#FF6B6B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0
                      }}>
                        <Typography sx={{ fontSize: "14px", color: 'white', fontWeight: 'bold' }}>📈</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 600 }}>
                          Team Leadership
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: "11px", color: colors.gray }}>
                          Managed team of 5 writers, improved efficiency by 30% through training
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* Projects */}
                  {hasProjects && (
                    <Box mt={3}>
                      <Typography variant="body2" sx={{ 
                        fontSize: "14px",
                        fontWeight: 600,
                        color: colors.accent,
                        mb: 1.5
                      }}>
                        Notable Projects
                      </Typography>
                      {projects.slice(0, 2).map((project: any, index: number) => (
                        <Box key={index} mb={1.5}>
                          <Typography variant="caption" sx={{ 
                            fontSize: "11px",
                            fontWeight: 600,
                            color: 'white'
                          }}>
                            {project.title || `Brand Voice Development`}
                          </Typography>
                          <Typography variant="caption" sx={{ 
                            fontSize: "10px",
                            color: colors.gray,
                            display: 'block'
                          }}>
                            {project.description || "Developed comprehensive brand voice guidelines for 10+ major clients"}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
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
                CREATIVE
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
                "Great content is the bridge between confusion and clarity."
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