
import { QuizQuestion } from './types';

export const ATOM_COLORS = {
  H: 0xffffff,
  O: 0xff4757,
  N: 0xbca8ff,
  C: 0x2d2d2d,
  Na: 0xffb300,
  K: 0xff7043,
  Mg: 0x4db6ac,
  Ca: 0x81c784,
  Cl: 0x4fc3f7,
  F: 0xab47bc,
  S: 0xffd54f,
  BOND: 0x888888
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "1. Senyawa ionik memiliki titik leleh yang tinggi karena...",
    options: [
      "Memiliki lautan elektron bebas",
      "Gaya tarik elektrostatik antar ion sangat kuat",
      "Elektron dibagi bersama antar atom",
      "Memiliki gaya London yang kuat"
    ],
    correct: 1
  },
  {
    question: "2. Manakah sifat berikut yang TIDAK dimiliki oleh senyawa kovalen?",
    options: [
      "Titik leleh rendah",
      "Tidak menghantarkan listrik",
      "Menghantarkan listrik dalam keadaan padat",
      "Lunak dan mudah menguap"
    ],
    correct: 2
  },
  {
    question: "3. Logam dapat menghantarkan listrik karena...",
    options: [
      "Memiliki elektron bebas yang dapat bergerak",
      "Terdapat transfer elektron antar atom",
      "Ikatan antar molekul sangat lemah",
      "Memiliki struktur kristal ionik"
    ],
    correct: 0
  },
  {
    question: "4. Garam dapur (NaCl) dapat menghantarkan listrik ketika...",
    options: [
      "Dalam bentuk padat",
      "Dipanaskan tetapi masih padat",
      "Dilarutkan dalam air atau dalam keadaan cair",
      "Dalam kondisi apapun tidak dapat menghantarkan listrik"
    ],
    correct: 2
  },
  {
    question: "5. Senyawa dengan gaya antarmolekul lemah umumnya memiliki sifat...",
    options: [
      "Titik didih tinggi dan keras",
      "Titik leleh rendah dan mudah menguap",
      "Konduktor listrik yang baik",
      "Struktur kristal yang kuat"
    ],
    correct: 1
  },
  {
    question: "6. Air (H₂O) memiliki titik didih yang relatif tinggi dibanding molekul sejenis karena...",
    options: [
      "Memiliki ikatan ionik",
      "Membentuk ikatan hidrogen antar molekul",
      "Memiliki lautan elektron",
      "Bersifat nonpolar"
    ],
    correct: 1
  },
  {
    question: "7. Tembaga (Cu) sering digunakan sebagai kabel listrik karena...",
    options: [
      "Memiliki ikatan ionik yang kuat",
      "Tidak menghantarkan panas",
      "Konduktor listrik yang sangat baik dan ulet",
      "Mudah larut dalam air"
    ],
    correct: 2
  },
  {
    question: "8. Manakah pasangan senyawa dan jenis ikatan yang BENAR?",
    options: [
      "CO₂ - Ionik",
      "MgO - Ionik",
      "Fe - Kovalen",
      "CH₄ - Logam"
    ],
    correct: 1
  },
  {
    question: "9. Senyawa ionik bersifat rapuh (getas) karena...",
    options: [
      "Ion-ion sejenis saling tolak menolak saat diberi tekanan",
      "Elektron tidak dapat bergerak bebas",
      "Gaya antarmolekul sangat lemah",
      "Memiliki titik leleh yang rendah"
    ],
    correct: 0
  },
  {
    question: "10. Metana (CH₄) berwujud gas pada suhu ruang karena...",
    options: [
      "Memiliki ikatan ionik yang lemah",
      "Gaya antarmolekul (gaya London) sangat lemah",
      "Dapat menghantarkan listrik",
      "Memiliki lautan elektron"
    ],
    correct: 1
  }
];
