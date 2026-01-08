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
- A locally running LLM backend (planned / configurable)
  - Example: Ollama or similar local inference tools with locally downloaded AI models like Gemma:2B, DeepSeekCoder:7B, etc.


---

## Extension Settings

This extension will contribute configuration options such as :

- Ollama model selection.
- Custom prompt on selected code block.
- Quick explain of selected code block.

(Settings will appear under `LocalForge` in VS Code.)

---

## Project Status

LocalForge is currently in **early development (v0.1.0)**.

- APIs and features may change
- Expect rapid iteration
- Stability and clarity are prioritized over feature count

Your feedback during this stage is highly valuable.

---

## Design Philosophy

LocalForge is built around a few core principles:

- **Local-first over cloud-first**
- **Developer control over automation**
- **Practical tools over hype**
- **Transparency over black-box behavior**

The goal is to **augment focused developers**, not automate away understanding.

---

## Roadmap (Indicative)

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
- Fixed some bugs which caused to show No select text
- Added Custom prompt option to give user input prompt to the model
- Improved Custom prompt handling and integrated it well
- Solved KeyBind issue
- Removed all the unnecessary lines of code used for testing and added loading animation
- Keybind for quick explanation is working

### 0.1.0 
- Works as a stable bridge between the Ollama and VS Code
- First usable public version

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
