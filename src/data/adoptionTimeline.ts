import type { Region } from "./grainTechEntities";

export interface AdoptionEvent {
  id: string;
  year: number;
  month?: number;
  title: string;
  description: string;
  region: Region | "Global";
  category: "ProductLaunch" | "Regulation" | "Pilot" | "NationalProgram" | "Other";
  relatedCompanyIds?: string[];
  url?: string;
  citations?: string[];
}

export const adoptionEvents: AdoptionEvent[] = [
  {
    id: "2018-cgrain-scale",
    year: 2018,
    title: "Cgrain integrates deep learning",
    description: "Swedish company Cgrain introduces AI-powered imaging with patented mirror design capturing three views per kernel. Founded 2013, first product 2015, deep learning added 2018.",
    region: "Europe",
    category: "ProductLaunch",
    relatedCompanyIds: ["Cgrain", "FOSS"],
    url: "https://www.cgrain.ai/technology/",
    citations: [
      "https://www.cgrain.ai/about/",
      "https://www.impactloop.com/cgrain"
    ]
  },
  {
    id: "2020-mobile-grading",
    year: 2020,
    title: "Smartphone grading pilots emerge",
    description: "Early mobile pilots demonstrate fast, field-based grain assessment using smartphone cameras and AI.",
    region: "Global",
    category: "Pilot",
    relatedCompanyIds: ["GoMicro", "Inarix"],
    url: "https://www.gomicro.co/grain/"
  },
  {
    id: "2020-export-standards-update",
    year: 2020,
    title: "Export grading standards modernize",
    description: "USDA begins formal evaluations of AI-assisted inspection tools for grain grading.",
    region: "North America",
    category: "Regulation",
    relatedCompanyIds: ["Ground Truth Ag"],
    url: "https://www.ams.usda.gov/grades-standards/grain-standards"
  },
  {
    id: "2021-qualysense-qsorter",
    year: 2021,
    month: 6,
    title: "QSorter Horizon launches",
    description: "QualySense and Ferrum assemble first production-scale QSorter Horizon capable of analyzing 3,000 kernels/second. $2.5M funding secured for US expansion.",
    region: "Europe",
    category: "ProductLaunch",
    relatedCompanyIds: ["QualySense"],
    url: "https://www.qualysense.com/technology",
    citations: [
      "https://www.venturelab.swiss/QualySense-launches-production-scale-QSorter-Horizon",
      "https://www.startupticker.ch/en/news/qualysense-secures-funding-for-us-market-expansion"
    ]
  },
  {
    id: "2021-asia-inline-lines",
    year: 2021,
    title: "Inline inspection lines roll out in Asia",
    description: "Automated sampling and vision inspection gains uptake at bulk depots across China.",
    region: "China",
    category: "Pilot",
    relatedCompanyIds: ["Keyetech", "Shandong Hongsheng"]
  },
  {
    id: "2021-gs-combine",
    year: 2021,
    title: "GrainSense Flow Analyzer launches",
    description: "On-combine NIR sensor measures protein, moisture, oil, and carbohydrates from flowing grain with cloud-connected real-time monitoring.",
    region: "Europe",
    category: "ProductLaunch",
    relatedCompanyIds: ["GrainSense"],
    url: "https://www.grainsense.com/",
    citations: [
      "https://www.grainsense.com/products/combine-analyzer"
    ]
  },
  {
    id: "2022-videometer-seedlab",
    year: 2022,
    title: "Videometer SeedLab enters phenotyping labs",
    description: "Spectral imaging seed analysis system with pick-and-place robot sorting becomes available at CHAP Digital Phenotyping Lab and research facilities.",
    region: "Europe",
    category: "ProductLaunch",
    relatedCompanyIds: ["Videometer"],
    url: "https://videometer.com/videometer-seedlab/",
    citations: [
      "https://www.chap-solutions.co.uk/news/videometer-seedlab-now-available/"
    ]
  },
  {
    id: "2022-inarix-malt",
    year: 2022,
    title: "PocketLab enters malt supply chains",
    description: "Inarix mobile AI app expands into malt and procurement networks, analyzing barley for protein, test weight, moisture, and varietal purity under one minute.",
    region: "Europe",
    category: "ProductLaunch",
    relatedCompanyIds: ["Inarix"],
    url: "https://www.inarix.com/",
    citations: [
      "https://www.inarix.com/barley"
    ]
  },
  {
    id: "2022-aus-receival-demos",
    year: 2022,
    title: "Receival site demos begin in Australia",
    description: "Deimos develops Visual Analysis Device in collaboration with CBH Group for automated grain sampling.",
    region: "Australia",
    category: "Pilot",
    relatedCompanyIds: ["Deimos", "Acova"],
    url: "https://deimos.com.au/",
    citations: [
      "https://www.cbh.com.au/media-centre/news/2024/visual-analysis-device"
    ]
  },
  {
    id: "2022-zoomagri-latam",
    year: 2022,
    title: "ZoomAgri expands in Latin America",
    description: "Argentine startup's AI scanners recognize varieties from 250M+ image database. VaaS model active in Brazil, Argentina, Spain, and Australia.",
    region: "Latin America",
    category: "ProductLaunch",
    relatedCompanyIds: ["ZoomAgri"],
    url: "https://zoomagri.com/en/home/",
    citations: [
      "https://www.endeavor.org.ar/zoomagri-abinbev-demoday-2021/"
    ]
  },
  {
    id: "2023-agsure-wholesale",
    year: 2023,
    month: 12,
    title: "Agsure launches at FoodIndia Expo",
    description: "Indian agritech announces portable AI grain analyzer at Karnal expo. Device analyzes rice, paddy, legumes, corn, soybeans with AI/ML imaging.",
    region: "India",
    category: "ProductLaunch",
    relatedCompanyIds: ["Agsure"],
    url: "https://agsure.in/",
    citations: [
      "https://agsure.in/about-us/"
    ]
  },
  {
    id: "2023-nebulaa-matt",
    year: 2023,
    title: "Nebulaa MATT analyzer launches",
    description: "Indian startup introduces sub-minute grain analyzer using deep learning for cereals and pulses. 99.9% segmentation accuracy, multi-language reports.",
    region: "India",
    category: "ProductLaunch",
    relatedCompanyIds: ["Nebulaa"],
    url: "https://nebulaa.in/",
    citations: [
      "https://yourstory.com/companies/nebulaa"
    ]
  },
  {
    id: "2023-supergeo-app",
    year: 2023,
    title: "SuperGeo AI Prairie pilots",
    description: "Saskatchewan startup launches Grain Grading mobile app for wheat, canola, peas, and lentils. Supported by CAAIN, Co.Labs, and Innovation Saskatchewan.",
    region: "North America",
    category: "Pilot",
    relatedCompanyIds: ["SuperGeo"],
    url: "https://sga.ai/",
    citations: [
      "https://globalnews.ca/news/supergeo-ai-grain-grading-app/"
    ]
  },
  {
    id: "2024-cropify-launch",
    year: 2024,
    month: 9,
    title: "Cropify secures A$2M for pulse grading",
    description: "Australian agtech raises seed funding led by Mandalay Venture Partners. 90-second lentil analysis with 98%+ accuracy. Commercial trials planned May 2025.",
    region: "Australia",
    category: "ProductLaunch",
    relatedCompanyIds: ["Cropify"],
    url: "https://www.cropify.io/",
    citations: [
      "https://www.adelaide.edu.au/news/2024/cropify-seed-funding",
      "https://www.graincentral.com/news/cropify-trials-2025/"
    ]
  },
  {
    id: "2024-ground-truth-labs",
    year: 2024,
    title: "Ground Truth Ag trials Vision+NIR",
    description: "Regina startup deploys benchtop MV/NIRS units at elevators. 50 grading factors for CWRS wheat in 2 minutes vs 10 for manual. On-combine version in development.",
    region: "North America",
    category: "Pilot",
    relatedCompanyIds: ["Ground Truth Ag"],
    url: "https://groundtruth.ag/",
    citations: [
      "https://www.investsk.ca/ground-truth-agriculture/",
      "https://www.realagriculture.com/ground-truth-ag-grain-grading/"
    ]
  },
  {
    id: "2024-vibe-qm3i",
    year: 2024,
    title: "QM3i expands globally",
    description: "Vibe Imaging Analytics per-kernel inspection system deployed with exporters and labs. 12MP camera analyzes 40g samples in 30 seconds with L*a*b* color characterization.",
    region: "Middle East",
    category: "ProductLaunch",
    relatedCompanyIds: ["Vibe Imaging Analytics"],
    url: "https://www.vibeia.com/",
    citations: [
      "https://www.vibeia.com/qm3i"
    ]
  },
  {
    id: "2024-standards-digital",
    year: 2024,
    title: "CGC publishes AI grading framework",
    description: "Canadian Grain Commission's 2024-25 Departmental Plan includes IP policy for responsible use of AI-based scientific instruments. Grading Guide reformatted.",
    region: "North America",
    category: "Regulation",
    url: "https://www.grainscanada.gc.ca/en/grain-quality/official-grain-grading-guide/",
    citations: [
      "https://www.grainscanada.gc.ca/en/about-us/departmental-plan/"
    ]
  },
  {
    id: "2024-deimos-cbh-trials",
    year: 2024,
    title: "CBH Group harvest trials expand",
    description: "Deimos Visual Analysis Device trials for wheat, barley, and oats across CBH receival sites in Western Australia 2023-24 and 2024-25 harvest seasons.",
    region: "Australia",
    category: "Pilot",
    relatedCompanyIds: ["Deimos", "Acova"],
    url: "https://www.cbh.com.au/media-centre/news/2024/visual-analysis-device",
    citations: [
      "https://deimos.com.au/technology/"
    ]
  },
  {
    id: "2025-aus-endorsement",
    year: 2025,
    title: "Barley variety tech endorsement",
    description: "Industry endorsement for digital methods in barley variety assessment in Australia.",
    region: "Australia",
    category: "Regulation"
  },
  {
    id: "2025-receival-automation",
    year: 2025,
    title: "CBH/Acova broader rollout",
    description: "Deimos-CBH joint venture Acova plans broader rollout to CBH receival network for 2025/26 harvest season after successful trials.",
    region: "Australia",
    category: "NationalProgram",
    relatedCompanyIds: ["Deimos", "Acova"],
    url: "https://deimos.com.au/",
    citations: [
      "https://www.cbh.com.au/media-centre/news/2024/visual-analysis-device"
    ]
  },
  {
    id: "2025-eu-dpp",
    year: 2025,
    title: "EU Digital Product Passport groundwork",
    description: "ESPR framework advances with first working plan by April 2025. EU-wide registry expected July 2026. Food/feed excluded but packaging may apply indirectly.",
    region: "Europe",
    category: "Regulation",
    url: "https://commission.europa.eu/energy-climate-change-environment/standards-tools-and-labels/products-labelling-rules-and-requirements/ecodesign-sustainable-products-regulation_en",
    citations: [
      "https://www.circularise.com/digital-product-passport"
    ]
  },
  {
    id: "2026-asia-export",
    year: 2026,
    title: "AI inspection for export lanes",
    description: "Export inspection in Asia pilots AI grading in high-volume corridors across China.",
    region: "China",
    category: "Pilot",
    relatedCompanyIds: ["Keyetech", "Shandong Hongsheng"]
  },
];
