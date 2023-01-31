import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { roleData, userData } from './data';

@Injectable()
export class SeedService {
  constructor(private readonly authService: AuthService) {}

  async runSeed() {
    await this.deleteTableInformation();
    await this.createTableInformation();

    return { status: 'Seed executed' };
  }

  private async deleteTableInformation() {
    await this.authService.processAuthSeed(false);
  }

  private async createTableInformation() {
    await this.authService.processAuthSeed(true, roleData, userData);
  }
}
