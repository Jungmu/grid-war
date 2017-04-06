import { Injectable } from '@angular/core';

import { Skill } from '../class/skill';
import { SKILLS } from '../service/skill-data';

@Injectable()
export class SkillService {

  constructor() { }

  getSkills(): Promise<Skill[]> {
    return Promise.resolve(SKILLS);
  }
}
