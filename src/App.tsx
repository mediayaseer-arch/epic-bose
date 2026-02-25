import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpLeft,
  Calendar,
  Camera,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Ticket,
  Twitter,
  X,
} from "lucide-react";
import {
  cloneElement,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
  type SyntheticEvent,
} from "react";

type ModalType = "privacy" | "security" | "about";

interface LinkItemProps {
  href: string;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  delay?: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

interface SocialIconProps {
  href: string;
  icon: ReactElement<{ size?: number }>;
  label: string;
  delay: number;
}

const quickLinks: LinkItemProps[] = [
  {
    href: "#",
    icon: <Sparkles className="h-6 w-6" />,
    title: "اكتشف الألعاب",
    subtitle: "أكثر من 30 منطقة جذب مذهلة",
    delay: 0.45,
  },
  {
    href: "#",
    icon: <Calendar className="h-6 w-6" />,
    title: "خطط لزيارتك",
    subtitle: "ساعات العمل، الأسعار، والمعلومات الهامة",
    delay: 0.55,
  },
  {
    href: "https://maps.google.com/?q=Quest+Doha",
    icon: <MapPin className="h-6 w-6" />,
    title: "موقعنا في الدوحة",
    subtitle: "مشيرب قلب الدوحة، واحة الدوحة",
    delay: 0.65,
  },
  {
    href: "mailto:info@dohaquest.com",
    icon: <Mail className="h-6 w-6" />,
    title: "تواصل معنا",
    subtitle: "info@dohaquest.com",
    delay: 0.75,
  },
];

const socialLinks: SocialIconProps[] = [
  {
    href: "https://instagram.com/dohaquest",
    icon: <Instagram />,
    label: "Instagram",
    delay: 0.85,
  },
  {
    href: "https://twitter.com/dohaquest",
    icon: <Twitter />,
    label: "Twitter",
    delay: 0.95,
  },
  {
    href: "https://facebook.com/dohaquest",
    icon: <Facebook />,
    label: "Facebook",
    delay: 1.05,
  },
  {
    href: "https://tiktok.com/@dohaquest",
    icon: <Camera />,
    label: "TikTok",
    delay: 1.15,
  },
];

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
    aria-label={title}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.45 }}
    whileHover={{ y: -2, scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className="group mb-4 flex flex-row-reverse items-center gap-4 rounded-2xl p-4 text-right transition-all duration-300 hover:border-purple-400/45 glass"
  >
    <div className="glow-purple flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      {subtitle ? <p className="text-sm text-gray-300">{subtitle}</p> : null}
    </div>
    <ArrowUpLeft className="h-4 w-4 text-gray-400 transition-colors duration-200 group-hover:text-purple-200" />
  </motion.a>
);

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => (
  <AnimatePresence>
    {isOpen ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 24 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="modal-content relative max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-3xl p-8 glass"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="إغلاق النافذة"
            className="absolute left-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:text-white"
          >
            <X size={22} />
          </button>
          <h2 className="mb-6 text-right text-2xl font-bold text-white">
            {title}
          </h2>
          <div className="space-y-4 text-right leading-relaxed text-gray-300">
            {children}
          </div>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);

const SocialIcon = ({ href, icon, label, delay }: SocialIconProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 220 }}
    whileHover={{ y: -3 }}
    className="rounded-full p-3 text-gray-300 transition-colors duration-200 hover:text-purple-200 glass"
  >
    {cloneElement(icon, { size: 22 })}
  </motion.a>
);

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  useEffect(() => {
    if (!activeModal) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveModal(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeModal]);

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#050505] selection:bg-purple-500/35"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/logo.png"
          alt="Quest Doha Interior"
          className="h-full w-full object-cover opacity-30"
          onError={(event: SyntheticEvent<HTMLImageElement>) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/85 via-[#050505]/65 to-[#050505]" />
      </div>

      <div className="pointer-events-none absolute -left-[10%] -top-[10%] z-0 h-[40%] w-[40%] rounded-full bg-purple-900/25 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-[10%] -right-[10%] z-0 h-[40%] w-[40%] rounded-full bg-blue-900/25 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-md px-6 pb-20 pt-12 sm:pt-16">
        <header className="mb-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="mb-6 inline-block"
          >
            <div className="mx-auto mb-4 w-full max-w-[215px]">
              <img
                src="/logo.png"
                alt="Quest Doha Logo"
                className="h-auto w-full drop-shadow-[0_0_16px_rgba(255,255,255,0.35)]"
                onError={(event: SyntheticEvent<HTMLImageElement>) => {
                  const image = event.currentTarget;
                  if (image.dataset.fallbackApplied) {
                    image.style.display = "none";
                    return;
                  }
                  image.dataset.fallbackApplied = "true";
                  image.src = "/logo.png";
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-purple-100 glass"
          >
            <ShieldCheck className="h-4 w-4" />
            تجربة آمنة ومليئة بالمغامرة
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="mb-3 bg-gradient-to-l from-white to-gray-300 bg-clip-text text-4xl font-black text-transparent"
          >
            كويست الدوحة
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-4 text-sm leading-relaxed text-gray-300"
          >
            استمتع بأكثر من 30 لعبة ومنطقة جذب تحت سقف واحد في قلب الدوحة.
          </motion.p>
        </header>

        <main>
          {quickLinks.map((link) => (
            <LinkItem key={link.href} {...link} />
          ))}
        </main>

        <footer className="mt-12">
          <div className="mb-8 flex justify-center gap-4">
            {socialLinks.map((social) => (
              <SocialIcon key={social.href} {...social} />
            ))}
          </div>

          <div className="mb-6 flex flex-wrap justify-center gap-3 text-xs text-gray-400">
            <button
              onClick={() => setActiveModal("about")}
              className="rounded-full px-3 py-1.5 transition-colors hover:text-white glass"
            >
              من نحن
            </button>
            <button
              onClick={() => setActiveModal("privacy")}
              className="rounded-full px-3 py-1.5 transition-colors hover:text-white glass"
            >
              سياسة الخصوصية
            </button>
            <button
              onClick={() => setActiveModal("security")}
              className="rounded-full px-3 py-1.5 transition-colors hover:text-white glass"
            >
              قواعد الأمن والسلامة
            </button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25 }}
            className="text-center text-[11px] text-gray-500"
          >
            &copy; {new Date().getFullYear()} كويست الدوحة. جميع الحقوق محفوظة.
          </motion.p>
        </footer>
      </div>

      <Modal
        isOpen={activeModal === "about"}
        onClose={() => setActiveModal(null)}
        title="من نحن - كويست الدوحة"
      >
        <p>
          كويست الدوحة هي أول مدينة ملاهي داخلية عالمية المستوى في قطر، تقع في
          قلب مشيرب ضمن مشروع "واحة الدوحة" المذهل.
        </p>

        <h4 className="mt-4 font-bold text-white">مهمتنا</h4>
        <p>
          نسعى لتوفير تجربة ترفيهية غامرة تجمع بين الإثارة، الخيال، والابتكار،
          لخلق ذكريات لا تُنسى لجميع زوارنا من مختلف الأعمار.
        </p>

        <h4 className="mt-4 font-bold text-white">ما يميزنا</h4>
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
        <h4 className="mt-4 font-bold text-white">جمع المعلومات</h4>
        <p>
          نقوم بجمع المعلومات التي تقدمها لنا عند حجز التذاكر أو التواصل معنا،
          مثل الاسم والبريد الإلكتروني.
        </p>
        <h4 className="mt-4 font-bold text-white">استخدام البيانات</h4>
        <p>
          نستخدم بياناتك لتحسين تجربتك، ومعالجة الحجوزات، وإرسال التحديثات
          الهامة المتعلقة بزيارتك.
        </p>
        <h4 className="mt-4 font-bold text-white">حماية البيانات</h4>
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
        <ul className="list-inside list-disc space-y-2">
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
