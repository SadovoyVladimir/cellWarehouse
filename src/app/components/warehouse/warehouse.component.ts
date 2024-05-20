import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatButtonModule } from '@angular/material/button'
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [FlexLayoutModule, MatTooltipModule, MatButtonModule],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.scss'
})
export class WarehouseComponent implements OnInit {
  @Input() shelves: number[]
  @Input() cells: number[]
  @Input() set racks(count: number) {
    this.racksCount = count
    if (
      (count % 100 > 10 && count % 100 < 20) ||
      (count % 10 >= 5 && count % 10 <= 9) ||
      count % 10 === 0
    ) {
      this.racksTitle = 'стеллажей'
    } else if (count % 10 === 1) {
      this.racksTitle = 'стеллаж'
    } else {
      this.racksTitle = 'стеллажа'
    }
  }
  @Output() onReturn = new EventEmitter<void>()

  racksCount: number
  racksTitle: string
  productsTitle: string[]
  randomTitle: string

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getRandomProductTitle().subscribe((products) => {
      this.productsTitle = products.map((product) => product.title)
      this.changeRandomTitle()
    })
  }

  getRandomTitle(): string {
    return this.randomTitle
  }

  changeRandomTitle(): void {
    if (!this.productsTitle || this.productsTitle.length === 0) {
      return
    }
    const randomIndex = Math.floor(Math.random() * this.productsTitle.length)
    this.randomTitle = this.productsTitle[randomIndex]
  }

  return() {
    this.onReturn.emit()
  }
}
