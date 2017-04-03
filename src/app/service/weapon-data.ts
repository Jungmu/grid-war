import { Weapon } from '../class/weapon';

export const WEAPONS: Weapon[] = [
    {
        key: 0,
        name: 'none',
        damage: 0,
        range: [],
        skill: [
            {
                key: 1,
                name: 'none',
                damage: 0,
                range: []
            }
        ]
    },
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
                range: [[1, -1], [1, 0], [1, 1], [0, -1], [0, 1], [-1, -1], [-1, 0], [-1, 1]]
            }
        ]
    },
    {
        key: 2,
        name: 'spear',
        damage: 1,
        range: [[0, -2], [1, -1], [2, 0], [1, 1], [0, 2], [-1, 1], [-2, 0], [-1, -1]],
        skill: [
            {
                key: 1,
                name: '3way chop',
                damage: 0.6,
                range: [[0, -1], [-1, 0], [1, 0]]
            }
        ]
    },
    {
        key: 3,
        name: 'bow',
        damage: 1,
        range: [
            [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2],
            [-2, -1], [2, -1],
            [-2, 0], [2, 0],
            [-2, 1], [2, 1],
            [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]
        ],
        skill: [
            {
                key: 1,
                name: 'guide arrow',
                damage: 0.2,
                range: [[0, 0]]
            }
        ]
    }


];