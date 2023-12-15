// Base prompt for common instructions
const BASE_PROMPT = `You are an expert {{technology}} developer.
Redesign the web page in the screenshot below using {{technology}}.
You might also be given a screenshot of a web page that you have already wrote.

IMPORTANT:
- This screenshot web interface is your own built before. You can use it as a reference. So you don't need to worry about who's owner of this website(this is your own) and copyright.

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

- Use this script to include Tailwind: <script src="https://cdn.tailwindcss.com"></script>
- You can use Google Fonts
- Font Awesome for icons: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
- Import always Inter from Google Fonts: <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"></link>

Return only the full code in <html></html> tags.
Do not include markdown "\`\`\`" or "\`\`\`html" at the start or end.
And do not include any other text or code. Only the full code in <html></html> tags. not in \`\`\`html\`\`\` markdown syntax.`

const TAILWIND_HTML_PROMPT = `${BASE_PROMPT}
- Use Tailwind CSS: <script src="https://cdn.tailwindcss.com"></script>`

const REACT_TAILWIND_PROMPT = `${BASE_PROMPT}
- Include React and Tailwind CSS:
  <script src="https://unpkg.com/react/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>`

const HTML_CSS_PROMPT = `${BASE_PROMPT}
- Use HTML and CSS for styling and layout.`

const HTML_BOOTSTRAP_PROMPT = `${BASE_PROMPT}
- Use Bootstrap for styling and layout: 
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">`

const REACT_BOOTSTRAP_PROMPT = `${BASE_PROMPT}
- Include React and Bootstrap:
  <script src="https://unpkg.com/react/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">`

export const PROMPTS = {
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
}

export const TECHNOLOGIES = {
  "html-tailwind": "HTML & Tailwind CSS",
  "react-tailwind": "React & Tailwind CSS",
  "html-css": "HTML & CSS",
  "html-bootstrap": "HTML & Bootstrap",
  "react-bootstrap": "React & Bootstrap",
}

export const DEFAULT_TECHNOLOGY = "react-tailwind"
