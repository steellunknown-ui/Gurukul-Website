"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  Building2,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type AdmissionClassLevel = "School" | "XI" | "XII";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStream?: string;
  defaultClassLevel?: AdmissionClassLevel;
}

export function EnquiryModal({
  isOpen,
  onClose,
  defaultStream,
  defaultClassLevel = "School",
}: EnquiryModalProps) {
  const [classLevel, setClassLevel] = useState<AdmissionClassLevel>(defaultClassLevel);

  // Sync class level when prop changes
  useEffect(() => {
    if (defaultClassLevel) {
      setClassLevel(defaultClassLevel);
    }
  }, [defaultClassLevel, isOpen]);

  // Form State for School (Jr. KG to Std 10)
  const [formDataSchool, setFormDataSchool] = useState({
    studentName: "",
    parentName: "",
    parentPhone: "",
    email: "",
    standardApplying: "Jr. KG",
    previousSchool: "",
    message: "",
  });

  // Form State for Class XI (FYJC)
  const [formDataXI, setFormDataXI] = useState({
    studentName: "",
    parentName: "",
    parentPhone: "",
    email: "",
    stream: defaultStream || "science",
    class10Score: "",
    board: "State Board",
    message: "",
  });

  // Form State for Class XII (SYJC)
  const [formDataXII, setFormDataXII] = useState({
    studentName: "",
    parentName: "",
    parentPhone: "",
    email: "",
    stream: defaultStream || "science",
    previousCollege: "",
    class11Status: "Passed Class XI",
    class11Score: "",
    reasonForTransfer: "Entrance Coaching Alignment",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (classLevel === "School") {
      if (!formDataSchool.studentName.trim()) errs.studentName = "Student name is required.";
      if (!formDataSchool.parentPhone.trim() || formDataSchool.parentPhone.length < 10) {
        errs.parentPhone = "Valid 10-digit mobile number required.";
      }
      if (!formDataSchool.standardApplying) errs.standardApplying = "Please select standard/class.";
    } else if (classLevel === "XI") {
      if (!formDataXI.studentName.trim()) errs.studentName = "Student name is required.";
      if (!formDataXI.parentPhone.trim() || formDataXI.parentPhone.length < 10) {
        errs.parentPhone = "Valid 10-digit mobile number required.";
      }
      if (!formDataXI.stream) errs.stream = "Please select an academic stream.";
    } else {
      if (!formDataXII.studentName.trim()) errs.studentName = "Student name is required.";
      if (!formDataXII.parentPhone.trim() || formDataXII.parentPhone.length < 10) {
        errs.parentPhone = "Valid 10-digit mobile number required.";
      }
      if (!formDataXII.previousCollege.trim()) {
        errs.previousCollege = "Current / Previous College name is required for Class XII admission.";
      }
      if (!formDataXII.stream) errs.stream = "Please select your stream.";
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrors({});
    onClose();
  };

  const currentStudentName =
    classLevel === "School"
      ? formDataSchool.studentName
      : classLevel === "XI"
      ? formDataXI.studentName
      : formDataXII.studentName;

  const currentParentPhone =
    classLevel === "School"
      ? formDataSchool.parentPhone
      : classLevel === "XI"
      ? formDataXI.parentPhone
      : formDataXII.parentPhone;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="relative w-full max-w-xl bg-[#FCFAF7] border-2 border-[#9E1B32]/30 ring-1 ring-[#9E1B32]/20 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.65)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#9E1B32] via-[#851629] to-[#6B1124] text-white px-6 py-4 flex items-center justify-between border-b border-[#4E0B19] rounded-t-2xl">
          <div>
            <span className="text-[9.5px] sm:text-[10px] font-crest tracking-widest text-amber-300 uppercase block font-bold mb-1">
              BHAGWAT PRASAD GURUKUL EDUCATIONAL TRUST&apos;S
            </span>
            <span className="text-[11px] font-crest tracking-wider text-[#DDA743] uppercase block font-bold">
              Gurukul Vidyapeeth English High School &amp; Junior College
            </span>
            <h3
              id="enquiry-modal-title"
              className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-white"
            >
              {classLevel === "School"
                ? "School Admission Enquiry (Jr. KG – 10th)"
                : classLevel === "XI"
                ? "Class XI (FYJC) Admission Enquiry"
                : "Class XII (SYJC) Admission Enquiry"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close enquiry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Tier Segmented Tab Switcher */}
        {!submitted && (
          <div className="bg-[#F4EFEA] p-2 border-b border-[#E8DFD7] flex gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                setClassLevel("School");
                setErrors({});
              }}
              className={`flex-1 py-2 px-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                classLevel === "School"
                  ? "bg-[#9E1B32] text-[#DFBA73] shadow-sm border border-[#C5A059]/40"
                  : "bg-white/70 text-stone-700 hover:text-[#9E1B32] hover:bg-white border border-transparent"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">School (Jr. KG–10th)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setClassLevel("XI");
                setErrors({});
              }}
              className={`flex-1 py-2 px-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                classLevel === "XI"
                  ? "bg-[#9E1B32] text-[#DFBA73] shadow-sm border border-[#C5A059]/40"
                  : "bg-white/70 text-stone-700 hover:text-[#9E1B32] hover:bg-white border border-transparent"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">Class XI (FYJC)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setClassLevel("XII");
                setErrors({});
              }}
              className={`flex-1 py-2 px-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                classLevel === "XII"
                  ? "bg-[#9E1B32] text-[#DFBA73] shadow-sm border border-[#C5A059]/40"
                  : "bg-white/70 text-stone-700 hover:text-[#9E1B32] hover:bg-white border border-transparent"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">Class XII (SYJC)</span>
            </button>
          </div>
        )}

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 overscroll-contain">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-editorial text-2xl font-bold text-[#1F1A1B]">
                {classLevel === "School"
                  ? "School Admission Enquiry Recorded"
                  : classLevel === "XI"
                  ? "Class XI (FYJC) Enquiry Recorded"
                  : "Class XII (SYJC) Enquiry Recorded"}
              </h4>
              <p className="text-sm text-[#5C5556] max-w-md mx-auto">
                Thank you, <strong>{currentStudentName}</strong>. Your enquiry for{" "}
                <strong>
                  {classLevel === "School"
                    ? `School Admission (${formDataSchool.standardApplying})`
                    : `Standards ${classLevel} (${classLevel === "XI" ? "FYJC" : "SYJC"})`}
                </strong>{" "}
                has been logged. Our admissions counselor will contact you at{" "}
                <strong>{currentParentPhone}</strong> with the syllabus schedule, document checklist, and fee structure.
              </p>
              <div className="p-4 bg-[#F4EFEA] rounded-lg text-left text-xs font-mono text-stone-700 space-y-1.5 border border-[#E8DFD7]">
                <div>
                  <strong>Admission Level:</strong>{" "}
                  {classLevel === "School"
                    ? `School Section (${formDataSchool.standardApplying})`
                    : `Class ${classLevel} (${
                        classLevel === "XI" ? "First Year Junior College" : "Second Year Junior College / Transfer"
                      })`}
                </div>
                {classLevel === "School" ? (
                  <>
                    <div>
                      <strong>Standard / Class:</strong> {formDataSchool.standardApplying} (Maharashtra SSC)
                    </div>
                    {formDataSchool.previousSchool && (
                      <div>
                        <strong>Previous School:</strong> {formDataSchool.previousSchool}
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <strong>Selected Stream:</strong>{" "}
                    {(classLevel === "XI" ? formDataXI.stream : formDataXII.stream).toUpperCase()}
                  </div>
                )}
                <div>
                  <strong>Contact Mobile:</strong> {currentParentPhone}
                </div>
                {classLevel === "XI" && (
                  <div>
                    <strong>10th Board:</strong> {formDataXI.board} (Est. {formDataXI.class10Score || "N/A"})
                  </div>
                )}
                {classLevel === "XII" && (
                  <div>
                    <strong>Previous College:</strong> {formDataXII.previousCollege} ({formDataXII.class11Status})
                  </div>
                )}
              </div>
              <Button variant="primary" onClick={handleReset} className="mt-4">
                Close &amp; Return
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Context Notice */}
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  {classLevel === "School" ? (
                    <>
                      <strong>School Admissions 2026–27 (Jr. KG to Std 10th):</strong> Maharashtra State Board SSC curriculum with smart classrooms, AC digital labs, and holistic sports development.
                    </>
                  ) : classLevel === "XI" ? (
                    <>
                      <strong>Class XI Admissions 2026–27 (FYJC):</strong> Merit evaluation open for Science (General / Bifocal CS), Commerce, and Arts.
                    </>
                  ) : (
                    <>
                      <strong>Class XII Direct / Transfer Admissions:</strong> Open for students transitioning from other junior colleges or boards (CBSE/ICSE) into Maharashtra HSC.
                    </>
                  )}
                </span>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1A1B] mb-1">
                    Student Full Name <span className="text-[#9E1B32]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={
                      classLevel === "School"
                        ? formDataSchool.studentName
                        : classLevel === "XI"
                        ? formDataXI.studentName
                        : formDataXII.studentName
                    }
                    onChange={(e) => {
                      if (classLevel === "School")
                        setFormDataSchool({ ...formDataSchool, studentName: e.target.value });
                      else if (classLevel === "XI")
                        setFormDataXI({ ...formDataXI, studentName: e.target.value });
                      else setFormDataXII({ ...formDataXII, studentName: e.target.value });
                    }}
                    placeholder="e.g., Aarav Sharma"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-sm text-[#1F1A1B] focus:border-[#9E1B32] focus:ring-1 focus:ring-[#9E1B32] outline-hidden"
                  />
                  {errors.studentName && (
                    <p className="text-[#9E1B32] text-xs mt-1">{errors.studentName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1A1B] mb-1">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={
                      classLevel === "School"
                        ? formDataSchool.parentName
                        : classLevel === "XI"
                        ? formDataXI.parentName
                        : formDataXII.parentName
                    }
                    onChange={(e) => {
                      if (classLevel === "School")
                        setFormDataSchool({ ...formDataSchool, parentName: e.target.value });
                      else if (classLevel === "XI")
                        setFormDataXI({ ...formDataXI, parentName: e.target.value });
                      else setFormDataXII({ ...formDataXII, parentName: e.target.value });
                    }}
                    placeholder="e.g., Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-sm text-[#1F1A1B] focus:border-[#9E1B32] focus:ring-1 focus:ring-[#9E1B32] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1A1B] mb-1">
                    Parent Mobile Number <span className="text-[#9E1B32]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={
                      classLevel === "School"
                        ? formDataSchool.parentPhone
                        : classLevel === "XI"
                        ? formDataXI.parentPhone
                        : formDataXII.parentPhone
                    }
                    onChange={(e) => {
                      if (classLevel === "School")
                        setFormDataSchool({ ...formDataSchool, parentPhone: e.target.value });
                      else if (classLevel === "XI")
                        setFormDataXI({ ...formDataXI, parentPhone: e.target.value });
                      else setFormDataXII({ ...formDataXII, parentPhone: e.target.value });
                    }}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-sm text-[#1F1A1B] focus:border-[#9E1B32] focus:ring-1 focus:ring-[#9E1B32] outline-hidden"
                  />
                  {errors.parentPhone && (
                    <p className="text-[#9E1B32] text-xs mt-1">{errors.parentPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1A1B] mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={
                      classLevel === "School"
                        ? formDataSchool.email
                        : classLevel === "XI"
                        ? formDataXI.email
                        : formDataXII.email
                    }
                    onChange={(e) => {
                      if (classLevel === "School")
                        setFormDataSchool({ ...formDataSchool, email: e.target.value });
                      else if (classLevel === "XI")
                        setFormDataXI({ ...formDataXI, email: e.target.value });
                      else setFormDataXII({ ...formDataXII, email: e.target.value });
                    }}
                    placeholder="parent@example.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-sm text-[#1F1A1B] focus:border-[#9E1B32] focus:ring-1 focus:ring-[#9E1B32] outline-hidden"
                  />
                </div>

                {/* SCHOOL SECTION SPECIFIC FIELDS */}
                {classLevel === "School" && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1A1B] mb-1">
                        Class / Standard Applying For <span className="text-[#9E1B32]">*</span>
                      </label>
                      <select
                        value={formDataSchool.standardApplying}
                        onChange={(e) =>
                          setFormDataSchool({ ...formDataSchool, standardApplying: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-sm text-[#1F1A1B] focus:border-[#9E1B32] focus:ring-1 focus:ring-[#9E1B32] outline-hidden"
                      >
                        <optgroup label="Pre-Primary Section">
                          <option value="Jr. KG">Junior Kindergarten (Jr. KG)</option>
                          <option value="Sr. KG">Senior Kindergarten (Sr. KG)</option>
                          <option value="Nursery">Nursery</option>
                        </optgroup>
                        <optgroup label="Primary Section (Std 1st – 5th)">
                          <option value="Std 1">Class 1st (Primary SSC)</option>
                          <option value="Std 2">Class 2nd (Primary SSC)</option>
                          <option value="Std 3">Class 3rd (Primary SSC)</option>
                          <option value="Std 4">Class 4th (Primary SSC)</option>
                          <option value="Std 5">Class 5th (Primary SSC)</option>
                        </optgroup>
                        <optgroup label="Secondary Section (Std 6th – 10th SSC)">
                          <option value="Std 6">Class 6th (Secondary SSC)</option>
                          <option value="Std 7">Class 7th (Secondary SSC)</option>
                          <option value="Std 8">Class 8th (Secondary SSC)</option>
                          <option value="Std 9">Class 9th (Secondary SSC)</option>
                          <option value="Std 10">Class 10th (Secondary SSC Board)</option>
                        </optgroup>
                      </select>
                      {errors.standardApplying && (
                        <p className="text-[#9E1B32] text-xs mt-1">{errors.standardApplying}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1A1B] mb-1">
                        Previous School / Preschool
                      </label>
                      <input
                        type="text"
                        value={formDataSchool.previousSchool}
                        onChange={(e) =>
                          setFormDataSchool({ ...formDataSchool, previousSchool: e.target.value })
                        }
                        placeholder="e.g. Kidzee / St. Anne's / New Admission"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-sm text-[#1F1A1B] focus:border-[#9E1B32] focus:ring-1 focus:ring-[#9E1B32] outline-hidden"
                      />
                    </div>
                  </>
                )}

                {/* Stream Selection for XI and XII */}
                {classLevel !== "School" && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1A1B] mb-1">
                      {classLevel === "XI" ? "Desired Stream" : "Stream in Class XII"}{" "}
                      <span className="text-[#9E1B32]">*</span>
                    </label>
                    <select
                      value={classLevel === "XI" ? formDataXI.stream : formDataXII.stream}
                      onChange={(e) =>
                        classLevel === "XI"
                          ? setFormDataXI({ ...formDataXI, stream: e.target.value })
                          : setFormDataXII({ ...formDataXII, stream: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-sm text-[#1F1A1B] focus:border-[#9E1B32] focus:ring-1 focus:ring-[#9E1B32] outline-hidden"
                    >
                      <option value="science">Science — General (PCM / PCB)</option>
                      <option value="science-cs">Science — Bifocal Computer Science (200 Marks)</option>
                      <option value="science-it">Science — Information Technology / Maths</option>
                      <option value="commerce">Commerce — General (Maths / SP)</option>
                      <option value="commerce-it">Commerce — Information Technology / Accounts</option>
                      <option value="arts">Arts &amp; Humanities (Psychology / Pol Science)</option>
                    </select>
                  </div>
                )}

                {/* Specific Fields for Class XI */}
                {classLevel === "XI" && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1A1B] mb-1">
                      Class 10 Board &amp; Percentage
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={formDataXI.board}
                        onChange={(e) => setFormDataXI({ ...formDataXI, board: e.target.value })}
                        className="px-2 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-xs text-[#1F1A1B] outline-hidden"
                      >
                        <option value="State Board">State Board (SSC)</option>
                        <option value="CBSE">CBSE (Class X)</option>
                        <option value="ICSE">ICSE (Class X)</option>
                        <option value="Other">Other Board</option>
                      </select>
                      <input
                        type="text"
                        value={formDataXI.class10Score}
                        onChange={(e) =>
                          setFormDataXI({ ...formDataXI, class10Score: e.target.value })
                        }
                        placeholder="e.g. 88%"
                        className="px-3 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-sm text-[#1F1A1B] outline-hidden"
                      />
                    </div>
                  </div>
                )}

                {/* Specific Fields for Class XII */}
                {classLevel === "XII" && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1A1B] mb-1">
                      Class XI College / School Name <span className="text-[#9E1B32]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formDataXII.previousCollege}
                      onChange={(e) =>
                        setFormDataXII({ ...formDataXII, previousCollege: e.target.value })
                      }
                      placeholder="Current College / School"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-sm text-[#1F1A1B] focus:border-[#9E1B32] focus:ring-1 focus:ring-[#9E1B32] outline-hidden"
                    />
                    {errors.previousCollege && (
                      <p className="text-[#9E1B32] text-xs mt-1">{errors.previousCollege}</p>
                    )}
                  </div>
                )}

                {/* Additional Row for Class XII */}
                {classLevel === "XII" && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1A1B] mb-1">
                        Class XI Status &amp; Marks
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={formDataXII.class11Status}
                          onChange={(e) =>
                            setFormDataXII({ ...formDataXII, class11Status: e.target.value })
                          }
                          className="px-2 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-xs text-[#1F1A1B] outline-hidden"
                        >
                          <option value="Passed Class XI">Passed Class XI</option>
                          <option value="Appearing for XI">Appearing for XI</option>
                          <option value="Transfer with TC">Transfer with TC</option>
                        </select>
                        <input
                          type="text"
                          value={formDataXII.class11Score}
                          onChange={(e) =>
                            setFormDataXII({ ...formDataXII, class11Score: e.target.value })
                          }
                          placeholder="XI % or Grade"
                          className="px-3 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-sm text-[#1F1A1B] outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1A1B] mb-1">
                        Reason for Transfer / Direct Admission
                      </label>
                      <select
                        value={formDataXII.reasonForTransfer}
                        onChange={(e) =>
                          setFormDataXII({ ...formDataXII, reasonForTransfer: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-sm text-[#1F1A1B] focus:border-[#9E1B32] focus:ring-1 focus:ring-[#9E1B32] outline-hidden"
                      >
                        <option value="Entrance Coaching Alignment">Synchronized Entrance Coaching (JEE/NEET/CA)</option>
                        <option value="Relocation / Family Shift">Relocation / Change of Residence</option>
                        <option value="Better Faculty & Infrastructure">Better Faculty Mentorship &amp; Labs</option>
                        <option value="Board Shift">Shifting from CBSE/ICSE to State Board</option>
                        <option value="Other">Other Reasons</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1A1B] mb-1">
                  Specific Query or Elective Preference
                </label>
                <textarea
                  rows={2}
                  value={
                    classLevel === "School"
                      ? formDataSchool.message
                      : classLevel === "XI"
                      ? formDataXI.message
                      : formDataXII.message
                  }
                  onChange={(e) => {
                    if (classLevel === "School")
                      setFormDataSchool({ ...formDataSchool, message: e.target.value });
                    else if (classLevel === "XI")
                      setFormDataXI({ ...formDataXI, message: e.target.value });
                    else setFormDataXII({ ...formDataXII, message: e.target.value });
                  }}
                  placeholder={
                    classLevel === "School"
                      ? "Mention school bus route query, admission timing, sibling concessions, or curriculum questions..."
                      : classLevel === "XI"
                      ? "Mention any specific elective preferences, stream interests, or scholarship questions..."
                      : "Mention subject combinations taken in Class 11, syllabus status, or transfer certificate queries..."
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD7] rounded-md text-sm text-[#1F1A1B] focus:border-[#9E1B32] focus:ring-1 focus:ring-[#9E1B32] outline-hidden resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E8DFD7]">
                <div className="text-xs text-[#5C5556]">
                  Admissions Office: <strong className="text-[#9E1B32]">+91 93264 46097</strong>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-4 py-2 text-sm text-[#5C5556] hover:text-[#1F1A1B] font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto gap-2 bg-[#9E1B32] hover:bg-[#BA203B] text-white">
                    <Send className="w-4 h-4" />
                    Submit {classLevel === "School" ? "School" : classLevel === "XI" ? "Class XI" : "Class XII"} Enquiry
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
