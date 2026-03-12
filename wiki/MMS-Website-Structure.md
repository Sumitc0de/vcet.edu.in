# VCET MMS Website — File Structure Scheme

> Source: https://vcet.edu.in/mms/
> Department: Master of Management Studies (MBA)
> Approved by AICTE, DTE Maharashtra | Affiliated to University of Mumbai | NAAC Accredited

---

## Root

```
mms/
├── index.html                    ← Home page
├── About_us.html                 ← About page
├── Admission.html                ← Admission Details page
├── Experiental_Learning.html     ← Experiential Learning page
├── Training.html                 ← Training & Placement → Training
├── Placement.html                ← Training & Placement → Placement
├── StudentsLife.html             ← Student's Life page
├── Facilities.html               ← Facilities page
├── FAQS.html                     ← Frequently Asked Questions page
├── FY.pdf                        ← Syllabus → First Year (PDF download)
├── SY_syllabus.pdf               ← Syllabus → Second Year (PDF download)
│
├── Images & Assets
│   ├── VCETLOGO.png              ← College logo (used in header & enquiry popup)
│   ├── VCET.BANNER.png           ← Admission banner / enquiry popup image
│   │
│   ├── Hero / Gallery Carousel
│   │   ├── gal1.jpg
│   │   ├── gal2.jpg
│   │   ├── gal3.JPG
│   │   ├── gal4.jpeg
│   │   ├── gal5.jpeg
│   │   ├── _MG_0233.jpg
│   │   ├── _MG_0244.jpg
│   │   └── _MG_0252.jpg
│   │
│   ├── Summer Internship Logos
│   │   ├── l2.jpeg
│   │   ├── l7.png
│   │   └── logo1.png
│   │
│   ├── Events Carousel
│   │   ├── e1.png
│   │   ├── e2.png
│   │   └── e3.png
│   │
│   ├── About Page
│   │   └── img4.jpeg
│   │
│   └── Facilities Page
│       ├── cl1.png               ← Computer Lab
│       ├── cl2.png               ← Computer Lab
│       └── inf5.jpeg             ← Infrastructure
```

---

## Navigation Structure

```
Navigation
├── HOME                          → index.html
├── ABOUT                         → About_us.html
│   ├── About
│   ├── Principal's Desk
│   ├── HOD's Desk
│   ├── Faculty
│   ├── Vision and Mission
│   ├── Departmental Advisory Board (DAB)
│   └── Program Outcomes (POs)
│
├── ADMISSION DETAILS             → Admission.html
│
├── EXPERIENTIAL LEARNING         → Experiental_Learning.html
│   ├── Information
│   ├── Role Play
│   ├── Group Discussion
│   ├── Entrepreneurial Drive
│   ├── Financial Literacy Program
│   ├── NESCO Bombay Exhibition Centre
│   └── 3D Model Making
│
├── TRAINING & PLACEMENTS         (dropdown — no direct page)
│   ├── TRAINING                  → Training.html
│   │   ├── Training
│   │   ├── Events
│   │   ├── Career Guidance
│   │   ├── Internship
│   │   └── Gallery
│   └── PLACEMENT                 → Placement.html
│
├── STUDENT'S LIFE                → StudentsLife.html
│   ├── V-Ecstatic
│   ├── DLLE
│   ├── Book Review
│   ├── About Add-on Courses
│   ├── Add-on Courses on Power BI
│   ├── Add-on Courses on Advance Excel
│   ├── Industry Expert Session
│   ├── NSIM Training
│   ├── Oscillations
│   ├── IDEATHON 1.0
│   └── Rankers
│
├── SYLLABUS                      (dropdown — no direct page)
│   ├── FIRST YEAR                → FY.pdf
│   └── SECOND YEAR               → SY_syllabus.pdf
│
├── FACILITIES                    → Facilities.html
│   ├── Computer Labs
│   ├── Library
│   ├── Seminar Hall
│   ├── Classroom
│   └── Gymkhana
│
└── FAQ'S                         → FAQS.html
    ├── Course structure (4 semesters / 2 years)
    ├── Specializations (Finance, Marketing, HR, Operations, IT)
    ├── Why MMS at VCET?
    ├── Student intake (120 seats)
    ├── Course timings
    ├── Program fee
    ├── Scholarship facilities
    ├── Placement opportunities
    ├── Documents for reserved category
    ├── Selection process
    ├── Missed deadline procedure
    ├── Institutional / CAP-Vacant seat application
    └── How to reach the institute
```

---

## Home Page Sections (`index.html`)

```
index.html
├── Header
│   ├── Top Banner (college name in English & Marathi)
│   └── Navigation Bar
│
├── Hero Section
│   └── Image Carousel (gal1–gal5, _MG_0233, _MG_0244, _MG_0252)
│
├── Admission Section
│   └── VCET Banner image + CTA
│
├── Summer Internships Section
│   └── Company Logo Carousel (l2, logo1, l7)
│
├── Our Events Section
│   └── Events Image Carousel (e1, e2, e3)
│
├── Testimonials Section
│   ├── Vinay Mayekar  — HR student
│   ├── Mansi Sankhe   — Marketing student
│   └── Janavi Rao     — Entrepreneur
│
├── Experiential Learning Videos Section
│
└── Footer
    ├── College address & contact
    ├── Social links (Facebook, Instagram, YouTube, LinkedIn)
    ├── Useful Links (Mumbai University, AICTE)
    ├── Find Us (Google Maps embed)
    └── Copyright notice
```

---

## Footer (Shared Across All Pages)

```
Footer
├── College Info
│   ├── Logo (VCETLOGO.png)
│   ├── Address: K.T. Marg, Vartak College Campus, Vasai Road (W), Dist-Palghar, Maharashtra 401202
│   ├── Phone:   0250-233 9486
│   └── Email:   mms@vcet.edu.in
│
├── Social Media
│   ├── Facebook   → https://www.facebook.com/vcet.vasai.50/
│   ├── Instagram  → https://www.instagram.com/official.vcet/
│   ├── YouTube    → https://www.youtube.com/channel/UCjBw5a7WU00GwkxaTjF9jqg
│   ├── LinkedIn   → https://www.linkedin.com/school/vcetvasai/
│   └── Main VCET  → https://vcet.edu.in/
│
├── Useful Links
│   ├── Mumbai University → https://www.mu.ac.in/
│   └── AICTE            → https://www.aicte-india.org/
│
└── Find Us
    └── Google Maps (lat: 19.383899, lng: 72.828726)
```

---

## Enquire Now Popup (Global)

```
Enquire Now (floating button / modal — present on all pages)
├── VCET Logo
├── College name header
└── Admission Banner (VCET.BANNER.png)
```

---

## Summary

| Item                  | Count |
|-----------------------|-------|
| HTML Pages            | 9     |
| PDF Downloads         | 2     |
| Navigation Dropdowns  | 2     |
| Footer Social Links   | 5     |
| External Useful Links | 2     |
| Image Assets          | ~20   |
