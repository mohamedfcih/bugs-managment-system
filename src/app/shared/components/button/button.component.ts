import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerComponent } from '../../spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() color!: 'primary' | 'accent' | 'warn';
  @Input() disabled = false;
  @Output() clickAction = new EventEmitter();
  @Input() loading = false;

  onClick() {
    this.loading = true;
    this.clickAction.emit(true)
  }
}
