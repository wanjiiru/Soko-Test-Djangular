import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Artisan } from '../artisans/model/artisan';

@Component({
  selector: 'app-artisans-list',
  templateUrl: './artisans-list.component.html',
  styleUrls: ['./artisans-list.component.css']
})
export class ArtisansListComponent implements OnInit {
  allArtisans: Artisan[] = [];
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.fetchAllArtisans();
  }
  onDeleteArtisan(artisanId: number){
    this.deleteArtisan(artisanId);
  }
  private fetchAllArtisans(){
    this.http.get<Artisan[]>("http://localhost:8080/api/artisans/")
      .subscribe((artisans)=>{
        this.allArtisans = artisans;
      });
  }
  private deleteArtisan(artisanId: number){
    this.http.delete<any>(`http://localhost:8080/api/artisans/${artisanId}`)
      .subscribe((artisans)=>{
        this.allArtisans = artisans.artisans;
      })
  }

}
