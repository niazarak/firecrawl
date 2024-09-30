import "dotenv/config";

import { scrapeURL } from ".";
import { scrapeOptions } from "../../controllers/v1/types";

describe("Standalone scrapeURL tests", () => {
    it("Basic scrape", async () => {
        const out = await scrapeURL("test:scrape-basic", "https://www.roastmywebsite.ai/", scrapeOptions.parse({}));
    
        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).not.toHaveProperty("content");
            expect(out.document).toHaveProperty("markdown");
            expect(out.document).toHaveProperty("metadata");
            expect(out.document).not.toHaveProperty("html");
            expect(out.document.markdown).toContain("_Roast_");
            expect(out.document.metadata.error).toBeUndefined();
            expect(out.document.metadata.title).toBe("Roast My Website");
            expect(out.document.metadata.description).toBe(
                "Welcome to Roast My Website, the ultimate tool for putting your website through the wringer! This repository harnesses the power of Firecrawl to scrape and capture screenshots of websites, and then unleashes the latest LLM vision models to mercilessly roast them. 🌶️"
            );
            expect(out.document.metadata.keywords).toBe(
                "Roast My Website,Roast,Website,GitHub,Firecrawl"
            );
            expect(out.document.metadata.robots).toBe("follow, index");
            expect(out.document.metadata.ogTitle).toBe("Roast My Website");
            expect(out.document.metadata.ogDescription).toBe(
                "Welcome to Roast My Website, the ultimate tool for putting your website through the wringer! This repository harnesses the power of Firecrawl to scrape and capture screenshots of websites, and then unleashes the latest LLM vision models to mercilessly roast them. 🌶️"
            );
            expect(out.document.metadata.ogUrl).toBe(
                "https://www.roastmywebsite.ai"
            );
            expect(out.document.metadata.ogImage).toBe(
                "https://www.roastmywebsite.ai/og.png"
            );
            expect(out.document.metadata.ogLocaleAlternate).toStrictEqual([]);
            expect(out.document.metadata.ogSiteName).toBe("Roast My Website");
            expect(out.document.metadata.sourceURL).toBe(
                "https://www.roastmywebsite.ai/"
            );
            expect(out.document.metadata.statusCode).toBe(200);
        }
    
    }, 30000);

    it("Scrape with formats markdown and html", async () => {
        const out = await scrapeURL("test:scrape-formats-markdown-html", "https://roastmywebsite.ai", scrapeOptions.parse({
            formats: ["markdown", "html"],
        }));
    
        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty("markdown");
            expect(out.document).toHaveProperty("html");
            expect(out.document).toHaveProperty("metadata");
            expect(out.document.markdown).toContain("_Roast_");
            expect(out.document.html).toContain("<h1");
            expect(out.document.metadata.statusCode).toBe(200);
            expect(out.document.metadata.error).toBeUndefined();
        }
    
    }, 30000);

    it("Scrape with onlyMainContent disabled", async () => {
        const out = await scrapeURL("test:scrape-onlyMainContent-false", "https://www.scrapethissite.com/", scrapeOptions.parse({
            onlyMainContent: false,
        }));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty("markdown");
            expect(out.document).toHaveProperty("metadata");
            expect(out.document).not.toHaveProperty("html");
            expect(out.document.markdown).toContain("[FAQ](/faq/)"); // .nav
            expect(out.document.markdown).toContain("Hartley Brody 2023"); // #footer
        }
    }, 30000);

    it("Scrape with excludeTags", async () => {
        const out = await scrapeURL("test:scrape-excludeTags", "https://www.scrapethissite.com/", scrapeOptions.parse({
            onlyMainContent: false,
            excludeTags: ['.nav', '#footer', 'strong'],
        }));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty("markdown");
            expect(out.document).toHaveProperty("metadata");
            expect(out.document).not.toHaveProperty("html");
            expect(out.document.markdown).not.toContain("Hartley Brody 2023");
            expect(out.document.markdown).not.toContain("[FAQ](/faq/)");
        }
    }, 30000);

    it("Scrape of a page with 400 status code", async () => {
        const out = await scrapeURL("test:scrape-400", "https://httpstat.us/400", scrapeOptions.parse({}));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty('markdown');
            expect(out.document).toHaveProperty('metadata');
            expect(out.document.metadata.statusCode).toBe(400);
        }
    }, 30000);

    it("Scrape of a page with 401 status code", async () => {
        const out = await scrapeURL("test:scrape-401", "https://httpstat.us/401", scrapeOptions.parse({}));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty('markdown');
            expect(out.document).toHaveProperty('metadata');
            expect(out.document.metadata.statusCode).toBe(401);
        }
    }, 30000);

    it("Scrape of a page with 403 status code", async () => {
        const out = await scrapeURL("test:scrape-403", "https://httpstat.us/403", scrapeOptions.parse({}));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty('markdown');
            expect(out.document).toHaveProperty('metadata');
            expect(out.document.metadata.statusCode).toBe(403);
        }
    }, 30000);

    it("Scrape of a page with 404 status code", async () => {
        const out = await scrapeURL("test:scrape-404", "https://httpstat.us/404", scrapeOptions.parse({}));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty('markdown');
            expect(out.document).toHaveProperty('metadata');
            expect(out.document.metadata.statusCode).toBe(404);
        }
    }, 30000);

    it("Scrape of a page with 405 status code", async () => {
        const out = await scrapeURL("test:scrape-405", "https://httpstat.us/405", scrapeOptions.parse({}));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty('markdown');
            expect(out.document).toHaveProperty('metadata');
            expect(out.document.metadata.statusCode).toBe(405);
        }
    }, 30000);

    it("Scrape of a page with 500 status code", async () => {
        const out = await scrapeURL("test:scrape-500", "https://httpstat.us/500", scrapeOptions.parse({}));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty('markdown');
            expect(out.document).toHaveProperty('metadata');
            expect(out.document.metadata.statusCode).toBe(500);
        }
    }, 30000);

    it("Scrape with screenshot", async () => {
        const out = await scrapeURL("test:scrape-screenshot", "https://www.scrapethissite.com/", scrapeOptions.parse({
            formats: ["screenshot"],
        }));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty('screenshot');
            expect(typeof out.document.screenshot).toBe("string");
            expect(out.document).toHaveProperty('metadata');
            expect(out.document.metadata.statusCode).toBe(200);
            expect(out.document.metadata.error).toBeUndefined();
        }
    }, 30000);

    it("Scrape with full-page screenshot", async () => {
        const out = await scrapeURL("test:scrape-screenshot-fullPage", "https://www.scrapethissite.com/", scrapeOptions.parse({
            formats: ["screenshot@fullPage"],
        }));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty('screenshot');
            expect(typeof out.document.screenshot).toBe("string");
            expect(out.document).toHaveProperty('metadata');
            expect(out.document.metadata.statusCode).toBe(200);
            expect(out.document.metadata.error).toBeUndefined();
        }
    }, 30000);

    it("Scrape a redirected page", async () => {
        const out = await scrapeURL("test:scrape-screenshot-fullPage", "https://scrapethissite.com/", scrapeOptions.parse({}));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty('markdown');
            expect(out.document.markdown).toContain("Explore Sandbox");
            expect(out.document).toHaveProperty('metadata');
            expect(out.document.metadata.sourceURL).toBe("https://scrapethissite.com/");
            expect(out.document.metadata.url).toBe("https://www.scrapethissite.com/");
            expect(out.document.metadata.statusCode).toBe(200);
            expect(out.document.metadata.error).toBeUndefined();
        }
    }, 30000);

    it("Scrape of a PDF file", async () => {
        const out = await scrapeURL("test:scrape-pdf", "https://arxiv.org/pdf/astro-ph/9301001.pdf", scrapeOptions.parse({}));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty('metadata');
            expect(out.document.markdown).toContain('Broad Line Radio Galaxy');
            expect(out.document.metadata.statusCode).toBe(200);
            expect(out.document.metadata.error).toBeUndefined();
        }
    }, 60000);

    it("Scrape a DOCX file", async () => {
        const out = await scrapeURL("test:scrape-docx", "https://nvca.org/wp-content/uploads/2019/06/NVCA-Model-Document-Stock-Purchase-Agreement.docx", scrapeOptions.parse({}));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty('metadata');
            expect(out.document.markdown).toContain('SERIES A PREFERRED STOCK PURCHASE AGREEMENT');
            expect(out.document.metadata.statusCode).toBe(200);
            expect(out.document.metadata.error).toBeUndefined();
        }
    }, 60000)

    it("LLM extract with prompt and schema", async () => {
        const out = await scrapeURL("test:llm-extract-prompt-schema", "https://firecrawl.dev", scrapeOptions.parse({
            formats: ["extract"],
            extract: {
                prompt: "Based on the information on the page, find what the company's mission is and whether it supports SSO, and whether it is open source",
                schema: {
                    type: "object",
                    properties: {
                        company_mission: { type: "string" },
                        supports_sso: { type: "boolean" },
                        is_open_source: { type: "boolean" },
                    },
                    required: ["company_mission", "supports_sso", "is_open_source"],
                    additionalProperties: false,
                },
            },
        }));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty("extract");
            expect(out.document.extract).toHaveProperty("company_mission");
            expect(out.document.extract).toHaveProperty("supports_sso");
            expect(out.document.extract).toHaveProperty("is_open_source");
            expect(typeof out.document.extract.company_mission).toBe("string");
            expect(out.document.extract.supports_sso).toBe(false);
            expect(out.document.extract.is_open_source).toBe(true);
        }
    }, 120000)

    it("LLM extract with schema only", async () => {
        const out = await scrapeURL("test:llm-extract-schema", "https://firecrawl.dev", scrapeOptions.parse({
            formats: ["extract"],
            extract: {
                schema: {
                    type: "object",
                    properties: {
                        company_mission: { type: "string" },
                        supports_sso: { type: "boolean" },
                        is_open_source: { type: "boolean" },
                    },
                    required: ["company_mission", "supports_sso", "is_open_source"],
                    additionalProperties: false,
                },
            },
        }));

        expect(out.logs.length).toBeGreaterThan(0);
        expect(out.success).toBe(true);
        if (out.success) {
            expect(out.document).toHaveProperty("extract");
            expect(out.document.extract).toHaveProperty("company_mission");
            expect(out.document.extract).toHaveProperty("supports_sso");
            expect(out.document.extract).toHaveProperty("is_open_source");
            expect(typeof out.document.extract.company_mission).toBe("string");
            expect(out.document.extract.supports_sso).toBe(false);
            expect(out.document.extract.is_open_source).toBe(true);
        }
    }, 120000)

    test.concurrent.each(new Array(100).fill(0).map((_, i) => "https://www.scrapethissite.com/?i=" + i))("Concurrent scrapes", async (url) => {
        const id = "test:concurrent:" + url;
        const out = await scrapeURL(id, url, scrapeOptions.parse({}));

        const replacer = (key: string, value: any) => {
            if (value instanceof Error) {
                return {
                    ...value,
                    message: value.message,
                    name: value.name,
                    cause: value.cause,
                    stack: value.stack,
                }
            } else {
                return value;
            }
        }

        // verify that log collection works properly while concurrency is happening
        expect(out.logs.length).toBeGreaterThan(0);
        const weirdLogs = out.logs.filter(x => x.scrapeId !== id);
        if (weirdLogs.length > 0) {
            console.warn(JSON.stringify(weirdLogs, replacer));
        }
        expect(weirdLogs.length).toBe(0); 

        if (!out.success) console.error(JSON.stringify(out, replacer));
        expect(out.success).toBe(true);
        
        if (out.success) {
            expect(out.document).toHaveProperty('markdown');
            expect(out.document).toHaveProperty('metadata');
            expect(out.document.metadata.error).toBeUndefined();
            expect(out.document.metadata.statusCode).toBe(200);
        }
    }, 30000);
})
