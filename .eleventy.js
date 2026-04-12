const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const { minify: terserMinify } = require("terser");
const { PurgeCSS } = require("purgecss");
const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  // Copiar pasta de estilos diretamente para o output
  eleventyConfig.addPassthroughCopy("./imgs");
  eleventyConfig.addPassthroughCopy("./fonts");
  eleventyConfig.addPassthroughCopy("./catalogos");
  eleventyConfig.addPassthroughCopy("./_headers");

  // PurgeCSS + Minify CSS after build
  eleventyConfig.on("eleventy.after", async () => {
    const cssDir = "_site/styles";
    if (fs.existsSync(cssDir)) {
      const files = fs.readdirSync(cssDir).filter(f => f.endsWith(".css"));
      for (const file of files) {
        const filePath = path.join(cssDir, file);
        // PurgeCSS against all HTML
        const purged = await new PurgeCSS().purge({
          content: ["_site/**/*.html"],
          css: [filePath],
          safelist: {
            standard: [/active/, /visible/, /fade-in/, /open/],
            greedy: [/testimonial/, /product-card/, /filter-btn/]
          }
        });
        const purgedCSS = purged.length ? purged[0].css : fs.readFileSync(filePath, "utf8");
        // Minify
        const output = new CleanCSS({ level: 2 }).minify(purgedCSS);
        if (output.styles) {
          fs.writeFileSync(filePath, output.styles);
        }
      }
    }
  });

  // Minify JS after build
  eleventyConfig.on("eleventy.after", async () => {
    const jsDir = "_site/js";
    if (fs.existsSync(jsDir)) {
      const files = fs.readdirSync(jsDir).filter(f => f.endsWith(".js"));
      for (const file of files) {
        const filePath = path.join(jsDir, file);
        const input = fs.readFileSync(filePath, "utf8");
        const output = await terserMinify(input);
        if (output.code) {
          fs.writeFileSync(filePath, output.code);
        }
      }
    }
  });

  // Copy styles and JS (will be minified after build)
  eleventyConfig.addPassthroughCopy("./styles");
  eleventyConfig.addPassthroughCopy("./js");

	
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,  
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      });
    }

    return content;
  });
  eleventyConfig.addFilter("orderByDate", function (array, order = "desc") {
    if (!Array.isArray(array)) return [];

    function parseDate(str) {
      const [day, month, year] = str.split("/");
      return new Date(`${year}-${month}-${day}`); // formato ISO
    }

    return array.slice().sort((a, b) => {
      const dateA = parseDate(a?.data?.data || "");
      const dateB = parseDate(b?.data?.data || "");

      if (isNaN(dateA) || isNaN(dateB)) return 0;

      return order === "desc" ? dateB - dateA : dateA - dateB;
    });
  });
  eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));
  eleventyConfig.addCollection("cestas", function (collectionApi) {
    return collectionApi.getFilteredByGlob("cestas/*.md");
  });
  eleventyConfig.addFilter("today", () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // mês começa em 0
    const dd = String(now.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  // Extrair categorias únicas da coleção de cestas
  eleventyConfig.addFilter("uniqueCategories", function (collection) {
    const categories = collection
      .map(item => item.data.type)
      .filter(Boolean);
    return [...new Set(categories)];
  });

  // Extrair número do preço (ex: "R$ 185,00" → "185.00") para schema Product
  eleventyConfig.addFilter("priceNumber", function (priceStr) {
    if (!priceStr) return "0.00";
    const cleaned = priceStr.replace(/[^\d,\.]/g, "");
    const normalized = cleaned.replace(".", "").replace(",", ".");
    const num = parseFloat(normalized);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  });
  return {
    dir: {
      input: ".", // Pasta de entrada
      output: "_site" // Pasta de saída
    }
  };
  
};