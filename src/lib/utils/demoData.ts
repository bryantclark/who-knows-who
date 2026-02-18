export interface ScoreData {
    [playerID: string]: {
        [otherPlayerID: string]: {
            accuracyPercentage: number;
        };
    };
}

export const DEMO_PLAYERS = [
    'Alex', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Morgan', 'Jamie', 'Quinn',
    'Avery', 'Skyler', 'Charlie', 'Parker', 'Reese', 'Rowan', 'Sage', 'Eden',
    'Kai', 'Micah', 'River', 'Phoenix', 'Scout', 'Dakota', 'Sawyer', 'Hayden',
    'Emerson', 'Finley', 'Sloane', 'Remi', 'Amari', 'Blake'
];

export function generateDemoScores(players: string[]): ScoreData {
    const newScores: ScoreData = {};
    players.forEach((p1) => {
        newScores[p1] = {};
        players.forEach((p2) => {
            if (p1 !== p2) {
                // Bias towards active connections for visual interest
                newScores[p1][p2] = {
                    accuracyPercentage: Math.floor(Math.random() * 100)
                };
            }
        });
    });
    return newScores;
}
