import { detectCategory, estimateReadTime } from '../utils/categoryDetector';

const RAW_ARTICLES = [
  {
    title: "Hauling about Madras city on trains",
    author: "Sriram V.",
    description: "Madras was the first place in India where trains were introduced, shaping the urban layout and economic heartbeat of the historic port city.",
    url: "https://www.thehindu.com/news/cities/chennai/madras-day-2026-hauling-about-the-city-on-trains/article71337079.ece",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026",
    priority: "featured"
  },
  {
    title: "From heritage to high-rises, how Chennai grew taller",
    author: "R. Aishwaryaa",
    description: "Tracing Chennai's architectural evolution from traditional colonial bungalows and Chettinad structures to modern glass skyscrapers.",
    url: "https://www.thehindu.com/news/cities/chennai/madras-day-2026-from-heritage-to-high-rises-how-chennai-grew-taller/article71369048.ece",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026",
    priority: "trending"
  },
  {
    title: "A birthday note to Madras: The city that is shaped by its arts",
    author: "Chitra Swaminathan",
    description: "Exploring the Carnatic music sabhas, Bharatanatyam heritage, and vibrant theater that give Madras its soul.",
    url: "https://www.thehindu.com/entertainment/music/a-birthday-note-to-madras-the-city-that-is-shaped-by-its-arts/article71364608.ece",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Getting around Madras on autorickshaws",
    author: "Sriram V.",
    description: "The quirky history, meter tales, and cultural fixture of three-wheelers navigating the bustling avenues of Chennai.",
    url: "https://www.thehindu.com/news/cities/chennai/madras-day-2026-getting-around-the-on-autorickshaws/article71337133.ece",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Madras city on the move",
    author: "Sriram V.",
    description: "A comprehensive retrospective compilation of transportation history from trams and horse carriages to suburban rail and metro.",
    url: "https://www.thehindu.com/news/cities/chennai/madras-day-2026-madras-city-on-the-move-a-compilation/article71333806.ece",
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80",
    date: "Aug 20, 2026"
  },
  {
    title: "How Madras filmmakers brought literature to life",
    author: "Suganthy Krishnamachari",
    description: "Looking at landmark Tamil films that adapted timeless novels and classic theatrical plays for the silver screen.",
    url: "https://www.thehindu.com/entertainment/movies/from-page-to-screen-how-madras-filmmakers-brought-literature-to-life/article71363852.ece",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    date: "Aug 20, 2026",
    priority: "featured"
  },
  {
    title: "In Pictures | Madras, then and now",
    author: "The Hindu Bureau",
    description: "A visual archive matching century-old monochrome photographs of Mount Road and Marina with contemporary bustling aerial shots.",
    url: "https://www.thehindu.com/news/cities/chennai/in-pictures-madras-then-and-now/article71377431.ece",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "The coast that made Chennai",
    author: "Geetha Srimathi",
    description: "How the Coromandel coast, fishing hamlets, colonial ports, and maritime trade winds created modern Madras.",
    url: "https://www.thehindu.com/news/cities/chennai/madras-day-2026-the-coast-that-made-chennai-and-the-city-that-keeps-remaking-it/article71370834.ece",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Safire theatre in Chennai: Once a cinema landmark, now reduced to nothing",
    author: "Meghna M.",
    description: "The story of India's first multi-theatre complex on Mount Road and the nostalgic memories of 70mm Cinerama screenings.",
    url: "https://www.thehindu.com/news/cities/chennai/madras-day-2026-safire-theatre-once-a-cinema-landmark-in-chennai-now-reduced-to-nothing/article71369132.ece",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
    date: "Aug 20, 2026"
  },
  {
    title: "Art deco in Chennai: A guide to heritage structures from Dare House to Kasturi Buildings",
    author: "Sanjana Ganesh",
    description: "An architectural guide exploring the curved balconies, geometric nautical motifs, and ziggurat towers along Parry's Corner and Anna Salai.",
    url: "https://www.thehindu.com/news/cities/chennai/art-deco-in-chennai-a-guide-to-heritage-structures-kasturi-buildings/article71368950.ece",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    date: "Aug 20, 2026"
  },
  {
    title: "Amid controversy, NCERT team head promises to bring out factual, unbiased textbooks",
    author: "Maitri Porecha",
    description: "Reconstitution of committee that develops political science textbooks for Classes 11 and 12 had caused a controversy over reported political affiliations.",
    url: "https://www.thehindu.com/education/amid-controversy-ncert-team-head-promises-to-bring-out-factual-unbiased-textbooks/article71377722.ece",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026",
    priority: "trending"
  },
  {
    title: "Sikh protesters burn Rahul Gandhi effigy over Sajjan Kumar ‘role model’ remark",
    author: "Lavpreet Kaur",
    description: "Demonstrations erupt outside political offices protesting recent controversial statements regarding historical anti-Sikh violence cases.",
    url: "https://www.thehindu.com/news/national/sikhs-protest-outside-rahul-gandhis-residence-against-congress-leaders-calling-sajjan-kumar-hero/article71377114.ece",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Cross-FIRs filed after attack on CJP team in Jaipur during visit to govt. school",
    author: "PTI",
    description: "Police register counter complaints after fact-finding delegation faces confrontation in Rajasthan capital.",
    url: "https://www.thehindu.com/news/national/rajasthan/cross-firs-filed-after-attack-on-cjp-team-in-jaipur-during-visit-to-govt-school/article71377244.ece",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Why didn’t you sing Vande Mataram in full all these years?: Mallikarjun Kharge questions Modi, BJP",
    author: "The Hindu Bureau",
    description: "Congress president sharpens attack on ruling coalition regarding historical traditions and national symbols in Karnataka rally.",
    url: "https://www.thehindu.com/news/national/karnataka/why-didnt-you-sing-vande-mataram-in-full-all-these-years-mallikarjun-kharge-questions-modi-bjp/article71377475.ece",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "DMK revamps party organisation; sets 70 as age limit for district secretaries, 45 for local units",
    author: "The Hindu Bureau",
    description: "In a major structural overhaul, Tamil Nadu's ruling party introduces generational transition guidelines for key organizational posts.",
    url: "https://www.thehindu.com/news/national/tamil-nadu/dmk-revamps-party-organisation-age-limits-tenures-district-units/article71377288.ece",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "BCI Co-Chairperson demands Manan Mishra’s resignation, questions prolonged tenure amid NALSAR row",
    author: "Soibam Rocky Singh",
    description: "Bar Council of India internal fissures surface as senior leadership contests constitutional propriety and administrative actions.",
    url: "https://www.thehindu.com/news/cities/Delhi/bci-co-chairperson-demands-manan-mishras-resignation-questions-prolonged-tenure-amid-nalsar-row/article71376954.ece",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Why is Jadavpur University in Kolkata on the boil? | Explained",
    author: "Shiv Sahay Singh",
    description: "An in-depth explainer on student protests, administrative paralysis, campus safety audits, and election debates in JU.",
    url: "https://www.thehindu.com/news/national/west-bengal/why-is-jadavpur-university-in-kolkata-on-the-boil-explained/article71376802.ece",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Four years after Supreme Court-formed panel’s nudge, Assam mum on construction in Kaziranga animal corridors",
    author: "The Hindu Bureau",
    description: "Environmental compliance status report on commercial resorts and infrastructure encroaching on wildlife movement paths.",
    url: "https://www.thehindu.com/news/national/assam/four-years-after-supreme-court-formed-panels-nudge-assam-mum-on-construction-in-kaziranga-animal-corridors/article71377030.ece",
    image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "India to end boarding pass stamping at airports for international travellers from September 1",
    author: "PTI",
    description: "Civil aviation ministry and CISF to streamline passenger processing with digitized gate screening and barcode verification.",
    url: "https://www.thehindu.com/news/national/india-to-end-boarding-pass-stamping-at-airports-for-international-travellers-from-september-1/article71377582.ece",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026",
    priority: "trending"
  },
  {
    title: "MHA panel formed to draft final agreement on Gorkha issue: Darjeeling MP after Amit Shah’s key meeting",
    author: "PTI",
    description: "High-level tripartite discussions advance towards structured territorial governance resolution for northern hills.",
    url: "https://www.thehindu.com/news/national/west-bengal/amit-shah-meets-hill-leaders-to-discuss-permanent-political-solution-for-darjeeling/article71376943.ece",
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "How Onam is redefining heritage with bold flavours and modern weaves",
    author: "The Hindu Bureau",
    description: "Contemporary Kerala chefs and handloom artisans blend fusion Sadya delicacies with sustainable Kasavu fashion.",
    url: "https://www.thehindu.com/life-and-style/onam-celebrations-sadya-articles-from-the-hindu/article71368011.ece",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Saving faces: On protests, biometric surveillance",
    author: "The Hindu Editorial",
    description: "Editorial: The rapid deployment of facial recognition tools during public gatherings requires strict statutory privacy safeguards.",
    url: "https://www.thehindu.com/opinion/editorial/saving-faces-on-protests-biometric-surveillance/article71374244.ece",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Noise annoys: On noise and the Patna High Court order",
    author: "Sahab Deen, Navneet Sharma",
    description: "Examining judicial directives curbing decibel violations in public spaces and the fundamental right to quietude.",
    url: "https://www.thehindu.com/opinion/editorial/noise-annoys-on-noise-and-the-patna-high-court-order/article71374274.ece",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Ensuring equity amid India’s educational progress",
    author: "Sahab Deen, Navneet Sharma",
    description: "A deep dive into bridging the socio-economic and digital divide in higher education and vocational institutes.",
    url: "https://www.thehindu.com/opinion/lead/ensuring-equity-amid-indias-educational-progress/article71374765.ece",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "When the floodgate must open in Keralam",
    author: "Ameer Ahamed",
    description: "Evaluating reservoir rule curves, basin hydrology, and climate adaptation strategies to avoid catastrophic flash floods.",
    url: "https://www.thehindu.com/opinion/op-ed/when-the-floodgate-must-open-in-keralam/article71376706.ece",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Unimpeded trade needs IPMDA as the answer",
    author: "Pooja Bhatt",
    description: "How the Indo-Pacific Maritime Domain Awareness initiative enhances supply chain resilience and counter-piracy operations.",
    url: "https://www.thehindu.com/opinion/op-ed/unimpeded-trade-needs-ipmda-as-the-answer/article71374728.ece",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Can protest be dialogue?",
    author: "Adithya Reddy",
    description: "Philosophical and constitutional perspectives on civil dissent as a cornerstone of collaborative democracy.",
    url: "https://www.thehindu.com/opinion/op-ed/can-protest-be-dialogue/article71372612.ece",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Behind the byline",
    author: "Sunalini Mathew",
    description: "Reflections on field reporting, editorial choices, verifying ground truths, and the changing landscape of journalism.",
    url: "https://www.thehindu.com/opinion/op-ed/behind-the-byline/article71370592.ece",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "The Vanashakti verdict is balanced and pragmatic",
    author: "Kalaiselvan Periyasamy",
    description: "Legal analysis of the landmark National Green Tribunal and Supreme Court orders on ecologically sensitive coastal zones.",
    url: "https://www.thehindu.com/opinion/op-ed/the-vanashakti-verdict-is-balanced-and-pragmatic/article71370042.ece",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Assam, Meghalaya seek end to standoff",
    author: "The Hindu Bureau",
    description: "Chief ministers meet to settle lingering border demarcations across secondary disputed sectors in the Northeast.",
    url: "https://www.thehindu.com/news/national/assam/assam-meghalaya-seek-end-to-standoff/article71378115.ece",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Sivasagar MLA blames three BJP legislators for Assam flood crisis",
    author: "The Hindu Bureau",
    description: "Opposition leaders allege embankments breach due to delayed desilting and improper flood mitigation tenders.",
    url: "https://www.thehindu.com/news/national/assam/sivasagar-mla-blames-three-bjp-legislators-for-assam-flood-crisis/article71377685.ece",
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Lost in the seat matrix: engineering season begins in Tamil Nadu",
    author: "The Hindu Bureau",
    description: "Anna University counselling statistics highlight shifts in student preferences towards AI, cyber security and electronics over core streams.",
    url: "https://www.thehindu.com/news/national/tamil-nadu/lost-in-the-seat-matrix-engineering-season-begins-in-tamil-nadu/article71374372.ece",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Rahul’s street politics signals a new Opposition playbook",
    author: "Sandeep Phukan",
    description: "Analyzing recent direct engagement campaigns, railway worker interactions, and youth rallies shaping the INDIA bloc's strategy.",
    url: "https://www.thehindu.com/news/national/rahuls-street-politics-signals-a-new-opposition-playbook/article71374667.ece",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Beyond the walls of Siddhavatam Fort",
    author: "A.D. Rangarajan",
    description: "A cultural exploration of the 14th-century fort on the banks of the Pennar river and its Matli king architecture.",
    url: "https://www.thehindu.com/news/cities/Visakhapatnam/beyond-the-walls-of-siddhavatam-fort/article71373272.ece",
    image: "https://images.unsplash.com/photo-1599837565318-67429bde7162?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Why India’s colleges need to build accessibility into digital learning systems",
    author: "Arman Ali, Deepa Nagaraj",
    description: "Screen readers, captioning, and tactile interfaces: making online higher education genuinely inclusive for persons with disabilities.",
    url: "https://www.thehindu.com/education/why-indias-colleges-need-to-build-accessibility-into-digital-learning-systems/article71372384.ece",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Five years after Taliban takeover, life in Afghanistan marred by many struggles",
    author: "Smriti Sudesh",
    description: "Special report on female education bans, economic isolation, and humanitarian relief efforts across Kabul and Kandahar.",
    url: "https://www.thehindu.com/news/international/five-years-after-taliban-takeover-life-in-afghanistan-marred-by-many-struggles/article71369494.ece",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Tamil Nadu lays out Vision 2031 with focus on green energy and charging infrastructure",
    author: "The Hindu Bureau",
    description: "Policy roadmap targets 50,000 EV charging hubs and 40GW offshore wind generation over the next half decade.",
    url: "https://www.thehindu.com/news/cities/chennai/tamil-nadu-lays-out-vision-2031-with-focus-on-green-energy-and-charging-infrastructure/article71373601.ece",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "‘7 Dogs’ movie review: Hollywood blood, missing soul",
    author: "Anuj Kumar",
    description: "Sanjay Dutt and Salman Khan feature in this Hindi-dubbed high-octane Arabic action thriller that struggles with emotional depth.",
    url: "https://www.thehindu.com/entertainment/movies/7-dogs-movie-review-sanjay-dutt-salman-khan-arabic-blockbuster-7-dogs-hindi-dubbed-monica-bellucci/article71376721.ece",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "‘Mutiny’ movie review: Jason Statham deserved better than this messy thriller",
    author: "Mini Anthikad Chhibber",
    description: "Despite explosive choreography, the screenplay falters under convoluted espionage tropes and predictable villain twists.",
    url: "https://www.thehindu.com/entertainment/movies/mutiny-movie-review-jason-statham-deserved-better-than-this-messy-thriller/article71374758.ece",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "‘Irumudi’: Shiva Nirvana and Ravi Teja deliver an emotionally steeped tale",
    author: "Sangeetha Devi Dundoo",
    description: "A poignant Telugu family drama anchored in spiritual devotion, redemption, and nuanced dramatic performances.",
    url: "https://www.thehindu.com/entertainment/movies/irumudi-movie-review-shiva-nirvana-and-ravi-teja-deliver-an-emotionally-steeped-tale/article71368827.ece",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "‘Insidious: Out of the Further’: Further from its best",
    author: "Ayaan Paul Chowdhury",
    description: "The classic horror franchise returns with spectral hauntings but relies too heavily on predictable jump scares.",
    url: "https://www.thehindu.com/entertainment/movies/insidious-out-of-the-further-movie-review-horror-james-wan-blumhouse/article71373014.ece",
    image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Did Press Note 3 relaxations help attract more FDI? | Explained",
    author: "T.C.A. Sharad Raghavan",
    description: "The Ministry of Commerce and Industry has reported that 29 FDI projects worth ₹4,895.65 crore were processed under revised norms.",
    url: "https://www.thehindu.com/business/did-press-note-3-relaxations-help-attract-more-fdi-explained/article71376742.ece",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Data centres in Andaman & Nicobar: why did island administration withdraw its own proposal?",
    author: "The Hindu Bureau",
    description: "Scrutinizing undersea optical cable bandwidth constraints, cooling power requirements, and fragile ecology in Port Blair.",
    url: "https://www.thehindu.com/news/national/andaman-and-nicobar-islands/andaman-nicobar-admin-issues-call-for-interest-for-data-centre-exploration-withdraws-it-days-later-explained/article71372364.ece",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "What led to the re-test of three UGC-NET papers? | Explained",
    author: "The Hindu Bureau",
    description: "NTA initiates forensic review after technical glitches and logistics disruptions in select regional examination centres.",
    url: "https://www.thehindu.com/education/what-led-to-the-re-test-of-threeugc-netpapers-explained/article71372196.ece",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "How Supreme Court’s new ruling changes the definition of ‘industry’ | Explained",
    author: "The Hindu Bureau",
    description: "Key legal implications for contract labour, charitable hospitals, and educational trusts under industrial disputes framework.",
    url: "https://www.thehindu.com/news/national/how-supreme-courts-new-ruling-changes-the-definition-of-industry-explainer/article71372126.ece",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Are IAS officers in key positions the biggest hurdle to police reforms? | In Focus Podcast",
    author: "G. Sampath",
    description: "Former IPS officer Yashovardhan Azad explores corruption, bureaucratic rivalry, and civil service dynamics in his new book 'Policing the Republic'.",
    url: "https://www.thehindu.com/podcast/are-ias-officers-in-key-positions-the-biggest-hurdle-to-police-reforms-in-focus-podcast/article71373034.ece",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026",
    priority: "featured"
  },
  {
    title: "Can free public technology break the private coaching industry? | In Focus Podcast",
    author: "Maitri Porecha",
    description: "AICTE Chief Coordinating Officer and edtech founders debate open-source learning platforms vs mega coaching institutes.",
    url: "https://www.thehindu.com/podcast/can-free-public-technology-break-the-private-coaching-industry-in-focus-podcast/article71370244.ece",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "‘Sowcar’ Janaki (1931-2026): The Veteran Doyen of South Cinema",
    author: "The Hindu Bureau",
    description: "Tribute to the legendary actor who graced over 400 films across Tamil, Telugu, Kannada, and Hindi with graceful versatility.",
    url: "https://www.thehindu.com/entertainment/movies/sowcar-janaki-articles-by-the-hindu/article71373608.ece",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Heritage city mourns ‘Sowcar’ Janaki",
    author: "The Hindu Bureau",
    description: "Cinema fraternity and citizens gather to pay homage to the beloved actress known for timeless classics like 'Bama Vijayam'.",
    url: "https://www.thehindu.com/entertainment/heritage-city-mourns-sowcar-janaki/article71373994.ece",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "‘Sowcar’ Janaki, the versatile face of Tamil cinema known for majestic roles and finesse",
    author: "The Hindu Bureau",
    description: "An appraisal of her collaborative masterpieces with K. Balachander, Sivaji Ganesan, and Gemini Ganesan.",
    url: "https://www.thehindu.com/entertainment/sowcar-janaki-the-versatile-face-of-tamil-cinema-known-for-majestic-roles-and-finesses-dies/article71373607.ece",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Sowcar Janaki’s Kannada cinema journey spanned generations and iconic stars",
    author: "The Hindu Bureau",
    description: "Chronicling her memorable blockbusters alongside Dr. Rajkumar and Vishnuvardhan across five glorious decades.",
    url: "https://www.thehindu.com/entertainment/movies/sowcar-janakis-kannada-cinema-journey-spanned-generations-and-iconic-stars/article71373534.ece",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Indian confidence in Dubai real estate has been validated yet again",
    author: "Aayush Puri",
    description: "High rental yields, golden visa pathways, and tax advantages continue to draw prime Indian ultra-HNIs to UAE properties.",
    url: "https://www.thehindu.com/life-and-style/homes-and-gardens/indian-confidence-in-dubai-has-been-validated-yet-again/article71356040.ece",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    date: "Aug 20, 2026"
  },
  {
    title: "How Indian bathrooms are embracing colour, wellness and personalisation",
    author: "K.S. Swati",
    description: "From earthy terracotta tiles and biophilic greens to ambient chromotherapy showers, interior design gets a spa-like upgrade.",
    url: "https://www.thehindu.com/life-and-style/homes-and-gardens/how-indian-bathrooms-are-embracing-colour-wellness-and-personalisation/article71372584.ece",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "How Indian homeowners are customising the modern modular kitchen",
    author: "Anisha Menezes",
    description: "Smart organizers, spice drawers, quartz countertops, and ergonomic storage tailored for Indian culinary routines.",
    url: "https://www.thehindu.com/life-and-style/homes-and-gardens/how-indian-homeowners-are-customising-the-modern-modular-kitchen/article71300519.ece",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    date: "Aug 19, 2026"
  },
  {
    title: "New luxury home is all about wellness, privacy and ease",
    author: "Mayank Ruia",
    description: "Architectural layouts embracing private courtyards, natural ventilation shafts, and smart circadian lighting systems.",
    url: "https://www.thehindu.com/life-and-style/homes-and-gardens/new-luxury-home-is-all-about-wellness-privacy-and-ease/article71355915.ece",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    date: "Aug 20, 2026"
  },
  {
    title: "‘Bass X Machina’ trailer: Futuristic take on legendary lawman Bass Reeves",
    author: "The Hindu Bureau",
    description: "Brian Tyree Henry stars in Netflix's neo-western sci-fi action spectacle combining 19th-century lore with cybernetic tech.",
    url: "https://www.thehindu.com/entertainment/movies/bass-x-machina-trailer-netflix-bass-reeves-lawman-futuristic-take-brian-tyree-henry-emmy-nominated/article71377839.ece",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "‘The Pitt’ Season 3 trailer: Noah Wyle faces new challenges in medical drama",
    author: "The Hindu Bureau",
    description: "HBO Max's gritty emergency room series returns with high-stakes triage emergencies and administrative showdowns.",
    url: "https://www.thehindu.com/entertainment/movies/the-pitt-season-3-trailer-hbo-max-noah-wyle-dr-michael-robby-robinavitch-pittsburghs-healthcare/article71377667.ece",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "‘Kaaka’: Chiranjeevi’s next with Bobby Kolli gets a title",
    author: "The Hindu Bureau",
    description: "Megastar 158 unveiled with a mass poster and high-voltage rural revenge backdrop produced by KVN Productions.",
    url: "https://www.thehindu.com/entertainment/movies/kaaka-chiranjeevi-mega-158-bobby-kolli-kvn-productions-telugu-movie-mega-star-chiranjeevi/article71377566.ece",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Back to full fitness, Mayank savours the start of a new journey",
    author: "The Hindu Bureau",
    description: "Indian speedster Mayank Yadav discusses injury recovery protocols, speed training, and upcoming domestic red-ball matches.",
    url: "https://www.thehindu.com/sport/back-to-full-fitness-mayank-savours-the-start-of-a-new-journey/article71377416.ece",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Treesa and Gayatri rue defensive tactics and lack of patience",
    author: "The Hindu Bureau",
    description: "India's ace women's doubles badminton duo break down their tactical errors and unforced errors in quarter-final clash.",
    url: "https://www.thehindu.com/sport/other-sports/treesa-and-gayatri-rue-defensive-tactics-and-lack-of-patience/article71378254.ece",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Badminton World Championships: Treesa and Gayatri’s giant-killing spree comes to an end",
    author: "The Hindu Bureau",
    description: "A spirited World Championships campaign concludes after hard-fought three-game duel against world No. 2 Korean pair.",
    url: "https://www.thehindu.com/sport/badminton-world-championships-treesa-and-gayatris-giant-kiling-spree-comes-to-an-end/article71377962.ece",
    image: "https://images.unsplash.com/photo-1521537634581-0dced2fedc92?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "ChatGPT, internet searches and ‘dhuk dhuk’: Rajnath Singh highlights challenges of self-diagnosis for doctors",
    author: "The Hindu Bureau",
    description: "Defence Minister addresses medical convocation, urging patients to rely on clinical consultations rather than algorithmic panic.",
    url: "https://www.thehindu.com/sci-tech/health/chatgpt-internet-searches-and-dhuk-dhuk-rajnath-singh-highlights-challenges-of-self-diagnosis-for-doctors/article71377238.ece",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026",
    priority: "trending"
  },
  {
    title: "Government restricts FDCs with chlorpheniramine, phenylephrine for children below 4",
    author: "The Hindu Bureau",
    description: "Drug Controller General issues stern advisory against irrational cold syrup combinations in pediatric treatments.",
    url: "https://www.thehindu.com/sci-tech/health/government-restricts-fixed-dose-combinations-containing-2-chemical-compounds-for-young-children/article71376736.ece",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "More than 16,000 doses of Ervebo vaccine arrive in Ebola-hit DRC",
    author: "The Hindu Bureau",
    description: "WHO and UNICEF coordinate rapid cold-chain delivery to ring-fence outbreak in North Kivu province.",
    url: "https://www.thehindu.com/news/international/more-than-16000-doses-of-ervebo-vaccine-arrive-in-ebola-hit-drc/article71376510.ece",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Watch: Gaganyaan Episode 3: How India will save its Astronauts | The Scope",
    author: "The Hindu Bureau",
    description: "ISRO's crew escape system, pad abort tests, and sea recovery drills examined in detail with 3D flight graphics.",
    url: "https://www.thehindu.com/videos/watch-gaganyaan-episode-3-how-india-will-save-its-astronauts-the-scope/article71378193.ece",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026",
    priority: "featured"
  },
  {
    title: "India calls for stronger global tech collaboration at BRICS meet",
    author: "The Hindu Bureau",
    description: "Ministers emphasize ethical AI standards, semiconductor supply security, and interoperable digital public infrastructure.",
    url: "https://www.thehindu.com/news/national/india-calls-for-stronger-global-tech-collaboration-at-brics-meet/article71373671.ece",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "New studies pursue the ‘perfect’ blend for coffee and health",
    author: "The Hindu Bureau",
    description: "Nutritional biochemists analyze chlorogenic acids, roast profiles, and optimal daily espresso intake for longevity.",
    url: "https://www.thehindu.com/sci-tech/science/new-studies-pursue-the-perfect-blend-for-coffee-and-health/article71360605.ece",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Meena Kandasamy on decoding the Indian incel",
    author: "The Hindu Bureau",
    description: "Acclaimed author analyses online subcultures, misogyny in algorithm-driven forums, and feminist counter-narratives.",
    url: "https://www.thehindu.com/news/national/tamil-nadu/meena-kandasamy-on-decoding-the-indian-incel/article71375167.ece",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    date: "Aug 22, 2026"
  },
  {
    title: "Illustrator Athulya Pillai’s silent comic, ‘Nanavu’, tells the story of tidal flooding in Kochi",
    author: "The Hindu Bureau",
    description: "A wordless visual novel depicting climate change, rising sea levels, and resilient coastal lives in Chellanam.",
    url: "https://www.thehindu.com/books/illustrator-athulya-pillais-silent-comic-nanavu-tells-the-story-of-tidal-flooding-in-kochi/article71338303.ece",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    date: "Aug 20, 2026"
  },
  {
    title: "When healthcare comes too late | Review of Ramani Atkuri’s Staying Alive",
    author: "The Hindu Bureau",
    description: "A poignant memoir documenting rural medicine, health worker challenges, and community health networks in tribal central India.",
    url: "https://www.thehindu.com/books/books-reviews/review-of-ramani-atkuri-staying-alive/article71355631.ece",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    date: "Aug 20, 2026"
  },
  {
    title: "Trust your instincts: Career mentorship for young graduates",
    author: "The Hindu Bureau",
    description: "Industry leaders share frameworks for navigating career pivots, non-linear trajectories, and entrepreneurial risks.",
    url: "https://www.thehindu.com/education/trust-your-instincts/article71363886.ece",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    date: "Aug 20, 2026"
  },
  {
    title: "Swati Mujumdar appointed as Chancellor of Symbiosis Skills and Professional University",
    author: "The Hindu Bureau",
    description: "Pioneer in vocational education takes charge of Maharashtra's first skill development university.",
    url: "https://www.thehindu.com/education/swati-mujumdar-appointed-as-chancellor-of-symbiosis-skills-and-professional-university/article71369633.ece",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80",
    date: "Aug 21, 2026"
  },
  {
    title: "Aathi Kalathu Nei Mittai Kadai, more than 130 years old shop in Madurai serving traditional sweets",
    author: "The Hindu Bureau",
    description: "The timeless aroma of ghee halwa, nei sevu, and karupatti sweets crafted through four generations of confectionery mastery.",
    url: "https://www.thehindu.com/food/features/aathi-kalathu-nei-mittai-kadai-more-than-130-years-old-shop-in-madurai-serving-traditional-sweets-and-savouries-that-evoke-nostalgia/article71360058.ece",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    date: "Aug 20, 2026"
  },
  {
    title: "Monsoon cocktails: Nine bartender-approved recipes for the rains",
    author: "The Hindu Bureau",
    description: "From smoked cinnamon bourbon to spiced tamarind gin sours, mixologists share rainy season cocktail concoctions.",
    url: "https://www.thehindu.com/food/features/monsoon-cocktails-nine-bartender-approved-recipes-for-the-rains/article71192688.ece",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    date: "Aug 18, 2026"
  },
  {
    title: "These twin restaurants in Kolkata, TUA and Synthe, share an address, but nothing more",
    author: "The Hindu Bureau",
    description: "A tale of culinary dualism: elevated Progressive Mediterranean on one floor and vibrant Asian Izakaya on the other.",
    url: "https://www.thehindu.com/food/dining/these-twin-restaurants-in-kolkata-tua-and-synthe-share-an-address-but-nothing-more/article71308595.ece",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    date: "Aug 19, 2026"
  }
];

export const INITIAL_ARTICLES = RAW_ARTICLES.map((article, idx) => {
  const category = detectCategory(article.title, article.url, article.description);
  const readTime = estimateReadTime(`${article.title} ${article.description}`);
  const author = (!article.author || article.author === 'N/A') ? 'The Hindu Bureau' : article.author;
  const description = (!article.description || article.description === 'N/A')
    ? `Comprehensive report from The Hindu on ${article.title.toLowerCase()}. Read the full story on the official portal.`
    : article.description;

  return {
    id: `art-${idx + 1}`,
    title: article.title,
    author,
    description,
    url: article.url,
    category,
    image: article.image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
    date: article.date || 'Aug 22, 2026',
    readTime,
    priority: article.priority || 'standard',
    status: 'saved', // 'saved', 'reading', 'completed'
    bookmarked: false,
    likes: Math.floor(Math.random() * 40) + 5,
    views: Math.floor(Math.random() * 800) + 120,
    tags: [category, 'The Hindu', 'India News']
  };
});
