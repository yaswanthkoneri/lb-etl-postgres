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
  fileDetails: any;
  constructor( private formBuilder: FormBuilder, private router: Router, private jobsService: JobsService) { }

  ngOnInit() {
    this.createJobForm = this.formBuilder.group({
      name: '',
      arguments: '',
  });
  }
  navigateToListViewUrl() {
    this.router.navigate(['admin/jobs']);
  }
  uploadFile(fileInput: any) {
    if (event) {
      this.fileDetails = <File>fileInput.target.files[0];
      // this.formData.append('file', fileDetails);
      this.fileName = this.fileDetails.name;
     // for (let i = 0; i < fileDetails.length; i++) {
      //   this.formData.append('files', fileDetails[i]);
      //   this.fileName = fileDetails[i].name;
      // }
    } else {
      delete this.formData;
      this.formData = new FormData();
    }
  }
  createjob() {
    const job = this.createJobForm.value;
    console.log(job);
    this.formData.append('file', this.fileDetails);
    this.jobsService.createJob(job).subscribe((res: any) => {
      console.log(res);
      const createdjob = res;
      this.jobsService.jobFileUpload(this.formData, createdjob).subscribe((data: any) => {
        if (data.status === 'success') {
          this.router.navigate(['admin/jobs']);
        }
      });
    });
  }
}
