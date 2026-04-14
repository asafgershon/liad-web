'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useState } from "react";

export default function EligibilityChecker() {
  const [flightStatus, setFlightStatus] = useState("");
  const [daysNotified, setDaysNotified] = useState("");
  const [delayHours, setDelayHours] = useState("");
  const [destination, setDestination] = useState("אירופה");
  const [reasonForClaim, setReasonForClaim] = useState("");
  const [hasCompensation, setHasCompensation] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "" });

  const getCompensationRange = (destination: string) => {
    const ranges: { [key: string]: { min: number; max: number } } = {
      "אירופה": { min: 1530, max: 2450 },
      "אמריקה (צפון ודרום)": { min: 2450, max: 3670 },
      "אסיה": { min: 2450, max: 3670 },
      "אפריקה": { min: 1530, max: 2450 },
      "אוקיאניה": { min: 3670, max: 3670 },
    };
    return ranges[destination] || { min: 1530, max: 2450 };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let eligibilityResult: any = {
      isEligible: false,
      message: "",
      rights: [],
      compensation: null,
    };

    // Flight on time
    if (flightStatus === "on-time") {
      if (reasonForClaim === "overbooking") {
        eligibilityResult = {
          isEligible: true,
          message: "אתה זכאי לפיצוי בגין סירוב להסיע נוסע",
          rights: [
            "שירותי סיוע (מזון, משקאות, תקשורת)",
            "השבת תמורה או טיסה חלופית",
            "פיצוי כספי לפי חוק שירותי התעופה",
          ],
        };
      } else if (reasonForClaim === "ticket-change") {
        eligibilityResult = {
          isEligible: true,
          message: "אתה זכאי לפיצוי בגין שינוי בתנאי הכרטיס",
          rights: [
            "החזר על הפרש בתמורה או טיסה חלופית",
            "שירותי סיוע אם היה עיכוב",
          ],
        };
      } else if (reasonForClaim === "connection-change") {
        eligibilityResult = {
          isEligible: true,
          message: "הטיסה שלך שונתה מטיסה ישירה לטיסה עם עצירת ביניים, ייתכן שמדובר בשינוי המזכה בפיצוי",
          rights: [
            "החזר על הפרש בתמורה או טיסה חלופית",
            "שירותי סיוע אם היה עיכוב",
            "פיצוי נוסף בהתאם למשך העיכוב",
          ],
        };
      }
    }

    // Flight cancelled
    else if (flightStatus === "cancelled") {
      if (daysNotified === "" || parseInt(daysNotified) > 14) {
        eligibilityResult = {
          isEligible: false,
          message: "לא זכאי לפיצוי כספי",
          rights: [
            "עם זאת, כדאי ליצור קשר איתנו לבדיקה פרטנית של המקרה שלך",
          ],
        };
      } else {
        const range = getCompensationRange(destination);
        eligibilityResult = {
          isEligible: true,
          message: "אתה זכאי לפיצוי מלא בגין ביטול טיסה",
          rights: [
            "שירותי סיוע (מזון, משקאות, תקשורת)",
            "החזר על כרטיס הטיסה או טיסה חלופית",
            `פיצוי כספי בטווח של ₪${range.min}-₪${range.max} (לפי יעד הטיסה)`,
          ],
          compensation: range,
        };
      }
    }

    // Flight advanced
    else if (flightStatus === "advanced") {
      if (daysNotified === "" || parseInt(daysNotified) > 14) {
        eligibilityResult = {
          isEligible: false,
          message: "לא זכאי לפיצוי כספי",
          rights: [
            "עם זאת, כדאי ליצור קשר איתנו לבדיקה פרטנית של המקרה שלך",
          ],
        };
      } else {
        if (delayHours === "" || parseInt(delayHours) < 5) {
          eligibilityResult = {
            isEligible: false,
            message: "לא זכאי לפיצוי",
            rights: [
              "טיסה שהוקדמה בפחות מ-5 שעות אינה זכאית לפיצוי לפי החוק",
            ],
          };
        } else if (parseInt(delayHours) >= 5 && parseInt(delayHours) < 8) {
          eligibilityResult = {
            isEligible: true,
            message: "אתה זכאי לפיצוי בגין הקדמת טיסה",
            rights: [
              "החזר על כרטיס הטיסה או טיסה חלופית",
            ],
          };
        } else {
          const range = getCompensationRange(destination);
          eligibilityResult = {
            isEligible: true,
            message: "אתה זכאי לפיצוי מלא בגין הקדמת טיסה",
            rights: [
              "החזר על כרטיס הטיסה או טיסה חלופית",
              `פיצוי כספי בטווח של ₪${range.min}-₪${range.max} (לפי יעד הטיסה)`,
            ],
            compensation: range,
          };
        }
      }
    }

    // Flight delayed
    else if (flightStatus === "delayed") {
      if (daysNotified === "" || parseInt(daysNotified) > 14) {
        eligibilityResult = {
          isEligible: false,
          message: "לא זכאי לפיצוי כספי",
          rights: [
            "עם זאת, כדאי ליצור קשר איתנו לבדיקה פרטנית של המקרה שלך",
          ],
        };
      } else {
        if (delayHours === "" || parseInt(delayHours) < 2) {
          eligibilityResult = {
            isEligible: false,
            message: "לא זכאי לפיצוי",
            rights: [
              "עיכוב של פחות מ-2 שעות אינו זכאי לפיצוי לפי החוק",
            ],
          };
        } else if (parseInt(delayHours) >= 2 && parseInt(delayHours) < 5) {
          eligibilityResult = {
            isEligible: true,
            message: "אתה זכאי לשירותי סיוע",
            rights: [
              "שירותי סיוע (מזון, משקאות, תקשורת)",
            ],
          };
        } else if (parseInt(delayHours) >= 5 && parseInt(delayHours) < 8) {
          eligibilityResult = {
            isEligible: true,
            message: "אתה זכאי לשירותי סיוע והחזר",
            rights: [
              "שירותי סיוע (מזון, משקאות, תקשורת)",
              "החזר על כרטיס הטיסה או טיסה חלופית",
            ],
          };
        } else {
          const range = getCompensationRange(destination);
          eligibilityResult = {
            isEligible: true,
            message: "אתה זכאי לפיצוי מלא בגין עיכוב טיסה",
            rights: [
              "שירותי סיוע (מזון, משקאות, תקשורת)",
              "החזר על כרטיס הטיסה או טיסה חלופית",
              `פיצוי כספי בטווח של ₪${range.min}-₪${range.max} (לפי יעד הטיסה)`,
            ],
            compensation: range,
          };
        }
      }
    }

    // Store deduction note separately for display in compensation box
    if (eligibilityResult.compensation && hasCompensation) {
      eligibilityResult.deductionNote = "אם קיבלתם כבר פיצוי, הסכום הסופי שמגיע לכם יהיה בניכוי הפיצוי שכבר התקבל";
    }

    setResults(eligibilityResult);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the form data along with the results
    console.log({
      flightStatus,
      daysNotified,
      delayHours,
      destination,
      reasonForClaim,
      hasCompensation,
      results,
      contact: contactForm,
    });
    // For now, just close the modal
    setShowContactModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#2d2d2d]" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#e8e7e5]">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚖️</span>
            </div>
            <h1 className="text-xl font-bold text-[#1e3a5f]">ליעד גרשון עו"ד (רו"ח)</h1>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 text-[#1e3a5f] hover:bg-[#f0f0f0] rounded transition-colors"
          >
            חזור לעמוד הבית
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1e3a5f] mb-4 text-center">
            בדוק את הזכאות שלך לפיצוי
          </h1>
          <p className="text-center text-[#6b6b6b] mb-12">
            מלא את פרטי הטיסה שלך וקבל תשובה מיידית אם אתה זכאי לפיצוי לפי חוק שירותי התעופה הישראלי
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="border-[#e8e7e5]">
              <CardHeader>
                <CardTitle className="text-[#1e3a5f]">פרטי הטיסה</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Flight Status */}
                  <div>
                    <label className="block text-sm font-medium text-[#1e3a5f] mb-2">
                      מה היה סטטוס הטיסה?
                    </label>
                    <select
                      value={flightStatus}
                      onChange={(e) => {
                        setFlightStatus(e.target.value);
                        setDaysNotified("");
                        setDelayHours("");
                        setReasonForClaim("");
                      }}
                      className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                    >
                      <option value="">בחר אפשרות</option>
                      <option value="cancelled">הטיסה בוטלה</option>
                      <option value="delayed">הטיסה המריאה באיחור</option>
                      <option value="advanced">הטיסה הוקדמה</option>
                      <option value="on-time">הטיסה המריאה בזמן</option>
                    </select>
                  </div>

                  {/* Reason for Claim (if on-time) */}
                  {flightStatus === "on-time" && (
                    <div>
                      <label className="block text-sm font-medium text-[#1e3a5f] mb-2">
                        מה סיבת הפניה?
                      </label>
                      <select
                        value={reasonForClaim}
                        onChange={(e) => setReasonForClaim(e.target.value)}
                        className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                      >
                        <option value="">בחר אפשרות</option>
                        <option value="overbooking">סירוב להסיע נוסע (overbooking)</option>
                        <option value="ticket-change">שינוי בתנאי כרטיס הטיסה</option>
                        <option value="connection-change">העברה מטיסה ישירה לטיסה עם עצירת ביניים</option>
                      </select>
                    </div>
                  )}

                  {/* Days Notified (if cancelled, advanced, or delayed) */}
                  {(flightStatus === "cancelled" || flightStatus === "advanced" || flightStatus === "delayed") && (
                    <div>
                      <label className="block text-sm font-medium text-[#1e3a5f] mb-2">
                        מתי נודע לכם אודות השינוי? (בימים)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={daysNotified}
                        onChange={(e) => setDaysNotified(e.target.value)}
                        placeholder="הכניסו מספר ימים"
                        className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                      />
                    </div>
                  )}

                  {/* Delay/Advance Hours (if delayed or advanced with 0-14 days) */}
                  {daysNotified !== "" && parseInt(daysNotified) <= 14 && (flightStatus === "delayed" || flightStatus === "advanced") && (
                    <div>
                      <label className="block text-sm font-medium text-[#1e3a5f] mb-2">
                        {flightStatus === "delayed" ? "כמה שעות עיכוב?" : "כמה שעות הקדמה?"}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={delayHours}
                        onChange={(e) => setDelayHours(e.target.value)}
                        placeholder="הכניסו מספר שעות"
                        className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                      />
                    </div>
                  )}

                  {/* Destination (if eligible for compensation) */}
                  {((flightStatus === "cancelled" && daysNotified === "0") ||
                    (flightStatus === "delayed" && delayHours === "8") ||
                    (flightStatus === "advanced" && delayHours === "8")) && (
                    <div>
                      <label className="block text-sm font-medium text-[#1e3a5f] mb-2">
                        לאן הטיסה הייתה?
                      </label>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                      >
                        <option value="אירופה">אירופה</option>
                        <option value="אמריקה (צפון ודרום)">אמריקה (צפון ודרום)</option>
                        <option value="אסיה">אסיה</option>
                        <option value="אפריקה">אפריקה</option>
                        <option value="אוקיאניה">אוקיאניה</option>
                      </select>
                    </div>
                  )}

                  {/* Compensation Received */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="hasCompensation"
                      checked={hasCompensation}
                      onChange={(e) => setHasCompensation(e.target.checked)}
                      className="w-4 h-4 rounded border-[#e8e7e5]"
                    />
                    <label htmlFor="hasCompensation" className="text-sm text-[#6b6b6b]">
                      כבר קיבלתי פיצוי עבור אותה טיסה
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#1e3a5f] hover:bg-[#152a47] text-white font-semibold"
                  >
                    בדוק את הזכאות שלי
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            <div>
              {results ? (
                <div className="space-y-4">
                  {/* Main Result Card */}
                  <Card className={`border-2 ${results.isEligible ? "border-[#8b9d83] bg-[#f0f5f2]" : "border-[#e8a87c] bg-[#faf5f0]"}`}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        {results.isEligible ? (
                          <CheckCircle className="w-6 h-6 text-[#8b9d83]" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-[#d4a574]" />
                        )}
                        <CardTitle className={results.isEligible ? "text-[#8b9d83]" : "text-[#d4a574]"}>
                          {results.isEligible ? "אתה כנראה זכאי!" : "אתה לא זכאי כרגע"}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-medium text-[#1e3a5f] mb-4">{results.message}</p>
                      {results.compensation && (
                        <div className="bg-white rounded-lg p-4 mb-4 border border-[#e8e7e5]">
                          <p className="text-2xl font-bold text-[#1e3a5f]">
                            ₪{results.compensation.min}-₪{results.compensation.max}
                          </p>
                          <p className="text-xs text-[#6b6b6b] mt-2">טווח פיצוי משוער</p>
                          {results.deductionNote && (
                            <p className="text-xs text-[#d4a574] mt-3 pt-3 border-t border-[#e8e7e5]">
                              {results.deductionNote}
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Rights Card */}
                  {results.rights.length > 0 && (
                    <Card className="border-[#e8e7e5]">
                      <CardHeader>
                        <CardTitle className="text-[#1e3a5f] text-lg">הזכויות שלך</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {results.rights.map((right: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-[#8b9d83] flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-[#6b6b6b]">{right}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* CTA Button */}
                  <Button
                    size="lg"
                    className="w-full bg-[#d4a574] hover:bg-[#a67c52] text-[#1e3a5f] font-semibold"
                    onClick={() => setShowContactModal(true)}
                  >
                    צור קשר עכשיו <ArrowRight className="mr-2 h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Card className="border-[#e8e7e5] bg-[#f9f8f6]">
                  <CardContent className="pt-8 text-center">
                    <Info className="w-12 h-12 text-[#d4a574] mx-auto mb-4" />
                    <p className="text-[#6b6b6b]">
                      מלא את פרטי הטיסה שלך בצד שמאל וקבל תשובה מיידית
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir="rtl">
          <Card className="w-full max-w-md bg-white border-[#e8e7e5] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#1e3a5f]">פרטי יצירת קשר</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {/* Summary Section */}
                <div className="bg-[#f9f8f6] p-4 rounded-lg mb-4 text-sm">
                  <p className="font-semibold text-[#1e3a5f] mb-2">סיכום הפרטים:</p>
                  <ul className="space-y-1 text-[#6b6b6b] text-xs">
                    <li>• סטטוס טיסה: {flightStatus === "cancelled" ? "בוטלה" : flightStatus === "delayed" ? "עיכוב" : flightStatus === "advanced" ? "הקדמה" : "בזמן"}</li>
                    {daysNotified && <li>• ימים לפני: {daysNotified}</li>}
                    {delayHours && <li>• שעות: {delayHours}</li>}
                    <li>• יעד: {destination}</li>
                    {results?.compensation && <li>• טווח פיצוי: ₪{results.compensation.min}-₪{results.compensation.max}</li>}
                  </ul>
                </div>

                {/* Contact Form Fields */}
                <div>
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-2">שם מלא *</label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="הכניסו שם מלא"
                    className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-2">מספר טלפון *</label>
                  <input
                    type="tel"
                    required
                    dir="rtl"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="הכניסו מספר טלפון"
                    className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-2">דוא"ל *</label>
                  <input
                    type="email"
                    required
                    dir="rtl"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="הכניסו דוא״ל"
                    className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-[#d4a574] hover:bg-[#a67c52] text-[#1e3a5f] font-semibold"
                  >
                    שלח
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-[#e8e7e5] text-[#1e3a5f]"
                    onClick={() => setShowContactModal(false)}
                  >
                    ביטול
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
