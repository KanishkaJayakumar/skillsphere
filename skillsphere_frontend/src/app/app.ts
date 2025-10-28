import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./layouts/footer/footer";
import { Header } from "./layouts/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('skillsphere_frontend');
}
