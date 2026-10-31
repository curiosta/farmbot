# FarmBot (farmbot.curiosta.com) chat widget: notices

| File | Origin | License |
|---|---|---|
| `widget.js` | [manojsahukar/copilot-sdk-browser-tutor](https://github.com/manojsahukar/copilot-sdk-browser-tutor) `public/widget.js`, commit 02813e3, unchanged (sha256 02f0900934687a5a75a6f26d9386ddc8989e8075e72cc22fe583d1cc226d94eb). Its optional Hugging Face and Chrome on-device providers are left OFF: `data-providers` and `data-hf-client-id` are not set. | MIT |
| `widget.css` | Adapted from the same repo (`public/widget.css`) via the Kinetic site's skin; every rule scoped to `.btw-*` | MIT |
| `chat-loader.js` | Written for this site (per-site loader; not upstream) | same as this site |
| `vendor/marked.min.js` | [marked](https://github.com/markedjs/marked) v14.1.3 (sha256 1092c3ce33dd737edd02e780263f1476bf18278d81817af6403df6840f8034ab) | MIT |
| `vendor/purify.min.js` | [DOMPurify](https://github.com/cure53/DOMPurify) v3.4.17 (npm `dompurify@3.4.17`, `dist/purify.min.js`, sha256 cd37898f9782adf54820c413191b5691803f0f137c799d6edcfd38523b4c2c31) | Apache-2.0 OR MPL-2.0 |

All files are self-hosted. The widget talks only to `https://openrouter.ai` (sign-in and chat), using the visitor's own
OpenRouter account. This site holds no keys and runs no backend.
