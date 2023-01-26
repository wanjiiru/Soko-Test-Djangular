import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Artisan } from './model/artisan';

@Component({
  selector: 'app-artisans',
  templateUrl: './artisans.component.html',
  styleUrls: ['./artisans.component.css']
})
export class ArtisansComponent implements OnInit {
  artisanForm: FormGroup;
  artisanId: String;
  artisanData: Artisan = {
    id: 0,
    first_name: "",
    last_name: "",
    date_of_birth: new Date("1992-12-24"),
    job_title: "",
    company: "",
    country: "Kenya",
    artisanInfo: {},
  };

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.artisanId = this.route.snapshot.paramMap.get('id');
    console.log(this.artisanId);
    if(this.artisanId !== "0") this.fetchArtisan(this.artisanId);
    console.log(this.artisanData);
    this.artisanForm = new FormGroup({
      firstName: new FormControl(this.artisanData.first_name),
      lastName: new FormControl(this.artisanData.last_name),
      dateOfBirth: new FormControl(this.artisanData.date_of_birth),
      jobTitle: new FormControl(this.artisanData.job_title),
      company: new FormControl(this.artisanData.company),
      country: new FormControl(this.artisanData.country),
      maritalStatus: new FormControl(this.artisanData.artisanInfo.marital_status),
      idNumber: new FormControl(this.artisanData.artisanInfo.id_number),
      numberOfChildren: new FormControl(this.artisanData.artisanInfo.number_of_children),
      workingHours: new FormControl(this.artisanData.artisanInfo.working_hours),
      religion: new FormControl(this.artisanData.artisanInfo.religion),
    });
  }
  onArtisansFetch(){
    this.fetchArtisan(this.artisanId);
    console.log(this.artisanData);
  }
  onSubmit(){
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const body = {
      id: this.artisanId,
      first_name: this.artisanForm.value.firstName,
      last_name: this.artisanForm.value.lastName,
      date_of_birth: this.artisanForm.value.dateOfBirth,
      job_title: this.artisanForm.value.jobTitle,
      company: this.artisanForm.value.company,
      country: this.artisanForm.value.country,
      marital_status: this.artisanForm.value.maritalStatus,
      id_number: this.artisanForm.value.idNumber,
      number_of_children: this.artisanForm.value.numberOfChildren,
      working_hours: this.artisanForm.value.workingHours,
      religion: this.artisanForm.value.religion,
    }
    console.log(body);
    this.http.post<any>(
      'http://localhost:8080/api/artisans/',
      body,
      {
        headers: headers
      }
    ).subscribe((resp) =>{
      if (resp.status === 200){
        this.router.navigate(["/"])
      }
    });
  }

  private fetchArtisan(artisanID: String){
    this.http.get<Artisan>(`http://localhost:8080/api/artisans/${artisanID}/`)
      .pipe(map((resp)=>{
        return resp;
      }))
      .subscribe((resp)=>{
        console.log(resp);
        this.artisanData = resp;
        this.artisanForm = new FormGroup({
          firstName: new FormControl(resp.first_name),
          lastName: new FormControl(resp.last_name),
          dateOfBirth: new FormControl(resp.date_of_birth),
          jobTitle: new FormControl(resp.job_title),
          company: new FormControl(resp.company),
          country: new FormControl(resp.country.name),
          maritalStatus: new FormControl(resp.artisanInfo.marital_status),
          idNumber: new FormControl(resp.artisanInfo.id_number),
          numberOfChildren: new FormControl(resp.artisanInfo.number_of_children),
          workingHours: new FormControl(resp.artisanInfo.working_hours),
          religion: new FormControl(resp.artisanInfo.religion),
        });
      })
  }
}
