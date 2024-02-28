const calculateBmi = (height: number, weight: number): string => {

    const bmi = weight / (height*0.01)**2
    const message: string = 
        bmi < 16 ? 'Underweight (Severe thinness)' :
        bmi < 17 ? 'Underweight (Moderate thinness)' :
        bmi < 18.5 ? 'Underweight (Mild thinness)' :
        bmi < 25 ? 'Normal (healthy weight)' :
        bmi < 30 ? 'Overweight' :
        bmi >= 30 ? 'Obese' : 
        'out of range'
    return message
}

const parseArgs = (args: string[]): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return [Number(args[2]), Number(args[3])]
    } else {
        throw new Error('Provided values were not numbers')
    }
}
try {
    const [h,w] = parseArgs(process.argv)
    console.log(calculateBmi(h,w))
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message)
    }
}

