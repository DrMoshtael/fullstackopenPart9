interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number
}

const calculateExercises = (actual: number[], target: number): Result => {
    const average = actual.reduce((acc, cur) => acc + cur, 0)/actual.length
    const rating = average >= target ? 1 : 
                    average > target*0.5 ? 2 : 3
    const ratingDesc = average >= target ? 'You met or exceeded your target, woop woop' :
                        average > target*0.5 ? 'You were over half way, not bad' : 'Nah mate'
    return {
        periodLength: actual.length,
        trainingDays: actual.reduce((acc, cur) => cur > 0 ? acc = acc + 1 : acc, 0),
        success: average >= target,
        rating: rating,
        ratingDescription: ratingDesc,
        target: target,
        average: average
    }
}
const days = [3, 0, 2, 4.5, 0, 3, 1]
console.log(calculateExercises(days, 2))