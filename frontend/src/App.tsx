import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { ChecklistPage } from '@/pages/ChecklistPage';
import { FormPreparationPage } from '@/pages/FormPreparationPage';
import { EvidenceHelperPage } from '@/pages/EvidenceHelperPage';
import { AssessmentGuidePage } from '@/pages/AssessmentGuidePage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { PrivacyNoticePage } from '@/pages/PrivacyNoticePage';

// Layout component with Header and Footer
function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
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
    path: '/',
    component: HomePage,
});

const checklistRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/checklist',
    component: ChecklistPage,
});

const formPreparationRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/form-preparation',
    component: FormPreparationPage,
});

const evidenceHelperRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/evidence-helper',
    component: EvidenceHelperPage,
});

const assessmentGuideRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/assessment-guide',
    component: AssessmentGuidePage,
});

const resourcesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/resources',
    component: ResourcesPage,
});

const privacyRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/privacy',
    component: PrivacyNoticePage,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    checklistRoute,
    formPreparationRoute,
    evidenceHelperRoute,
    assessmentGuideRoute,
    resourcesRoute,
    privacyRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export default function App() {
    return <RouterProvider router={router} />;
}
