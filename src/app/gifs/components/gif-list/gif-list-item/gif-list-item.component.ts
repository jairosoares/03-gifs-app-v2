import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  templateUrl: './gif-list-item.component.html',
  imports: [],
})
export class GifListItemComponent {

  imageUrl = input.required<string>()

}
