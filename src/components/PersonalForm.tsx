// src/components/UniversalResumeForm.tsx
import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import {
  Box, Typography, TextField, Button, Grid, Chip, IconButton, Paper, List, ListItem,
  ListItemText, Switch, FormControlLabel, FormControl, InputLabel, MenuItem, 
  Select, Tabs, Tab, Divider, SelectChangeEvent
} from "@mui/material";
import {
  Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon,
  Work as WorkIcon, School as SchoolIcon, Build as BuildIcon, Person as PersonIcon,
  Description as DescriptionIcon, Language as LanguageIcon, EmojiEvents as AwardIcon,
  CalendarToday as CalendarIcon, LocationOn as LocationIcon
} from "@mui/icons-material";
import { resumeStore } from "@/store/resumeStore";

// --- Tab Panel Helper ---
function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const UniversalResumeForm: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  // --- Form Local States ---
  const [personalForm, setPersonalForm] = useState({
    fullName: resumeStore.personalInfo.fullName,
    title: resumeStore.personalInfo.title,
    email: resumeStore.personalInfo.email,
    phone: resumeStore.personalInfo.phone,
    address: resumeStore.personalInfo.address,
    linkedin: resumeStore.personalInfo.linkedin,
    summary: resumeStore.personalInfo.summary,
  });

  const [eduForm, setEduForm] = useState({
    educationType: "Bachelor's" as "10th" | "12th" | "Diploma" | "Bachelor's" | "Master's" | "PhD" | "Other",
    degree: "",
    institution: "",
    boardUniversity: "",
    year: "",
    scoreType: "Percentage" as "Percentage" | "CGPA" | "GPA",
    score: "",
    location: "",
    description: ""
  });

  const [expForm, setExpForm] = useState({
    company: "", 
    position: "", 
    startDate: "", 
    endDate: "", 
    location: "", 
    description: "", 
    current: false
  });

  const [skillForm, setSkillForm] = useState({ 
    name: "", 
    level: "Intermediate" as "Beginner" | "Intermediate" | "Advanced" | "Expert" 
  });
  
  const [projectForm, setProjectForm] = useState({ 
    name: "", 
    description: "", 
    link: "" 
  });

  const [langForm, setLangForm] = useState({ 
    name: "", 
    proficiency: "Intermediate" as "Beginner" | "Intermediate" | "Advanced" | "Fluent" | "Native" 
  });

  const [certForm, setCertForm] = useState({ 
    name: "", 
    issuer: "", 
    date: "" 
  });

  // --- Handlers ---
  const handleTabChange = (e: any, newValue: number) => setTabValue(newValue);

  const handlePersonalSave = () => {
    resumeStore.setPersonalInfo(personalForm);
  };

  const handleAddEducation = () => {
    if (!eduForm.degree || !eduForm.institution || !eduForm.year || !eduForm.score) {
      alert("Please fill all required fields: Degree, Institution, Year, and Score");
      return;
    }
    resumeStore.addEducation({ ...eduForm, id: "" });
    setEduForm({
      educationType: "Bachelor's",
      degree: "",
      institution: "",
      boardUniversity: "",
      year: "",
      scoreType: "Percentage",
      score: "",
      location: "",
      description: ""
    });
  };

  const handleAddExperience = () => {
    if (!expForm.company || !expForm.position) {
      alert("Please fill Company and Position fields");
      return;
    }
    resumeStore.addExperience({ ...expForm, id: "" });
    setExpForm({ 
      company: "", 
      position: "", 
      startDate: "", 
      endDate: "", 
      location: "", 
      description: "", 
      current: false 
    });
  };

  const handleAddSkill = () => {
    if (!skillForm.name) {
      alert("Please enter a skill name");
      return;
    }
    resumeStore.addSkill({ ...skillForm, id: "" });
    setSkillForm({ name: "", level: "Intermediate" });
  };

  const handleAddProject = () => {
    if (!projectForm.name) {
      alert("Please enter a project name");
      return;
    }
    resumeStore.addProject({ ...projectForm, id: "" });
    setProjectForm({ name: "", description: "", link: "" });
  };

  const handleAddLanguage = () => {
    if (!langForm.name) {
      alert("Please enter a language name");
      return;
    }
    resumeStore.addLanguage({ ...langForm, id: "" });
    setLangForm({ name: "", proficiency: "Intermediate" });
  };

  const handleAddCertification = () => {
    if (!certForm.name) {
      alert("Please enter a certification name");
      return;
    }
    resumeStore.addCertification({ ...certForm, id: "" });
    setCertForm({ name: "", issuer: "", date: "" });
  };

  return useObserver(() => (
    <Box sx={{ width: '100%', bgcolor: '#f5f7fa', p: 2, borderRadius: 2 }}>
      <Paper elevation={3} sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable" 
          scrollButtons="auto"
        >
          <Tab icon={<PersonIcon />} label="Personal" />
          <Tab icon={<SchoolIcon />} label="Education" />
          <Tab icon={<WorkIcon />} label="Experience" />
          <Tab icon={<BuildIcon />} label="Skills" />
          <Tab icon={<LanguageIcon />} label="Languages" />
          <Tab icon={<DescriptionIcon />} label="Projects" />
          <Tab icon={<AwardIcon />} label="Certifications" />
        </Tabs>
      </Paper>

      {/* 1. PERSONAL INFO */}
      <TabPanel value={tabValue} index={0}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Personal Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Full Name" 
                value={personalForm.fullName} 
                onChange={(e) => setPersonalForm({...personalForm, fullName: e.target.value})} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Professional Title" 
                value={personalForm.title} 
                onChange={(e) => setPersonalForm({...personalForm, title: e.target.value})} 
                placeholder="e.g., Software Developer, Graphic Designer"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Email" 
                type="email"
                value={personalForm.email} 
                onChange={(e) => setPersonalForm({...personalForm, email: e.target.value})} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Phone" 
                value={personalForm.phone} 
                onChange={(e) => setPersonalForm({...personalForm, phone: e.target.value})} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Address" 
                value={personalForm.address} 
                onChange={(e) => setPersonalForm({...personalForm, address: e.target.value})} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="LinkedIn Profile (Optional)" 
                value={personalForm.linkedin} 
                onChange={(e) => setPersonalForm({...personalForm, linkedin: e.target.value})} 
                placeholder="https://linkedin.com/in/username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                multiline 
                rows={4} 
                label="Professional Summary" 
                value={personalForm.summary} 
                onChange={(e) => setPersonalForm({...personalForm, summary: e.target.value})} 
                placeholder="Briefly describe your professional background, skills, and career objectives..."
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />} 
                onClick={handlePersonalSave}
                sx={{ mt: 2 }}
              >
                Save Personal Information
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      {/* 2. EDUCATION */}
      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Add Education</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Education Type</InputLabel>
                <Select
                  value={eduForm.educationType}
                  label="Education Type"
                  onChange={(e: SelectChangeEvent) => 
                    setEduForm({...eduForm, educationType: e.target.value as any})
                  }
                >
                  <MenuItem value="10th">10th / Secondary</MenuItem>
                  <MenuItem value="12th">12th / Higher Secondary</MenuItem>
                  <MenuItem value="Diploma">Diploma</MenuItem>
                  <MenuItem value="Bachelor's">Bachelor's Degree</MenuItem>
                  <MenuItem value="Master's">Master's Degree</MenuItem>
                  <MenuItem value="PhD">PhD / Doctorate</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Degree / Qualification" 
                value={eduForm.degree} 
                onChange={(e) => setEduForm({...eduForm, degree: e.target.value})}
                placeholder="e.g., B.Tech Computer Science, 12th Science"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Institution / School" 
                value={eduForm.institution} 
                onChange={(e) => setEduForm({...eduForm, institution: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Board / University (Optional)" 
                value={eduForm.boardUniversity} 
                onChange={(e) => setEduForm({...eduForm, boardUniversity: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Year / Duration" 
                value={eduForm.year} 
                onChange={(e) => setEduForm({...eduForm, year: e.target.value})}
                placeholder="e.g., 2020-2024, 2022"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Score Type</InputLabel>
                <Select
                  value={eduForm.scoreType}
                  label="Score Type"
                  onChange={(e: SelectChangeEvent) => 
                    setEduForm({...eduForm, scoreType: e.target.value as any})
                  }
                >
                  <MenuItem value="Percentage">Percentage (%)</MenuItem>
                  <MenuItem value="CGPA">CGPA</MenuItem>
                  <MenuItem value="GPA">GPA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Score / Percentage / CGPA" 
                value={eduForm.score} 
                onChange={(e) => setEduForm({...eduForm, score: e.target.value})}
                placeholder="e.g., 85%, 3.8/4.0, 9.2/10"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Location" 
                value={eduForm.location} 
                onChange={(e) => setEduForm({...eduForm, location: e.target.value})}
                placeholder="e.g., New Delhi, India"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                multiline 
                rows={2}
                label="Additional Details / Achievements (Optional)" 
                value={eduForm.description} 
                onChange={(e) => setEduForm({...eduForm, description: e.target.value})}
                placeholder="e.g., School Topper, Honors, Relevant coursework..."
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                onClick={handleAddEducation}
                sx={{ mt: 2 }}
              >
                Add Education
              </Button>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>Your Education</Typography>
          {resumeStore.education.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
              No education entries yet. Add your first education above.
            </Typography>
          ) : (
            <List>
              {resumeStore.education.map(edu => (
                <ListItem 
                  key={edu.id}
                  sx={{ 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1, 
                    mb: 1,
                    bgcolor: '#fafafa'
                  }}
                  secondaryAction={
                    <IconButton 
                      onClick={() => resumeStore.removeEducation(edu.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText 
                    primary={
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {edu.degree}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          {edu.institution}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2">
                          <strong>Type:</strong> {edu.educationType} • 
                          <strong> Year:</strong> {edu.year} • 
                          <strong> Score:</strong> {edu.score} {edu.scoreType}
                        </Typography>
                        {edu.location && (
                          <Typography variant="body2">
                            <strong>Location:</strong> {edu.location}
                          </Typography>
                        )}
                        {edu.description && (
                          <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 0.5 }}>
                            {edu.description}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </TabPanel>

      {/* 3. EXPERIENCE */}
      <TabPanel value={tabValue} index={2}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Add Work Experience</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Company / Organization" 
                value={expForm.company} 
                onChange={(e) => setExpForm({...expForm, company: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Position / Role" 
                value={expForm.position} 
                onChange={(e) => setExpForm({...expForm, position: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Start Date" 
                value={expForm.startDate} 
                onChange={(e) => setExpForm({...expForm, startDate: e.target.value})}
                placeholder="e.g., Jan 2022, 03/2022"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="End Date" 
                value={expForm.endDate} 
                onChange={(e) => setExpForm({...expForm, endDate: e.target.value})}
                placeholder="e.g., Present, Dec 2023"
                disabled={expForm.current}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={expForm.current} 
                    onChange={(e) => setExpForm({...expForm, current: e.target.checked})}
                  />
                }
                label="I currently work here"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Location" 
                value={expForm.location} 
                onChange={(e) => setExpForm({...expForm, location: e.target.value})}
                placeholder="e.g., Remote, Mumbai, India"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                multiline 
                rows={4}
                label="Description & Responsibilities" 
                value={expForm.description} 
                onChange={(e) => setExpForm({...expForm, description: e.target.value})}
                placeholder="Describe your responsibilities, achievements, and contributions..."
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                onClick={handleAddExperience}
                sx={{ mt: 2 }}
              >
                Add Experience
              </Button>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>Your Work Experience</Typography>
          {resumeStore.experience.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
              No work experience entries yet. Add your first experience above.
            </Typography>
          ) : (
            <List>
              {resumeStore.experience.map(exp => (
                <ListItem 
                  key={exp.id}
                  sx={{ 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1, 
                    mb: 1,
                    bgcolor: '#fafafa'
                  }}
                  secondaryAction={
                    <IconButton 
                      onClick={() => resumeStore.removeExperience(exp.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText 
                    primary={
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {exp.position}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          {exp.company}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2">
                          <strong>Duration:</strong> {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          {exp.location && ` • Location: ${exp.location}`}
                        </Typography>
                        {exp.description && (
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {exp.description}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </TabPanel>

      {/* 4. SKILLS */}
      <TabPanel value={tabValue} index={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Add Skills</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={7}>
              <TextField 
                fullWidth 
                label="Skill Name" 
                value={skillForm.name} 
                onChange={(e) => setSkillForm({...skillForm, name: e.target.value})}
                placeholder="e.g., JavaScript, Photoshop, Project Management"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Proficiency Level</InputLabel>
                <Select
                  value={skillForm.level}
                  label="Proficiency Level"
                  onChange={(e: SelectChangeEvent) => 
                    setSkillForm({...skillForm, level: e.target.value as any})
                  }
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                  <MenuItem value="Expert">Expert</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button 
                fullWidth 
                variant="contained" 
                onClick={handleAddSkill}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>Your Skills</Typography>
            {resumeStore.skills.length === 0 ? (
              <Typography color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
                No skills added yet. Add your first skill above.
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {resumeStore.skills.map(skill => (
                  <Chip 
                    key={skill.id}
                    label={`${skill.name} (${skill.level})`}
                    onDelete={() => resumeStore.removeSkill(skill.id)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
          </Box>
        </Paper>
      </TabPanel>

      {/* 5. LANGUAGES */}
      <TabPanel value={tabValue} index={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Add Languages</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={7}>
              <TextField 
                fullWidth 
                label="Language" 
                value={langForm.name} 
                onChange={(e) => setLangForm({...langForm, name: e.target.value})}
                placeholder="e.g., English, Hindi, Spanish"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Proficiency</InputLabel>
                <Select
                  value={langForm.proficiency}
                  label="Proficiency"
                  onChange={(e: SelectChangeEvent) => 
                    setLangForm({...langForm, proficiency: e.target.value as any})
                  }
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                  <MenuItem value="Fluent">Fluent</MenuItem>
                  <MenuItem value="Native">Native</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button 
                fullWidth 
                variant="contained" 
                onClick={handleAddLanguage}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>Your Languages</Typography>
            {resumeStore.languages.length === 0 ? (
              <Typography color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
                No languages added yet. Add your first language above.
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {resumeStore.languages.map(lang => (
                  <Chip 
                    key={lang.id}
                    label={`${lang.name} (${lang.proficiency})`}
                    onDelete={() => resumeStore.removeLanguage(lang.id)}
                    color="secondary"
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
          </Box>
        </Paper>
      </TabPanel>

      {/* 6. PROJECTS */}
      <TabPanel value={tabValue} index={5}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Add Projects</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Project Name" 
                value={projectForm.name} 
                onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                multiline 
                rows={3}
                label="Description" 
                value={projectForm.description} 
                onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                placeholder="Describe the project, your role, technologies used, and outcomes..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Project Link (Optional)" 
                value={projectForm.link} 
                onChange={(e) => setProjectForm({...projectForm, link: e.target.value})}
                placeholder="e.g., GitHub URL, Live Demo, Portfolio link"
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                onClick={handleAddProject}
                sx={{ mt: 2 }}
              >
                Add Project
              </Button>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>Your Projects</Typography>
          {resumeStore.projects.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
              No projects added yet. Add your first project above.
            </Typography>
          ) : (
            <List>
              {resumeStore.projects.map(project => (
                <ListItem 
                  key={project.id}
                  sx={{ 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1, 
                    mb: 1,
                    bgcolor: '#fafafa'
                  }}
                  secondaryAction={
                    <IconButton 
                      onClick={() => resumeStore.removeProject(project.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {project.name}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2">
                          {project.description}
                        </Typography>
                        {project.link && (
                          <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                            <strong>Link:</strong> {project.link}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </TabPanel>

      {/* 7. CERTIFICATIONS */}
      <TabPanel value={tabValue} index={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Add Certifications</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Certificate Name" 
                value={certForm.name} 
                onChange={(e) => setCertForm({...certForm, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Issuing Organization" 
                value={certForm.issuer} 
                onChange={(e) => setCertForm({...certForm, issuer: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Date Issued" 
                value={certForm.date} 
                onChange={(e) => setCertForm({...certForm, date: e.target.value})}
                placeholder="e.g., Jan 2023, 03/2023"
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                onClick={handleAddCertification}
                sx={{ mt: 2 }}
              >
                Add Certification
              </Button>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>Your Certifications</Typography>
          {resumeStore.certifications.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
              No certifications added yet. Add your first certification above.
            </Typography>
          ) : (
            <List>
              {resumeStore.certifications.map(cert => (
                <ListItem 
                  key={cert.id}
                  sx={{ 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1, 
                    mb: 1,
                    bgcolor: '#fafafa'
                  }}
                  secondaryAction={
                    <IconButton 
                      onClick={() => resumeStore.removeCertification(cert.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {cert.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2">
                        <strong>Issued by:</strong> {cert.issuer} • <strong>Date:</strong> {cert.date}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </TabPanel>
    </Box>
  ));
};

export default UniversalResumeForm;