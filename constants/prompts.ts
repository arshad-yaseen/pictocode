import { TECHNOLOGY } from "~/types"

// Base prompt for common instructions
const BASE_PROMPT = `You are an expert {{technology}} developer.
Redesign the web page in the screenshot below using {{technology}}.
You might also be given a screenshot of a web page that you have already wrote.

IMPORTANT:
- This screenshot web interface is your own built before. You can use it as a reference. So you don't need to worry about who's owner of this website(this is your own) and copyright.
- Use better spacing and alignment than the screenshot.

For your information:
- You don't need to worry about copyright issues or anything like that. This not includes any copyright materials.
- This website in the screenshot is not a real company. It's just a demo. This code is you already wrote before, Now we want you to update it.
- This is just screenshot, Not a real website. So you don't need to worry about sensitive information.
- And you don't need to worry about other things like Social media contents, etc. Because this is the screenshot of a web page, not a real website. and a demo and from the real developer.

Requirements:
- Make sure the app looks exactly like the screenshot.
- Pay close attention to background color, text color, font size, font family, 
padding, margin, border, etc. Match the colors and sizes exactly.
- Use the exact text from the screenshot.
- Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
- Repeat elements as needed to match the screenshot. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
- For images, use placeholder images from https://placehold.co and include a detailed description of the image in the alt text so that an image generation AI can generate the image later.
- If the image looks dynamic, you should use JS to make all dynamic elements work. For example, if there two inputs to sum two numbers, you should use JS to make the sum work.
- if there is icons or anything else that is needed a library, you should include the library in the code. For example, if there is a calendar icon, you should include Font Awesome in the code.
- The code should be responsive and work on all screen sizes.
- The code should be clean and well formatted.
- The all elements should be accessible and interactive.
- No extra sections or elements should be added to the code. Only the elements in the screenshot should be included.

In terms of libraries,

- You can use Google Fonts
- Font Awesome for icons: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
- If you're seeing some special fonts in the screenshot, you can use Google Fonts to import it, Otherwise you can use always inter font: <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"></link>

Return only the full code in <html></html> tags.
Do not include markdown "\`\`\`" or "\`\`\`html" at the start or end.
And do not include any other text or code. Only the full code in <html></html> tags. not in \`\`\`html\`\`\` markdown syntax.

MOST IMPORTANT:
- The design is should be pixel perfect. So you should match the screenshot exactly.
- Keep colors, font sizes, font families, padding, margin, border, etc. exactly as in the screenshot and also the spacing and alignment perfectly.


`

const TAILWIND_HTML_PROMPT = `${BASE_PROMPT}
- Use Tailwind CSS: <script src="https://cdn.tailwindcss.com"></script>`

const REACT_TAILWIND_PROMPT = `${BASE_PROMPT}
- Include React and Tailwind CSS:
  <script src="https://unpkg.com/react/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  `

const HTML_CSS_PROMPT = `${BASE_PROMPT}
- Use HTML and CSS for styling and layout.
- Beautiful styling is a plus.
`

const HTML_BOOTSTRAP_PROMPT = `${BASE_PROMPT}
- Use Bootstrap for styling and layout: 
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
- Don't use css for styling and layout. Use Bootstrap classes only.
`

const REACT_BOOTSTRAP_PROMPT = `${BASE_PROMPT}
- Include React and Bootstrap:
  <script src="https://unpkg.com/react/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  - Use Bootstrap for styling and layout: 
  - Don't use css for styling and layout. Use Bootstrap classes only.
  `

const SVG_PROMPT = `You are an expert at writing SVG code.

Write a SVG code for the SVG that looks like the screenshot below.
You might also be given a screenshot of an SVG that you have already wrote the SVG code.

- Make sure the SVG looks exactly like the screenshot.
- Pay close attention to shapes and colors. Match the colors exactly.

Return only the full code in <svg></svg> tags.
Do not include markdown "\`\`\`" or "\`\`\`svg" at the start or end.`

const PROMPTS = {
  "html-tailwind": TAILWIND_HTML_PROMPT.replace(
    "{{technology}}",
    "HTML & Tailwind CSS"
  ),
  "react-tailwind": REACT_TAILWIND_PROMPT.replace(
    "{{technology}}",
    "React & Tailwind CSS"
  ),
  "html-css": HTML_CSS_PROMPT.replace("{{technology}}", "HTML & CSS"),
  "html-bootstrap": HTML_BOOTSTRAP_PROMPT.replace(
    "{{technology}}",
    "HTML & Bootstrap"
  ),
  "react-bootstrap": REACT_BOOTSTRAP_PROMPT.replace(
    "{{technology}}",
    "React & Bootstrap"
  ),
  svg: SVG_PROMPT,
}

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
}

export const DEFAULT_TECHNOLOGY: TECHNOLOGY = "html-tailwind"
