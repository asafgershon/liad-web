import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Phone, Mail, MapPin, ArrowRight, FileText, Clock, DollarSign, FileCheck, Search, Lightbulb, CheckCircle, Luggage } from "lucide-react";
import { useState } from "react";

/**
 * Design Philosophy: Modern Legal Professionalism with Warmth
 * - Deep Navy Blue (#1e3a5f) for trust and authority
 * - Warm Gold (#d4a574) for success and compensation
 * - Soft Sage Green (#8b9d83) for balance and fairness
 * - Hebrew RTL layout with asymmetric sections
 * - Professional typography: Playfair Display for headlines, Noto Sans Hebrew for body
 */

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    flightDetails: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Connect to backend or email service
    alert("תודה על פנייתך! נחזור אליך בהקדם.");
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#2d2d2d]" dir="rtl">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#e8e7e5]">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚖️</span>
            </div>
            <h1 className="text-xl font-bold text-[#1e3a5f]">ליעד גרשון עו"ד (רו"ח)</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-[#2d2d2d] hover:text-[#d4a574] transition-colors">
              שירותים
            </a>
            <a href="#eligibility" className="text-[#2d2d2d] hover:text-[#d4a574] transition-colors">
              ביטול טיסה
            </a>
            <a href="#baggage" className="text-[#2d2d2d] hover:text-[#d4a574] transition-colors">
              בעיות כבודה
            </a>
            <Button className="bg-[#1e3a5f] hover:bg-[#2d5a8c] text-white" onClick={() => window.location.href = '#contact'}>
              צור קשר
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section - Asymmetric Layout */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content - Right Side (RTL) */}
            <div className="space-y-6 order-2 md:order-1">
              <h1 className="text-5xl md:text-6xl font-bold text-[#1e3a5f] leading-tight">
                מימוש זכויות נוסעים מול חברות תעופה
              </h1>
              <p className="text-lg text-[#6b6b6b] leading-relaxed">
                אנו מייצגים נוסעים בתביעות כנגד חברות תעופה לקבלת פיצויים בגין ביטול טיסות, עיכובים ושינויים בתנאיי הטיסה. 
                עם ניסיון של שנים בדיני תעופה, אנו מבטיחים את זכויותיך.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d5a8c] text-white text-base" onClick={() => window.location.href = '/eligibility'}>
                  בדוק את הזכאות שלך <ArrowRight className="mr-2 h-5 w-5" />
                </Button>

              </div>
            </div>

            {/* Hero Image - Left Side (RTL) */}
            <div className="order-1 md:order-2 relative">
              <div className="relative h-96 md:h-full rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663495399229/g4QTWcVJ3dJiuK9ACQdg8n/hero-airport-terminal-KSfKrVpkEcKXaN6gs8VXYo.webp"
                  alt="Airport Terminal"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#f9f8f6]/20"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#d4a574] rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white border-y border-[#e8e7e5]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
              שירותינו
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto">
              ייצוג משפטי מלא בתחום דיני תעופה וזכויות נוסעים
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8" />,
                title: "ביטול טיסה",
                description: "טיסה בוטלה? ייתכן שמגיע לכם פיצוי כספי מחברת התעופה",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "עיכוב טיסה",
                description: "טיסה התעכבה מעל שעתיים? ייתכן שמגיע לכם פיצוי או שירותי סיוע",
              },
              {
                icon: <Luggage className="w-8 h-8" />,
                title: "בעיות כבודה",
                description: "המזוודה לא הגיעה, ניזוקה או התעכבה? ייתכן שמגיע לכם פיצוי",
              },
            ].map((service, idx) => (
              <Card key={idx} className="border-[#e8e7e5] hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#d4a574]/10 rounded-lg flex items-center justify-center mb-4 text-[#d4a574]">
                    {service.icon}
                  </div>
                  <CardTitle className="text-[#1e3a5f]">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#6b6b6b]">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Check Section */}
      <section id="eligibility" className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image - Right Side (RTL) */}
            <div className="order-2 md:order-1">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663495399229/g4QTWcVJ3dJiuK9ACQdg8n/legal-scales-abstract-UR6mEoVweYZmzJGQqKs3LL.webp"
                alt="Scales of Justice"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>

            {/* Content - Left Side (RTL) */}
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-4xl font-bold text-[#1e3a5f]">
                האם מגיע לכם פיצוי מחברת התעופה?
              </h2>
              <p className="text-lg text-[#6b6b6b]">
                בדקו עכשיו זכאות לפיצוי בגין עיכוב, ביטול או שינוי בתנאי הטיסה:
              </p>

              <div className="space-y-4">
                {[
                  "ביטול טיסה פחות מ-14 יום לפני מועד ההמראה",
                  "עיכוב טיסה העולה על שעתיים",
                  "שינוי בתנאיי הטיסה ללא הסכמתכם",
                  "סירוב עלייה למטוס (overbooking)",
                  "הפסד טיסת המשך עקב עיכוב",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#d4a574] flex-shrink-0 mt-1" />
                    <span className="text-[#2d2d2d]">{item}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-[#d4a574] hover:bg-[#a67c52] text-[#1e3a5f] font-semibold mt-6" onClick={() => window.location.href = '/eligibility'}>
                בדוק את הזכאות שלך עכשיו
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Baggage Compensation Section */}
      <section id="baggage" className="py-20 bg-[#1e3a5f]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content - Right Side (RTL) */}
            <div className="order-1 md:order-1 space-y-6">
              <h2 className="text-4xl font-bold text-white">
                פיצוי בגין בעיות כבודה
              </h2>
              <p className="text-lg text-[#e8e7e5]">
                בנוסף לפיצויים בגין ביטול וביטול טיסות, אתה זכאי לפיצוי גם בגין בעיות בכבודה שלך
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "איחור בהגעת כבודה",
                    description: "כבודה שהגיעה מאוחר מהנדרש - עד €400 לטיסה"
                  },
                  {
                    title: "נזק לכבודה",
                    description: "כבודה שנפגעה או ניזוקה במהלך הטיסה - עד €1,200"
                  },
                  {
                    title: "אבדן מלא של כבודה",
                    description: "כבודה שלא הגיעה בכלל - עד €1,200 לטיסה"
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-[#2d5a8c] p-4 rounded-lg">
                    <div className="w-8 h-8 bg-[#d4a574] rounded-full flex items-center justify-center text-[#1e3a5f] font-bold flex-shrink-0 mt-1">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-[#e8e7e5] text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-[#d4a574] hover:bg-[#a67c52] text-[#1e3a5f] font-semibold mt-6" onClick={() => window.location.href = '#contact'}>
                השאר פרטים עכשיו
              </Button>
            </div>

            {/* Image - Left Side (RTL) */}
            <div className="order-2 md:order-2">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663495399229/g4QTWcVJ3dJiuK9ACQdg8n/baggage-trolley-luggage-RDAkcj4KKHzhuw5YTG7WiK.webp"
                alt="Baggage Compensation"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How the Process Works Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
              איך התהליך עובד
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto">
              תהליך פשוט וברור בעבור קבלת הפיצוי שלך
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "משאירים פרטים",
                description: "מלא את טופס יצירת הקשר עם פרטי הטיסה שלך והנסיבות",
                Icon: FileText,
              },
              {
                step: 2,
                title: "בודקים את המסמכים",
                description: "אנו בודקים את המסמכים שלך והנסיבות של המקרה בפירוט",
                Icon: Search,
              },
              {
                step: 3,
                title: "הערכה ראשונית",
                description: "מקבלים הערכה ראשונית לגבי המסלול האפשרי והפיצוי הצפוי",
                Icon: Lightbulb,
              },
              {
                step: 4,
                title: "קידום התביעה",
                description: "מקדמים את התביעה או הדרישה לפי הצורך עד לקבלת הפיצוי",
                Icon: CheckCircle,
              },
            ].map((item, idx) => {
              const IconComponent = item.Icon;
              return (
              <div key={idx} className="relative">
                {/* Connector Line */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-20 right-0 w-full h-1 bg-gradient-to-l from-transparent via-[#d4a574] to-transparent transform -translate-y-1/2"></div>
                )}

                <Card className="border-[#e8e7e5] relative z-10 h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-[#d4a574] rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {item.step}
                      </div>
                    </div>
                    <CardTitle className="text-[#1e3a5f] text-center">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#6b6b6b]">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            );
            })
            }
          </div>


        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#1e3a5f]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  צור קשר איתנו
                </h2>
                <p className="text-lg text-[#e8e7e5]">
                  אנו כאן כדי לעזור. צור קשר עבור ייעוץ חינם ללא התחייבות
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#d4a574] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">טלפון</h3>
                    <a href="tel:+972543453393" className="text-[#e8e7e5] hover:text-[#d4a574]">
                      054-3453393
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#d4a574] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">דוא"ל</h3>
                    <a href="mailto:liad@lg-adv.com" className="text-[#e8e7e5] hover:text-[#d4a574]">
                      liad@lg-adv.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-[#e8e7e5] bg-white">
              <CardHeader>
                <CardTitle className="text-[#1e3a5f]">טופס יצירת קשר</CardTitle>
                <CardDescription>
                  מלא את הפרטים שלך ונחזור אליך בהקדם
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
                      שם מלא
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="הכנס את שמך"
                      className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] bg-white text-[#2d2d2d] text-right"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
                      טלפון
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="הכנס את מספר הטלפון שלך"
                      className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] bg-white text-[#2d2d2d] text-right"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
                      דוא&apos;ל
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="הכנס את כתובת הדוא'ל שלך"
                      className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] bg-white text-[#2d2d2d] text-right"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
                      פרטי הטיסה והערות
                    </label>
                    <textarea
                      name="flightDetails"
                      value={formData.flightDetails}
                      onChange={handleInputChange}
                      placeholder="הכנס את פרטי הטיסה שלך והערות נוספות אודות המקרה..."
                      rows={4}
                      className="w-full px-4 py-2 border border-[#e8e7e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] bg-white text-[#2d2d2d]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#1e3a5f] hover:bg-[#2d5a8c] text-white font-semibold py-2"
                  >
                    שלח בקשה
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-12 border-t border-[#2d5a8c]">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">אודות</h3>
              <p className="text-[#e8e7e5] text-sm">
                משרד עורכי דין המתמחה בדיני תעופה וזכויות נוסעים
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">שירותים</h3>
              <ul className="space-y-2 text-sm text-[#e8e7e5]">
                <li><a href="#" className="hover:text-[#d4a574]">תביעות ביטול</a></li>
                <li><a href="#" className="hover:text-[#d4a574]">תביעות עיכוב</a></li>
                <li><a href="#" className="hover:text-[#d4a574]">ייעוץ משפטי</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">קישורים</h3>
              <ul className="space-y-2 text-sm text-[#e8e7e5]">
                <li><a href="#" className="hover:text-[#d4a574]">בדיקת זכאות</a></li>
                <li><a href="#" className="hover:text-[#d4a574]">צור קשר</a></li>
                <li><a href="#" className="hover:text-[#d4a574]">תנאים</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">עקוב אחרינו</h3>
              <div className="flex gap-4">
                <a href="#" className="text-[#d4a574] hover:text-white">LinkedIn</a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2d5a8c] pt-8 text-center text-sm text-[#e8e7e5]">
            <p>&copy; 2026 עורך דין תביעות תעופה. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
