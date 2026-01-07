import { generateWithOllama } from "../ollama/ollamaClient";

export async function askWithSelection(
    instruction: string,
    selectedCode: string,
    outputChannel: any,
    model: string,
    abortSignal?: AbortSignal
): Promise<void> {

    const prompt = `${instruction} ${selectedCode}`;

    await generateWithOllama(
        model,
        prompt,
        {
            onToken: (token: string) => {
                outputChannel.append(token);
            },
            onDone: () => {
                outputChannel.appendLine('\n\n- LocalForge');
            },
            onError: (error: Error) => {
                outputChannel.appendLine('\n[Ollama error]');
                outputChannel.appendLine(error.message);
            }
        },
        abortSignal
    );
}