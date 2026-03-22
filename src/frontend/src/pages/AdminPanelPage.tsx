import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  type AdminLogEntry,
  clearAdminLog,
  getAdminPassword,
  loadAdminLog,
  logAdminAction,
} from "@/utils/adminLog";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Clipboard,
  Download,
  Eye,
  EyeOff,
  FileText,
  Heart,
  Key,
  Link2,
  Lock,
  Megaphone,
  MessageSquare,
  Plus,
  Save,
  Shield,
  Star,
  ThumbsUp,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

interface AdConfig {
  imageUrl: string;
  linkUrl: string;
  text: string;
}

const DEFAULT_AD: AdConfig = { imageUrl: "", linkUrl: "", text: "" };

interface FeedbackEntry {
  date: string;
  rating: number;
  mostHelpful: string;
  improvements: string;
  referral: string;
}

interface Notice {
  id: string;
  title: string;
  body: string;
  date: string;
  active: boolean;
}

interface CommunityTip {
  id: string;
  condition: string;
  tip: string;
  date: string;
  approved: boolean;
}

interface AdminConditionTip {
  condition: string;
  tips: string[];
}

interface ReplyTemplate {
  id: string;
  title: string;
  body: string;
}

interface ResourceLink {
  id: string;
  title: string;
  url: string;
  description: string;
}

interface PinnedNotice {
  active: boolean;
  text: string;
}

interface SupportLink {
  id: string;
  title: string;
  url: string;
}

function loadFeedback(): FeedbackEntry[] {
  try {
    return JSON.parse(
      localStorage.getItem("pip-feedback") ?? "[]",
    ) as FeedbackEntry[];
  } catch {
    return [];
  }
}

function loadPendingTips(): CommunityTip[] {
  try {
    return JSON.parse(
      localStorage.getItem("pip-community-tips-pending") ?? "[]",
    ) as CommunityTip[];
  } catch {
    return [];
  }
}

function loadApprovedTips(): CommunityTip[] {
  try {
    return JSON.parse(
      localStorage.getItem("pip-community-tips-approved") ?? "[]",
    ) as CommunityTip[];
  } catch {
    return [];
  }
}

function saveApprovedTips(tips: CommunityTip[]) {
  localStorage.setItem("pip-community-tips-approved", JSON.stringify(tips));
}

function savePendingTips(tips: CommunityTip[]) {
  localStorage.setItem("pip-community-tips-pending", JSON.stringify(tips));
}

