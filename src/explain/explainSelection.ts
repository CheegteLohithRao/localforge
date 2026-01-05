import { generateWithOllama } from "../ollama/ollamaClient";


export async function explainSelection(
    input: string,
    outputChannel: any,
    model: string,
    abortSignal?: AbortSignal
): Promise<void>{

    await generateWithOllama(
        model,
        input,
        {
            onToken: (token: string) => {
                outputChannel.append(token);
            },
            onDone:() => {
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