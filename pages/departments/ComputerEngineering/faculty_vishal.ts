import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: "Mr. Vishal Pande",
  designation: "Assistant Professor",
  department: "Computer Engineering",
  dateOfJoining: "10 July 2005",
  email: "vishal.pande@vcet.edu.in",
  experienceYears: "21",
  papersPublished: "14",
  photo: "faculty/ce/vishal-pande.jpg",
  qualifications: [
    "M.E.",
  ],
  specialization: [
    "Process Instrumentation",
  ],
  patents: [
    { title: "Published IPR / Patent 1 ÔÇô details to be updated" },
    { title: "Published IPR / Patent 2 ÔÇô details to be updated" },
  ],
  memberships: [
    "ISTE",
    "ISOI",
  ],
  eResources: [
    {
      title: "SCCD ÔÇô Google Classroom (Code 1)",
      icon: "fa-laptop-code",
      url: "https://classroom.google.com",
      code: "agoocnv",
    },
    {
      title: "SCCD ÔÇô Google Classroom (Code 2)",
      icon: "fa-laptop-code",
      url: "https://classroom.google.com",
      code: "k2lre3p",
    },
    {
      title: "COA Semester VI ÔÇô Google Classroom",
      icon: "fa-microchip",
      url: "https://classroom.google.com",
      code: "fbyp3py",
    },
  ],
};

export default faculty;
