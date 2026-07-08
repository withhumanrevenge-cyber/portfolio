export const CAMERA_START = 6;
export const VIEW_DISTANCE = 9;

const SPARK_Z = -34;
const FORGE_Z = -66;
const WORK_INTRO_Z = -98;
const PROJECT_START_Z = -124;
const PROJECT_STEP = -24;

export interface Chapter {
  id: string;
  label: string;
  title: string;
  fraction: number;
}

export interface Journey {
  heroZ: number;
  sparkZ: number;
  forgeZ: number;
  workIntroZ: number;
  projectZ: (index: number) => number;
  projectX: (index: number) => number;
  philosophyZ: number;
  beaconZ: number;
  cameraEnd: number;
  travel: number;
  pages: number;
  chapters: Chapter[];
}

export function buildJourney(projectCount: number): Journey {
  const lastProjectZ = PROJECT_START_Z + (projectCount - 1) * PROJECT_STEP;
  const philosophyZ = lastProjectZ - 30;
  const beaconZ = philosophyZ - 30;
  const cameraEnd = beaconZ + VIEW_DISTANCE;
  const travel = CAMERA_START - cameraEnd;
  const pages = Math.min(16, Math.max(8, Math.round(travel / 26)));

  const fractionFor = (panelZ: number) =>
    Math.min(1, Math.max(0, (CAMERA_START - (panelZ + VIEW_DISTANCE)) / travel));

  const chapters: Chapter[] = [
    { id: "arrival", label: "Arrival", title: "Welcome to my universe", fraction: 0 },
    { id: "spark", label: "The Spark", title: "Chapter 01 — The Spark", fraction: fractionFor(SPARK_Z) },
    { id: "forge", label: "The Forge", title: "Chapter 02 — The Forge", fraction: fractionFor(FORGE_Z) },
    { id: "work", label: "The Work", title: "Chapter 03 — The Constellation", fraction: fractionFor(WORK_INTRO_Z) },
    { id: "philosophy", label: "Philosophy", title: "Chapter 04 — The Philosophy", fraction: fractionFor(philosophyZ) },
    { id: "beacon", label: "The Beacon", title: "Final Chapter — The Beacon", fraction: fractionFor(beaconZ) },
  ];

  return {
    heroZ: -4,
    sparkZ: SPARK_Z,
    forgeZ: FORGE_Z,
    workIntroZ: WORK_INTRO_Z,
    projectZ: (i) => PROJECT_START_Z + i * PROJECT_STEP,
    projectX: (i) => (i % 2 === 0 ? -3.6 : 3.6),
    philosophyZ,
    beaconZ,
    cameraEnd,
    travel,
    pages,
    chapters,
  };
}

export function chapterAt(journey: Journey, progress: number): number {
  let current = 0;
  for (let i = 0; i < journey.chapters.length; i++) {
    if (progress >= journey.chapters[i].fraction - 0.02) current = i;
  }
  return current;
}
