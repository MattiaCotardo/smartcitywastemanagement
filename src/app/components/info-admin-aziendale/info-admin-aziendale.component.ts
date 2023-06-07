import { Component } from '@angular/core';
import {Admin} from "../../models/admin";
import {AdminsService} from "../../services/admins.service";

@Component({
  selector: 'app-info-admin-aziendale',
  templateUrl: './info-admin-aziendale.component.html',
  styleUrls: ['./info-admin-aziendale.component.scss']
})
export class InfoAdminAziendaleComponent {

  adminOrNull: Admin | null = null;

  constructor(private adminService:AdminsService) {
  }
  async ngOnInit() {
    this.adminOrNull = await this.adminService.getAdminByEmail(localStorage.getItem("emailAdmin"))
  }

}
