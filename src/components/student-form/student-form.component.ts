import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentFormComponent {
  addStudent = output<Omit<Student, 'totalMarks' | 'percentage' | 'grade'>>();

  studentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    rollNumber: new FormControl('', Validators.required),
    marks: new FormGroup({
      daa: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      mit: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      ohs: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    }),
  });

  get name() { return this.studentForm.get('name'); }
  get rollNumber() { return this.studentForm.get('rollNumber'); }
  get daa() { return this.studentForm.get('marks.daa'); }
  get mit() { return this.studentForm.get('marks.mit'); }
  get ohs() { return this.studentForm.get('marks.ohs'); }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const value = this.studentForm.value;
      // The Omit type ensures we don't send calculated fields, as the parent will handle them.
      this.addStudent.emit({
        name: value.name!,
        rollNumber: value.rollNumber!,
        marks: {
          daa: value.marks!.daa!,
          mit: value.marks!.mit!,
          ohs: value.marks!.ohs!,
        }
      });
      this.studentForm.reset();
    } else {
        this.studentForm.markAllAsTouched();
    }
  }
}
