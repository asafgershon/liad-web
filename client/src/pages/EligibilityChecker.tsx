import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

/**
 * Design Philosophy: Modern Legal Professionalism with Warmth
 * Interactive eligibility checker for aviation compensation claims
 * Provides immediate feedback on claim eligibility based on flight details
 */

interface EligibilityResult {
  eligible: boolean;
  compensation: number;
  reasons: string[];
  conditions: string[];
}

export default function EligibilityChecker() {
  const [formData, setFormData] = useState({
    flightDate: "",
    delayHours: "",
    cancellationReason: "",
    flightType: "domestic", // domestic or international
    hasCompensation: false,
  });

  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const calculateEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(false);

    const delayHours = parseInt(formData.delayHours) || 0;
    const flightDate = new Date(formData.flightDate);
    const isInternational = formData.flightType === "international";
    const hasAlreadyCompensation = formData.hasCompensation;

    let eligible = false;
    let compensation = 0;
    const reasons: string[] = [];
    const conditions: string[] = [];

    // Check if flight date is in the past
    if (flightDate > new Date()) {
      conditions.push("⚠️ בדיקה זו עבור טיסות שכבר התרחשו");
    }

    // Delay eligibility
    if (delayHours >= 3) {
      eligible = true;
      reasons.push("עיכוב של 3 שעות או יותר");

      if (isInternational) {
        if (delayHours >= 3 && delayHours < 4) compensation = 250;
        else if (delayHours >= 4) compensation = 400;
      } else {
        compensation = 0; // Israeli domestic flights have different rules
        reasons.push("טיסה דומסטית - בדוק את חוק שירותי התעופה הישראלי");
      }
    }

    // Cancellation eligibility
    if (formData.cancellationReason && formData.cancellationReason !== "none") {
      eligible = true;
      reasons.push("ביטול טיסה");

      if (formData.cancellationReason === "airline") {
        if (isInternational) {
          compensation = 600;
          reasons.push("ביטול בגלל סיבה של חברת התעופה");
        } else {
          compensation = 0;
          reasons.push("טיסה דומסטית - בדוק את חוק שירותי התעופה הישראלי");
        }
      } else if (formData.cancellationReason === "extraordinary") {
        eligible = false;
        reasons.push("ביטול בגלל נסיבות חריגות - אולי לא זכאי לפיצוי");
      }
    }

    // Already received compensation
    if (hasAlreadyCompensation) {
      eligible = false;
      reasons.push("כבר קיבלת פיצוי - לא ניתן להגיש תביעה נוספת");
    }

    // Add conditions
    if (eligible && compensation > 0) {
      conditions.push("✅ אתה כנראה זכאי לפיצוי");
      conditions.push(`💰 סכום פיצוי משוער: €${compensation}`);
      conditions.push("📋 צור קשר איתנו לאישור סופי ותחילת התהליך");
    } else if (!eligible) {
      conditions.push("❌ לפי הנתונים שלך, אתה אולי לא זכאי לפיצוי");
      conditions.push("💡 עם זאת, כל מקרה הוא ייחודי - צור קשר לייעוץ חינם");
    }

    setResult({
      eligible,
      compensation,
      reasons,
      conditions,
    });

    setTimeout(() => setShowResult(true), 300);
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#2d2d2d]" dir="rtl">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#e8e7e5]">
        <div className="container flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚖️</span>
            </div>
            <h1 className="text-xl font-bold text-[#1e3a5f]">עורך דין תביעות תעופה</h1>
          </a>
          <Button
            variant="outline"
            className="border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white"
            onClick={() => window.location.href = "/"}
          >
            חזור לעמוד הבית
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
              בדוק את הזכאות שלך לפיצוי
            </h1>
            <p className="text-lg text-[#6b6b6b]">
              מלא את פרטי הטיסה שלך וקבל תשובה מיידית אם אתה זכאי לפיצוי
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="border-[#e8e7e5] bg-white h-fit">
              <CardHeader>
                <CardTitle className="text-[#1e3a5f]">פרטי הטיסה</CardTitle>
                <CardDescription>
                  מלא את המידע הבא לבדיקה מהירה
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateEligibility} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
                      תאריך הטיסה
                    </label>
                    <input
                      type="date"
                      name="flightDate"
                      value={formData.flightDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] bg-white text-[#2d2d2d]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
                      סוג הטיסה
                    </label>
                    <select
                      name="flightType"
                      value={formData.flightType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] bg-white text-[#2d2d2d]"
                    >
                      <option value="domestic">טיסה דומסטית (בתוך ישראל)</option>
                      <option value="international">טיסה בינלאומית</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
                      שעות עיכוב (אם היתה)
                    </label>
                    <input
                      type="number"
                      name="delayHours"
                      value={formData.delayHours}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] bg-white text-[#2d2d2d]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
                      האם הטיסה בוטלה?
                    </label>
                    <select
                      name="cancellationReason"
                      value={formData.cancellationReason}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] bg-white text-[#2d2d2d]"
                    >
                      <option value="none">לא, הטיסה לא בוטלה</option>
                      <option value="airline">כן, בגלל סיבה של חברת התעופה</option>
                      <option value="extraordinary">כן, בגלל נסיבות חריגות (מזג אוויר, בעיות ביטחוניות וכו')</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="hasCompensation"
                      name="hasCompensation"
                      checked={formData.hasCompensation}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-[#e8e7e5]"
                    />
                    <label htmlFor="hasCompensation" className="text-sm text-[#6b6b6b]">
                      כבר קיבלתי פיצוי עבור אותה טיסה
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#1e3a5f] hover:bg-[#2d5a8c] text-white font-semibold py-2 mt-6"
                  >
                    בדוק את הזכאות שלי
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            <div>
              {showResult && result && (
                <div className={`space-y-4 animate-in fade-in duration-300`}>
                  {/* Eligibility Status */}
                  <Card
                    className={`border-2 ${
                      result.eligible
                        ? "border-[#d4a574] bg-[#d4a574]/5"
                        : "border-[#d32f2f] bg-[#d32f2f]/5"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        {result.eligible ? (
                          <CheckCircle2 className="w-8 h-8 text-[#d4a574]" />
                        ) : (
                          <AlertCircle className="w-8 h-8 text-[#d32f2f]" />
                        )}
                        <CardTitle className={result.eligible ? "text-[#d4a574]" : "text-[#d32f2f]"}>
                          {result.eligible ? "אתה כנראה זכאי!" : "בדוק עם עורך דין"}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {result.compensation > 0 && (
                        <div className="text-3xl font-bold text-[#1e3a5f] mb-2">
                          €{result.compensation}
                        </div>
                      )}
                      <p className="text-[#6b6b6b]">
                        {result.eligible
                          ? "על פי הנתונים שלך, אתה זכאי לפיצוי"
                          : "אנא צור קשר לייעוץ חינם"}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Reasons */}
                  {result.reasons.length > 0 && (
                    <Card className="border-[#e8e7e5]">
                      <CardHeader>
                        <CardTitle className="text-[#1e3a5f] text-lg">הסיבות</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.reasons.map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[#6b6b6b]">
                              <CheckCircle2 className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Conditions */}
                  {result.conditions.length > 0 && (
                    <Card className="border-[#e8e7e5] bg-[#1e3a5f] text-white">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">הצעדים הבאים</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.conditions.map((condition, idx) => (
                            <li key={idx} className="text-[#e8e7e5]">
                              {condition}
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
                    onClick={() => (window.location.href = "/#contact")}
                  >
                    צור קשר עכשיו <ArrowRight className="mr-2 h-5 w-5" />
                  </Button>
                </div>
              )}

              {!showResult && (
                <Card className="border-[#e8e7e5] bg-gradient-to-br from-[#1e3a5f]/5 to-[#d4a574]/5">
                  <CardContent className="pt-12 text-center">
                    <AlertCircle className="w-12 h-12 text-[#d4a574] mx-auto mb-4" />
                    <p className="text-[#6b6b6b] mb-4">
                      מלא את פרטי הטיסה שלך כדי לקבל תוצאות בדיקה
                    </p>
                    <p className="text-sm text-[#8b9d83]">
                      זו בדיקה מהירה בלבד. התוצאה הסופית תידרש אישור משפטי.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="border-[#e8e7e5]">
              <CardHeader>
                <CardTitle className="text-[#1e3a5f] text-lg">🛫 טיסה בינלאומית</CardTitle>
              </CardHeader>
              <CardContent className="text-[#6b6b6b]">
                <p className="text-sm">
                  טיסות בינלאומיות מכוסות בתקנות האירופיות (EC 261/2004) ופיצוי עד €600
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#e8e7e5]">
              <CardHeader>
                <CardTitle className="text-[#1e3a5f] text-lg">🏠 טיסה דומסטית</CardTitle>
              </CardHeader>
              <CardContent className="text-[#6b6b6b]">
                <p className="text-sm">
                  טיסות דומסטיות בישראל מכוסות בחוק שירותי התעופה הישראלי
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#e8e7e5]">
              <CardHeader>
                <CardTitle className="text-[#1e3a5f] text-lg">⏱️ זמן תגובה</CardTitle>
              </CardHeader>
              <CardContent className="text-[#6b6b6b]">
                <p className="text-sm">
                  בדרך כלל יש 3 שנים מתאריך הטיסה להגשת תביעה
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-12 border-t border-[#2d5a8c] mt-16">
        <div className="container text-center text-sm text-[#e8e7e5]">
          <p>&copy; 2026 עורך דין תביעות תעופה. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </div>
  );
}
