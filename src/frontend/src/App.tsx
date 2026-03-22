import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { useActor } from "@/hooks/useActor";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AdminPanelPage } from "@/pages/AdminPanelPage";
import { AppealsPage } from "@/pages/AppealsPage";
import { AssessmentChecklistPage } from "@/pages/AssessmentChecklistPage";
import { AssessmentDayCardPage } from "@/pages/AssessmentDayCardPage";
import { AssessmentGuidePage } from "@/pages/AssessmentGuidePage";
import { BadDayGuidePage } from "@/pages/BadDayGuidePage";
import { BenefitCalculatorsPage } from "@/pages/BenefitCalculatorsPage";
import { ChecklistPage } from "@/pages/ChecklistPage";
import { ConditionTipsPage } from "@/pages/ConditionTipsPage";
import { CountdownPage } from "@/pages/CountdownPage";
import { EvidenceByConditionPage } from "@/pages/EvidenceByConditionPage";
import { EvidenceHelperPage } from "@/pages/EvidenceHelperPage";
import { FAQPage } from "@/pages/FAQPage";
import { FeedbackPage } from "@/pages/FeedbackPage";
import { FormPreparationPage } from "@/pages/FormPreparationPage";
import { HomePage } from "@/pages/HomePage";
import { LetterTemplatePage } from "@/pages/LetterTemplatePage";
import { PrintSummaryPage } from "@/pages/PrintSummaryPage";
import { PrivacyNoticePage } from "@/pages/PrivacyNoticePage";
import { ResourcesPage } from "@/pages/ResourcesPage";
import { ScoreEstimatorPage } from "@/pages/ScoreEstimatorPage";
import { TimelinePage } from "@/pages/TimelinePage";
import { VideoGuidancePage } from "@/pages/VideoGuidancePage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useLocation,
} from "@tanstack/react-router";
import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface PinnedNotice {
  active: boolean;
  text: string;
}

function PinnedNoticeBanner() {
  const [pinnedNotice] = useLocalStorage<PinnedNotice>("pip-pinned-notice", {
    active: false,
    text: "",
  });
  const [dismissed, setDismissed] = useState(false);

  if (!pinnedNotice.active || !pinnedNotice.text.trim() || dismissed)
    return null;

  return (
    <div
      className="bg-destructive/10 border-b-2 border-destructive text-destructive"
      role="alert"
      aria-live="polite"
      data-ocid="admin.panel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-3">
        <AlertTriangle
          className="w-4 h-4 mt-0.5 flex-shrink-0"
          aria-hidden="true"
        />
        <p className="text-sm font-medium flex-1">{pinnedNotice.text}</p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          aria-label="Dismiss notice"
          data-ocid="admin.close_button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Layout component with Header and Footer
function Layout() {
  const { actor } = useActor();
  const location = useLocation();

  useEffect(() => {
    if (actor && !sessionStorage.getItem("pip-visit-recorded")) {
      sessionStorage.setItem("pip-visit-recorded", "true");
      actor.recordVisit().catch(() => {});
    }
  }, [actor]);

  useEffect(() => {
    if (actor) {
      actor.recordPageVisit(location.pathname).catch(() => {});
    }
  }, [actor, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <PinnedNoticeBanner />
      <Outlet />
      <Footer />
    </div>
  );
}

// Routes
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const checklistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checklist",
  component: ChecklistPage,
});

const formPreparationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/form-preparation",
  component: FormPreparationPage,
});

const evidenceHelperRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/evidence-helper",
  component: EvidenceHelperPage,
});

const assessmentGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assessment-guide",
  component: AssessmentGuidePage,
});

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resources",
  component: ResourcesPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: PrivacyNoticePage,
});

const printSummaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/print-summary",
  component: PrintSummaryPage,
});

const badDayGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bad-day-guide",
  component: BadDayGuidePage,
});

const conditionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/conditions",
  component: ConditionTipsPage,
});

const datesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dates",
  component: CountdownPage,
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faq",
  component: FAQPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPanelPage,
});

const appealsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/appeals",
  component: AppealsPage,
});

const letterTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/letter-template",
  component: LetterTemplatePage,
});

const scoreEstimatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/score-estimator",
  component: ScoreEstimatorPage,
});

const feedbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/feedback",
  component: FeedbackPage,
});

const timelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/timeline",
  component: TimelinePage,
});

const evidenceByConditionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/evidence-by-condition",
  component: EvidenceByConditionPage,
});

const videoGuidanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/video-guidance",
  component: VideoGuidancePage,
});

const assessmentChecklistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assessment-checklist",
  component: AssessmentChecklistPage,
});

const benefitCalculatorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/benefit-calculators",
  component: BenefitCalculatorsPage,
});

const assessmentCardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assessment-card",
  component: AssessmentDayCardPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  checklistRoute,
  formPreparationRoute,
  evidenceHelperRoute,
  assessmentGuideRoute,
  resourcesRoute,
  privacyRoute,
  printSummaryRoute,
  badDayGuideRoute,
  conditionsRoute,
  datesRoute,
  faqRoute,
  adminRoute,
  appealsRoute,
  letterTemplateRoute,
  scoreEstimatorRoute,
  feedbackRoute,
  timelineRoute,
  evidenceByConditionRoute,
  assessmentCardRoute,
  videoGuidanceRoute,
  assessmentChecklistRoute,
  benefitCalculatorsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <RouterProvider router={router} />
      </AccessibilityProvider>
    </LanguageProvider>
  );
}
