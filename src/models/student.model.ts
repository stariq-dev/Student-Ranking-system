export interface Student {
  name: string;
  rollNumber: string;
  marks: {
    daa: number;
    mit: number;
    ohs: number;
  };
  totalMarks: number;
  percentage: number;
  grade: string;
  rank?: number;
}

export interface SortPerformance {
  algorithm: string;
  executionTime: number;
  comparisons: number;
  swaps: number;
}

export interface AlgorithmComplexity {
  best: string;
  average: string;
  worst: string;
  space: string;
  name: string;
}

export interface FullPerformanceStats extends SortPerformance, AlgorithmComplexity {}

export type AlgorithmKey = 'bubbleSort' | 'selectionSort' | 'insertionSort' | 'mergeSort' | 'quickSort' | 'randomizedQuickSort';
