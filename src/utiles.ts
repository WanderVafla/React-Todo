// TargetDate must be in format yyyy-mm-dd
export function isPassed( targetDate: string ): boolean {
    const currentDay = new Date().getTime()
    const targetDateParsed = new Date(targetDate).getTime()
    if (targetDateParsed < currentDay) {
        return true
    }
    return false
}