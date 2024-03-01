interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartSecondBase extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartSecondBase {
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartSecondBase {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartSpecial extends CoursePartSecondBase {
    requirements: string[];
    kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;