import type { FacultyData } from '../csds/FacultyProfileView';

import anagha from './faculty_anagha';
import archana from './faculty_archana';
import chandan from './faculty_chandan';
import jessica from './faculty_jessica';
import madhavi from './faculty_madhavi';
import pragati from './faculty_pragati';
import sainath from './faculty_sainath';
import snehal from './faculty_snehal';
import thaksen from './faculty_thaksen';
import vaishali from './faculty_vaishali';
import yogita from './faculty_yogita';

const map: Record<string, FacultyData> = {
  'dr-thaksen-parvat': thaksen,
  'thaksen-parvat': thaksen,
  'chandan-kolvankar': chandan,
  'dr-archana-ekbote': archana,
  'archana-ekbote': archana,
  'dr-madhavi-waghmare': madhavi,
  'madhavi-waghmare': madhavi,
  'dr-vaishali-shirsath': vaishali,
  'vaishali-shirsath': vaishali,
  'dr-sainath-patil': sainath,
  'sainath-patil': sainath,
  'dr-anagha-patil': anagha,
  'anagha-patil': anagha,
  'snehal-mhatre': snehal,
  'pragati-patil': pragati,
  'jessica-falcao': jessica,
  'dr-yogita-shelar': yogita,
  'yogita-shelar': yogita,
};

export default map;
