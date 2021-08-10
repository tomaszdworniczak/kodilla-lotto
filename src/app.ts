import inquirer from "inquirer";

const chosenNumbers: number[] = [];
const randomNumbers: number[] = [];
const min = 1;
const max = 49

const startApp = async (): Promise<void> => {
    do {
        const result = await inquirer.prompt([{
            name: 'number',
            type: 'input',
            message: 'Podaj liczbę...'
        }]);

        if (isValid(result.number)) {
            chosenNumbers.push(parseInt(result.number));
        }

    } while (chosenNumbers.length < 6);

    do {
        const number: number = randomNumberWithinRange(min, max);
        if (!isRandomNumberAlreadyDrawn(number)) {
            randomNumbers.push(number);
        }
    } while (randomNumbers.length < 6)

    console.log(chosenNumbers.sort((a, b) => a - b));
    console.log(randomNumbers.sort((a, b) => a - b));

    const calculateHits = (): void => {
        const hits = chosenNumbers.filter(num => randomNumbers.includes(num));
        console.log('Number of hits: ', hits.length);
    }

    calculateHits();
}

const randomNumberWithinRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const isRandomNumberAlreadyDrawn = (number: number): boolean => {
    return randomNumbers.includes(number);
}

const isValid = (input: string): boolean => {
    const parsedInput = Number(input);
    if (isNaN(parsedInput)) {
        console.log('Not a number!')
        return false;
    }
    if (parsedInput < 1 || parsedInput > 49) {
        console.log('Out of range!')
        return false;
    }
    if (isNumberAlreadyChosen(parsedInput)) {
        console.log('Number already chosen!')
        return false;
    }
    return true;
}

const isNumberAlreadyChosen = (number: number): boolean => {
    return chosenNumbers.includes(number);
}

startApp();