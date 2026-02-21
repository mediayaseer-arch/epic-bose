import { motion, AnimatePresence } from "motion/react";
import {
  Ticket,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Calendar,
  Sparkles,
  Camera,
  X,
  Mail,
} from "lucide-react";

interface LinkItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  delay?: number;
}

const LinkItem = ({
  href,
  icon,
  title,
  subtitle,
  delay = 0,
}: LinkItemProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center p-4 mb-4 glass rounded-2xl transition-all group"
  >
    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white ml-4 group-hover:glow-purple transition-all">
      {icon}
    </div>
    <div className="flex-1 text-right">
      <h3 className="font-bold text-lg text-white">{title}</h3>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </div>
  </motion.a>
);

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-lg glass rounded-3xl p-8 max-h-[80vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-white text-right">
            {title}
          </h2>
          <div className="text-gray-300 text-right leading-relaxed space-y-4">
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function App() {
  const [activeModal, setActiveModal] = useState<
    "privacy" | "security" | "about" | null
  >(null);

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://raw.githubusercontent.com/DohaQuest/assets/main/quest-interior.jpg"
          alt="Quest Doha Interior"
          className="w-full h-full object-cover opacity-30"
          onError={(e: { currentTarget: { style: { display: string } } }) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/60 to-[#050505]" />
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none z-1" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none z-1" />

      <div className="max-w-md mx-auto px-6 pt-16 pb-20 relative z-10">
        {/* Header Section */}
        <header className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block mb-6 relative"
          >
            {/* Logo Container */}
            <div className="w-full max-w-[200px] mx-auto mb-4">
              <img
                src="https://raw.githubusercontent.com/DohaQuest/assets/main/quest-logo-white.png"
                alt="Quest Doha Logo"
                className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.src =
                    "https://picsum.photos/seed/quest/200/100?blur=2";
                }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-black mb-3 bg-gradient-to-l from-white to-gray-400 bg-clip-text text-transparent"
          >
            كويست الدوحة
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 leading-relaxed text-sm px-4"
          >
            استمتع بـ أكثر من 30 لعبة ومنطقة جذب تحت سقف واحد في قلب الدوحة.
          </motion.p>
        </header>

        {/* Links Section */}
        <main>
          <LinkItem
            href="https://www.dohaquest.com/ar/tickets"
            icon={<Ticket className="w-6 h-6" />}
            title="احجز تذكرتك الآن"
            subtitle="تخطى الزحام واحصل على تذكرتك إلكترونياً"
            delay={0.4}
          />

          <LinkItem
            href="https://www.dohaquest.com/ar/attractions"
            icon={<Sparkles className="w-6 h-6" />}
            title="اكتشف الألعاب"
            subtitle="أكثر من 30 منطقة جذب مذهلة"
            delay={0.5}
          />

          <LinkItem
            href="https://www.dohaquest.com/ar/plan-your-visit"
            icon={<Calendar className="w-6 h-6" />}
            title="خطط لزيارتك"
            subtitle="ساعات العمل، الأسعار، والمعلومات الهامة"
            delay={0.6}
          />

          <LinkItem
            href="https://maps.google.com/?q=Quest+Doha"
            icon={<MapPin className="w-6 h-6" />}
            title="موقعنا في الدوحة"
            subtitle="مشيرب قلب الدوحة، واحة الدوحة"
            delay={0.7}
          />

          <LinkItem
            href="mailto:info@dohaquest.com"
            icon={<Mail className="w-6 h-6" />}
            title="تواصل معنا"
            subtitle="info@dohaquest.com"
            delay={0.8}
          />
        </main>

        {/* Social Media Section */}
        <footer className="mt-12">
          <div className="flex justify-center gap-6 mb-8">
            <SocialIcon
              href="https://instagram.com/dohaquest"
              icon={<Instagram />}
              delay={0.9}
            />
            <SocialIcon
              href="https://twitter.com/dohaquest"
              icon={<Twitter />}
              delay={1.0}
            />
            <SocialIcon
              href="https://facebook.com/dohaquest"
              icon={<Facebook />}
              delay={1.1}
            />
            <SocialIcon
              href="https://tiktok.com/@dohaquest"
              icon={<Camera />}
              delay={1.2}
            />
          </div>

          {/* Legal Links for Google Ads Compliance */}
          <div className="flex justify-center gap-4 mb-6 text-xs text-gray-500">
            <button
              onClick={() => setActiveModal("about")}
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              من نحن
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal("privacy")}
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              سياسة الخصوصية
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal("security")}
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              قواعد الأمن والسلامة
            </button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-center text-[10px] text-gray-600 uppercase tracking-widest"
          >
            &copy; {new Date().getFullYear()} كويست الدوحة. جميع الحقوق محفوظة.
          </motion.p>
        </footer>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === "about"}
        onClose={() => setActiveModal(null)}
        title="من نحن - كويست الدوحة"
      >
        <p>
          كويست الدوحة هي أول مدينة ملاهي داخلية عالمية المستوى في قطر، تقع في
          قلب مشيرب ضمن مشروع "واحة الدوحة" المذهل.
        </p>

        <h4 className="font-bold text-white mt-4 italic">مهمتنا</h4>
        <p>
          نسعى لتوفير تجربة ترفيهية غامرة تجمع بين الإثارة، الخيال، والابتكار،
          لخلق ذكريات لا تُنسى لجميع زوارنا من مختلف الأعمار.
        </p>

        <h4 className="font-bold text-white mt-4 italic">ما يميزنا</h4>
        <p>
          نحن فخورون باحتضاننا لأرقام قياسية عالمية، بما في ذلك "إيبي كيو" (أطول
          أفعوانية داخلية في العالم) و"ماجما بلاست" (أعلى برج هبوط داخلي في
          العالم). تنقسم كويست إلى ثلاث مناطق زمنية: الماضي (مدينة الخيال)،
          الحاضر (واحة الدوحة)، والمستقبل (محطة الفضاء).
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="سياسة الخصوصية"
      >
        <p>
          نحن في كويست الدوحة نلتزم بحماية خصوصيتك. توضح هذه السياسة كيفية جمع
          واستخدام وحماية معلوماتك الشخصية عند استخدام خدماتنا.
        </p>
        <h4 className="font-bold text-white mt-4">جمع المعلومات</h4>
        <p>
          نقوم بجمع المعلومات التي تقدمها لنا عند حجز التذاكر أو التواصل معنا،
          مثل الاسم والبريد الإلكتروني.
        </p>
        <h4 className="font-bold text-white mt-4">استخدام البيانات</h4>
        <p>
          نستخدم بياناتك لتحسين تجربتك، ومعالجة الحجوزات، وإرسال التحديثات
          الهامة المتعلقة بزيارتك.
        </p>
        <h4 className="font-bold text-white mt-4">حماية البيانات</h4>
        <p>
          نطبق إجراءات أمنية صارمة لضمان عدم الوصول غير المصرح به إلى معلوماتك
          الشخصية.
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === "security"}
        onClose={() => setActiveModal(null)}
        title="قواعد الأمن والسلامة"
      >
        <p>
          سلامتكم هي أولويتنا القصوى. يرجى اتباع القواعد التالية لضمان تجربة
          آمنة وممتعة للجميع:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>يرجى اتباع تعليمات موظفي التشغيل في جميع الأوقات.</li>
          <li>تأكد من استيفاء متطلبات الطول والوزن لكل لعبة قبل الركوب.</li>
          <li>يمنع التدخين أو تناول الأطعمة والمشروبات داخل مناطق الألعاب.</li>
          <li>يرجى الحفاظ على ممتلكاتك الشخصية في الخزائن المخصصة.</li>
          <li>نحن نراقب الموقع بالكاميرات لضمان سلامة الجميع.</li>
        </ul>
      </Modal>
    </div>
  );
}

const SocialIcon = ({
  href,
  icon,
  delay,
}: {
  href: string;
  icon: React.ReactNode;
  delay: number;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 200 }}
    whileHover={{ y: -5, color: "#a855f7" }}
    className="text-gray-400 transition-colors"
  >
    {React.cloneElement(icon as React.ReactElement, { size: 24 })}
  </motion.a>
);
