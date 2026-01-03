import { generateWithOllama } from "../ollama/ollamaClient";
import { fallbackExplain } from "./fallbackExplain";
import { getDefaultModel } from "../ollama/ollamaModels";


export async function explainSelection(
    input: string,
    outputChannel: any,
    abortSignal?: AbortSignal
): Promise<void>{

    const model = await getDefaultModel();

    if (!model) {
        outputChannel.appendLine(fallbackExplain(input));
        return;
    }

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