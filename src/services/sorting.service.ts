import { Injectable } from '@angular/core';
import { Student, AlgorithmComplexity, AlgorithmKey } from '../models/student.model';

interface SortResult {
  sortedArray: Student[];
  comparisons: number;
  swaps: number;
}

@Injectable({
  providedIn: 'root',
})
export class SortingService {

  private complexities: Record<AlgorithmKey, AlgorithmComplexity> = {
    bubbleSort: { name: 'Bubble Sort', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    selectionSort: { name: 'Selection Sort', best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    insertionSort: { name: 'Insertion Sort', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    mergeSort: { name: 'Merge Sort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    quickSort: { name: 'Quick Sort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
    randomizedQuickSort: { name: 'Randomized Quick Sort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
  };

  getComplexity(key: AlgorithmKey): AlgorithmComplexity {
    return this.complexities[key];
  }

  getAvailableAlgorithms(): { key: AlgorithmKey; name: string }[] {
    return Object.entries(this.complexities).map(([key, value]) => ({
      key: key as AlgorithmKey,
      name: value.name,
    }));
  }

  // --- Sorting Algorithms ---

  public bubbleSort(arr: Student[]): SortResult {
    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        if (arr[j].totalMarks < arr[j + 1].totalMarks) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
          swaps++;
        }
      }
    }
    return { sortedArray: arr, comparisons, swaps };
  }

  public selectionSort(arr: Student[]): SortResult {
    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let maxIdx = i;
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        if (arr[j].totalMarks > arr[maxIdx].totalMarks) {
          maxIdx = j;
        }
      }
      if (maxIdx !== i) {
        [arr[i], arr[maxIdx]] = [arr[maxIdx], arr[i]]; // Swap
        swaps++;
      }
    }
    return { sortedArray: arr, comparisons, swaps };
  }

  public insertionSort(arr: Student[]): SortResult {
    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      let current = arr[i];
      let j = i - 1;
      while (j >= 0) {
        comparisons++;
        if(arr[j].totalMarks < current.totalMarks) {
            arr[j + 1] = arr[j];
            swaps++;
            j--;
        } else {
            break;
        }
      }
      arr[j + 1] = current;
    }
    return { sortedArray: arr, comparisons, swaps };
  }

  public mergeSort(arr: Student[]): SortResult {
    const stats = { comparisons: 0, swaps: 0 };
    const sortedArray = this._mergeSortRecursive(arr, stats);
    // Merge sort doesn't 'swap' in the traditional sense, but merging involves data movement.
    // We'll count assignments in merge as a proxy for swaps.
    return { sortedArray, comparisons: stats.comparisons, swaps: stats.swaps };
  }

  private _mergeSortRecursive(arr: Student[], stats: { comparisons: number; swaps: number }): Student[] {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = this._mergeSortRecursive(arr.slice(0, mid), stats);
    const right = this._mergeSortRecursive(arr.slice(mid), stats);
    return this._merge(left, right, stats);
  }

  private _merge(left: Student[], right: Student[], stats: { comparisons: number; swaps: number }): Student[] {
    let resultArray: Student[] = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      stats.comparisons++;
      if (left[leftIndex].totalMarks > right[rightIndex].totalMarks) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
      stats.swaps++; // Counting data movement
    }
    const final = resultArray
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
    stats.swaps += (left.length - leftIndex) + (right.length - rightIndex); // Remaining elements
    return final;
  }

  public quickSort(arr: Student[]): SortResult {
    const stats = { comparisons: 0, swaps: 0 };
    this._quickSortRecursive(arr, 0, arr.length - 1, stats);
    return { sortedArray: arr, ...stats };
  }
  
  private _quickSortRecursive(arr: Student[], low: number, high: number, stats: { comparisons: number, swaps: number }) {
    if (low < high) {
        const pi = this._partition(arr, low, high, stats);
        this._quickSortRecursive(arr, low, pi - 1, stats);
        this._quickSortRecursive(arr, pi + 1, high, stats);
    }
  }

  private _partition(arr: Student[], low: number, high: number, stats: { comparisons: number, swaps: number }): number {
      const pivot = arr[high].totalMarks;
      let i = low - 1;
      for (let j = low; j < high; j++) {
          stats.comparisons++;
          if (arr[j].totalMarks > pivot) {
              i++;
              [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
              stats.swaps++;
          }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot
      stats.swaps++;
      return i + 1;
  }


  public randomizedQuickSort(arr: Student[]): SortResult {
    const stats = { comparisons: 0, swaps: 0 };
    this._randomizedQuickSortRecursive(arr, 0, arr.length - 1, stats);
    return { sortedArray: arr, ...stats };
  }

  private _randomizedQuickSortRecursive(arr: Student[], low: number, high: number, stats: { comparisons: number, swaps: number }) {
    if (low < high) {
        const pi = this._randomizedPartition(arr, low, high, stats);
        this._randomizedQuickSortRecursive(arr, low, pi - 1, stats);
        this._randomizedQuickSortRecursive(arr, pi + 1, high, stats);
    }
  }

  private _randomizedPartition(arr: Student[], low: number, high: number, stats: { comparisons: number, swaps: number }): number {
    const random = Math.floor(Math.random() * (high - low + 1)) + low;
    [arr[random], arr[high]] = [arr[high], arr[random]]; // Swap random pivot with high
    stats.swaps++;
    return this._partition(arr, low, high, stats);
  }
}
