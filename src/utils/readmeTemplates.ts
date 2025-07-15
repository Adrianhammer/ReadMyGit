import { ProjectInfo, ReadmeTemplate } from '@/types';

export const generateReadme = (projectInfo: ProjectInfo, templateId: string = 'modern'): string => {
  const templates = {
    modern: generateModernTemplate,
    minimal: generateMinimalTemplate,
    detailed: generateDetailedTemplate,
    creative: generateCreativeTemplate
  };

  const generator = templates[templateId as keyof typeof templates] || templates.modern;
  return generator(projectInfo);
};

const generateModernTemplate = (info: ProjectInfo): string => {
  return `<div align="center">

# ${info.name || 'Project Name'}

${info.description || 'Project description'}

${info.github ? `[![GitHub stars](https://img.shields.io/github/stars/${info.github.replace('https://github.com/', '')}?style=social)](${info.github}/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/${info.github.replace('https://github.com/', '')}?style=social)](${info.github}/network)
[![GitHub issues](https://img.shields.io/github/issues/${info.github.replace('https://github.com/', '')})](${info.github}/issues)` : ''}
${info.license ? `[![License](https://img.shields.io/badge/license-${info.license}-blue.svg)](LICENSE)` : ''}

${info.demo || info.github ? `[${info.demo ? 'Demo' : ''}](${info.demo})${info.demo && info.github ? ' • ' : ''}${info.github ? `[Report Bug](${info.github}/issues) • [Request Feature](${info.github}/issues)` : ''}` : ''}

</div>

---

${info.purpose ? `## 🎯 Purpose

${info.purpose}

` : ''}${info.features.length > 0 ? `## ✨ Features

${info.features.map(feature => `- ${feature}`).join('\n')}

` : ''}${info.technologies.length > 0 ? `## 🛠️ Built With

${info.technologies.map(tech => `- ${tech}`).join('\n')}

` : ''}

${info.prerequisites.length > 0 || info.installation ? `## 🚀 Getting Started

${info.prerequisites.length > 0 ? `### Prerequisites

${info.prerequisites.map(req => `- ${req}`).join('\n')}

` : ''}${info.installation ? `### Installation

\`\`\`bash
${info.installation}
\`\`\`

` : ''}` : ''}${info.usage ? `## 📖 Usage

${info.usage}

` : ''}

${info.api ? `## 🔌 API Reference

${info.api}

` : ''}${info.deployment ? `## 🚀 Deployment

${info.deployment}

` : ''}${info.roadmap.length > 0 ? `## 🗺️ Roadmap

${info.roadmap.map(item => `- [ ] ${item}`).join('\n')}

` : ''}${info.contributing ? `## 🤝 Contributing

${info.contributing}

` : ''}

${info.license ? `## 📄 License

Distributed under the ${info.license} License. See \`LICENSE\` for more information.

` : ''}${info.author ? `## 👤 Author

**${info.author}**

${info.github ? `- GitHub: [@${info.github.split('/').pop()}](${info.github})` : ''}
${info.email ? `- Email: ${info.email}` : ''}

` : ''}

${info.acknowledgments ? `## 🙏 Acknowledgments

${info.acknowledgments}

` : ''}

---

${info.author ? `<div align="center">
Made with ❤️ by ${info.author}
</div>` : ''}`;
};

const generateMinimalTemplate = (info: ProjectInfo): string => {
  return `# ${info.name || 'Project Name'}

${info.description || 'Project description'}

${info.installation ? `## Installation

\`\`\`bash
${info.installation}
\`\`\`

` : ''}${info.usage ? `## Usage

${info.usage}

` : ''}${info.license ? `## License

${info.license}` : ''}`;
};

const generateDetailedTemplate = (info: ProjectInfo): string => {
  const sections = [];
  
  // Build table of contents based on available content
  const toc = ['- [Description](#description)'];
  if (info.purpose) toc.push('- [Purpose](#purpose)');
  if (info.features.length > 0) toc.push('- [Features](#features)');
  if (info.technologies.length > 0) toc.push('- [Technologies](#technologies)');
  if (info.prerequisites.length > 0 || info.installation) toc.push('- [Getting Started](#getting-started)');
  if (info.usage) toc.push('- [Usage](#usage)');
  if (info.api) toc.push('- [API](#api)');
  if (info.deployment) toc.push('- [Deployment](#deployment)');
  if (info.contributing) toc.push('- [Contributing](#contributing)');
  if (info.license) toc.push('- [License](#license)');
  if (info.author || info.email || info.github) toc.push('- [Contact](#contact)');

  return `# ${info.name || 'Project Name'}

${toc.length > 1 ? `## Table of Contents

${toc.join('\n')}

` : ''}## Description

${info.description || 'Project description'}

${info.purpose ? `## Purpose

${info.purpose}

` : ''}${info.features.length > 0 ? `## Features

${info.features.map((feature, index) => `${index + 1}. ${feature}`).join('\n')}

` : ''}${info.technologies.length > 0 ? `## Technologies

${info.technologies.map(tech => `- **${tech}**`).join('\n')}

` : ''}${info.prerequisites.length > 0 || info.installation ? `## Getting Started

${info.prerequisites.length > 0 ? `### Prerequisites

${info.prerequisites.map(req => `- ${req}`).join('\n')}

` : ''}${info.installation ? `### Installation

\`\`\`bash
${info.installation}
\`\`\`

` : ''}` : ''}${info.usage ? `## Usage

${info.usage}

` : ''}${info.api ? `## API

${info.api}

` : ''}${info.deployment ? `## Deployment

${info.deployment}

` : ''}${info.contributing ? `## Contributing

${info.contributing}

` : ''}${info.license ? `## License

This project is licensed under the ${info.license} License - see the LICENSE file for details.

` : ''}${info.author || info.email || info.github ? `## Contact

${info.author ? `${info.author}${info.email ? ` - ${info.email}` : ''}` : ''}

${info.github ? `Project Link: [${info.github}](${info.github})` : ''}` : ''}`;
};

const generateCreativeTemplate = (info: ProjectInfo): string => {
  const navLinks = [];
  if (info.features.length > 0) navLinks.push('<a href="#-features">Features</a>');
  if (info.installation) navLinks.push('<a href="#-installation">Installation</a>');
  if (info.usage) navLinks.push('<a href="#-usage">Usage</a>');
  if (info.contributing) navLinks.push('<a href="#-contributing">Contributing</a>');
  if (info.license) navLinks.push('<a href="#-license">License</a>');

  return `<h1 align="center">
  <br>
  🚀 ${info.name || 'Project Name'}
  <br>
</h1>

<h4 align="center">${info.description || 'Project description'}</h4>

${navLinks.length > 0 ? `<p align="center">
  ${navLinks.join(' • ')}
</p>

` : ''}<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-❤️-red.svg" alt="Made with love">
  ${info.license ? `<img src="https://img.shields.io/badge/License-${info.license}-blue.svg" alt="License">` : ''}
</p>

---

${info.purpose ? `## 🎯 What's This About?

${info.purpose}

` : ''}${info.features.length > 0 ? `## ✨ Features

${info.features.map(feature => `🔥 ${feature}`).join('\n\n')}

` : ''}${info.technologies.length > 0 ? `## 🛠️ Tech Stack

${info.technologies.map(tech => `• ${tech}`).join('\n')}

` : ''}${info.installation ? `## 🚀 Quick Start

\`\`\`bash
${info.installation}
\`\`\`

` : ''}${info.usage ? `## 📚 How to Use

${info.usage}

` : ''}${info.contributing ? `## 🤝 Want to Contribute?

${info.contributing}

` : ''}${info.license ? `## 📄 License

Licensed under ${info.license}${info.author ? ` © ${info.author}` : ''}

` : ''}${info.author && info.github ? `---

<p align="center">
  Made with 💻 and ☕ by <a href="${info.github}">${info.author}</a>
</p>` : ''}`;
};

export const readmeTemplates: ReadmeTemplate[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, professional template with badges and emojis',
    preview: '# Project Name\n\n✨ Features\n🛠️ Built With\n🚀 Getting Started'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple, straightforward template',
    preview: '# Project Name\n\nDescription\n\n## Installation\n## Usage\n## License'
  },
  {
    id: 'detailed',
    name: 'Detailed',
    description: 'Comprehensive template with table of contents',
    preview: '# Project Name\n\n## Table of Contents\n- Description\n- Features\n- Installation'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Eye-catching template with custom styling',
    preview: '🚀 Project Name\n\n🎯 What\'s This About?\n✨ Features\n🛠️ Tech Stack'
  }
];