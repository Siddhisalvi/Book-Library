import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.css']
})
export class TrendingSubjectsComponent {
  trendingSubjects: string[] = ['Fiction', 'Science', 'History', 'Art'];

  constructor(private router: Router) { }

  navigateToSubject(subject: string) {
    this.router.navigate(['/search'], { queryParams: { q: subject } });
  }
}
