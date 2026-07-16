import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmKey } from '../../models/student.model';

interface Explanation {
  title: string;
  description: string;
  useCase: string;
}

@Component({
  selector: 'app-algorithm-explanation',
  imports: [CommonModule],
  templateUrl: './algorithm-explanation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlgorithmExplanationComponent {
  algorithmKey = input.required<AlgorithmKey>();

  private explanations: Record<AlgorithmKey, Explanation> = {
    bubbleSort: {
      title: 'Bubble Sort',
      description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
      useCase: 'Best for educational purposes and for sorting very small, nearly sorted datasets due to its simplicity.'
    },
    selectionSort: {
      title: 'Selection Sort',
      description: 'This algorithm divides the input list into two parts: a sorted sublist of items which is built up from left to right and a sublist of the remaining unsorted items. It proceeds by finding the smallest (or largest) element from the unsorted sublist and swapping it with the leftmost unsorted element.',
      useCase: 'Useful where swap operations are costly, as it makes the minimum possible number of swaps (O(n)).'
    },
    insertionSort: {
      title: 'Insertion Sort',
      description: 'Insertion sort builds the final sorted array one item at a time. It iterates through an input array and removes one element per iteration, finds the place the element belongs in the array, and then places it there.',
      useCase: 'Efficient for small datasets and for datasets that are already substantially sorted. It is also adaptive and stable.'
    },
    mergeSort: {
      title: 'Merge Sort',
      description: 'Merge Sort is a divide-and-conquer algorithm. It divides the array into two halves, recursively sorts them, and then merges the two sorted halves to produce the final sorted array.',
      useCase: 'Excellent for its guaranteed O(n log n) performance. It is widely used in practice, especially for sorting linked lists or when stability is important.'
    },
    quickSort: {
      title: 'Quick Sort',
      description: 'Quick Sort is another divide-and-conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot. Elements smaller than the pivot go to the left, and elements greater go to the right.',
      useCase: 'Extremely fast on average. It is often faster in practice than other O(n log n) algorithms like Merge Sort, especially for arrays in memory.'
    },
    randomizedQuickSort: {
      title: 'Randomized Quick Sort',
      description: 'This is a variation of Quick Sort where the pivot is chosen randomly from the array. This randomization helps to avoid the worst-case scenario (O(n²)) which can occur if the pivot is consistently chosen poorly (e.g., always the smallest or largest element).',
      useCase: 'Provides a high probability of achieving O(n log n) performance, making it a more robust choice than standard Quick Sort for arbitrary datasets.'
    },
  };

  explanation = computed(() => this.explanations[this.algorithmKey()]);
}
