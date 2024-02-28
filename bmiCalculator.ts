const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (height*0.01)**2
    const message: string = 
        bmi < 16 ? 'Underweight (Severe thinness)' :
        bmi < 17 ? 'Underweight (Moderate thinness)' :
        bmi < 18.5 ? 'Underweight (Mild thinness)' :
        bmi < 25 ? 'Normal (healthy weight)' :
        bmi < 30 ? 'Overweight' :
        bmi >= 30 ? 'Obese' : 
        'bmi out of range'
    return message
}

console.log(calculateBmi(180,74))