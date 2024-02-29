interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number
}

export const calculateExercises = (actual: number[], target: number): Result => {
    const average = actual.reduce((acc, cur) => acc + cur, 0)/actual.length;
    const rating = average >= target ? 3 : 
                    average > target*0.5 ? 2 : 1;
    const ratingDesc = average >= target ? 'You met or exceeded your target, woop woop' :
                        average > target*0.5 ? 'You were over half way, not bad' : 'Nah mate';
    return {
        periodLength: actual.length,
        trainingDays: actual.reduce((acc, cur) => cur > 0 ? acc = acc + 1 : acc, 0),
        success: average >= target,
        rating: rating,
        ratingDescription: ratingDesc,
        target: target,
        average: average
    };
};

export interface Args {
    daily_exercises: number[];
    target: number
}

const parseArguments = (args: string[]): Args => {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    if (args.slice(2).every(cur => !isNaN(Number(cur)))) {
        return {
            target: Number(args[2]),
            daily_exercises: args.slice(3).map(i => Number(i))
        };
    } else {
        throw new Error('Provided values were not numbers');
    }
};

try {
    const {target ,daily_exercises: actuals } = parseArguments(process.argv);
    console.log(calculateExercises(actuals,target));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}

