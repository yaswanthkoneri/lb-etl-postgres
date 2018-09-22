import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { JobsService } from '../../../services/jobs/jobs.service';
@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  createJobForm: FormGroup;
  formData: FormData = new FormData();
  fileName: String ;
  constructor( private formBuilder: FormBuilder, private router: Router, private jobsService: JobsService) { }

  ngOnInit() {
    this.createJobForm = this.formBuilder.group({
      name: ['', Validators.required],
      arguments: ['', Validators.required],
  });
  }
  navigateToListViewUrl() {
    this.router.navigate(['admin/jobs']);
  }
  uploadFile(fileInput: any) {
    if (event) {
      const fileDetails = <Array<File>>fileInput.target.files;
      for (let i = 0; i < fileDetails.length; i++) {
        this.formData.append('files', fileDetails[i]);
        this.fileName = fileDetails[i].name;
      }
    } else {
      delete this.formData;
      this.formData = new FormData();
    }
  }
  createjob() {
    const job = this.createJobForm.value;
    this.jobsService.createJob(this.formData, job).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['admin/jobs']);
    });

  }


}
