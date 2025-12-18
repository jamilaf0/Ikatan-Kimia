
export enum ModuleId {
  HOME = 0,
  THEORY = 1,
  IONIC = 2,
  COVALENT = 3,
  METALLIC = 4,
  PROPERTIES = 5,
  QUIZ = 6
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface MoleculePart {
  type: 'C' | 'O' | 'H' | 'N' | 'Na' | 'Cl' | 'K' | 'Mg' | 'Ca' | 'F' | 'S';
  pos: [number, number, number];
}

export interface BondData {
  start: number;
  end: number;
  type: 'single' | 'double' | 'triple';
}
