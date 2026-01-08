export type Region =
  | "North America"
  | "Europe"
  | "Australia"
  | "India"
  | "China"
  | "Latin America"
  | "Middle East"
  | "Global";

export type FormFactor =
  | "Smartphone"
  | "Benchtop"
  | "IndustrialSorter"
  | "OnCombine"
  | "LabSystem"
  | "HandheldSensor"
  | "Other";

export type SensingTech =
  | "RGB"
  | "NIR"
  | "HSI"
  | "SpectralImaging"
  | "Terahertz"
  | "XRay"
  | "DroneImaging";

export type UseCase =
  | "OnFarmPreGrading"
  | "ElevatorGrading"
  | "RegulatoryExport"
  | "WholesaleGrainTrading"
  | "BreedingSeedLab"
  | "FoodSafetyMycotoxins"
  | "Traceability";

export type UserSegment =
  | "Farmer"
  | "Elevator"
  | "Regulator"
  | "Processor"
  | "Breeder"
  | "Trader/Exporter";

export type MaturityLevel = "Pilot" | "Commercial" | "NationalProgram" | "Experimental";

export interface GrainSolution {
  id: string;
  company: string;
  productName: string;
  regions: Region[];
  formFactors: FormFactor[];
  sensingTech: SensingTech[];
  useCases: UseCase[];
  userSegments: UserSegment[];
  throughputSamplesPerHour?: number;
  avgTestDurationSeconds?: number;
  accuracyPercent?: number;
  sampleSizeGrams?: number;
  maturityLevel?: MaturityLevel;
  status?: "pilot" | "commercial" | "discontinued" | "prototype";
  linkStatus?: "offline" | "active";
  launchYear?: number;
  notes?: string;
  url?: string;
  videoUrl?: string;
  primaryLat?: number;
  primaryLng?: number;
  citations?: string[];
  /** Current CEO or primary leadership contact */
  ceo?: string;
  /** Company founders */
  founders?: string[];
}

