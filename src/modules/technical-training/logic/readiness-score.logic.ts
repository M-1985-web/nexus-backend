export function calculateReadiness(feedbacks: any[]) {
    if (feedbacks.length === 0) return { hardSkills: 0, softSkills: 0, overall: 0 };

    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

    const hard = avg(feedbacks.map(f => f.accuracyScore));
    const soft = avg(feedbacks.map(f => f.professionalismScore));

    return {
        hardSkillsEnglish: Math.round(hard * 10) / 10,
        softSkillsEnglish: Math.round(soft * 10) / 10,
        overallScore: Math.round((hard + soft) / 2),
    };
}