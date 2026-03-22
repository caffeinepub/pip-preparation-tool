import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext } from "react";

export type Language = "en" | "cy";

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.checklist": "Checklist",
    "nav.formPrep": "Form Prep",
    "nav.evidence": "Evidence",
    "nav.assessment": "Assessment",
    "nav.resources": "Resources",
    "nav.summary": "Summary",
    "nav.faq": "FAQ",
    "nav.appeals": "Appeals",
    "nav.admin": "Admin",
    "nav.timeline": "Timeline",
    "nav.evidenceByCondition": "Evidence by Condition",
    "nav.assessmentCard": "Assessment Day Card",
    "nav.badDayGuide": "Bad Day Guide",
    "nav.conditions": "Conditions",
    "nav.dates": "Dates",
    "nav.scoreEstimator": "Score Estimator",
    "nav.letterTemplate": "Letter Template",
    "nav.feedback": "Feedback",
    // Common
    "common.save": "Save",
    "common.print": "Print",
    "common.back": "Back",
    "common.next": "Next",
    "common.yes": "Yes",
    "common.no": "No",
    "common.close": "Close",
    "common.help": "Help",
    "common.easyRead": "Easy Read",
    "common.highContrast": "High Contrast",
    // Disclaimer
    disclaimer:
      "Important: This tool is for preparation only. It is not affiliated with the UK government or the DWP. To start your claim, you must call the DWP on 0800 917 2222. This app does not submit your claim or guarantee an award.",
    // Home page
    "home.hero.subtitle":
      "A free, private tool to help you gather information, draft your answers, and prepare for your Personal Independence Payment assessment — all saved securely on your device.",
    "home.hero.cta": "Start Preparing Your Claim",
    "home.disclaimer.title": "Important: Please Read Before Using This Tool",
    "home.disclaimer.body":
      "This tool is for preparation only. It is not affiliated with the UK government or the Department for Work and Pensions (DWP). This app does not submit your claim or guarantee an award.",
    "home.privacy.title": "Your Data Stays on Your Device",
    "home.privacy.body":
      "This tool does not require an account or login. All your answers, checklist progress, and document notes are saved only in your browser's local storage — they never leave your device and are never sent to any server.",
    // Assessment guide
    "assessment.title": "Assessment Preparation Guide",
    "assessment.intro":
      "Your PIP assessment is an important step in the claims process. This guide will help you prepare and know what to expect.",
    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.intro":
      "Common questions about PIP claims, assessments, and what to expect.",
    // Bad day guide
    "badday.title": "How to Describe a Bad Day",
    "badday.intro":
      "PIP assessors want to understand how your condition affects you on your worst days, not your best. This guide helps you think through and describe those days accurately.",
  },
  cy: {
    // Navigation
    "nav.home": "Hafan",
    "nav.checklist": "Rhestr Wirio",
    "nav.formPrep": "Paratoi Ffurflen",
    "nav.evidence": "Tystiolaeth",
    "nav.assessment": "Asesiad",
    "nav.resources": "Adnoddau",
    "nav.summary": "Crynodeb",
    "nav.faq": "Cwestiynau Cyffredin",
    "nav.appeals": "Apeliadau",
    "nav.admin": "Gweinyddu",
    "nav.timeline": "Amserlen",
    "nav.evidenceByCondition": "Tystiolaeth yn ôl Cyflwr",
    "nav.assessmentCard": "Cerdyn Diwrnod Asesiad",
    "nav.badDayGuide": "Canllaw Diwrnod Gwael",
    "nav.conditions": "Cyflyrau",
    "nav.dates": "Dyddiadau",
    "nav.scoreEstimator": "Amcangyfrif Sgôr",
    "nav.letterTemplate": "Templed Llythyr",
    "nav.feedback": "Adborth",
    // Common
    "common.save": "Cadw",
    "common.print": "Argraffu",
    "common.back": "Yn ôl",
    "common.next": "Nesaf",
    "common.yes": "Ie",
    "common.no": "Na",
    "common.close": "Cau",
    "common.help": "Cymorth",
    "common.easyRead": "Darllen Hawdd",
    "common.highContrast": "Cyferbyniad Uchel",
    // Disclaimer
    disclaimer:
      "Pwysig: Mae'r offeryn hwn at ddibenion paratoi yn unig. Nid yw'n gysylltiedig â llywodraeth y DU na'r DWP. I ddechrau eich hawliad, rhaid i chi ffonio'r DWP ar 0800 917 2222. Nid yw'r ap hwn yn cyflwyno'ch hawliad nac yn gwarantu dyfarniad.",
    // Home page
    "home.hero.subtitle":
      "Offeryn am ddim a phreifat i'ch helpu i gasglu gwybodaeth, drafftio'ch atebion, a pharatoi ar gyfer eich asesiad Taliad Annibyniaeth Bersonol — wedi'i gadw'n ddiogel ar eich dyfais.",
    "home.hero.cta": "Dechrau Paratoi Eich Hawliad",
    "home.disclaimer.title": "Pwysig: Darllenwch Cyn Defnyddio'r Offeryn Hwn",
    "home.disclaimer.body":
      "Mae'r offeryn hwn at ddibenion paratoi yn unig. Nid yw'n gysylltiedig â llywodraeth y DU na'r Adran Gwaith a Phensiynau (DWP). Nid yw'r ap hwn yn cyflwyno'ch hawliad nac yn gwarantu dyfarniad.",
    "home.privacy.title": "Mae Eich Data yn Aros ar Eich Dyfais",
    "home.privacy.body":
      "Nid oes angen cyfrif na mewngofnodi ar yr offeryn hwn. Cedwir eich holl atebion, cynnydd rhestr wirio, a nodiadau dogfennau yn storfa leol eich porwr yn unig — nid ydynt byth yn gadael eich dyfais ac ni chânt eu hanfon at unrhyw weinydd.",
    // Assessment guide
    "assessment.title": "Canllaw Paratoi Asesiad",
    "assessment.intro":
      "Mae eich asesiad PIP yn gam pwysig yn y broses hawliadau. Bydd y canllaw hwn yn eich helpu i baratoi a gwybod beth i'w ddisgwyl.",
    // FAQ
    "faq.title": "Cwestiynau Cyffredin",
    "faq.intro":
      "Cwestiynau cyffredin am hawliadau PIP, asesiadau, a beth i'w ddisgwyl.",
    // Bad day guide
    "badday.title": "Sut i Ddisgrifio Diwrnod Gwael",
    "badday.intro":
      "Mae aseswyr PIP am ddeall sut mae eich cyflwr yn effeithio arnoch ar eich dyddiau gwaethaf, nid eich gorau. Mae'r canllaw hwn yn eich helpu i feddwl drwy'r dyddiau hynny a'u disgrifio'n gywir.",
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useLocalStorage<Language>(
    "pip-language",
    "en",
  );

  const t = (key: string): string => {
    return translations[language][key] ?? translations.en[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
