import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from "ngx-highlightjs";

@Component({
  selector: 'app-box-code',
  standalone: true,
  imports: [CommonModule, Highlight],
  templateUrl: './box-code.html',
})
export class BoxCode {
  /** Código que se mostrará en el box */
  @Input() code: string = '';

  /** Índice o identificador del código (opcional) */
  @Input() index?: number;

  /** Evento emitido al eliminar el código */
  @Output() removeCode = new EventEmitter<number>();

  removeCodeChange() {
    this.removeCode.emit(this.index);
  }

  /** Devuelve una vista previa truncada del código */
  get preview(): string {
    if (!this.code) return 'Código vacío';
    return this.code.length > 80 ? this.code.substring(0, 80) + '...' : this.code;
  }
}
