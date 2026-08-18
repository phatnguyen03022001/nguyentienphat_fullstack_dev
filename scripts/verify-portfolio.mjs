import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

const [html, app, data, packageJson] = await Promise.all([
  read("index.html"),
  read("src/App.jsx"),
  read("src/data.js"),
  read("package.json").then(JSON.parse),
]);

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

expect(packageJson.engines?.node === ">=22 <23", "Node 22 runtime must stay pinned.");
expect(packageJson.packageManager === "npm@10.9.7", "npm version must stay pinned.");
expect(html.includes("Nguyen Tien Phat — Full-stack Developer"), "Page title is missing or changed.");
expect(html.includes('name="description"'), "Meta description is missing.");
expect(html.includes('rel="canonical" href="https://ntp-portfolio-neon.vercel.app/"'), "Canonical production URL is missing or changed.");
expect(html.includes('property="og:image"'), "Open Graph image is missing.");
expect(html.includes('name="twitter:card"'), "Twitter card metadata is missing.");
expect(html.includes('href="/favicon.svg"'), "SVG favicon is missing.");
expect(html.includes("application/ld+json"), "Person structured data is missing.");

expect(!app.includes("emailjs"), "EmailJS must not return to the client source.");
expect(!app.includes("portrait-fallback"), "Avatar fallback text must not return.");
expect(!app.includes("localhost:"), "Production source must not contain localhost URLs.");
expect(!data.includes("localhost:"), "Project data must not contain localhost URLs.");
expect(!data.includes("http://"), "Project/profile links must use HTTPS.");

const requiredFields = ["problem", "solution", "challenge", "tradeoff", "outcome", "decisions", "evidence"];
for (const field of requiredFields) {
  const occurrences = data.match(new RegExp(`\\b${field}\\s*:`, "g"))?.length ?? 0;
  expect(occurrences >= 3, `Project content field '${field}' must exist for all selected projects.`);
}

expect(data.includes("https://github.com/"), "GitHub proof links are missing.");
expect(data.includes("https://"), "External proof links are missing.");

if (failures.length) {
  console.error("Portfolio verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Portfolio verification passed.");
console.log("- Metadata and production URL: OK");
console.log("- Security/source hygiene: OK");
console.log("- Avatar fallback guard: OK");
console.log("- Project evidence model: OK");
console.log("- Runtime pinning: OK");
