import * as vscode from "vscode";

const MODEL_KEY = "localforge.selectedModel";

export async function setSelectedModel(
  context: vscode.ExtensionContext,
  model: string
): Promise<void> {
  await context.globalState.update(MODEL_KEY, model);
}

export function getSelectedModel(
  context: vscode.ExtensionContext
): string | null {
  return context.globalState.get<string>(MODEL_KEY) ?? null;
}

export async function clearSelectedModel(
  context: vscode.ExtensionContext
): Promise<void> {
  await context.globalState.update(MODEL_KEY, undefined);
}
