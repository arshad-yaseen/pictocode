import { TECHNOLOGY } from "~/types";

// Base prompt for common instructions
const BASE_PROMPT = `
You are an expert {{technology}} developer.

Your task is to redesign the web page shown in the screenshot using {{technology}}.

IMPORTANT:

- This screenshot shows a web interface you previously created. Use it as a reference.
- Focus on better spacing and alignment than the screenshot.

For your information:

- There are no copyright issues involved. This is your own work.
- The website in the screenshot is a demo, not a real company.
- Treat the screenshot as a mock-up, not a real website with sensitive information.

Requirements:

- Ensure the app looks exactly like the screenshot.
- Pay close attention to background color, text color, font size, font family, padding, margin, border, etc.
- Use the exact text from the screenshot.
- Write the full code without placeholders or comments like "<!-- Add other navigation links as needed -->".
- For images, use placeholders from https://placehold.co with detailed alt text for future AI image generation.
- Implement JS for any dynamic elements (e.g., input fields for calculations).
- Include necessary libraries for any icons or special functionalities (e.g., Font Awesome for icons).
- Ensure the code is responsive and works on all screen sizes.
- Keep the code clean, well-formatted, accessible, and interactive.
- Do not add extra sections or elements not present in the screenshot.

Libraries and Fonts:

- You can use Google Fonts.
- Use Font Awesome for icons: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
- If special fonts are shown in the screenshot, use Google Fonts to import them. Otherwise, use the Inter font: <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">

Return only the full code within <html></html> tags. Do not include any markdown or additional text.

MOST IMPORTANT:

- Ensure pixel-perfect design matching the screenshot exactly.
- Keep colors, font sizes, font families, padding, margin, border, etc. exactly as in the screenshot, with perfect spacing and alignment.
`;

const TAILWIND_HTML_PROMPT = `${BASE_PROMPT}
- Use Tailwind CSS: <script src="https://cdn.tailwindcss.com"></script>`;

const REACT_TAILWIND_PROMPT = `${BASE_PROMPT}
- Include React and Tailwind CSS:
  <script src="https://unpkg.com/react/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>`;

const HTML_CSS_PROMPT = `${BASE_PROMPT}
- Use HTML and CSS for styling and layout.
- Ensure beautiful styling.`;

const HTML_BOOTSTRAP_PROMPT = `${BASE_PROMPT}
- Use Bootstrap for styling and layout:
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
- Use only Bootstrap classes for styling and layout.`;

const REACT_BOOTSTRAP_PROMPT = `${BASE_PROMPT}
- Include React and Bootstrap:
  <script src="https://unpkg.com/react/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
- Use only Bootstrap classes for styling and layout.`;

const SVG_PROMPT = `
You are an expert at writing SVG code.

Write SVG code that matches the provided screenshot exactly.

- Ensure shapes and colors are matched precisely.

Return only the full code within <svg></svg> tags without any markdown or additional text.`;

const PROMPTS = {
  "html-tailwind": TAILWIND_HTML_PROMPT.replace("{{technology}}", "HTML & Tailwind CSS"),
  "react-tailwind": REACT_TAILWIND_PROMPT.replace("{{technology}}", "React & Tailwind CSS"),
  "html-css": HTML_CSS_PROMPT.replace("{{technology}}", "HTML & CSS"),
  "html-bootstrap": HTML_BOOTSTRAP_PROMPT.replace("{{technology}}", "HTML & Bootstrap"),
  "react-bootstrap": REACT_BOOTSTRAP_PROMPT.replace("{{technology}}", "React & Bootstrap"),
  svg: SVG_PROMPT,
};

export const TECHNOLOGIES: Record<
  TECHNOLOGY,
  { name: string; prompt: string; beta?: boolean }
> = {
  "html-tailwind": {
    name: "HTML & Tailwind CSS",
    prompt: PROMPTS["html-tailwind"],
  },
  "react-tailwind": {
    name: "React & Tailwind CSS",
    prompt: PROMPTS["react-tailwind"],
  },
  "html-css": {
    name: "HTML & CSS",
    prompt: PROMPTS["html-css"],
  },
  "html-bootstrap": {
    name: "HTML & Bootstrap",
    prompt: PROMPTS["html-bootstrap"],
  },
  "react-bootstrap": {
    name: "React & Bootstrap",
    prompt: PROMPTS["react-bootstrap"],
  },
  svg: {
    name: "SVG",
    prompt: PROMPTS["svg"],
    beta: true,
  },
};

export const DEFAULT_TECHNOLOGY: TECHNOLOGY = "html-tailwind";
