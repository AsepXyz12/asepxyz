module.exports = {
    italic: (text) => `_${text}_`,
    bold: (text) => `*${text}*`,
    strikethrough: (text) => `~${text}~`,
    monospace: (text) => `\`\`\`${text}\`\`\``,
    quote: (text) => `> ${text}`,
    inlineCode: (text) => `\`${text}\``
};