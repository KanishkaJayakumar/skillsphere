import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courseservice } from '../../services/courseservice.service';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../pipes/safe-pipe';
import { EnrollmentService } from '../../services/enrollmentservice.service';

@Component({
  selector: 'app-mycoursedetails',
  imports: [CommonModule],
  templateUrl: './mycoursedetails.html',
  styleUrl: './mycoursedetails.css',
})
export class Mycoursedetails implements OnInit {

  enrollmentId!: number;
  enrollment: any;
  progress = 0;

  constructor(private route: ActivatedRoute, private enrollmentService: EnrollmentService) {}

  ngOnInit() {
    this.enrollmentId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEnrollment();
  }

  loadEnrollment() {
    this.enrollmentService.getEnrollment(this.enrollmentId).subscribe({
      next: data => { this.enrollment = data; this.progress = data.progress; },
      error: err => console.error(err)
    });
  }

  onScroll(container: HTMLElement) {
    if (!container) return;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const progress = Math.min((scrollTop / scrollHeight) * 100, 100);
    this.updateProgress(progress);
  }

onVideoProgress(video: HTMLVideoElement) {
  if (!video.duration) return;
  const prog = (video.currentTime / video.duration) * 100;
  this.updateProgress(prog);
}


  updateProgress(progress: number) {
    this.enrollmentService.updateProgress(this.enrollmentId, progress).subscribe({
      next: data => {
        this.progress = data.progress;
        if(data.completed) alert('Course Completed! Download certificate.');
      },
      error: err => console.error(err)
    });
  }

  // downloadCertificate() {
  //   this.courseService.getCertificate(this.enrollmentId).subscribe({
  //     next: cert => window.open(cert.certificateUrl, '_blank'),
  //     error: err => console.error(err)
  //   });
  // }

  downloadCertificate() {
    this.enrollmentService.getCertificate(this.enrollmentId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Certificate-${this.enrollment.course.courseTitle}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
