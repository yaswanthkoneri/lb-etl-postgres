import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';
@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  createJobForm: FormGroup;
  formData: FormData = new FormData();
  constructor( private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createJobForm = this.formBuilder.group({
      jobname: ['', Validators.required],
      arguments: ['', Validators.required],
      uploadfile: ['', Validators.required]
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
      }
    } else {
      delete this.formData;
      this.formData = new FormData();
    }
    console.log(this.formData);
  }


}
