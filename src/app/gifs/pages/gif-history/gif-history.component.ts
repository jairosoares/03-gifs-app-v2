import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { GifService } from '../../services/GifService';
import { map } from 'rxjs';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {


  gifService = inject(GifService);

  // qq click do usuario ao selecionar a tag history, ele reflet aqui, que por sua vez tb atualiza gifsByKey (veja abaixo)
  query = toSignal(
    inject(ActivatedRoute).params.pipe( map( (params) => params['query'] ) )
  );


  gifsByKey = computed( () => {
    return this.gifService.getHistoryGifs(this.query())
  })



}
