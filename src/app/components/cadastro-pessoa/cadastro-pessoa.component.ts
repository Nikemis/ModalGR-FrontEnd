import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  imports: [FormsModule, CommonModule]
})
export class CadastroPessoaComponent {
  detalhes = {
    name: '',
    cpf: '',
    birthdate: '',
    email: '',
    cep: ''
  };


  submitAttempted: boolean = true;

 

  people: any[] = [];

  constructor(private http: HttpClient) { }


  validateCEP(cep: string): boolean {
    const cepRegex = /^\d{8}$/; 
    return cepRegex.test(cep);
  }

  validateCPF(cpf: string): boolean {
    const cpfRegex = /^\d{11}$/; 
    return cpfRegex.test(cpf);
  }

  calculateAge(birthdate: string): number {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

 validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|gov|edu)$/;
  return emailRegex.test(email);
}


onSubmit() {
 
  this.submitAttempted = false;  

  if (!this.detalhes.name || !this.validateCPF(this.detalhes.cpf) || !this.detalhes.birthdate || !this.validateEmail(this.detalhes.email) || !this.detalhes.cep) {
    return;
  }
    const person = {
      name: this.detalhes.name,
      cpf: this.formatCPF(this.detalhes.cpf),
      age: this.calculateAge(this.detalhes.birthdate),
      email: this.detalhes.email,
      cep: this.detalhes.cep,
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: ''
    };

    this.getAddressByCEP(this.detalhes.cep).subscribe(address => {
      person.logradouro = address.logradouro;
      person.bairro = address.bairro;
      person.cidade = address.localidade;
      person.estado = address.uf;

      this.people.push(person);
      this.detalhes = { name: '', cpf: '', birthdate: '', email: '', cep: '' };

    });
  }

 

  getAddressByCEP(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<any>(url);
  }

}