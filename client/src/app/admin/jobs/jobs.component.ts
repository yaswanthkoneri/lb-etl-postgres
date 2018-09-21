import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { JobsService } from '../../services/jobs/jobs.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs: any = [];
  loading: boolean;
  constructor(private jobsService: JobsService) { }
  dataSource;
  ELEMENT_DATA = [];
  displayedColumns: string[] = ['id', 'name', 'no_of_error_records', 'no_of_input_records', 'no_of_output_records'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getJobs();
  }
  getJobs() {
    this.jobsService.jobs().pipe().subscribe(data => {
      this.loading = false;
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
