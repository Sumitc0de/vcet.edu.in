import type { FacultyData } from '../csds/FacultyProfileView';

import kshitija from './faculty_kshitija';
import nehaRaut from './faculty_neha_raut';
import raunak from './faculty_raunak';
import rujuta from './faculty_rujuta';
import sejal from './faculty_sejal';
import snehaYadav from './faculty_sneha_yadav';
import tatwadarshi from './faculty_tatwadarshi';

const map: Record<string, FacultyData> = {
  'dr-tatwadarshi-nagarhalli': tatwadarshi,
  'tatwadarshi-nagarhalli': tatwadarshi,
  'sejal-dmello': sejal,
  'sneha-yadav': snehaYadav,
  'neha-raut': nehaRaut,
  'kshitija-gharat': kshitija,
  'raunak-joshi': raunak,
  'rujuta-vartak': rujuta,
  'sweety-patil': rujuta,
};

export default map;
