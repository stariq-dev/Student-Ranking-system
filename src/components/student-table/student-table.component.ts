import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-table',
  imports: [CommonModule],
  templateUrl: './student-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentTableComponent {
  students = input.required<Student[]>();
  deleteStudent = output<string>();

  onDelete(rollNumber: string): void {
    this.deleteStudent.emit(rollNumber);
  }

  getGradeClass = computed(() => {
    return (grade: string) => {
      switch (grade) {
        case 'A+': return 'bg-green-500 text-white';
        case 'A': return 'bg-green-400 text-green-900';
        case 'B': return 'bg-yellow-400 text-yellow-900';
        case 'C': return 'bg-orange-400 text-orange-900';
        case 'D': return 'bg-orange-500 text-white';
        case 'F': return 'bg-red-500 text-white';
        default: return 'bg-gray-400 text-gray-900';
      }
    };
  });

  getRankClass = computed(() => {
    return (rank?: number) => {
      switch (rank) {
        case 1: return 'bg-amber-400 text-amber-900 font-bold';
        case 2: return 'bg-slate-400 text-slate-900 font-bold';
        case 3: return 'bg-orange-400 text-orange-900 font-bold';
        default: return 'bg-slate-700';
      }
    };
  });
}