export const grainSolutions: GrainSolution[] = [
  {
    id: "cgrain-value",
    company: "Cgrain",
    productName: "Cgrain Value / Value Pro",
    regions: ["Europe", "Global"],
    formFactors: ["Benchtop", "LabSystem"],
    sensingTech: ["RGB", "SpectralImaging"],
    useCases: ["RegulatoryExport", "BreedingSeedLab", "ElevatorGrading"],
    userSegments: ["Regulator", "Breeder", "Elevator", "Trader/Exporter"],
    throughputSamplesPerHour: 60,
    avgTestDurationSeconds: 90,
    accuracyPercent: 95,
    sampleSizeGrams: 250,
    maturityLevel: "Commercial",
    status: "commercial",
    notes: "Approximate throughput and accuracy based on typical benchtop workflows.",
    videoUrl: "https://www.youtube.com/watch?v=RecXYeI7T9k",
    primaryLat: 59.3293,
    primaryLng: 18.0686,
    ceo: "Moa Källgren",
    founders: ["Jaan Luup"],
  },
  {
    id: "foss-eyefoss",
    company: "FOSS",
    productName: "EyeFoss",
    regions: ["Europe", "Global"],
    formFactors: ["Benchtop", "LabSystem"],
    sensingTech: ["RGB", "NIR"],
    useCases: ["RegulatoryExport", "ElevatorGrading", "FoodSafetyMycotoxins"],
    userSegments: ["Regulator", "Elevator", "Processor", "Trader/Exporter"],
    throughputSamplesPerHour: 80,
    avgTestDurationSeconds: 60,
    accuracyPercent: 96,
    sampleSizeGrams: 300,
    maturityLevel: "Commercial",
    notes: "Metrics are estimated from comparable lab systems.",
    url: "https://www.agtecher.com/foss-eye-foss-digital-grain-quality-analysis/",
    primaryLat: 55.6761,
    primaryLng: 12.5683,
    ceo: "Kim Vejlby Hansen",
    founders: ["Nils Foss"],
  },
  {
    id: "videometer-seedlab",
    company: "Videometer",
    productName: "SeedLab / SeedSorter",
    regions: ["Europe", "Global"],
    formFactors: ["LabSystem", "Benchtop"],
    sensingTech: ["HSI", "SpectralImaging"],
    useCases: ["BreedingSeedLab", "RegulatoryExport", "FoodSafetyMycotoxins"],
    userSegments: ["Breeder", "Regulator", "Processor"],
    throughputSamplesPerHour: 40,
    avgTestDurationSeconds: 120,
    accuracyPercent: 97,
    sampleSizeGrams: 200,
    maturityLevel: "Commercial",
    notes: "Seed lab throughput is approximate and depends on sorting configuration.",
    videoUrl: "https://www.youtube.com/@Videometer/videos",
    url: "https://videometer.com/products/seedlab",
    primaryLat: 55.6761,
    primaryLng: 12.5683,
    ceo: "Jens Michael Carstensen",
    founders: ["Jens Michael Carstensen"],
  },
  {
    id: "zeutec-grain-vision",
    company: "Zeutec",
    productName: "SpectraAlyzer Grain Vision AI",
    regions: ["Europe", "Global"],
    formFactors: ["Benchtop", "LabSystem"],
    sensingTech: ["NIR", "RGB"],
    useCases: ["RegulatoryExport", "ElevatorGrading", "FoodSafetyMycotoxins"],
    userSegments: ["Regulator", "Elevator", "Processor"],
    throughputSamplesPerHour: 70,
    avgTestDurationSeconds: 75,
    accuracyPercent: 95,
    sampleSizeGrams: 250,
    maturityLevel: "Commercial",
    notes: "Approximate workflow values; confirm against device configuration.",
    url: "https://spectraalyzer.com/grain-vision-ai/",
    primaryLat: 52.52,
    primaryLng: 13.405,
    ceo: "Eila Flores",
    founders: ["Eila Flores"],
  },
  {
    id: "nebulaa-matt",
    company: "Nebulaa",
    productName: "MATT Automatic Grain Analyser",
    regions: ["India"],
    formFactors: ["Benchtop"],
    sensingTech: ["RGB"],
    useCases: ["WholesaleGrainTrading", "OnFarmPreGrading"],
    userSegments: ["Farmer", "Trader/Exporter", "Regulator"],
    throughputSamplesPerHour: 60,
    avgTestDurationSeconds: 60,
    accuracyPercent: 93,
    sampleSizeGrams: 150,
    maturityLevel: "Commercial",
    notes: "Assumes ~1 minute runs per public demos.",
    videoUrl: "https://www.youtube.com/watch?v=UU4PXeahFhc",
    url: "https://neo.nebulaa.in",
    primaryLat: 28.6139,
    primaryLng: 77.209,
    founders: ["Yogesh Gupta", "Mohit Dadhich", "Tanmay Sethi"],
  },
  {
    id: "supergeo-grain-app",
    company: "SuperGeo",
    productName: "AI Grain Grading App",
    regions: ["North America"],
    formFactors: ["Smartphone"],
    sensingTech: ["RGB"],
    useCases: ["OnFarmPreGrading", "WholesaleGrainTrading"],
    userSegments: ["Farmer", "Trader/Exporter"],
    throughputSamplesPerHour: 120,
    avgTestDurationSeconds: 30,
    accuracyPercent: 90,
    sampleSizeGrams: 20,
    maturityLevel: "Commercial",
    notes: "Smartphone app estimates; accuracy varies by crop.",
    videoUrl: "https://sga.ai/products/videos/",
    url: "https://sga.ai/products/grain/",
    primaryLat: 52.1332,
    primaryLng: -106.6700,
    ceo: "Weiping Zeng",
    founders: ["Weiping Zeng"],
  },
  {
    id: "agsure-gqa",
    company: "AgSure",
    productName: "Grain Quality Analyzer",
    regions: ["India"],
    formFactors: ["Smartphone", "Other"],
    sensingTech: ["RGB"],
    useCases: ["WholesaleGrainTrading", "OnFarmPreGrading"],
    userSegments: ["Farmer", "Trader/Exporter", "Regulator"],
    throughputSamplesPerHour: 120,
    avgTestDurationSeconds: 45,
    accuracyPercent: 88,
    sampleSizeGrams: 30,
    maturityLevel: "Commercial",
    status: "commercial",
    notes: "Assumes smartphone + scanner accessory workflow.",
    videoUrl: "https://www.youtube.com/watch?v=8u44mBWCbz0",
    url: "https://www.agsure.in",
    primaryLat: 12.9716,
    primaryLng: 77.5946,
    founders: ["Abhinav Poddatur", "Nikitha Shravan Poddatur"],
  },
  {
    id: "hongsheng-inspection",
    company: "Shandong Hongsheng",
    productName: "Automated Grain Quality Inspection Platform",
    regions: ["China"],
    formFactors: ["IndustrialSorter", "Benchtop"],
    sensingTech: ["RGB", "NIR"],
    useCases: ["ElevatorGrading", "RegulatoryExport", "FoodSafetyMycotoxins"],
    userSegments: ["Processor", "Regulator", "Elevator"],
    throughputSamplesPerHour: 8000,
    avgTestDurationSeconds: 8,
    accuracyPercent: 93,
    sampleSizeGrams: 1000,
    maturityLevel: "Commercial",
    status: "commercial",
    notes: "Link removed — site offline. Re-add when URL works. CEO information not publicly available.",
    linkStatus: "offline",
    url: undefined,
    primaryLat: 36.6512,
    primaryLng: 117.1201,
  },
  {
    id: "indyn-platypus",
    company: "Platypus Vision",
    productName: "Indyn (Discontinued)",
    regions: ["Australia"],
    formFactors: ["Benchtop"],
    sensingTech: ["RGB"],
    useCases: ["ElevatorGrading", "BreedingSeedLab"],
    userSegments: ["Elevator", "Breeder"],
    throughputSamplesPerHour: 15,
    avgTestDurationSeconds: 240,
    accuracyPercent: 93,
    sampleSizeGrams: 1000,
    maturityLevel: "Commercial",
    status: "discontinued",
    notes: "Timing based on public reports of ~1L in ~4 minutes.",
    url: "https://www.platypusvision.com",
    primaryLat: -27.4698,
    primaryLng: 153.0251,
    ceo: "Rob Martin",
    founders: ["Rob Martin", "Mike Nolan"],
  },
  {
    id: "grain-discovery-smartphone",
    company: "Grain Discovery",
    productName: "Smartphone Grain Quality Tool",
    regions: ["North America"],
    formFactors: ["Smartphone"],
    sensingTech: ["RGB"],
    useCases: ["WholesaleGrainTrading", "Traceability", "OnFarmPreGrading"],
    userSegments: ["Trader/Exporter", "Farmer"],
    throughputSamplesPerHour: 120,
    avgTestDurationSeconds: 30,
    accuracyPercent: 89,
    sampleSizeGrams: 25,
    maturityLevel: "Pilot",
    notes: "Prototype app in partnership programs; performance is estimated. Acquired by DTN in July 2025.",
    url: "https://www.proteinindustriescanada.ca/news/ai-powered-grain-quality-tool",
    primaryLat: 53.5461,
    primaryLng: -113.4938,
    ceo: "Rory O'Sullivan",
    founders: ["Rory O'Sullivan", "Ruairi Hanafin", "Peter Vincent"],
  },
  {
    id: "upjao-grain-quality",
    company: "Upjao",
    productName: "Upjao Grain Quality AI",
    regions: ["India"],
    formFactors: ["Smartphone"],
    sensingTech: ["RGB"],
    useCases: ["OnFarmPreGrading", "WholesaleGrainTrading"],
    userSegments: ["Farmer", "Trader/Exporter"],
    throughputSamplesPerHour: 120,
    avgTestDurationSeconds: 30,
    accuracyPercent: 88,
    sampleSizeGrams: 20,
    maturityLevel: "Pilot",
    notes: "Assumed mobile workflow metrics; verify against product specs.",
    primaryLat: 28.6139,
    primaryLng: 77.209,
    founders: ["Shreyas Pravinchandra Mehta", "Shridhar Pravinchandra Mehta", "Ritu Mishra"],
  },
  {
    id: "grainscope-ai",
    company: "Grainkart Private Limited",
    productName: "GrainScope AI",
    regions: ["India"],
    formFactors: ["Smartphone", "Other"],
    sensingTech: ["RGB"],
    useCases: ["WholesaleGrainTrading", "OnFarmPreGrading"],
    userSegments: ["Farmer", "Trader/Exporter"],
    throughputSamplesPerHour: 100,
    avgTestDurationSeconds: 45,
    accuracyPercent: 89,
    sampleSizeGrams: 30,
    maturityLevel: "Pilot",
    notes: "Assumed metrics for mobile + accessory workflow; verify against product specs.",
    videoUrl: "https://www.youtube.com/watch?v=TRkYnCmfCMw",
    primaryLat: 12.9716,
    primaryLng: 77.5946,
    ceo: "Amit Kumar Gupta",
    founders: ["Sanskar Tayal", "Vijay Kumar Agrawal"],
  },
  {
    id: "easyodm-grain-analysis",
    company: "EasyODM",
    productName: "Grain Sample Analysis System",
    regions: ["Europe"],
    formFactors: ["Other"],
    sensingTech: ["RGB"],
    useCases: ["ElevatorGrading", "RegulatoryExport"],
    userSegments: ["Elevator", "Regulator"],
    throughputSamplesPerHour: 80,
    avgTestDurationSeconds: 60,
    accuracyPercent: 91,
    sampleSizeGrams: 300,
    maturityLevel: "Commercial",
    notes: "Software platform for camera-based grain sample analysis; metrics estimated from comparable software solutions.",
    url: "https://easyodm.tech/grain-sample-analysis/",
    primaryLat: 54.9,
    primaryLng: 23.6,
    ceo: "Rytis Augustauskas",
    founders: ["Rytis Augustauskas", "Lukas Vaznelis", "Dainius Gaidamavicius"],
  },
];
