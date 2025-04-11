import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  fecha = new Date;

  cantidadFilas:number = 30;
  cantidadcolumnas:number = 10;
  
  columnas = Array.from({ length: this.cantidadcolumnas }, (_, i) => i);
  filas = Array.from({ length: this.cantidadFilas }, (_, i) => i);

  valores: { raw: string; value: string }[][] = [];

  celdaSeleccionada: { col: number; fila: number } | null = null;
  inputValor: string = '';

  ngOnInit(): void {
    this.valores = Array.from({ length: this.cantidadFilas }, () =>
      Array.from({ length: this.cantidadcolumnas }, () => ({ raw: '', value: '' }))
    );
  }
  
  seleccionarCelda(col: number, fila: number): void {
    this.celdaSeleccionada = { col, fila };
    const celda = this.valores[fila][col];
    this.inputValor = celda.raw || celda.value;
  }

  guardarValor(): void {
    if (!this.celdaSeleccionada) return;
  
    const { fila, col } = this.celdaSeleccionada;
    const raw = this.inputValor;
    let value = raw;
  
    if (raw.startsWith('=')) {
      try {
        value = this.evaluarFormula(raw.substring(1));
      } catch (e) {
        value = 'ERROR';
      }
    }
  
    this.valores[fila][col] = { raw, value };
    this.celdaSeleccionada = null;
    this.inputValor = '';
  }  

  evaluarFormula(formula: string): string {
    const regex = /([A-Z]+[0-9]+)/g;
    const tokens = formula.match(regex);
  
    if (tokens) {
      for (const token of tokens) {
        const { fila, col } = this.convertirReferencia(token);
        const cell = this.valores?.[fila]?.[col];
  
        if (!cell) throw new Error('Celda inválida');
  
        formula = formula.replace(token, cell.value || '0');
      }
    }

    return new Function(`return ${formula}`)();
  }

  convertirReferencia(ref: string): { fila: number; col: number } {
    const match = ref.match(/^([A-Z]+)(\d+)$/);
    if (!match) throw new Error('Referencia inválida');
  
    const colStr = match[1];
    const fila = parseInt(match[2], 10) - 1;
  
    let col = 0;
    for (let i = 0; i < colStr.length; i++) {
      col *= 26;
      col += colStr.charCodeAt(i) - 65 + 1;
    }
    col -= 1;
  
    return { fila, col };
  }
  
  obtenerLetra(index: number|undefined): string {
    if (index !== undefined) {
      return String.fromCharCode(65 + index);
    }
    return '';
  }
}