function exportFeedbackCSV(entries: FeedbackEntry[]) {
  const headers = [
    "Date",
    "Rating",
    "Most Helpful",
    "Improvements",
    "Referral",
  ];
  const rows = entries.map((e) =>
    [e.date, String(e.rating), e.mostHelpful, e.improvements, e.referral]
      .map((v) => `"${(v ?? "").replace(/"/g, '""')}"`)
      .join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pip-feedback-export.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function getFeedbackStats(entries: FeedbackEntry[]) {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const thisWeek = entries.filter((e) => new Date(e.date) >= weekAgo).length;
  const thisMonth = entries.filter((e) => new Date(e.date) >= monthAgo).length;
  return { total: entries.length, thisWeek, thisMonth };
}

function AdminDashboard() {
  const { actor } = useActor();

  // ----------------------------------------------------------------
  // Visit Counter
  // ----------------------------------------------------------------
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [pageVisits, setPageVisits] = useState<[string, bigint][]>([]);
  const [pageVisitsLoading, setPageVisitsLoading] = useState(false);

  useEffect(() => {
    if (actor) {
      actor
        .getVisitCount()
        .then((count) => setVisitCount(Number(count)))
        .catch(() => setVisitCount(null));

      setPageVisitsLoading(true);
      actor
        .getPageVisits()
        .then((visits) => {
          const sorted = [...visits].sort(
            (a, b) => Number(b[1]) - Number(a[1]),
          );
          setPageVisits(sorted);
        })
        .catch(() => setPageVisits([]))
        .finally(() => setPageVisitsLoading(false));
    }
  }, [actor]);

  // ----------------------------------------------------------------
  // Donation Link
  // ----------------------------------------------------------------
  const [paypalLink, setPaypalLink] = useLocalStorage<string>(
    "pip-donation-link",
    "",
  );
  const [donationDraft, setDonationDraft] = useState(paypalLink);
  const [donationSaved, setDonationSaved] = useState(false);

  const saveDonationLink = () => {
    setPaypalLink(donationDraft.trim());
    setDonationSaved(true);
    logAdminAction(`Updated donation link: ${donationDraft.trim()}`);
    setTimeout(() => setDonationSaved(false), 2000);
  };

  // ----------------------------------------------------------------
  // Ad config
  // ----------------------------------------------------------------
  const [adConfig, setAdConfig] = useLocalStorage<AdConfig>(
    "pip-ad",
    DEFAULT_AD,
  );
  const [adDraft, setAdDraft] = useState<AdConfig>({ ...adConfig });
  const [adSaved, setAdSaved] = useState(false);

  const saveAd = () => {
    setAdConfig(adDraft);
    setAdSaved(true);
    logAdminAction("Updated advertisement");
    setTimeout(() => setAdSaved(false), 2000);
  };

  const clearAd = () => {
    setAdConfig(DEFAULT_AD);
    setAdDraft({ ...DEFAULT_AD });
    logAdminAction("Cleared advertisement");
  };

  // ----------------------------------------------------------------
  // Feedback
  // ----------------------------------------------------------------
  const [feedbackEntries, setFeedbackEntries] = useState<FeedbackEntry[]>(() =>
    loadFeedback(),
  );
  const feedbackStats = getFeedbackStats(feedbackEntries);

  const clearFeedback = () => {
    localStorage.removeItem("pip-feedback");
    setFeedbackEntries([]);
    logAdminAction("Cleared all feedback");
  };

  // ----------------------------------------------------------------
  // Notices (ticker)
  // ----------------------------------------------------------------
  const [notices, setNotices] = useLocalStorage<Notice[]>("pip-notices", []);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeBody, setNoticeBody] = useState("");

  const addNotice = () => {
    if (!noticeTitle.trim() || !noticeBody.trim()) return;
    const notice: Notice = {
      id: `notice-${Date.now()}`,
      title: noticeTitle.trim(),
      body: noticeBody.trim(),
      date: new Date().toISOString(),
      active: true,
    };
    setNotices((prev) => [notice, ...prev]);
    setNoticeTitle("");
    setNoticeBody("");
    logAdminAction(`Added notice: "${notice.title}"`);
  };

  const toggleNotice = (id: string) => {
    setNotices((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          logAdminAction(`${n.active ? "Hid" : "Showed"} notice: "${n.title}"`);
          return { ...n, active: !n.active };
        }
        return n;
      }),
    );
  };

  const deleteNotice = (id: string) => {
    const notice = notices.find((n) => n.id === id);
    if (notice) logAdminAction(`Deleted notice: "${notice.title}"`);
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  // ----------------------------------------------------------------
  // Pinned Urgent Notice
  // ----------------------------------------------------------------
  const [pinnedNotice, setPinnedNotice] = useLocalStorage<PinnedNotice>(
    "pip-pinned-notice",
    { active: false, text: "" },
  );
  const [pinnedDraft, setPinnedDraft] = useState(pinnedNotice.text);

  const savePinnedNotice = () => {
    setPinnedNotice({ active: pinnedNotice.active, text: pinnedDraft.trim() });
    logAdminAction(
      `Saved pinned notice: "${pinnedDraft.trim().slice(0, 60)}..."`,
    );
  };

  const togglePinnedNotice = () => {
    const next = !pinnedNotice.active;
    setPinnedNotice({ ...pinnedNotice, active: next });
    logAdminAction(`Pinned notice ${next ? "activated" : "deactivated"}`);
  };

  // ----------------------------------------------------------------
  // Community tips
  // ----------------------------------------------------------------
  const [pendingTips, setPendingTips] = useState<CommunityTip[]>(() =>
    loadPendingTips(),
  );
  const [approvedTips, setApprovedTips] = useState<CommunityTip[]>(() =>
    loadApprovedTips(),
  );

  const approveTip = (tip: CommunityTip) => {
    const newApproved = [...approvedTips, { ...tip, approved: true }];
    setApprovedTips(newApproved);
    saveApprovedTips(newApproved);
    const newPending = pendingTips.filter((t) => t.id !== tip.id);
    setPendingTips(newPending);
    savePendingTips(newPending);
    logAdminAction(`Approved community tip for condition: "${tip.condition}"`);
  };

  const rejectTip = (id: string) => {
    const newPending = pendingTips.filter((t) => t.id !== id);
    setPendingTips(newPending);
    savePendingTips(newPending);
    logAdminAction("Rejected community tip");
  };

  const removeApprovedTip = (id: string) => {
    const newApproved = approvedTips.filter((t) => t.id !== id);
    setApprovedTips(newApproved);
    saveApprovedTips(newApproved);
    logAdminAction("Removed approved community tip");
  };

  // ----------------------------------------------------------------
  // Admin Condition Tips (CRUD)
  // ----------------------------------------------------------------
  const [adminConditionTips, setAdminConditionTips] = useLocalStorage<
    AdminConditionTip[]
  >("pip-admin-condition-tips", []);
  const [condTipCondition, setCondTipCondition] = useState("");
  const [condTipText, setCondTipText] = useState("");
  const [editingCondIdx, setEditingCondIdx] = useState<number | null>(null);
  const [editingTipIdx, setEditingTipIdx] = useState<number | null>(null);
  const [editingTipText, setEditingTipText] = useState("");
  const [selectedCondIdx, setSelectedCondIdx] = useState<number | null>(null);

  const addCondTip = () => {
    if (!condTipCondition.trim() || !condTipText.trim()) return;
    const existing = adminConditionTips.findIndex(
      (c) =>
        c.condition.toLowerCase() === condTipCondition.trim().toLowerCase(),
    );
    if (existing >= 0) {
      const updated = [...adminConditionTips];
      updated[existing] = {
        ...updated[existing],
        tips: [...updated[existing].tips, condTipText.trim()],
      };
      setAdminConditionTips(updated);
    } else {
      setAdminConditionTips((prev) => [
        ...prev,
        { condition: condTipCondition.trim(), tips: [condTipText.trim()] },
      ]);
    }
    logAdminAction(
      `Added condition tip for "${condTipCondition.trim()}": "${condTipText.trim().slice(0, 50)}"`,
    );
    setCondTipText("");
  };

  const removeCondTip = (condIdx: number, tipIdx: number) => {
    const updated = [...adminConditionTips];
    updated[condIdx] = {
      ...updated[condIdx],
      tips: updated[condIdx].tips.filter((_, i) => i !== tipIdx),
    };
    if (updated[condIdx].tips.length === 0) {
      updated.splice(condIdx, 1);
      if (selectedCondIdx === condIdx) setSelectedCondIdx(null);
    }
    setAdminConditionTips(updated);
    logAdminAction("Removed condition tip");
  };

  const removeCondition = (condIdx: number) => {
    const cond = adminConditionTips[condIdx];
    const updated = adminConditionTips.filter((_, i) => i !== condIdx);
    setAdminConditionTips(updated);
    if (selectedCondIdx === condIdx) setSelectedCondIdx(null);
    logAdminAction(`Removed condition: "${cond.condition}"`);
  };

  const saveEditTip = (condIdx: number, tipIdx: number) => {
    if (!editingTipText.trim()) return;
    const updated = [...adminConditionTips];
    updated[condIdx] = {
      ...updated[condIdx],
      tips: updated[condIdx].tips.map((t, i) =>
        i === tipIdx ? editingTipText.trim() : t,
      ),
    };
    setAdminConditionTips(updated);
    setEditingCondIdx(null);
    setEditingTipIdx(null);
    setEditingTipText("");
    logAdminAction(`Edited condition tip for "${updated[condIdx].condition}"`);
  };

  // ----------------------------------------------------------------
  // Reply Template Library
  // ----------------------------------------------------------------
  const [replyTemplates, setReplyTemplates] = useLocalStorage<ReplyTemplate[]>(
    "pip-reply-templates",
    [],
  );
  const [tplTitle, setTplTitle] = useState("");
  const [tplBody, setTplBody] = useState("");
  const [copiedTplId, setCopiedTplId] = useState<string | null>(null);
  const [editingTplId, setEditingTplId] = useState<string | null>(null);
  const [editingTplTitle, setEditingTplTitle] = useState("");
  const [editingTplBody, setEditingTplBody] = useState("");

  const addTemplate = () => {
    if (!tplTitle.trim() || !tplBody.trim()) return;
    const tpl: ReplyTemplate = {
      id: `tpl-${Date.now()}`,
      title: tplTitle.trim(),
      body: tplBody.trim(),
    };
    setReplyTemplates((prev) => [...prev, tpl]);
    setTplTitle("");
    setTplBody("");
    logAdminAction(`Added reply template: "${tpl.title}"`);
  };

  const copyTemplate = (tpl: ReplyTemplate) => {
    navigator.clipboard.writeText(tpl.body).then(() => {
      setCopiedTplId(tpl.id);
      setTimeout(() => setCopiedTplId(null), 2000);
    });
  };

  const deleteTemplate = (id: string) => {
    const tpl = replyTemplates.find((t) => t.id === id);
    if (tpl) logAdminAction(`Deleted reply template: "${tpl.title}"`);
    setReplyTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const saveEditTemplate = () => {
    if (!editingTplTitle.trim() || !editingTplBody.trim()) return;
    setReplyTemplates((prev) =>
      prev.map((t) =>
        t.id === editingTplId
          ? { ...t, title: editingTplTitle.trim(), body: editingTplBody.trim() }
          : t,
      ),
    );
    logAdminAction(`Edited reply template: "${editingTplTitle.trim()}"`);
    setEditingTplId(null);
  };

  // ----------------------------------------------------------------
  // Resource Link Manager
  // ----------------------------------------------------------------
  const [adminResourceLinks, setAdminResourceLinks] = useLocalStorage<
    ResourceLink[]
  >("pip-admin-resource-links", []);
  const [rlTitle, setRlTitle] = useState("");
  const [rlUrl, setRlUrl] = useState("");
  const [rlDesc, setRlDesc] = useState("");

  const addResourceLink = () => {
    if (!rlTitle.trim() || !rlUrl.trim()) return;
    const link: ResourceLink = {
      id: `rl-${Date.now()}`,
      title: rlTitle.trim(),
      url: rlUrl.trim(),
      description: rlDesc.trim(),
    };
    setAdminResourceLinks((prev) => [...prev, link]);
    setRlTitle("");
    setRlUrl("");
    setRlDesc("");
    logAdminAction(`Added resource link: "${link.title}"`);
  };

  const removeResourceLink = (id: string) => {
    const link = adminResourceLinks.find((l) => l.id === id);
    if (link) logAdminAction(`Removed resource link: "${link.title}"`);
    setAdminResourceLinks((prev) => prev.filter((l) => l.id !== id));
  };

  // ----------------------------------------------------------------
  // GoFundMe / Support Links
  // ----------------------------------------------------------------
  const [supportLinks, setSupportLinks] = useLocalStorage<SupportLink[]>(
    "pip-support-links",
    [],
  );
  const [slTitle, setSlTitle] = useState("");
  const [slUrl, setSlUrl] = useState("");

  const addSupportLink = () => {
    if (!slTitle.trim() || !slUrl.trim()) return;
    const link: SupportLink = {
      id: `sl-${Date.now()}`,
      title: slTitle.trim(),
      url: slUrl.trim(),
    };
    setSupportLinks((prev) => [...prev, link]);
    setSlTitle("");
    setSlUrl("");
    logAdminAction(`Added support link: "${link.title}"`);
  };

  const removeSupportLink = (id: string) => {
    const link = supportLinks.find((l) => l.id === id);
    if (link) logAdminAction(`Removed support link: "${link.title}"`);
    setSupportLinks((prev) => prev.filter((l) => l.id !== id));
  };

  // ----------------------------------------------------------------
  // Admin Activity Log
  // ----------------------------------------------------------------
  const [adminLog, setAdminLog] = useState<AdminLogEntry[]>(() =>
    loadAdminLog(),
  );

  const handleClearLog = () => {
    clearAdminLog();
    setAdminLog([]);
  };

  // Refresh log when component mounts
  useEffect(() => {
    setAdminLog(loadAdminLog());
  }, []);

  // ----------------------------------------------------------------
  // Change Admin Password
  // ----------------------------------------------------------------
  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  const changePassword = () => {
    const currentPw = getAdminPassword();
    if (pwCurrent !== currentPw) {
      setPwError("Current password is incorrect.");
      return;
    }
    if (pwNew.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }
    if (pwNew !== pwConfirm) {
      setPwError("New passwords do not match.");
      return;
    }
    localStorage.setItem("pip-admin-password", pwNew);
    logAdminAction("Changed admin password");
    setPwError("");
    setPwSuccess(true);
    setPwCurrent("");
    setPwNew("");
    setPwConfirm("");
    setTimeout(() => setPwSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* === VISIT COUNTER === */}
      <Card data-ocid="admin.panel">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="w-4 h-4 text-primary" aria-hidden="true" />
            Visit Counter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-3xl font-bold text-foreground tabular-nums">
                {visitCount === null ? (
                  <span className="text-muted-foreground text-xl">
                    Loading...
                  </span>
                ) : (
                  visitCount.toLocaleString()
                )}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Total visits recorded by the backend
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* === MOST VISITED PAGES === */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-4 h-4 text-primary" aria-hidden="true" />
            Most Visited Pages
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pageVisitsLoading ? (
            <p
              className="text-sm text-muted-foreground"
              data-ocid="admin.loading_state"
            >
              Loading page stats...
            </p>
          ) : pageVisits.length === 0 ? (
            <p
              className="text-sm text-muted-foreground italic"
              data-ocid="admin.empty_state"
            >
              No page visit data yet. Data is recorded as users navigate.
            </p>
          ) : (
            <div className="space-y-2">
              {pageVisits.map(([page, count], idx) => (
                <div
                  key={page}
                  className="flex items-center gap-3"
                  data-ocid={`admin.item.${idx + 1}`}
                >
                  <span className="w-6 text-xs font-bold text-muted-foreground text-right flex-shrink-0">
                    #{idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-foreground truncate">
                        {page || "/"}
                      </span>
                      <span className="text-xs font-semibold text-primary flex-shrink-0">
                        {Number(count).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{
                          width: `${
                            pageVisits[0]
                              ? (Number(count) / Number(pageVisits[0][1])) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* === FEEDBACK SUMMARY STATS === */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare
              className="w-4 h-4 text-primary"
              aria-hidden="true"
            />
            Feedback Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/40 rounded-lg">
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {feedbackStats.total}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Total</p>
            </div>
            <div className="text-center p-3 bg-muted/40 rounded-lg">
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {feedbackStats.thisWeek}
              </p>
              <p className="text-xs text-muted-foreground mt-1">This Week</p>
            </div>
            <div className="text-center p-3 bg-muted/40 rounded-lg">
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {feedbackStats.thisMonth}
              </p>
              <p className="text-xs text-muted-foreground mt-1">This Month</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {feedbackEntries.length === 0
                ? "No feedback submissions yet."
                : `${feedbackEntries.length} total submission${
                    feedbackEntries.length !== 1 ? "s" : ""
                  }`}
            </p>
            {feedbackEntries.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportFeedbackCSV(feedbackEntries)}
                  className="flex items-center gap-2"
                  data-ocid="admin.secondary_button"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  Export CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFeedback}
                  className="flex items-center gap-2 text-destructive hover:text-destructive"
                  data-ocid="admin.delete_button"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Clear All
                </Button>
              </div>
            )}
          </div>

          {feedbackEntries.length > 0 && (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {[...feedbackEntries].reverse().map((entry, i) => (
                <div
                  key={`${entry.date}-${i}`}
                  className="bg-muted/40 rounded-lg p-4 space-y-2"
                  data-ocid={`admin.item.${i + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= entry.rating
                              ? "fill-warning text-warning"
                              : "text-muted"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        {entry.rating}/5
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  {entry.mostHelpful && (
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        Most helpful:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {entry.mostHelpful}
                      </p>
                    </div>
                  )}
                  {entry.improvements && (
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        Improvements:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {entry.improvements}
                      </p>
                    </div>
                  )}
                  {entry.referral && (
                    <p className="text-xs text-muted-foreground">
                      Found via: {entry.referral}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* === PINNED URGENT NOTICE === */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle
              className="w-4 h-4 text-destructive"
              aria-hidden="true"
            />
            Pinned Urgent Notice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            When active, this notice appears as a prominent red banner at the
            top of every page, below the header.
          </p>
          <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Status:{" "}
                <span
                  className={
                    pinnedNotice.active
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }
                >
                  {pinnedNotice.active ? "ACTIVE" : "Off"}
                </span>
              </p>
            </div>
            <Button
              size="sm"
              variant={pinnedNotice.active ? "destructive" : "outline"}
              onClick={togglePinnedNotice}
              data-ocid="admin.toggle"
            >
              {pinnedNotice.active ? "Deactivate" : "Activate"}
            </Button>
          </div>
          <div>
            <Label htmlFor="pinned-text" className="text-sm mb-1.5 block">
              Notice Text
            </Label>
            <Textarea
              id="pinned-text"
              value={pinnedDraft}
              onChange={(e) => setPinnedDraft(e.target.value)}
              placeholder="e.g. DWP phone lines are closed today due to a bank holiday. Please call tomorrow."
              rows={3}
              data-ocid="admin.textarea"
            />
          </div>
          <Button
            size="sm"
            onClick={savePinnedNotice}
            className="flex items-center gap-2"
            disabled={!pinnedDraft.trim()}
            data-ocid="admin.save_button"
          >
            <Save className="w-3.5 h-3.5" aria-hidden="true" />
            Save Notice Text
          </Button>
          {pinnedNotice.text && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="text-xs font-semibold text-destructive mb-1">
                Current saved text:
              </p>
              <p className="text-sm text-foreground">{pinnedNotice.text}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* === EDIT CONDITION TIPS === */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
            Edit Condition Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add custom tips for specific conditions. These will appear in the
            Condition Tips section alongside built-in tips.
          </p>

          {/* Add tip form */}
          <div className="space-y-3 p-4 bg-muted/40 rounded-lg">
            <h3 className="text-sm font-semibold text-foreground">
              Add New Tip
            </h3>
            <div>
              <Label
                htmlFor="cond-tip-condition"
                className="text-sm mb-1.5 block"
              >
                Condition Name
              </Label>
              <Input
                id="cond-tip-condition"
                value={condTipCondition}
                onChange={(e) => setCondTipCondition(e.target.value)}
                placeholder="e.g. Fibromyalgia, ADHD, Anxiety..."
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label htmlFor="cond-tip-text" className="text-sm mb-1.5 block">
                Tip Text
              </Label>
              <Textarea
                id="cond-tip-text"
                value={condTipText}
                onChange={(e) => setCondTipText(e.target.value)}
                placeholder="Enter the tip for this condition..."
                rows={3}
                data-ocid="admin.textarea"
              />
            </div>
            <Button
              size="sm"
              onClick={addCondTip}
              disabled={!condTipCondition.trim() || !condTipText.trim()}
              className="flex items-center gap-2"
              data-ocid="admin.primary_button"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              Add Tip
            </Button>
          </div>

          {/* Existing admin tips */}
          {adminConditionTips.length === 0 ? (
            <p
              className="text-sm text-muted-foreground italic"
              data-ocid="admin.empty_state"
            >
              No custom tips added yet.
            </p>
          ) : (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                Custom Tips ({adminConditionTips.length} condition
                {adminConditionTips.length !== 1 ? "s" : ""})
              </h3>
              {adminConditionTips.map((cond, condIdx) => (
                <div
                  key={cond.condition}
                  className="border border-border rounded-lg p-3 space-y-2"
                  data-ocid={`admin.item.${condIdx + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-primary">
                      {cond.condition}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCondition(condIdx)}
                      className="text-xs h-6 text-destructive hover:text-destructive"
                      data-ocid="admin.delete_button"
                    >
                      Remove Condition
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {cond.tips.map((tip, tipIdx) => (
                      <div
                        key={`${condIdx}-${tipIdx}-${tip.slice(0, 20)}`}
                        className="flex items-start gap-2"
                      >
                        {editingCondIdx === condIdx &&
                        editingTipIdx === tipIdx ? (
                          <div className="flex-1 space-y-2">
                            <Textarea
                              value={editingTipText}
                              onChange={(e) =>
                                setEditingTipText(e.target.value)
                              }
                              rows={2}
                              className="text-sm"
                              data-ocid="admin.textarea"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => saveEditTip(condIdx, tipIdx)}
                                className="text-xs h-7"
                                data-ocid="admin.save_button"
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setEditingCondIdx(null);
                                  setEditingTipIdx(null);
                                }}
                                className="text-xs h-7"
                                data-ocid="admin.cancel_button"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm text-muted-foreground flex-1">
                              {tip}
                            </p>
                            <div className="flex gap-1 flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingCondIdx(condIdx);
                                  setEditingTipIdx(tipIdx);
                                  setEditingTipText(tip);
                                }}
                                className="text-xs h-6"
                                data-ocid="admin.edit_button"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCondTip(condIdx, tipIdx)}
                                className="text-xs h-6 text-destructive hover:text-destructive"
                                data-ocid="admin.delete_button"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* === NEWS & NOTICES === */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="w-4 h-4 text-primary" aria-hidden="true" />
            News &amp; Notices (Ticker)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add notices that scroll as a ticker across the top of the site.
          </p>
          <div className="space-y-3 p-4 bg-muted/40 rounded-lg">
            <h3 className="text-sm font-semibold text-foreground">
              Add New Notice
            </h3>
            <div>
              <Label htmlFor="notice-title" className="text-sm mb-1.5 block">
                Title
              </Label>
              <Input
                id="notice-title"
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                placeholder="e.g. Important update about PIP assessments"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label htmlFor="notice-body" className="text-sm mb-1.5 block">
                Body
              </Label>
              <Textarea
                id="notice-body"
                value={noticeBody}
                onChange={(e) => setNoticeBody(e.target.value)}
                placeholder="Enter the notice content..."
                rows={3}
                data-ocid="admin.textarea"
              />
            </div>
            <Button
              onClick={addNotice}
              size="sm"
              disabled={!noticeTitle.trim() || !noticeBody.trim()}
              className="flex items-center gap-2"
              data-ocid="admin.primary_button"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              Add Notice
            </Button>
          </div>

          {notices.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Existing Notices ({notices.length})
              </h3>
              {notices.map((notice, idx) => (
                <div
                  key={notice.id}
                  className="p-3 border border-border rounded-lg space-y-2"
                  data-ocid={`admin.item.${idx + 1}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        {notice.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {notice.body}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                        notice.active
                          ? "bg-success/20 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {notice.active ? "Active" : "Hidden"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleNotice(notice.id)}
                      className="text-xs h-7"
                      data-ocid="admin.toggle"
                    >
                      {notice.active ? (
                        <>
                          <EyeOff className="w-3 h-3 mr-1" /> Hide
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3 mr-1" /> Show
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteNotice(notice.id)}
                      className="text-xs h-7 text-destructive hover:text-destructive"
                      data-ocid="admin.delete_button"
                    >
                      <Trash2 className="w-3 h-3 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {notices.length === 0 && (
            <p
              className="text-sm text-muted-foreground italic"
              data-ocid="admin.empty_state"
            >
              No notices yet. Add one above to display it on the Home page.
            </p>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* === COMMUNITY TIPS === */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ThumbsUp className="w-4 h-4 text-primary" aria-hidden="true" />
            Community Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Pending Review ({pendingTips.length})
            </h3>
            {pendingTips.length === 0 ? (
              <p
                className="text-sm text-muted-foreground italic"
                data-ocid="admin.empty_state"
              >
                No tips awaiting review.
              </p>
            ) : (
              <div className="space-y-3">
                {pendingTips.map((tip, idx) => (
                  <div
                    key={tip.id}
                    className="p-3 border border-border rounded-lg space-y-2"
                    data-ocid={`admin.item.${idx + 1}`}
                  >
                    {tip.condition && (
                      <span className="text-xs font-medium text-primary">
                        {tip.condition}
                      </span>
                    )}
                    <p className="text-sm text-foreground">{tip.tip}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(tip.date)}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => approveTip(tip)}
                        className="text-xs h-7 flex items-center gap-1"
                        data-ocid="admin.primary_button"
                      >
                        <ThumbsUp className="w-3 h-3" /> Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => rejectTip(tip.id)}
                        className="text-xs h-7 text-destructive hover:text-destructive flex items-center gap-1"
                        data-ocid="admin.delete_button"
                      >
                        <Trash2 className="w-3 h-3" /> Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Published Tips ({approvedTips.length})
            </h3>
            {approvedTips.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No published tips yet.
              </p>
            ) : (
              <div className="space-y-3">
                {approvedTips.map((tip, idx) => (
                  <div
                    key={tip.id}
                    className="p-3 bg-success/10 border border-success/20 rounded-lg space-y-2"
                    data-ocid={`admin.item.${idx + 1}`}
                  >
                    {tip.condition && (
                      <span className="text-xs font-medium text-success">
                        {tip.condition}
                      </span>
                    )}
                    <p className="text-sm text-foreground">{tip.tip}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeApprovedTip(tip.id)}
                      className="text-xs h-7 text-destructive hover:text-destructive flex items-center gap-1"
                      data-ocid="admin.delete_button"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* === REPLY TEMPLATE LIBRARY === */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clipboard className="w-4 h-4 text-primary" aria-hidden="true" />
            Reply Template Library
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Save common reply templates for your personal reference. Click
            "Copy" to copy the template body to your clipboard. Not visible to
            users.
          </p>

          <div className="space-y-3 p-4 bg-muted/40 rounded-lg">
            <h3 className="text-sm font-semibold text-foreground">
              Add New Template
            </h3>
            <div>
              <Label htmlFor="tpl-title" className="text-sm mb-1.5 block">
                Title
              </Label>
              <Input
                id="tpl-title"
                value={tplTitle}
                onChange={(e) => setTplTitle(e.target.value)}
                placeholder="e.g. Standard response to PIP query"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label htmlFor="tpl-body" className="text-sm mb-1.5 block">
                Template Body
              </Label>
              <Textarea
                id="tpl-body"
                value={tplBody}
                onChange={(e) => setTplBody(e.target.value)}
                placeholder="Enter your template text here..."
                rows={4}
                data-ocid="admin.textarea"
              />
            </div>
            <Button
              size="sm"
              onClick={addTemplate}
              disabled={!tplTitle.trim() || !tplBody.trim()}
              className="flex items-center gap-2"
              data-ocid="admin.primary_button"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              Add Template
            </Button>
          </div>

          {replyTemplates.length === 0 ? (
            <p
              className="text-sm text-muted-foreground italic"
              data-ocid="admin.empty_state"
            >
              No templates saved yet.
            </p>
          ) : (
            <div className="space-y-3">
              {replyTemplates.map((tpl, idx) => (
                <div
                  key={tpl.id}
                  className="border border-border rounded-lg p-3 space-y-2"
                  data-ocid={`admin.item.${idx + 1}`}
                >
                  {editingTplId === tpl.id ? (
                    <div className="space-y-3">
                      <Input
                        value={editingTplTitle}
                        onChange={(e) => setEditingTplTitle(e.target.value)}
                        className="text-sm"
                        data-ocid="admin.input"
                      />
                      <Textarea
                        value={editingTplBody}
                        onChange={(e) => setEditingTplBody(e.target.value)}
                        rows={4}
                        className="text-sm"
                        data-ocid="admin.textarea"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={saveEditTemplate}
                          className="text-xs h-7"
                          data-ocid="admin.save_button"
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingTplId(null)}
                          className="text-xs h-7"
                          data-ocid="admin.cancel_button"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-foreground">
                        {tpl.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {tpl.body}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyTemplate(tpl)}
                          className="text-xs h-7 flex items-center gap-1"
                          data-ocid="admin.secondary_button"
                        >
                          <Clipboard className="w-3 h-3" />
                          {copiedTplId === tpl.id ? "Copied!" : "Copy"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingTplId(tpl.id);
                            setEditingTplTitle(tpl.title);
                            setEditingTplBody(tpl.body);
                          }}
                          className="text-xs h-7"
                          data-ocid="admin.edit_button"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteTemplate(tpl.id)}
                          className="text-xs h-7 text-destructive hover:text-destructive"
                          data-ocid="admin.delete_button"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* === RESOURCE LINK MANAGER === */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Link2 className="w-4 h-4 text-primary" aria-hidden="true" />
            Resource Link Manager
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add custom resource links that will appear in an "Additional
            Resources" section on the Resources &amp; Support page.
          </p>

          <div className="space-y-3 p-4 bg-muted/40 rounded-lg">
            <h3 className="text-sm font-semibold text-foreground">
              Add Resource Link
            </h3>
            <div>
              <Label htmlFor="rl-title" className="text-sm mb-1.5 block">
                Link Title
              </Label>
              <Input
                id="rl-title"
                value={rlTitle}
                onChange={(e) => setRlTitle(e.target.value)}
                placeholder="e.g. Disability Rights UK"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label htmlFor="rl-url" className="text-sm mb-1.5 block">
                URL
              </Label>
              <Input
                id="rl-url"
                value={rlUrl}
                onChange={(e) => setRlUrl(e.target.value)}
                placeholder="https://example.com"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label htmlFor="rl-desc" className="text-sm mb-1.5 block">
                Description (optional)
              </Label>
              <Input
                id="rl-desc"
                value={rlDesc}
                onChange={(e) => setRlDesc(e.target.value)}
                placeholder="Brief description of this resource"
                data-ocid="admin.input"
              />
            </div>
            <Button
              size="sm"
              onClick={addResourceLink}
              disabled={!rlTitle.trim() || !rlUrl.trim()}
              className="flex items-center gap-2"
              data-ocid="admin.primary_button"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              Add Link
            </Button>
          </div>

          {adminResourceLinks.length === 0 ? (
            <p
              className="text-sm text-muted-foreground italic"
              data-ocid="admin.empty_state"
            >
              No custom resource links added yet.
            </p>
          ) : (
            <div className="space-y-2">
              {adminResourceLinks.map((link, idx) => (
                <div
                  key={link.id}
                  className="flex items-start gap-3 p-3 border border-border rounded-lg"
                  data-ocid={`admin.item.${idx + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {link.title}
                    </p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary underline break-all"
                    >
                      {link.url}
                    </a>
                    {link.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeResourceLink(link.id)}
                    className="text-xs h-7 text-destructive hover:text-destructive flex-shrink-0"
                    data-ocid="admin.delete_button"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* === GOFUNDME / SUPPORT LINKS === */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Heart className="w-4 h-4 text-primary" aria-hidden="true" />
            Support &amp; GoFundMe Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add GoFundMe, fundraising, or other support links. These appear in
            the footer under "Support Our Work".
          </p>

          <div className="space-y-3 p-4 bg-muted/40 rounded-lg">
            <h3 className="text-sm font-semibold text-foreground">
              Add Support Link
            </h3>
            <div>
              <Label htmlFor="sl-title" className="text-sm mb-1.5 block">
                Title
              </Label>
              <Input
                id="sl-title"
                value={slTitle}
                onChange={(e) => setSlTitle(e.target.value)}
                placeholder="e.g. Our GoFundMe Campaign"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label htmlFor="sl-url" className="text-sm mb-1.5 block">
                URL
              </Label>
              <Input
                id="sl-url"
                value={slUrl}
                onChange={(e) => setSlUrl(e.target.value)}
                placeholder="https://gofundme.com/your-campaign"
                data-ocid="admin.input"
              />
            </div>
            <Button
              size="sm"
              onClick={addSupportLink}
              disabled={!slTitle.trim() || !slUrl.trim()}
              className="flex items-center gap-2"
              data-ocid="admin.primary_button"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              Add Link
            </Button>
          </div>

          {supportLinks.length === 0 ? (
            <p
              className="text-sm text-muted-foreground italic"
              data-ocid="admin.empty_state"
            >
              No support links added yet.
            </p>
          ) : (
            <div className="space-y-2">
              {supportLinks.map((link, idx) => (
                <div
                  key={link.id}
                  className="flex items-center gap-3 p-3 border border-border rounded-lg"
                  data-ocid={`admin.item.${idx + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {link.title}
                    </p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary underline break-all"
                    >
                      {link.url}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSupportLink(link.id)}
                    className="text-xs h-7 text-destructive hover:text-destructive flex-shrink-0"
                    data-ocid="admin.delete_button"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* === DONATION LINK === */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Link2 className="w-4 h-4 text-primary" aria-hidden="true" />
            Donation Link (PayPal)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Current link:{" "}
            {paypalLink ? (
              <a
                href={paypalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline break-all"
              >
                {paypalLink}
              </a>
            ) : (
              <span className="italic">Not set</span>
            )}
          </p>
          <div>
            <Label htmlFor="donation-link" className="text-sm mb-1.5 block">
              Update PayPal Link
            </Label>
            <Input
              id="donation-link"
              value={donationDraft}
              onChange={(e) => setDonationDraft(e.target.value)}
              placeholder="https://paypal.me/yourname"
              data-ocid="admin.input"
            />
          </div>
          <Button
            onClick={saveDonationLink}
            size="sm"
            className="flex items-center gap-2"
            data-ocid="admin.save_button"
          >
            <Save className="w-3.5 h-3.5" aria-hidden="true" />
            {donationSaved ? "Saved!" : "Save Link"}
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* === AD MANAGEMENT === */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Megaphone className="w-4 h-4 text-primary" aria-hidden="true" />
            Advertisement Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add or update the sponsored advertisement shown in the footer. Leave
            all fields blank to remove the ad.
          </p>
          <div className="space-y-3">
            <div>
              <Label htmlFor="admin-ad-image" className="text-sm mb-1.5 block">
                Ad Image URL
              </Label>
              <Input
                id="admin-ad-image"
                value={adDraft.imageUrl}
                onChange={(e) =>
                  setAdDraft((p) => ({ ...p, imageUrl: e.target.value }))
                }
                placeholder="https://example.com/image.png"
              />
            </div>
            <div>
              <Label htmlFor="admin-ad-link" className="text-sm mb-1.5 block">
                Ad Link URL
              </Label>
              <Input
                id="admin-ad-link"
                value={adDraft.linkUrl}
                onChange={(e) =>
                  setAdDraft((p) => ({ ...p, linkUrl: e.target.value }))
                }
                placeholder="https://example.com"
              />
            </div>
            <div>
              <Label htmlFor="admin-ad-text" className="text-sm mb-1.5 block">
                Ad Text
              </Label>
              <Input
                id="admin-ad-text"
                value={adDraft.text}
                onChange={(e) =>
                  setAdDraft((p) => ({ ...p, text: e.target.value }))
                }
                placeholder="Sponsored message or call to action"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={saveAd}
              size="sm"
              className="flex items-center gap-2"
              data-ocid="admin.primary_button"
            >
              <Save className="w-3.5 h-3.5" aria-hidden="true" />
              {adSaved ? "Saved!" : "Save Ad"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAd}
              className="flex items-center gap-2"
              data-ocid="admin.secondary_button"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              Clear Ad
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* === ADMIN ACTIVITY LOG === */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
            Admin Activity Log
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {adminLog.length} entr{adminLog.length !== 1 ? "ies" : "y"}{" "}
              recorded
            </p>
            {adminLog.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleClearLog();
                }}
                className="text-xs flex items-center gap-1 text-destructive hover:text-destructive"
                data-ocid="admin.delete_button"
              >
                <Trash2 className="w-3 h-3" /> Clear Log
              </Button>
            )}
          </div>
          {adminLog.length === 0 ? (
            <p
              className="text-sm text-muted-foreground italic"
              data-ocid="admin.empty_state"
            >
              No activity logged yet. Actions you take in this panel will appear
              here.
            </p>
          ) : (
            <ScrollArea className="h-64 rounded-md border border-border">
              <div className="p-3 space-y-1.5">
                {adminLog.map((entry, idx) => (
                  <div
                    key={`${entry.timestamp}-${idx}`}
                    className="flex items-start gap-2 text-xs"
                    data-ocid={`admin.item.${idx + 1}`}
                  >
                    <span className="text-muted-foreground flex-shrink-0 font-mono">
                      {formatDate(entry.timestamp)}
                    </span>
                    <span className="text-foreground">{entry.action}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* === CHANGE ADMIN PASSWORD === */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Key className="w-4 h-4 text-primary" aria-hidden="true" />
            Change Admin Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Update your admin password. The new password will be stored in your
            browser. If you clear your browser data, the default password
            (2024ForrealDanBowie) will be restored.
          </p>
          <div className="space-y-3 max-w-sm">
            <div>
              <Label htmlFor="pw-current" className="text-sm mb-1.5 block">
                Current Password
              </Label>
              <Input
                id="pw-current"
                type="password"
                value={pwCurrent}
                onChange={(e) => {
                  setPwCurrent(e.target.value);
                  setPwError("");
                }}
                placeholder="Enter current password"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label htmlFor="pw-new" className="text-sm mb-1.5 block">
                New Password
              </Label>
              <Input
                id="pw-new"
                type="password"
                value={pwNew}
                onChange={(e) => {
                  setPwNew(e.target.value);
                  setPwError("");
                }}
                placeholder="Enter new password"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label htmlFor="pw-confirm" className="text-sm mb-1.5 block">
                Confirm New Password
              </Label>
              <Input
                id="pw-confirm"
                type="password"
                value={pwConfirm}
                onChange={(e) => {
                  setPwConfirm(e.target.value);
                  setPwError("");
                }}
                placeholder="Confirm new password"
                data-ocid="admin.input"
              />
            </div>
            {pwError && (
              <p
                className="text-sm text-destructive"
                role="alert"
                data-ocid="admin.error_state"
              >
                {pwError}
              </p>
            )}
            {pwSuccess && (
              <output
                className="text-sm text-success block"
                data-ocid="admin.success_state"
              >
                Password changed successfully!
              </output>
            )}
            <Button
              size="sm"
              onClick={changePassword}
              disabled={!pwCurrent || !pwNew || !pwConfirm}
              className="flex items-center gap-2"
              data-ocid="admin.save_button"
            >
              <Key className="w-3.5 h-3.5" aria-hidden="true" />
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminPanelPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    const correctPassword = getAdminPassword();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError("");
      setPassword("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <main
      id="main-content"
      className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Admin Panel
            </h1>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Manage your donation link, advertisements, notices, community tips,
            visit counter, and feedback.
          </p>
        </div>
        {isAuthenticated && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex-shrink-0"
            data-ocid="admin.cancel_button"
          >
            <Lock className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
            Log Out
          </Button>
        )}
      </div>

      {!isAuthenticated ? (
        <Card className="max-w-sm mx-auto" data-ocid="admin.modal">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lock className="w-4 h-4 text-muted-foreground" />
              Admin Access Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter your admin password to access the management panel.
            </p>
            <div>
              <Label htmlFor="admin-password" className="text-sm mb-1.5 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin password"
                  className={error ? "border-destructive pr-10" : "pr-10"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin();
                  }}
                  aria-describedby={error ? "admin-error" : undefined}
                  data-ocid="admin.input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <p
                  id="admin-error"
                  className="text-sm text-destructive mt-1.5"
                  role="alert"
                  data-ocid="admin.error_state"
                >
                  {error}
                </p>
              )}
            </div>
            <Button
              onClick={handleLogin}
              className="w-full"
              data-ocid="admin.primary_button"
            >
              <Lock className="w-4 h-4 mr-2" aria-hidden="true" />
              Access Admin Panel
            </Button>
          </CardContent>
        </Card>
      ) : (
        <AdminDashboard />
      )}
    </main>
  );
}
