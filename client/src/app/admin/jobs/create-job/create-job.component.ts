import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  createJobForm: FormGroup;
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createJobForm = this.formBuilder.group({
      jobname: ['', Validators.required],
      arguments: ['', Validators.required],
      uploadfile: ['', Validators.required]
  });
  }


}
