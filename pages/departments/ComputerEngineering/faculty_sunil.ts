import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: "Mr. Sunil Katkar",
  designation: "Assistant Professor",
  department: "Computer Engineering",
  dateOfJoining: "15 July 2005",
  email: "sunil.katkar@vcet.edu.in",
  experienceYears: "18",
  papersPublished: "9",
  photo: "faculty/ce/sunil-katkar.jpg",
  qualifications: [
    "M.E. ÔÇô First Class",
  ],
  specialization: [
    "Data Compression",
    "Computer Graphics",
  ],
  patents: [
    { title: "Published Patent 1 ÔÇô details to be updated" },
    { title: "Published Patent 2 ÔÇô details to be updated" },
  ],
  memberships: [
    "ISTE ÔÇô LM 128571",
  ],
  eResources: [
    {
      title: "Computer Graphics ÔÇô Google Classroom",
      icon: "fa-paint-brush",
      url: "https://classroom.google.com",
      code: "u7oi3ta",
    },
  ],
};

export default faculty;
