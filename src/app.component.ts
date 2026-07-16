import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { PerformanceTableComponent } from './components/performance-table/performance-table.component';
import { AlgorithmExplanationComponent } from './components/algorithm-explanation/algorithm-explanation.component';
import { SortingService } from './services/sorting.service';
import { Student, FullPerformanceStats, AlgorithmKey } from './models/student.model';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    StudentFormComponent,
    StudentTableComponent,
    PerformanceTableComponent,
    AlgorithmExplanationComponent
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private sortingService = inject(SortingService);

  // --- State Signals ---
  students = signal<Student[]>([]);
  rankedStudents = signal<Student[]>([]);
  performanceStats = signal<FullPerformanceStats | null>(null);
  selectedAlgorithm = signal<AlgorithmKey>('bubbleSort');
  isSorting = signal(false);

  availableAlgorithms = this.sortingService.getAvailableAlgorithms();

  // --- Event Handlers ---

  handleAddStudent(studentData: Omit<Student, 'totalMarks' | 'percentage' | 'grade'>) {
    const totalMarks = studentData.marks.daa + studentData.marks.mit + studentData.marks.ohs;
    const percentage = (totalMarks / 300) * 100;
    const grade = this.calculateGrade(percentage);

    const newStudent: Student = {
      ...studentData,
      totalMarks,
      percentage,
      grade,
    };
    
    this.students.update(current => [...current, newStudent]);
    this.clearResults(); // Adding a student invalidates current ranking
  }

  handleDeleteStudent(rollNumber: string) {
    this.students.update(students => students.filter(s => s.rollNumber !== rollNumber));
    this.rankedStudents.update(students => students.filter(s => s.rollNumber !== rollNumber));
     if(this.students().length === 0) {
        this.clearResults();
     }
  }

  // --- Core Logic ---

  async sort() {
    if (this.isSorting() || this.students().length === 0) return;

    this.isSorting.set(true);
    this.rankedStudents.set([]);
    this.performanceStats.set(null);

    // Use a short delay to allow the UI to update to the loading state
    await new Promise(resolve => setTimeout(resolve, 50));

    const studentsCopy = structuredClone(this.students());
    const algorithm = this.selectedAlgorithm();

    const startTime = performance.now();
    const result = this.sortingService[algorithm](studentsCopy);
    const endTime = performance.now();

    const executionTime = endTime - startTime;

    const finalRankedStudents = result.sortedArray.map((student, index) => ({
      ...student,
      rank: index + 1,
    }));

    this.rankedStudents.set(finalRankedStudents);
    this.performanceStats.set({
      algorithm,
      executionTime,
      comparisons: result.comparisons,
      swaps: result.swaps,
      ...this.sortingService.getComplexity(algorithm),
    });

    this.isSorting.set(false);
  }

  resetData() {
    this.students.set([]);
    this.clearResults();
  }

  clearResults() {
    this.rankedStudents.set([]);
    this.performanceStats.set(null);
  }
  
  // --- Utility Methods ---

  private calculateGrade(percentage: number): string {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  }
}
