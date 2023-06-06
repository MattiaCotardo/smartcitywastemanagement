import { Component } from '@angular/core';
import {Citizen} from "../../models/citizen";
import {CitizensService} from "../../services/citizens.service";
import {Admin} from "../../models/admin";
import {AdminsService} from "../../services/admins.service";

@Component({
  selector: 'app-info-admin-comunale',
  templateUrl: './info-admin-comunale.component.html',
  styleUrls: ['./info-admin-comunale.component.scss']
})
export class InfoAdminComunaleComponent {
  adminOrNull: Admin | null = null;

  constructor(private adminService:AdminsService) {
  }
  async ngOnInit() {
    this.adminOrNull = await this.adminService.getAdminByEmail(localStorage.getItem("emailAdmin"))
  }
}
