import { Component, OnInit, ViewChild } from '@angular/core';
import { PlatformLocation } from '@angular/common'
import { PatientService } from 'src/services/patient.service';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { TransferService } from 'src/services/transferdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  patientList:any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string [] = ['ID', 'Firstname', 'Lastname', 'DOB'];
  constructor(private patientService: PatientService,
    private transferService: TransferService,
    private router: Router,
    private location: PlatformLocation) { }

  ngOnInit() {
    this.getPatientList();
  }

  applyFilter(filterValue: string) {
    this.patientList.filter = filterValue.trim().toLowerCase();

    if (this.patientList.paginator) {
      this.patientList.paginator.firstPage();
    }
  }


  getPatientList() {
    this.patientService.getPatients().subscribe(data => {

      if(data.total > 0){

        for(let i=0;i<data.entry.length;i++){
          data.entry[i]['PatentId'] = data.entry[i].resource.id
          data.entry[i]['firstname'] = data.entry[i].resource.name[0].given[0]
          data.entry[i]['lastname'] = data.entry[i].resource.name[0].family
          data.entry[i]['birthDate'] = data.entry[i].resource.birthDate
          data.entry[i]['gender'] = data.entry[i].resource.gender
        }
    
        this.patientList = new MatTableDataSource(data.entry);
        this.patientList.sort = this.sort;
        this.patientList.paginator = this.paginator;
      }
    })
  }

  showDetails(data) {
    this.transferService.setData(data);
    this.router.navigate(['/patient'])
    
  }

}
