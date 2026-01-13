// src/components/UniversalResumeForm.tsx (Updated)
import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import {
  Box, Typography, TextField, Button, Grid, Chip, IconButton, Paper, List, ListItem,
  ListItemText, Switch, FormControlLabel, Accordion, AccordionSummary, AccordionDetails,
  FormControl, InputLabel, MenuItem, Select, Tabs, Tab, Alert, Rating, Divider
} from "@mui/material";
import {
  Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, ExpandMore as ExpandMoreIcon,
  Work as WorkIcon, School as SchoolIcon, Build as BuildIcon, Person as PersonIcon,
  Description as DescriptionIcon, Language as LanguageIcon, EmojiEvents as AwardIcon,
  Star as StarIcon, CalendarToday as CalendarIcon, LocationOn as LocationIcon
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
  const [expanded, setExpanded] = useState<string | false>(false);

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

  const [expForm, setExpForm] = useState({
    company: "", position: "", startDate: "", endDate: "", location: "", description: "", current: false
  });

  const [skillForm, setSkillForm] = useState({ name: "", level: "Intermediate" as any });
  
  const [projectForm, setProjectForm] = useState({ name: "", description: "", link: "" });

  const [certForm, setCertForm] = useState({ name: "", issuer: "", date: "" });

  // --- Handlers ---
  const handleTabChange = (e: any, newValue: number) => setTabValue(newValue);

  const handlePersonalSave = () => {
    resumeStore.setPersonalInfo(personalForm);
  };

  const handleAddExperience = () => {
    if (!expForm.company || !expForm.position) return;
    resumeStore.addExperience({ ...expForm, id: "" }); // Store will auto-generate ID
    setExpForm({ company: "", position: "", startDate: "", endDate: "", location: "", description: "", current: false });
  };

  const handleAddSkill = () => {
    if (!skillForm.name) return;
    resumeStore.addSkill({ ...skillForm, id: "" });
    setSkillForm({ name: "", level: "Intermediate" });
  };

  const handleAddProject = () => {
    if (!projectForm.name) return;
    resumeStore.addProject({ ...projectForm, id: "" });
    setProjectForm({ name: "", description: "", link: "" });
  };

  const handleAddCertification = () => {
    if (!certForm.name) return;
    resumeStore.addCertification({ ...certForm, id: "" });
    setCertForm({ name: "", issuer: "", date: "" });
  };

  return useObserver(() => (
    <Box sx={{ width: '100%', bgcolor: '#f5f7fa', p: 2, borderRadius: 2 }}>
      <Paper elevation={3} sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab icon={<PersonIcon />} label="Personal" />
          <Tab icon={<WorkIcon />} label="Experience" />
          <Tab icon={<BuildIcon />} label="Skills" />
          <Tab icon={<DescriptionIcon />} label="Projects" />
          <Tab icon={<AwardIcon />} label="Certifications" />
        </Tabs>
      </Paper>

      {/* 1. PERSONAL INFO */}
      <TabPanel value={tabValue} index={0}>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Full Name" value={personalForm.fullName} 
                onChange={(e) => setPersonalForm({...personalForm, fullName: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Professional Title" value={personalForm.title} 
                onChange={(e) => setPersonalForm({...personalForm, title: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={3} label="Summary" value={personalForm.summary} 
                onChange={(e) => setPersonalForm({...personalForm, summary: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" startIcon={<SaveIcon />} onClick={handlePersonalSave}>Save Info</Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      {/* 2. EXPERIENCE */}
      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Add Experience</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><TextField fullWidth label="Company" value={expForm.company} onChange={(e)=>setExpForm({...expForm, company: e.target.value})}/></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Position" value={expForm.position} onChange={(e)=>setExpForm({...expForm, position: e.target.value})}/></Grid>
            <Grid item xs={12}><TextField fullWidth multiline label="Description" value={expForm.description} onChange={(e)=>setExpForm({...expForm, description: e.target.value})}/></Grid>
            <Grid item xs={12}><Button variant="outlined" onClick={handleAddExperience}>Add Work</Button></Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <List>
            {resumeStore.experience.map(exp => (
              <ListItem key={exp.id} secondaryAction={
                <IconButton onClick={() => resumeStore.removeExperience(exp.id)}><DeleteIcon color="error"/></IconButton>
              }>
                <ListItemText primary={exp.position} secondary={exp.company} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </TabPanel>

      {/* 3. SKILLS */}
      <TabPanel value={tabValue} index={2}>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField fullWidth label="Skill Name" value={skillForm.name} onChange={(e)=>setSkillForm({...skillForm, name: e.target.value})}/>
            </Grid>
            <Grid item xs={12} md={5}>
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select value={skillForm.level} label="Level" onChange={(e)=>setSkillForm({...skillForm, level: e.target.value as any})}>
                  {["Beginner", "Intermediate", "Advanced", "Expert"].map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}><Button fullWidth variant="contained" onClick={handleAddSkill}>Add</Button></Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {resumeStore.skills.map(s => (
              <Chip key={s.id} label={`${s.name} (${s.level})`} onDelete={() => resumeStore.removeSkill(s.id)} />
            ))}
          </Box>
        </Paper>
      </TabPanel>

      {/* 4. PROJECTS */}
      <TabPanel value={tabValue} index={3}>
        <Paper sx={{ p: 3 }}>
          <TextField fullWidth label="Project Name" sx={{ mb: 2 }} value={projectForm.name} onChange={(e)=>setProjectForm({...projectForm, name: e.target.value})} />
          <TextField fullWidth multiline rows={2} label="Description" sx={{ mb: 2 }} value={projectForm.description} onChange={(e)=>setProjectForm({...projectForm, description: e.target.value})} />
          <Button variant="contained" onClick={handleAddProject}>Add Project</Button>
          <List>
            {resumeStore.projects.map(p => (
              <ListItem key={p.id} secondaryAction={<IconButton onClick={() => resumeStore.removeProject(p.id)}><DeleteIcon /></IconButton>}>
                <ListItemText primary={p.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </TabPanel>

      {/* 5. CERTIFICATIONS */}
      <TabPanel value={tabValue} index={4}>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><TextField fullWidth label="Certificate Name" value={certForm.name} onChange={(e)=>setCertForm({...certForm, name: e.target.value})}/></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Issuer" value={certForm.issuer} onChange={(e)=>setCertForm({...certForm, issuer: e.target.value})}/></Grid>
            <Grid item xs={12}><Button variant="contained" onClick={handleAddCertification}>Add Certification</Button></Grid>
          </Grid>
          <List>
            {resumeStore.certifications.map(c => (
              <ListItem key={c.id} secondaryAction={<IconButton onClick={() => resumeStore.removeCertification(c.id)}><DeleteIcon /></IconButton>}>
                <ListItemText primary={c.name} secondary={c.issuer} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </TabPanel>
    </Box>
  ));
};

export default UniversalResumeForm;