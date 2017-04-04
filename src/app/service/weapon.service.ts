import { Injectable } from '@angular/core';

import { Weapon } from '../class/weapon';
import { WEAPONS } from '../service/weapon-data';

@Injectable()
export class WeaponService {

  constructor() { }

  getWeapons(): Promise<Weapon[]> {
    return Promise.resolve(WEAPONS);
  }
}
