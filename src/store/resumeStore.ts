// src/store/resumeStore.ts
import { types, Instance, SnapshotIn, applySnapshot } from "mobx-state-tree";

// --- MODELS ---
export const PersonalInfo = types.model("PersonalInfo", {
  id: types.identifier,
  fullName: types.string,
  title: types.optional(types.string, ""),
  photo: types.optional(types.string, ""),
  email: types.string,
  phone: types.string,
  address: types.string,
  linkedin: types.optional(types.string, ""),
  github: types.optional(types.string, ""),
  summary: types.string
});

export const Education = types.model("Education", {
  id: types.identifier,
  educationType: types.enumeration(["10th", "12th", "Diploma", "Bachelor's", "Master's", "PhD", "Other"]),
  degree: types.string,
  institution: types.string,
  boardUniversity: types.optional(types.string, ""),
  year: types.string,
  scoreType: types.enumeration(["Percentage", "CGPA", "GPA"]),
  score: types.string,
  location: types.string,
  description: types.optional(types.string, "")
});

export const Experience = types.model("Experience", {
  id: types.identifier,
  company: types.string,
  position: types.string,
  location: types.optional(types.string, "Remote"),
  startDate: types.string,
  endDate: types.string,
  description: types.string,
  current: types.boolean,
  skills: types.optional(types.array(types.string), [])
});

export const Skill = types.model("Skill", {
  id: types.identifier,
  name: types.string,
  level: types.enumeration(["Beginner", "Intermediate", "Advanced", "Expert"])
});

export const Project = types.model("Project", {
  id: types.identifier,
  name: types.string,
  description: types.string,
  link: types.optional(types.string, "")
});

export const Language = types.model("Language", {
  id: types.identifier,
  name: types.string,
  proficiency: types.enumeration(["Beginner", "Intermediate", "Advanced", "Fluent", "Native"])
});

export const Certification = types.model("Certification", {
  id: types.identifier,
  name: types.string,
  issuer: types.string,
  date: types.string
});

// --- MAIN STORE ---
const ResumeStore = types
  .model("ResumeStore", {
    personalInfo: PersonalInfo,
    education: types.array(Education),
    experience: types.array(Experience),
    skills: types.array(Skill),
    projects: types.optional(types.array(Project), []),
    languages: types.optional(types.array(Language), []),
    certifications: types.optional(types.array(Certification), []),
    selectedTemplate: types.string
  })
  .actions((self) => ({
    // Personal Info Actions
    setPersonalInfo(info: Partial<SnapshotIn<typeof PersonalInfo>>) {
      Object.assign(self.personalInfo, info);
    },
    
    // Education Actions
    addEducation(edu: SnapshotIn<typeof Education>) {
      self.education.push(Education.create({ ...edu, id: Date.now().toString() }));
    },
    updateEducation(id: string, updates: Partial<SnapshotIn<typeof Education>>) {
      const education = self.education.find(edu => edu.id === id);
      if (education) {
        Object.assign(education, updates);
      }
    },
    removeEducation(id: string) {
      const index = self.education.findIndex(edu => edu.id === id);
      if (index !== -1) self.education.splice(index, 1);
    },
    
    // Experience Actions
    addExperience(exp: SnapshotIn<typeof Experience>) {
      self.experience.push(Experience.create({ ...exp, id: Date.now().toString() }));
    },
    removeExperience(id: string) {
      const index = self.experience.findIndex(exp => exp.id === id);
      if (index !== -1) self.experience.splice(index, 1);
    },
    
    // Skills Actions
    addSkill(skill: SnapshotIn<typeof Skill>) {
      self.skills.push(Skill.create({ ...skill, id: Date.now().toString() }));
    },
    removeSkill(id: string) {
      const index = self.skills.findIndex(s => s.id === id);
      if (index !== -1) self.skills.splice(index, 1);
    },

    // Projects Actions
    addProject(project: SnapshotIn<typeof Project>) {
      self.projects.push(Project.create({ ...project, id: Date.now().toString() }));
    },
    removeProject(id: string) {
      const index = self.projects.findIndex(p => p.id === id);
      if (index !== -1) self.projects.splice(index, 1);
    },

    // Language Actions
    addLanguage(lang: SnapshotIn<typeof Language>) {
      self.languages.push(Language.create({ ...lang, id: Date.now().toString() }));
    },
    removeLanguage(id: string) {
      const index = self.languages.findIndex(l => l.id === id);
      if (index !== -1) self.languages.splice(index, 1);
    },

    // Certification Actions
    addCertification(cert: SnapshotIn<typeof Certification>) {
      self.certifications.push(Certification.create({ ...cert, id: Date.now().toString() }));
    },
    removeCertification(id: string) {
      const index = self.certifications.findIndex(c => c.id === id);
      if (index !== -1) self.certifications.splice(index, 1);
    },
    
    setTemplate(template: string) {
      self.selectedTemplate = template;
    },
    
    reset() {
      applySnapshot(self, {
        personalInfo: {
          id: "1",
          fullName: "",
          title: "",
          photo: "",
          email: "",
          phone: "",
          address: "",
          linkedin: "",
          github: "",
          summary: ""
        },
        education: [],
        experience: [],
        skills: [],
        projects: [],
        languages: [],
        certifications: [],
        selectedTemplate: "creative"
      });
    }
  }));

export type IResumeStore = Instance<typeof ResumeStore>;

// Initial Instance - COMPLETELY EMPTY for multiple users
export const resumeStore = ResumeStore.create({
  personalInfo: {
    id: "1",
    fullName: "",           // <-- Changed from "John Doe"
    title: "",             // <-- Changed from "Creative Copywriter"
    photo: "",
    email: "",             // <-- Changed from "john.doe@example.com"
    phone: "",             // <-- Changed from "+1 (123) 456-7890"
    address: "",           // <-- Changed from "New York, USA"
    linkedin: "",
    github: "",
    summary: ""            // <-- Changed from long example summary
  },
  education: [],           // <-- Changed from example education data
  experience: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
  selectedTemplate: "creative"
});