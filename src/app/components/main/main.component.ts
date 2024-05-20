import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { WarehouseComponent } from '../warehouse/warehouse.component'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, WarehouseComponent, MatInputModule, MatButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  numberOfRacks: number
  numberOfShelves: number
  numberOfCells: number
  shelves: number[]
  cells: number[]
  isWarehouseDrawn: boolean = false
  isDisabled = true

  onInput(): void {
    if (!this.numberOfCells || !this.numberOfRacks || !this.numberOfShelves) {
      this.isDisabled = true
      return
    }

    this.isDisabled =
      this.numberOfRacks <= 0 ||
      this.numberOfRacks > 20 ||
      this.numberOfShelves <= 0 ||
      this.numberOfShelves > 10 ||
      this.numberOfCells <= 0 ||
      this.numberOfCells > 15
  }

  toggleWarehouse() {
    this.isWarehouseDrawn = !this.isWarehouseDrawn
  }

  onReturn() {
    this.toggleWarehouse()
  }

  drawWarehouse() {
    this.shelves = Array.from({ length: this.numberOfShelves }, (_, i) => i + 1)
    this.cells = Array.from({ length: this.numberOfCells }, (_, i) => i + 1)
    this.toggleWarehouse()
  }
}
