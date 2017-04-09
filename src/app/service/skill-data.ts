import { Skill } from '../class/skill';

export const SKILLS: Skill[] = [
    {
        name: 'None',
        damage: 0,
        dotDamage: 0,
        dotTurn: 0,
        attackRange: [
            [0, 0]
        ],
        skillRange: [
            [0, 0]
        ],
        randomCount: 0,
        attribute: ''
    },
    {
        name: 'Fire wall',
        damage: 13,
        dotDamage: 5,
        dotTurn: 3,
        attackRange: [
            [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2],
            [-2, -1], [2, -1],
            [-2, 0], [2, 0],
            [-2, 1], [2, 1],
            [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]
        ],
        skillRange: [
            [0, 0], [1, 0], [-1, 0]
        ],
        randomCount: 0,
        attribute: 'fire'
    },
    {
        name: 'Meteo',
        damage: 25,
        dotDamage: 6,
        dotTurn: 2,
        attackRange: [
            [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2],
            [-2, -1], [2, -1],
            [-2, 0], [2, 0],
            [-2, 1], [2, 1],
            [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]
        ],
        skillRange: [
            [0, 0], [1, -1], [-1, 1], [1, 1], [-1, -1]
        ],
        randomCount: 2,
        attribute: 'fire'
    },
    {
        name: 'Water cannon',
        damage: 40,
        dotDamage: 0,
        dotTurn: 0,
        attackRange: [
            [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2],
            [-2, -1], [2, -1],
            [-2, 0], [2, 0],
            [-2, 1], [2, 1],
            [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]
        ],
        skillRange: [
            [0, 0]
        ],
        randomCount: 0,
        attribute: 'water'
    },
    {
        name: 'Tsunami',
        damage: 20,
        dotDamage: 0,
        dotTurn: 0,
        attackRange: [
            [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2],
            [-2, -1], [2, -1],
            [-2, 0], [2, 0],
            [-2, 1], [2, 1],
            [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]
        ],
        skillRange: [
            [0, -1], [0, 0], [0, 1], [0, 2], [0, -2]
        ],
        randomCount: 0,
        attribute: 'water'
    },
    {
        name: 'Heel',
        damage: 0,
        dotDamage: 3,
        dotTurn: 3,
        attackRange: [
            [0, 0]
        ],
        skillRange: [
            [0, 0]
        ],
        randomCount: 0,
        attribute: 'grass'
    },
    {
        name: 'Poison seeds',
        damage: 0,
        dotDamage: 6,
        dotTurn: 5,
        attackRange: [
            [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2],
            [-2, -1], [2, -1],
            [-2, 0], [2, 0],
            [-2, 1], [2, 1],
            [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]
        ],
        skillRange: [
            [0, 0], [1, 0], [-1, 0], [1, -1], [0, -1], [-1, -1]
        ],
        randomCount: 4,
        attribute: 'grass'
    }

];