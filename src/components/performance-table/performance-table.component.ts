import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullPerformanceStats } from '../../models/student.model';

@Component({
  selector: 'app-performance-table',
  imports: [CommonModule],
  templateUrl: './performance-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceTableComponent {
  stats = input<FullPerformanceStats | null>();
}
