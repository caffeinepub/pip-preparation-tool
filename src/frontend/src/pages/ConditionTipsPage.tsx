import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "@tanstack/react-router";
import {
  Check,
  MessageCircle,
  MessageSquare,
  Search,
  Share2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

interface CommunityTip {
  id: string;
  condition: string;
  tip: string;
  date: string;
  approved: boolean;
}

function loadApprovedCommunityTips(): CommunityTip[] {
  try {
    return JSON.parse(
      localStorage.getItem("pip-community-tips-approved") ?? "[]",
    ) as CommunityTip[];
  } catch {
    return [];
  }
}

interface AdminConditionTip {
  condition: string;
  tips: string[];
}

function loadAdminConditionTips(): AdminConditionTip[] {
  try {
    return JSON.parse(
      localStorage.getItem("pip-admin-condition-tips") ?? "[]",
    ) as AdminConditionTip[];
  } catch {
    return [];
  }
}

function mergeAdminTips(
  baseCategories: Category[],
  adminTips: AdminConditionTip[],
): Category[] {
  if (adminTips.length === 0) return baseCategories;

  const merged = baseCategories.map((cat) => ({
    ...cat,
    conditions: cat.conditions.map((cond) => {
      const adminMatch = adminTips.find(
        (a) => a.condition.toLowerCase() === cond.name.toLowerCase(),
      );
      if (adminMatch) {
        return { ...cond, tips: [...cond.tips, ...adminMatch.tips] };
      }
      return cond;
    }),
  }));

  // Append entirely new conditions not in built-in data
  const existingNames = new Set(
    baseCategories.flatMap((cat) =>
      cat.conditions.map((c) => c.name.toLowerCase()),
    ),
  );
  const newConditions = adminTips
    .filter((a) => !existingNames.has(a.condition.toLowerCase()))
    .map((a) => ({ name: a.condition, tips: a.tips }));

  if (newConditions.length > 0) {
    const adminCatIdx = merged.findIndex((c) => c.id === "admin-added");
    if (adminCatIdx >= 0) {
      merged[adminCatIdx] = {
        ...merged[adminCatIdx],
        conditions: [...merged[adminCatIdx].conditions, ...newConditions],
      };
    } else {
      merged.push({
        id: "admin-added",
        label: "Additional Conditions",
        conditions: newConditions,
      });
    }
  }

  return merged;
}

interface Condition {
  name: string;
  tips: string[];
}

interface Category {
  id: string;
  label: string;
  conditions: Condition[];
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const categories: Category[] = [
  {
    id: "mental-health",
    label: "Mental Health",
    conditions: [
      {
        name: "Depression",
        tips: [
          "Describe how depression affects your ability to motivate yourself to carry out daily activities, not just how you feel emotionally.",
          "Mention days when you can't get out of bed, dress yourself, or prepare food — these are PIP-relevant impacts.",
          "Include the effect on concentration, memory, and ability to follow instructions or plans.",
          "Note if you need prompting or encouragement from others to wash, eat, or take medication.",
          "If your depression fluctuates, describe the bad phases — they count if they happen on more than 50% of days.",
        ],
      },
      {
        name: "Anxiety",
        tips: [
          "Describe the physical symptoms of anxiety: racing heart, trembling, breathlessness, nausea — these affect your ability to function.",
          "Explain how anxiety affects your ability to go out alone, use public transport, or be around other people.",
          "Mention if you need reassurance or someone with you to manage social situations.",
          "Include panic attacks: how often they happen, what triggers them, and how long recovery takes.",
          "PIP mobility component can apply if anxiety prevents you from going out safely without accompaniment.",
        ],
      },
      {
        name: "PTSD",
        tips: [
          "Describe how flashbacks, hypervigilance, or nightmares affect your sleep, concentration, and daily functioning.",
          "Explain how PTSD affects your ability to be around people, use transport, or enter public spaces.",
          "Note if certain environments or situations trigger episodes and how this limits your activity.",
          "Mention the impact on personal care if PTSD affects your ability to self-care on difficult days.",
          "Explain if you need a support person to accompany you when going out.",
        ],
      },
      {
        name: "Schizophrenia",
        tips: [
          "Describe how symptoms like hallucinations or delusions affect your daily activity and safety.",
          "Mention the side effects of antipsychotic medication: sedation, weight gain, tremors — these affect mobility and self-care.",
          "Explain how the condition affects your ability to plan, organise, or complete tasks independently.",
          "Note if you need prompting, supervision, or help from a carer with daily activities.",
          "Include impact on communication, social situations, and your ability to engage with professionals.",
        ],
      },
      {
        name: "Bipolar Disorder",
        tips: [
          "Describe both the depressive and manic phases — both can seriously impact your ability to function safely.",
          "During depressive phases, note inability to self-care, cook, or leave home.",
          "During manic phases, describe risk-taking behaviour, lack of judgment, and inability to manage finances or safety.",
          "Explain that because of the cyclical nature, you can't reliably carry out activities safely on most days.",
          "Include the impact of medication and how it affects your energy, concentration, and physical ability.",
        ],
      },
      {
        name: "OCD",
        tips: [
          "Explain how compulsions take up large amounts of time and affect your ability to complete tasks within a reasonable timeframe.",
          "Describe how intrusive thoughts affect concentration and your ability to follow through on activities.",
          "Note if OCD affects personal care (e.g. washing rituals that are excessive or cause harm).",
          "Include how OCD affects your ability to leave home, travel, or be in certain environments.",
          "Mention if you need supervision or assistance from another person to complete activities safely.",
        ],
      },
      {
        name: "Personality Disorders",
        tips: [
          "Describe how emotional dysregulation affects your ability to manage daily activities consistently.",
          "Explain the impact on social interaction, communication, and engaging with support services.",
          "Note crisis episodes: how often they occur and what support you need during and after.",
          "Describe how the condition affects planning, motivation, and reliably carrying out tasks.",
          "Include the effect on personal safety if self-harm or suicidal thoughts are part of your experience.",
        ],
      },
    ],
  },
  {
    id: "neurodevelopmental",
    label: "Neurodevelopmental",
    conditions: [
      {
        name: "Autism (ASD)",
        tips: [
          "Describe sensory sensitivities: overwhelming sounds, lights, textures that prevent you from carrying out daily activities.",
          "Explain how social communication difficulties affect your ability to engage with professionals, use services, or ask for help.",
          "Note if you need clear routines to function and how disruptions cause significant distress or shutdown.",
          "Include the impact on going out alone: unfamiliar routes, unexpected events, or social situations causing overwhelming anxiety.",
          "Mention if you require prompting, support, or supervision to complete personal care or other activities.",
        ],
      },
      {
        name: "ADHD",
        tips: [
          "Describe how executive dysfunction affects your ability to start, organise, and complete tasks — not just concentrate.",
          "Explain how impulsivity or inattention creates safety risks (e.g. leaving the cooker on, forgetting medication, accidents).",
          "Note the impact on personal care and nutrition if you forget to eat, wash, or take medication.",
          "Include how ADHD affects your ability to plan journeys, navigate, or manage unpredictable situations.",
          "Mention co-occurring conditions (anxiety, depression) which often accompany ADHD and add to functional impact.",
        ],
      },
      {
        name: "Dyspraxia",
        tips: [
          "Describe how coordination difficulties affect tasks like dressing, preparing food, using utensils, or personal care.",
          "Explain the impact on balance, spatial awareness, and the risk of falls during daily activities.",
          "Note how dyspraxia affects your ability to drive, use public transport, or navigate safely.",
          "Include the time it takes you to complete tasks — dyspraxia often significantly increases task completion time.",
          "Mention fatigue: the additional effort required for tasks can be exhausting.",
        ],
      },
    ],
  },
  {
    id: "chronic-pain",
    label: "Chronic Pain & Fatigue",
    conditions: [
      {
        name: "Fibromyalgia",
        tips: [
          "Describe the widespread pain and how it varies — but focus on your typical or worst days, not your best.",
          "Explain post-exertional malaise: how activity today causes significantly increased pain and fatigue the next day.",
          "Note cognitive symptoms ('fibro fog'): difficulty concentrating, remembering instructions, or completing tasks.",
          "Include how pain and fatigue affect your ability to walk, stand, wash, dress, and prepare food.",
          "Mention flare-ups: how long they last and how frequently they prevent you from functioning normally.",
        ],
      },
      {
        name: "ME/CFS",
        tips: [
          "Explain post-exertional malaise (PEM): activity causes a significant worsening of symptoms, sometimes lasting days.",
          "Describe your energy envelope — what you can manage before triggering a crash — and how this limits daily activities.",
          "Mention cognitive dysfunction: brain fog, memory problems, difficulty processing information.",
          "Include how ME/CFS affects your ability to maintain a routine, wash, dress, or prepare meals on most days.",
          "Explain that you may appear to manage on a good day, but this is not your typical experience — describe the bad days.",
        ],
      },
      {
        name: "Chronic Pain",
        tips: [
          "Be specific about where the pain is, what causes it, and how it affects function — not just that it hurts.",
          "Describe how pain affects your ability to walk, stand, climb stairs, carry things, or sit for extended periods.",
          "Include the side effects of pain medication: drowsiness, dizziness, nausea, confusion.",
          "Note the psychological impact of chronic pain: depression, anxiety, sleep disturbance — all affect daily function.",
          "Mention how pain levels change throughout the day and which activities are affected most.",
        ],
      },
      {
        name: "Chronic Fatigue Syndrome",
        tips: [
          "Distinguish your fatigue from tiredness — it is a debilitating physical symptom that doesn't improve with rest.",
          "Describe the unpredictability of your energy levels and how this affects planning or committing to activities.",
          "Include how fatigue affects personal care, cooking, and mobility on most days.",
          "Mention the role of pacing and how overdoing activity on a 'good day' leads to significant setbacks.",
          "Note if you use mobility aids, require rest periods during activities, or need assistance from another person.",
        ],
      },
    ],
  },
  {
    id: "neurological",
    label: "Neurological",
    conditions: [
      {
        name: "MS (Multiple Sclerosis)",
        tips: [
          "Describe both physical symptoms (weakness, spasticity, balance) and cognitive symptoms (memory, concentration, fatigue).",
          "Note that heat sensitivity is a recognised MS symptom — explain how it affects your ability to function.",
          "Explain relapsing-remitting patterns: during relapses, what activities become impossible or significantly harder?",
          "Include bladder/bowel issues if relevant — these are acknowledged PIP activities and should be described honestly.",
          "Mention aids and adaptations you use (walking stick, wheelchair, shower chair) as these affect PIP scoring.",
        ],
      },
      {
        name: "Epilepsy",
        tips: [
          "Describe all types of seizures you have — absence seizures and partial seizures also affect function and safety.",
          "Explain post-ictal symptoms: confusion, exhaustion, or inability to function for hours after a seizure.",
          "Note if you need supervision during activities to prevent injury — this is a key PIP consideration.",
          "Include how unpredictability of seizures affects your ability to go out alone or use transport safely.",
          "Mention medication side effects: drowsiness, cognitive impairment, coordination problems.",
        ],
      },
      {
        name: "Cerebral Palsy",
        tips: [
          "Describe how CP affects your specific functional abilities: walking, coordination, speech, hand control.",
          "Explain how spasticity or involuntary movements affect daily tasks like dressing, eating, or personal hygiene.",
          "Note fatigue: people with CP often use significantly more energy for tasks than others.",
          "Include the aids and adaptations you rely on — these support your PIP claim.",
          "Describe pain: many people with CP experience significant pain that affects daily functioning.",
        ],
      },
      {
        name: "Parkinson's Disease",
        tips: [
          "Describe both motor symptoms (tremor, rigidity, slowness) and non-motor symptoms (cognitive changes, depression, fatigue).",
          "Explain how 'off' periods affect your functioning — when medication isn't working, what can't you do?",
          "Include how swallowing, speech, and communication are affected if relevant.",
          "Note falls risk and how this affects your confidence and ability to move around safely.",
          "Mention the time it takes you to complete daily activities — Parkinson's significantly slows task completion.",
        ],
      },
      {
        name: "Stroke Effects",
        tips: [
          "Describe specific deficits: weakness on one side, speech difficulties, visual field loss, memory problems.",
          "Explain how fatigue following stroke affects your ability to function throughout the day.",
          "Include cognitive effects: executive dysfunction, attention problems, and their impact on daily tasks.",
          "Note emotional changes: post-stroke depression and anxiety are common and affect daily functioning.",
          "Describe what aids, adaptations, or support you rely on to manage daily activities.",
        ],
      },
      {
        name: "Dementia / Memory Conditions",
        tips: [
          "Focus on how memory loss affects safety: leaving gas on, forgetting medication, getting lost.",
          "Describe how the person needs supervision or prompting for personal care, eating, and daily tasks.",
          "Note behavioural changes that affect the ability to manage in public or engage with others.",
          "Include how the condition affects the person's ability to plan, make decisions, and communicate.",
          "If you are completing the form for someone else, describe what you observe on most days — be specific.",
        ],
      },
    ],
  },
  {
    id: "musculoskeletal",
    label: "Musculoskeletal",
    conditions: [
      {
        name: "Rheumatoid Arthritis",
        tips: [
          "Describe morning stiffness: how long it lasts and what you can't do until it eases.",
          "Explain how joint inflammation affects grip, dexterity, and your ability to use hands for daily tasks.",
          "Include flare-ups: what triggers them, how long they last, and what becomes impossible during a flare.",
          "Note fatigue, which is a major symptom of RA and affects function throughout the day.",
          "Mention the effect of disease-modifying medications and whether they cause additional side effects.",
        ],
      },
      {
        name: "Osteoarthritis",
        tips: [
          "Be specific about which joints are affected and how this limits function — knees affect walking, hands affect grip.",
          "Describe pain levels during activity and how this limits how far you can walk or how long you can stand.",
          "Include the time it takes to do tasks after resting or first thing in the morning.",
          "Note any falls or near-falls caused by joint instability or pain.",
          "Mention aids you use: walking sticks, grab rails, perching stools — these support your claim.",
        ],
      },
      {
        name: "Back Conditions",
        tips: [
          "Describe the type and location of pain and how it radiates or affects other areas (e.g. sciatica).",
          "Explain how your back condition affects your ability to sit, stand, walk, or change position.",
          "Include how long you can sit or stand before pain becomes unmanageable and you need to rest.",
          "Note if bending, lifting, or twisting causes significant pain or is impossible.",
          "Describe the impact on sleep: poor sleep due to pain affects daytime function significantly.",
        ],
      },
      {
        name: "Joint Hypermobility (EDS/HSD)",
        tips: [
          "Describe how hypermobility causes joint dislocations or subluxations and how often this happens.",
          "Explain the pain caused by hypermobility and how it varies throughout the day and with activity.",
          "Include how fatigue and post-exertional malaise are common features of hypermobility spectrum disorders.",
          "Note how hypermobility affects your ability to grip, walk, stand, or carry out tasks safely.",
          "Mention associated symptoms: POTS, dysautonomia, mast cell issues — all affect daily functioning.",
        ],
      },
    ],
  },
  {
    id: "digestive",
    label: "Digestive & Metabolic",
    conditions: [
      {
        name: "Crohn's Disease",
        tips: [
          "Describe how urgency and frequency of bowel movements affects your ability to leave home, travel, or work.",
          "Explain how Crohn's affects your energy levels and ability to function, especially during flares.",
          "Include pain levels: abdominal pain during and after eating, and how this affects nutrition and daily activity.",
          "Note how the condition affects your ability to manage personal care during a flare.",
          "Mention the psychological impact: anxiety about access to toilets, social isolation, and impact on quality of life.",
        ],
      },
      {
        name: "IBD / IBS",
        tips: [
          "Describe the unpredictability of symptoms and how this affects your ability to plan and go out.",
          "Explain how urgency affects your safety when traveling or away from home.",
          "Include the effect of severe flares on your ability to carry out personal care and daily tasks.",
          "Note fatigue and anaemia if present — these significantly affect daily functioning.",
          "Describe the anxiety associated with unpredictable symptoms and its impact on your daily life.",
        ],
      },
      {
        name: "Diabetes Complications",
        tips: [
          "Focus on complications — neuropathy, retinopathy, amputation — rather than the diagnosis alone.",
          "Describe how neuropathy affects sensation, balance, mobility, and the risk of injury.",
          "Explain how hypoglycaemic episodes affect your ability to function safely and unpredictably.",
          "Include how vision impairment from retinopathy affects daily tasks and mobility.",
          "Note fatigue, which is a significant and often underestimated impact of poorly controlled or complex diabetes.",
        ],
      },
    ],
  },
  {
    id: "sensory",
    label: "Sensory",
    conditions: [
      {
        name: "Visual Impairment",
        tips: [
          "Describe what you can and can't see — the type and extent of visual loss affects which PIP activities apply.",
          "Explain how visual impairment affects navigation: unfamiliar places, uneven ground, reading signs.",
          "Include how you manage tasks like preparing food, personal care, and reading — and what aids or support you use.",
          "Note the impact of visual impairment on safety in the home: falls, burns, medication errors.",
          "Mention if your vision fluctuates or worsens in low light or certain conditions.",
        ],
      },
      {
        name: "Hearing Impairment",
        tips: [
          "Describe how hearing loss affects your ability to communicate, follow conversations, or engage with services.",
          "Explain the exhaustion caused by lip-reading or relying on visual cues throughout the day.",
          "Include how hearing loss affects your safety: not hearing alarms, traffic, or warnings.",
          "Note how tinnitus, if present, affects concentration, sleep, and daily functioning.",
          "Mention if you use hearing aids and explain any limitations — they don't always restore full function.",
        ],
      },
      {
        name: "Deafblindness",
        tips: [
          "Describe the combined impact of dual sensory loss on your ability to communicate and navigate.",
          "Explain how deafblindness affects every daily activity and the level of support you require.",
          "Include how you communicate and whether you require a specialist communicator guide.",
          "Note the profound impact on mobility, independence, and safety in all environments.",
          "Mention the psychological impact of isolation and how this affects your overall functioning.",
        ],
      },
    ],
  },
  {
    id: "respiratory",
    label: "Respiratory & Cardiac",
    conditions: [
      {
        name: "COPD",
        tips: [
          "Describe breathlessness using the MRC dyspnoea scale — explain at what level of activity you become breathless.",
          "Note how breathlessness affects personal care, cooking, walking, and climbing stairs.",
          "Explain how exacerbations affect your functioning — how long they last and what becomes impossible.",
          "Include the impact of chronic cough, fatigue, and recurrent infections on daily activities.",
          "Mention supplemental oxygen if used, and how this affects your mobility and ability to go out.",
        ],
      },
      {
        name: "Asthma",
        tips: [
          "Describe the frequency and severity of attacks, and what triggers them.",
          "Explain how poorly controlled asthma affects your ability to walk, exercise, or carry out daily activities.",
          "Note the impact of attacks on your ability to function safely, including the risk to life during severe episodes.",
          "Include how medication side effects (oral steroids) affect your physical and mental health.",
          "Mention environmental triggers that limit where you can go and what you can do.",
        ],
      },
      {
        name: "Heart Conditions",
        tips: [
          "Describe how your heart condition affects your ability to exert yourself — walking distances, climbing stairs.",
          "Explain symptoms like chest pain, palpitations, dizziness, or breathlessness during daily activities.",
          "Include how fatigue affects your ability to function throughout the day.",
          "Note how the fear of cardiac events affects your willingness and ability to go out or be active.",
          "Mention medication side effects and how they affect your daily functioning.",
        ],
      },
    ],
  },
  {
    id: "other",
    label: "Other Conditions",
    conditions: [
      {
        name: "Cancer",
        tips: [
          "Describe the impact of treatment (chemotherapy, radiotherapy, surgery) on your ability to function, not just the diagnosis.",
          "Explain fatigue from cancer and treatment — it is often severe and unpredictable.",
          "Include side effects: nausea, pain, mouth sores, peripheral neuropathy — all affect daily functioning.",
          "Note the psychological impact: anxiety, depression, and fear of the future affect daily activity.",
          "Describe what you cannot do during and after treatment, and how your functioning has changed.",
        ],
      },
      {
        name: "Kidney Disease",
        tips: [
          "Describe how dialysis affects your schedule, energy levels, and ability to carry out daily activities.",
          "Explain fatigue and weakness associated with kidney disease and how they affect functioning.",
          "Include dietary restrictions and how they affect meal preparation and social participation.",
          "Note the psychological impact of chronic kidney disease and its effect on mental health and daily life.",
          "Mention any mobility issues, anaemia, or other complications that affect your physical functioning.",
        ],
      },
      {
        name: "Mobility / Wheelchair Users",
        tips: [
          "Describe what you can and can't do independently — transfers, self-propelling, using powered wheelchair.",
          "Explain how your mobility impairment affects activities beyond just walking: accessing buildings, transport, personal care.",
          "Include upper limb involvement if present — many wheelchair users also have reduced arm/hand function.",
          "Note how fatigue from manual wheelchair use affects your ability to function throughout the day.",
          "Describe the environmental barriers you face and how they limit your participation in daily life.",
        ],
      },
      {
        name: "Lupus (SLE)",
        tips: [
          "Describe how lupus affects multiple body systems — joint pain, fatigue, skin, kidney, neurological symptoms.",
          "Explain flares: what triggers them, how long they last, and how they affect your functioning.",
          "Note photosensitivity if present — sun avoidance significantly affects your ability to go out.",
          "Include cognitive symptoms: 'lupus fog', memory problems, difficulty concentrating.",
          "Mention the unpredictable nature of lupus and how this affects your ability to reliably carry out activities.",
        ],
      },
    ],
  },
];

function ShareButton({ conditionName }: { conditionName: string }) {
  const [copied, setCopied] = useState(false);
  const slug = slugify(conditionName);
  const shareUrl = `${window.location.origin}/conditions?condition=${slug}`;
  const shareText = `Tips for ${conditionName} - PIP preparation guidance`;

  const handleFacebook = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    <span className="ml-2 flex items-center gap-1 flex-shrink-0">
      <button
        type="button"
        onClick={handleFacebook}
        aria-label={`Share ${conditionName} tips on Facebook`}
        title="Share on Facebook"
        className="text-muted-foreground hover:text-primary transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-ocid="conditions.secondary_button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={handleWhatsApp}
        aria-label={`Share ${conditionName} tips on WhatsApp`}
        title="Share on WhatsApp"
        className="text-muted-foreground hover:text-primary transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-ocid="conditions.secondary_button"
      >
        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy link for ${conditionName} tips`}
        title="Copy link"
        className="text-muted-foreground hover:text-primary transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-ocid="conditions.secondary_button"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-success" aria-hidden="true" />
        ) : (
          <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
        )}
      </button>
    </span>
  );
}

function ConditionAccordionItem({
  condition,
  value,
}: {
  condition: Condition;
  value: string;
}) {
  const slug = slugify(condition.name);
  return (
    <AccordionItem
      key={condition.name}
      value={value}
      id={`condition-${slug}`}
      className="section-card px-0 py-0 overflow-hidden"
      data-condition-slug={slug}
    >
      <AccordionTrigger className="px-5 py-3 hover:no-underline">
        <span className="font-semibold text-foreground text-left flex items-center gap-1">
          {condition.name}
          <ShareButton conditionName={condition.name} />
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-4">
        <ul className="space-y-2">
          {condition.tips.map((tip, i) => (
            <li
              key={tip.slice(0, 40)}
              className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
            >
              <span
                className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}

export function ConditionTipsPage() {
  const [search, setSearch] = useState("");
  const [topTab, setTopTab] = useState("conditions");
  const [communityConditionFilter, setCommunityConditionFilter] = useState("");
  const [communityTips] = useState<CommunityTip[]>(() =>
    loadApprovedCommunityTips(),
  );
  const [adminTips] = useState<AdminConditionTip[]>(() =>
    loadAdminConditionTips(),
  );
  const mergedCategories = mergeAdminTips(categories, adminTips);
  const location = useLocation();
  const hasScrolled = useRef(false);

  // Read URL param for direct condition link
  const conditionParam = useMemo(() => {
    return new URLSearchParams(location.search).get("condition");
  }, [location.search]);

  // Auto-scroll to condition on load when param is present
  useEffect(() => {
    if (conditionParam && !hasScrolled.current) {
      hasScrolled.current = true;
      // Small delay to let accordion render
      setTimeout(() => {
        const el = document.getElementById(`condition-${conditionParam}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          // Open the accordion item by clicking the trigger
          const trigger = el.querySelector(
            "button",
          ) as HTMLButtonElement | null;
          if (trigger && trigger.getAttribute("aria-expanded") === "false") {
            trigger.click();
          }
        }
      }, 300);
    }
  }, [conditionParam]);

  const filtered = useMemo(() => {
    if (!search.trim()) return mergedCategories;
    const q = search.toLowerCase();
    return mergedCategories
      .map((cat) => ({
        ...cat,
        conditions: cat.conditions.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            cat.label.toLowerCase().includes(q) ||
            c.tips.some((t) => t.toLowerCase().includes(q)),
        ),
      }))
      .filter((cat) => cat.conditions.length > 0);
  }, [search, mergedCategories]);

  const totalConditions = mergedCategories.reduce(
    (acc, cat) => acc + cat.conditions.length,
    0,
  );

  // Default tab: if conditionParam matches a category, switch to that tab
  const defaultTab = useMemo(() => {
    if (!conditionParam) return mergedCategories[0].id;
    for (const cat of mergedCategories) {
      if (cat.conditions.some((c) => slugify(c.name) === conditionParam)) {
        return cat.id;
      }
    }
    return mergedCategories[0].id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditionParam, mergedCategories]);

  return (
    <main
      id="main-content"
      className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full"
    >
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">
          {totalConditions} Conditions Covered
        </Badge>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Condition-Specific PIP Tips
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Find practical, PIP-specific advice for your condition. Each tip is
          designed to help you describe the impact of your condition accurately
          on your PIP2 form and in your assessment.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search conditions (e.g. fibromyalgia, anxiety, ADHD)\u2026"
          className="pl-9"
          aria-label="Search conditions"
          data-ocid="conditions.search_input"
        />
      </div>

      {/* Top-level tabs: Condition Tips vs Community Tips */}
      <div className="flex gap-2 mb-6 border-b border-border">
        <button
          type="button"
          onClick={() => setTopTab("conditions")}
          className={`pb-2 px-1 text-sm font-semibold border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            topTab === "conditions"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          data-ocid="conditions.tab"
        >
          Condition Tips
        </button>
        <button
          type="button"
          onClick={() => setTopTab("community")}
          className={`pb-2 px-1 text-sm font-semibold border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center gap-1.5 ${
            topTab === "community"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          data-ocid="conditions.tab"
        >
          <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
          Community Tips
          {communityTips.length > 0 && (
            <span className="bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full font-medium">
              {communityTips.length}
            </span>
          )}
        </button>
      </div>

      {topTab === "conditions" ? (
        <>
          {search.trim() ? (
            /* Search results */
            <div className="space-y-6">
              {filtered.length === 0 ? (
                <div
                  className="section-card text-center text-muted-foreground"
                  data-ocid="conditions.empty_state"
                >
                  <p>
                    No conditions found for &quot;{search}&quot;. Try a
                    different search.
                  </p>
                </div>
              ) : (
                filtered.map((cat) => (
                  <div key={cat.id}>
                    <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                      {cat.label}
                    </h2>
                    <Accordion type="multiple" className="space-y-2">
                      {cat.conditions.map((condition) => (
                        <ConditionAccordionItem
                          key={condition.name}
                          condition={condition}
                          value={`${cat.id}-${condition.name}`}
                        />
                      ))}
                    </Accordion>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Tabbed view */
            <Tabs defaultValue={defaultTab}>
              <TabsList
                className="flex flex-wrap gap-1 h-auto bg-muted p-1 mb-6"
                aria-label="Condition categories"
              >
                {mergedCategories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="text-xs"
                    data-ocid="conditions.tab"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((cat) => (
                <TabsContent key={cat.id} value={cat.id}>
                  <p className="text-sm text-muted-foreground mb-4">
                    {cat.conditions.length} condition
                    {cat.conditions.length !== 1 ? "s" : ""} covered
                  </p>
                  <Accordion type="multiple" className="space-y-2">
                    {cat.conditions.map((condition) => (
                      <ConditionAccordionItem
                        key={condition.name}
                        condition={condition}
                        value={condition.name}
                      />
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </>
      ) : (
        /* Community Tips */
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Select
              value={communityConditionFilter}
              onValueChange={setCommunityConditionFilter}
            >
              <SelectTrigger className="w-64" data-ocid="conditions.select">
                <SelectValue placeholder="Filter by condition..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All conditions</SelectItem>
                {Array.from(
                  new Set(
                    communityTips.map((t) => t.condition).filter(Boolean),
                  ),
                ).map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {communityConditionFilter && communityConditionFilter !== "all" && (
              <button
                type="button"
                onClick={() => setCommunityConditionFilter("")}
                className="text-xs text-muted-foreground underline hover:text-foreground"
              >
                Clear filter
              </button>
            )}
          </div>

          {communityTips.length === 0 ? (
            <div
              className="section-card text-center py-12 text-muted-foreground"
              data-ocid="conditions.empty_state"
            >
              <MessageSquare
                className="w-10 h-10 mx-auto mb-3 opacity-30"
                aria-hidden="true"
              />
              <p className="font-medium">No community tips yet</p>
              <p className="text-sm mt-1">
                Be the first to share a tip via the{" "}
                <a
                  href="/feedback"
                  className="text-primary underline hover:no-underline"
                >
                  Feedback page
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {communityTips
                .filter(
                  (t) =>
                    !communityConditionFilter ||
                    communityConditionFilter === "all" ||
                    t.condition === communityConditionFilter,
                )
                .map((tip, idx) => (
                  <div
                    key={tip.id}
                    className="section-card"
                    data-ocid={`conditions.item.${idx + 1}`}
                  >
                    {tip.condition && (
                      <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-2">
                        {tip.condition}
                      </span>
                    )}
                    <p className="text-sm text-foreground leading-relaxed">
                      {tip.tip}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Shared by a community member
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
