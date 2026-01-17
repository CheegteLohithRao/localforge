# LocalForge

LocalForge is a **privacy-first VS Code extension** that enables **local, offline AI assistance** by acting as a seamless bridge between **Ollama-powered local language models** and the VS Code editor.

It is built for developers who want AI-powered coding assistance **without sending their code to the cloud**, and who prefer using **their own custom or fine-tuned models**, while retaining full control over their code, data, and development environment.


---

## Features

- **Local AI Integration**
  - Built to work with locally running language models
  - No cloud APIs, no external servers

- **Privacy-First by Design**
  - All processing happens on your machine
  - Your source code never leaves your system

- **Lightweight & Developer-Oriented**
  - Minimal configuration
  - Clean, distraction-free workflow
  - Designed for real-world coding, not demos

> Screenshots and short demos will be added as features stabilize.

---

## Requirements

- Visual Studio Code `^1.107.0` or newer
- A locally running LLM backend 
  - Currently supported: Ollama
  - With locally downloaded models (e.g. Gemma 2B, DeepSeekCoder 7B, etc.)

---

## Extension Settings

LocalForge provides the following capabilities via commands and minimal configuration:

- Ollama model selection
- Custom prompt on selected code
- Quick explanation of selected code

(Settings and commands appear under `LocalForge` in VS Code.)


---

## Project Status

LocalForge is currently in a **stable, paused state**.

This release represents a complete and usable foundation for integrating local language models into VS Code. Active feature expansion is paused while focus shifts to other core projects.

Bug fixes and minor maintenance updates may be provided if necessary.


---

## Marketplace Distribution Status

LocalForge is currently distributed via `.vsix` packages and GitHub releases.

Publishing to the VS Code Marketplace is temporarily pending due to account-level and payment infrastructure limitations. This does not affect the functionality, scope, or completeness of the project.

Users can install the extension manually using the provided `.vsix` package.

---

### Manual Installation

1. Download the latest `.vsix` file from the GitHub Releases page.
2. Install it in VS Code using:

```bash
code --install-extension localforge-0.1.1.vsix
```

---

## Design Philosophy

LocalForge is built around a few core principles:

- **Local-first over cloud-first**
- **Developer control over automation**
- **Practical tools over hype**
- **Transparency over black-box behavior**

The goal is to **augment focused developers**, not automate away understanding.

---

## Roadmap (Indicative, Subject to Change)

- Model configuration UI
- Integration with future LocalForge tools
- Deeper support for system-level and embedded workflows

The roadmap will evolve based on real usage and feedback.

---

## Known Issues

- Early versions may lack polish
- Performance may vary depending on model size
- Limited configuration options initially
- Features are still under active development

Please report issues or suggestions via GitHub.

---

## Changelog (Early Development)

> These entries reflect development milestones and internal iterations during early development.
> Public releases may bundle multiple changes together.


### 0.0.1 -> 0.0.4
- Initial project setup
- Foundation for local AI integration
- Added integration bridge between Extension and Ollama
- Choosing of first available/downloaded model when Ollama is running
- Added configuration for quick, concise explanation of code.
- Added KeyBind for the Explain Selected code.
- Fixed some bugs which are stopping from usage of keybind

### 0.0.5 -> 0.0.9
- Removed default choosing of first available model from Ollama
- Added Model Selection option to choose models from the downloaded models
- Fixed issues causing false "No selected text" errors
- Added Custom prompt option to give user input prompt to the model
- Improved Custom prompt handling and integrated it well
- Solved KeyBind issue
- Removed all the unnecessary lines of code used for testing and added loading animation
- Keybind for quick explanation is working

### 0.1.0 
- Works as a stable bridge between the Ollama and VS Code
- First usable public version

### 0.1.1
- Improved Ollama streaming stability
- Better error handling when Ollama is not running
- Cleaner UX for long-running operations
- Display currently selected Ollama model

---

## Quick Start

1. Install LocalForge in VS Code
2. Make sure Ollama is running locally
3. Select a model using `LocalForge: Select Model`
4. Select code in the editor
5. Use:
   - `LocalForge: Explain Selection`
   - or `LocalForge: Run Prompt on Selection`

All processing happens locally.

---

## Keyboard Shortcuts

LocalForge provides optional keyboard shortcuts for faster interaction.

| Action | Command | Default Shortcut |
|------|--------|------------------|
| Explain selected code | `LocalForge: Explain Selection` | `Alt + M` |

> Note:  
> - Shortcuts can be changed in VS Code via **Preferences → Keyboard Shortcuts**  
> - All LocalForge commands are also accessible through the Command Palette

---

## Contributing

Ideas, feedback, and constructive discussion are welcome.

If you:
- Have a feature suggestion
- Found a bug
- Want to discuss design decisions

Feel free to open an issue or start a discussion on GitHub.

---

## Author

**LohithRao**  
Independent developer focused on building practical, privacy-first tools across software, hardware, and firmware environments.

- GitHub: https://github.com/CheegteLohithRao
- Repository Link: https://github.com/CheegteLohithRao/localforge
- LinkedIn: https://www.linkedin.com/in/lohith-rao-c-b808732b5/

---

## 📄 License

This project is licensed under the MIT License 
See the [LICENSE](./LICENSE) file for details.


---

## Note 
> LocalForge integrates with Ollama but is not affiliated with or endorsed by the Ollama project.

---

**Enjoy building locally.**
