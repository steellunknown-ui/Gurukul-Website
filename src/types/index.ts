export interface NavItem {
  label: string;
  href: string;
  description?: string;
  isExternal?: boolean;
}

export interface StreamSubject {
  name: string;
  code?: string;
  isOptional?: boolean;
}

export interface AcademicStream {
  id: string;
  name: string;
  badge: string;
  standard: "XI & XII";
  tagline: string;
  overview: string;
  curriculumFocus: string[];
  coreSubjects: string[];
  electiveSubjects: string[];
  careerPathways: string[];
  academicHighlights?: string[];
  featured?: boolean;
}

export interface InstitutionalHighlight {
  id: string;
  metric: string;
  title: string;
  description: string;
  isVerified: boolean;
  statusNote?: string;
}

export type NoticeCategory = "Admissions" | "Academic" | "Examinations" | "Circular";

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: NoticeCategory;
  isUrgent?: boolean;
  summary: string;
  isDevelopmentFixture: boolean;
  href?: string;
}

export interface CampusFacility {
  id: string;
  title: string;
  category: "Academics" | "Laboratories" | "Library" | "Sports & Welfare";
  description: string;
  caption: string;
  features: string[];
  imagePlaceholderText: string;
}

export interface LeaderProfile {
  id: "founder" | "chairman";
  role: "Founder" | "Chairman";
  order: 1 | 2;
  name: string;
  designation: string;
  qualification: string;
  badge: string;
  officeTitle: string;
  quote: string;
  bodyParagraphs: string[];
  isPlaceholder?: boolean;
}

export interface LeadershipMessage {
  designation: string;
  name: string;
  qualification: string;
  quote: string;
  bodyParagraphs: string[];
  isPlaceholder: boolean;
}

export interface ContactInfo {
  institutionName: string;
  academicLevel: string;
  addressLines: string[];
  campusCity: string;
  admissionPhone: string;
  generalPhone: string;
  admissionEmail: string;
  officeHours: string;
  isVerified: boolean;
}

export type SectionTierId =
  | "pre-primary"
  | "primary"
  | "upper-primary"
  | "secondary"
  | "higher-secondary";

export interface SchoolSectionTier {
  id: SectionTierId;
  tierName: string;
  classesIncluded: string;
  badge: string;
  ageGroup: string;
  description: string;
  coreSubjects: string[];
  gradedSubjects: string[];
  keyHighlights: string[];
  boardAffiliation: string;
}

export interface StandardFeeItem {
  standardId: string;
  standardName: string;
  tierName: string;
  classesLabel: string;
  admissionFee?: number;
  term1Fee: number;
  term2Fee: number;
  activityLabFee: number;
  totalAnnualFee: number;
  instalmentPlan: string;
  inclusions: string[];
  eligibility: string;
  academicYear: string;
}

export type TopperStream = "All" | "Science" | "Commerce" | "Arts" | "SSC";

export interface TopperItem {
  id: string;
  name: string;
  photoUrl?: string;
  gender?: "female" | "male";
  percentage: number;
  rank: string;
  exam: "HSC Board" | "SSC Board";
  stream: "Science" | "Commerce" | "Arts" | "SSC";
  year: string;
  badge: string;
  keyMarks: { subject: string; score: string }[];
  quote: string;
  currentPursuit: string;
}

export interface CentumScorerItem {
  id: string;
  studentName: string;
  subject: string;
  score: string;
  exam: "HSC" | "SSC";
  stream: string;
  year: string;
}

