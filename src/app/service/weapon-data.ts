import { Weapon } from '../class/weapon';

export const WEAPONS: Weapon[] = [
    {
        key: 1,
        name: 'sword',
        damage: 1,
        range: [[0, 1], [0, -1], [1, 0], [-1, 0]],
        skill: [
            {
                key: 1,
                name: 'whell wind',
                damage: 0.4,
                range: [ [1, -1], [1, 0], [1, 1], [0, -1], [0, 1], [-1, -1], [-1, 0], [-1, 1] ]
            }
        ]
    }
    
];