import type { FacultyData } from '../csds/FacultyProfileView';

import anil from './faculty_anil';
import atharva from './faculty_atharva';
import awantika from './faculty_awantika';
import bhakti from './faculty_bhakti';
import brinal from './faculty_brinal';
import dinesh from './faculty_dinesh';
import joyce from './faculty_joyce';
import manali from './faculty_manali';
import megha from './faculty_megha';
import neha from './faculty_neha';
import sanket from './faculty_sanket';
import shilpa from './faculty_shilpa';
import smita from './faculty_smita';
import sneha from './faculty_sneha';
import soniya from './faculty_soniya';
import sridhar from './faculty_sridhar';
import sunil from './faculty_sunil';
import swapna from './faculty_swapna';
import swati from './faculty_swati';
import sweety from './faculty_sweety';
import vanashree from './faculty_vanashree';
import vinal from './faculty_vinal';
import vishal from './faculty_vishal';

const map: Record<string, FacultyData> = {
  'dr-megha-trivedi': megha,
  'megha-trivedi': megha,
  'dr-dinesh-patil': dinesh,
  'dinesh-patil': dinesh,
  'dr-swapna-borde': swapna,
  'swapna-borde': swapna,
  'anil-hingmire': anil,
  'smita-jawale': smita,
  'sunil-katkar': sunil,
  'dr-swati-varma': swati,
  'swati-varma': swati,
  'sanket-patil': sanket,
  'dr-sneha-mhatre': sneha,
  'sneha-mhatre': sneha,
  'vishal-pande': vishal,
  'neha-surti': neha,
  'brinal-colaco': brinal,
  'sweety-patil': sweety,
  'soniya-khatu': soniya,
  'bhakti-jadhav': bhakti,
  'manali-payghan': manali,
  'vinal-waghela': vinal,
  'joyce-lemos': joyce,
  'sridhar-subramanian': sridhar,
  'atharva-desai': atharva,
  'awantika-sharma': awantika,
  'shilpa-jaiswal': shilpa,
  'vanashree-gaikwad': vanashree,
};

export default map;
