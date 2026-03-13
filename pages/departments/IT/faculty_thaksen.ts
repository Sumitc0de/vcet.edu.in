import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: "Dr. Thaksen Parvat",
  designation: "Professor & HOD, Dean IT Infrastructure",
  department: "Information Technology",
  dateOfBirth: "04 October 1967",
  dateOfJoining: "20 July 2021",
  email: "thaksen.parvat@vcet.edu.in",
  experienceYears: "30",
  papersPublished: "19",
  photo: "faculty/it/thaksen-parvat.jpg",
  qualifications: [
    "Ph.D. (CSE)",
    "M.E. (CSE)",
    "MBA (Marketing)",
  ],
  specialization: ["Network Security & Management"],
  roles: [
    { icon: "fa-crown",       label: "Head of Department (HOD)" },
    { icon: "fa-server",      label: "Dean IT Infrastructure" },
  ],
  books: [
    { count: 1, title: "Published Book ÔÇô details to be updated" },
  ],
  memberships: [
    { label: "LMCSI",  fullName: "Life Member ÔÇô CSI" },
    { label: "LMISTE", fullName: "Life Member ÔÇô ISTE" },
    { label: "LMIEEE", fullName: "Life Member ÔÇô IEEE" },
  ],
  awards: [
    { icon: "fa-chalkboard-teacher", title: "Best Teacher Award" },
    { icon: "fa-building",           title: "Best Department Award" },
    { icon: "fa-trophy",             title: "Dipex-99" },
  ],
  websites: [
    { href: "https://www.tjparvat.com", icon: "fa-globe", name: "Personal Website", sub: "tjparvat.com" },
  ],
};

export default faculty;
