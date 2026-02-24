import { create } from "zustand";
import type { Project } from "@/types";

// Nota: Si el warning persiste, podrías necesitar actualizar la versión de Zustand
// Esto es porque algunas versiones antiguas de Zustand utilizaban `import create from 'zustand'`
// mientras que las versiones modernas utilizan `import { create } from 'zustand'`

interface ProjectStore {
  currentProject: Project | null;
  projects: Project[];
  setCurrentProject: (project: Project | null) => void;
  setProjects: (projects: Project[]) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  currentProject: null,
  projects: [],
  setCurrentProject: (project) => set({ currentProject: project }),
  setProjects: (projects) => set({ projects }),
}));
