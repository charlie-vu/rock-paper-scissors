export const game = {
    choiceList: ['scissors', 'paper', 'rock', 'lizard', 'spock'],

    icons: {
        rock: '/images/icon-rock.svg',
        paper: '/images/icon-paper.svg',
        scissors: '/images/icon-scissors.svg',
        lizard: '/images/icon-lizard.svg',
        spock: '/images/icon-spock.svg',
    },

    rules: {
        rock: ['scissors', 'lizard'],
        paper: ['rock', 'spock'],
        scissors: ['paper', 'lizard'],
        lizard: ['spock', 'paper'],
        spock: ['scissors', 'rock'],
    },
}