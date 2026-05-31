export type MathQuestion = {
  id: string;
  question: string;
  options: string[]; // exactly 3 options
  correctIndex: number; // 0..2
};