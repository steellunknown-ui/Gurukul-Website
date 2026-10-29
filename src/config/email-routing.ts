/**
 * Institutional Email Routing Directory
 * Gurukul Vidyapeeth English High School & Jr. College
 * Managed by Bhagwat Prasad Gurukul Educational Trust
 * 
 * Maps institutional inquiry channels, grievance cells, job applications,
 * and fee inquiries to their designated departmental email addresses.
 */

export interface DepartmentEmailConfig {
  id: string;
  department: string;
  purpose: string;
  primaryEmail: string;
  fallbackEmail: string;
  helpdeskContact: string;
  sla: string;
  description: string;
}

export const INSTITUTIONAL_EMAILS: Record<string, DepartmentEmailConfig> = {
  careers: {
    id: "careers",
    department: "Human Resources & Faculty Recruitment Cell",
    purpose: "Faculty & Staff Job Applications, Resume Submissions, Interview Queries",
    primaryEmail: "careers@gurukulvidyapeeth.edu.in",
    fallbackEmail: "gurukul.vidyapeeth4@gmail.com",
    helpdeskContact: "+91 93264 46097",
    sla: "3 to 5 business days",
    description:
      "All resume submissions and career application forms are routed to this inbox for preliminary qualification screening and interview shortlisting.",
  },
  admissions: {
    id: "admissions",
    department: "Student Admissions & Academic Counselling Desk",
    purpose: "School & Junior College Online Enquiry Forms, Seat Availability, Prospectus Queries",
    primaryEmail: "admissions@gurukulvidyapeeth.edu.in",
    fallbackEmail: "gurukul.vidyapeeth4@gmail.com",
    helpdeskContact: "+91 93264 46097",
    sla: "Within 24 to 48 hours",
    description:
      "Handles prospective student enrollment forms from Jr. KG to Std XII (SSC & HSC) and parental campus appointment requests.",
  },
  antiRagging: {
    id: "anti-ragging",
    department: "Anti-Ragging Squad & Confidential Student Grievance Cell",
    purpose: "Confidential Incident Reports, Harassment Grievances, Student Safety Redressal",
    primaryEmail: "antiragging@gurukulvidyapeeth.edu.in",
    fallbackEmail: "gurukul.vidyapeeth4@gmail.com",
    helpdeskContact: "1800-180-5522 / +91 93264 46097",
    sla: "Immediate / Within 12 hours",
    description:
      "Strictly confidential channel monitored by the Head of Institution, Police Liaison Officer, and Management Nominee.",
  },
  principal: {
    id: "principal",
    department: "Office of the Principal & Academic Administration",
    purpose: "Institutional Administration, Official Government Correspondence, Board Documentation",
    primaryEmail: "principal@gurukulvidyapeeth.edu.in",
    fallbackEmail: "gurukul.vidyapeeth4@gmail.com",
    helpdeskContact: "+91 93264 46097",
    sla: "2 business days",
    description:
      "Head of Institution executive desk for Maharashtra State Board compliance, parent-principal delegations, and academic policy.",
  },
  accounts: {
    id: "accounts",
    department: "Accounts, Billing & Fee Collection Division",
    purpose: "Fee Payment Receipts, Installment Approvals, Printable Fee Vouchers",
    primaryEmail: "accounts@gurukulvidyapeeth.edu.in",
    fallbackEmail: "gurukul.vidyapeeth4@gmail.com",
    helpdeskContact: "+91 93264 46097",
    sla: "1 to 2 business days",
    description:
      "Manages student fee registers, concession applications under trust guidelines, and transaction acknowledgments.",
  },
  alumni: {
    id: "alumni",
    department: "Alumni Relations & Hall of Fame Registry",
    purpose: "Alumni Membership Registrations, Mentorship Programs, Annual Reunion Inquiries",
    primaryEmail: "alumni@gurukulvidyapeeth.edu.in",
    fallbackEmail: "gurukul.vidyapeeth4@gmail.com",
    helpdeskContact: "+91 93264 46097",
    sla: "3 to 4 business days",
    description:
      "Connects past SSC and HSC graduates with current batches for career mentoring, corporate workshops, and institutional giving.",
  },
};

/**
 * Helper to get the active email for any department.
 * Currently returns fallbackEmail until the school sets up domain inboxes.
 */
export function getDepartmentEmail(departmentKey: keyof typeof INSTITUTIONAL_EMAILS): string {
  const config = INSTITUTIONAL_EMAILS[departmentKey];
  if (!config) return "gurukul.vidyapeeth4@gmail.com";
  // When client confirms domain emails are live, change to config.primaryEmail
  return config.fallbackEmail || config.primaryEmail;
}
