import { Component } from '@angular/core';
import {CadastroPessoaComponent} from './components/cadastro-pessoa/cadastro-pessoa.component'

@Component({
  selector: 'app-root',
  imports: [CadastroPessoaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-modal';
}
