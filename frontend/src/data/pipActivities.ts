export interface PipActivity {
    id: string;
    title: string;
    question: string;
    explanation: string;
    tips: string[];
}

export const pipActivities: PipActivity[] = [
    {
        id: 'preparing-food',
        title: 'Preparing Food',
        question: 'Can you prepare and cook a simple meal for yourself?',
        explanation:
            'The assessor wants to know if you can safely plan, prepare, and cook a simple one-course meal using a conventional cooker. This includes peeling, chopping, and mixing ingredients. They consider whether you can do this safely, reliably, and in a reasonable time.',
        tips: [
            'Describe any pain, fatigue, or difficulty standing at the cooker.',
            'Mention if you struggle to grip knives or open packaging.',
            'Note if you forget steps due to cognitive difficulties.',
            'Explain if you need someone to supervise you for safety.',
            'Example: "I cannot stand for more than 5 minutes without severe pain, so I cannot safely use the hob."',
        ],
    },
    {
        id: 'eating-drinking',
        title: 'Eating and Drinking',
        question: 'Can you eat and drink without help?',
        explanation:
            'This activity looks at whether you can cut up food, use cutlery, and drink from a cup or glass. It also covers whether you need a special diet due to a health condition, and whether you need someone to help you eat or drink.',
        tips: [
            'Describe any difficulty gripping cutlery or cups.',
            'Mention if you have swallowing difficulties (dysphagia).',
            'Note if you need food cut up or a special diet.',
            'Example: "My tremors mean I spill drinks frequently and need a lidded cup."',
        ],
    },
    {
        id: 'managing-therapy',
        title: 'Managing Therapy or Monitoring a Health Condition',
        question: 'Do you need to manage any therapy or monitor a health condition?',
        explanation:
            'This covers any therapy you do at home (e.g., physiotherapy exercises, dialysis, injections) and monitoring your condition (e.g., blood sugar checks). The assessor considers how much time this takes each day and whether you need help to do it.',
        tips: [
            'List all therapies you do at home and how long each takes.',
            'Mention if you need reminders to take medication.',
            'Describe any difficulties managing injections or medical equipment.',
            'Example: "I spend 45 minutes each morning doing prescribed physiotherapy exercises and need prompting to remember my medication."',
        ],
    },
    {
        id: 'washing-bathing',
        title: 'Washing and Bathing',
        question: 'Can you wash and bathe yourself?',
        explanation:
            'The assessor wants to know if you can wash your face, hands, body, and hair, and whether you can get in and out of the bath or shower safely. They consider pain, fatigue, balance, and whether you need aids or another person\'s help.',
        tips: [
            'Describe any difficulty getting in or out of the bath/shower.',
            'Mention if you need a shower seat, grab rails, or other aids.',
            'Note if you need someone to help wash your hair or back.',
            'Explain if fatigue means you can only manage a wash on some days.',
            'Example: "I cannot safely step over the bath edge and need a walk-in shower with a seat."',
        ],
    },
    {
        id: 'managing-toilet',
        title: 'Managing Toilet Needs or Incontinence',
        question: 'Can you manage your toilet needs?',
        explanation:
            'This activity covers getting to and using the toilet, managing incontinence, and personal hygiene after using the toilet. The assessor considers whether you need aids, adaptations, or another person\'s help.',
        tips: [
            'Describe any urgency or incontinence issues.',
            'Mention if you need aids such as a raised toilet seat or grab rails.',
            'Note if you need help with personal hygiene.',
            'Example: "I have urgency incontinence and sometimes cannot reach the toilet in time."',
        ],
    },
    {
        id: 'dressing-undressing',
        title: 'Dressing and Undressing',
        question: 'Can you dress and undress yourself?',
        explanation:
            'The assessor wants to know if you can choose appropriate clothing and put it on and take it off, including footwear. They consider whether you need adapted clothing, aids, or another person\'s help.',
        tips: [
            'Describe difficulty with buttons, zips, or laces.',
            'Mention if you need adapted clothing (e.g., Velcro fastenings).',
            'Note if you need help putting on socks, shoes, or lower-body clothing.',
            'Explain if pain or fatigue limits your ability to dress independently.',
            'Example: "I cannot bend to put on socks and shoes due to hip pain and need someone to help me."',
        ],
    },
    {
        id: 'communicating-verbally',
        title: 'Communicating Verbally',
        question: 'Can you communicate verbally?',
        explanation:
            'This activity looks at whether you can express yourself and understand others in spoken conversation. It covers speech difficulties, hearing loss, and cognitive difficulties that affect communication.',
        tips: [
            'Describe any speech difficulties (e.g., stutter, aphasia).',
            'Mention if you need hearing aids or lip-reading.',
            'Note if anxiety or cognitive difficulties affect your ability to communicate.',
            'Example: "My aphasia means I frequently lose words mid-sentence and need extra time to communicate."',
        ],
    },
    {
        id: 'reading-understanding',
        title: 'Reading and Understanding Signs, Symbols and Words',
        question: 'Can you read and understand written information?',
        explanation:
            'The assessor wants to know if you can read and understand basic written information such as signs, labels, and letters. This includes difficulties due to visual impairment, dyslexia, or cognitive conditions.',
        tips: [
            'Describe any visual impairment and whether glasses/aids help.',
            'Mention if dyslexia or a learning difficulty affects your reading.',
            'Note if cognitive difficulties mean you struggle to understand written information.',
            'Example: "My severe dyslexia means I cannot reliably read medication labels without assistance."',
        ],
    },
    {
        id: 'engaging-people',
        title: 'Engaging with Other People Face to Face',
        question: 'Can you engage with other people face to face?',
        explanation:
            'This activity covers whether you can understand and respond appropriately in social situations. It includes difficulties due to mental health conditions, autism, social anxiety, or cognitive impairments.',
        tips: [
            'Describe how anxiety or mental health affects social interaction.',
            'Mention if autism or a social communication difficulty affects you.',
            'Note if you need prompting or support to engage with others.',
            'Explain how often you can manage social interaction and what triggers difficulties.',
            'Example: "My severe social anxiety means I cannot engage with strangers without experiencing a panic attack."',
        ],
    },
    {
        id: 'budgeting-decisions',
        title: 'Making Budgeting Decisions',
        question: 'Can you make decisions about money?',
        explanation:
            'The assessor wants to know if you can manage simple financial decisions such as paying for items in a shop, understanding change, and managing a budget. This covers cognitive, learning, and mental health difficulties.',
        tips: [
            'Describe any difficulty understanding money or making financial decisions.',
            'Mention if you need someone to manage your finances.',
            'Note if cognitive difficulties or mental health affect your ability to budget.',
            'Example: "My cognitive difficulties mean I cannot reliably calculate change or manage a weekly budget without support."',
        ],
    },
    {
        id: 'planning-journeys',
        title: 'Planning and Following Journeys',
        question: 'Can you plan and follow a journey?',
        explanation:
            'This activity covers whether you can plan a route and travel to an unfamiliar place. It includes difficulties due to anxiety, cognitive impairment, visual impairment, or physical health conditions that affect travel.',
        tips: [
            'Describe any anxiety about travelling alone or to unfamiliar places.',
            'Mention if you get disoriented or lost easily.',
            'Note if you need someone to accompany you on journeys.',
            'Explain if you can only travel on familiar routes.',
            'Example: "My agoraphobia means I cannot travel on public transport without experiencing severe panic attacks."',
        ],
    },
    {
        id: 'moving-around',
        title: 'Moving Around',
        question: 'Can you stand and move around?',
        explanation:
            'The assessor wants to know how far you can walk and whether you need aids such as a walking stick, crutches, or a wheelchair. They consider pain, fatigue, and safety when walking. The key distances are 20 metres and 50 metres.',
        tips: [
            'Be specific about how far you can walk before pain or breathlessness stops you.',
            'Describe your worst days, not just your best days.',
            'Mention any walking aids you use.',
            'Note if you need to stop and rest during a walk.',
            'Example: "On a bad day I can walk no more than 20 metres before severe pain forces me to stop."',
        ],
    },
];
