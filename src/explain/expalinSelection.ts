export function explainSelection(input: string): string {
    const originalText = input;
    const trimmedText = input.trim();

    if (trimmedText.length === 0) {
        return 'No Code Selected';
    }

    const characters = originalText.length;
    const lines = originalText.split('\n').length;
    
    let language = 'Unknown';

    if (trimmedText.includes('=>') || trimmedText.includes(': number')) {
        language = 'TypeScript';
    }
    else if (trimmedText.includes('def')) {
        language = 'Python';
    }
    else if (trimmedText.includes('#include')) {
        language = 'C/C++';
    }
    else if (trimmedText.includes('function')) {
        language = 'JavaScript';
    }

    let explanation = 'This appears to be a code snippet.';

    if (trimmedText.includes('=>')) {
        explanation = 'This code defines an arrow function that performs an operation and returns the result.';
    }
    else if (trimmedText.includes(': function')) {
        explanation = 'This code defines a function that encapsulates reusable logic.';
    }
    else if(trimmedText.includes('class')) {
        explanation = 'This code defines a class, which groups related data and behavior.';
    }

    let result = '';
    result += 'LocalForge Explanation\n';
    result += '========================\n';
    result += `Language: ${language}\n`;
    result += `Characters: ${characters}\n`;
    result += `Lines: ${lines}\n`;
    result += `\n`;
    result += `Explanation: ${explanation}\n`;
    result += '\n\n';
    result += 'Original Code:\n';
    result += '```\n';
    result += originalText;
    result += '\n```\n';
    return result;

}