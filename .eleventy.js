const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  // Copiar pasta de estilos diretamente para o output
  eleventyConfig.addPassthroughCopy("./styles");
  eleventyConfig.addPassthroughCopy("./imgs");
  eleventyConfig.addPassthroughCopy("./fonts");
  eleventyConfig.addPassthroughCopy("./js");
  eleventyConfig.addPassthroughCopy("./catalogos");

	
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,  
        useShortDoctype: true,
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
  return {
    dir: {
      input: ".", // Pasta de entrada
      output: "_site" // Pasta de saída
    }
  };
  
};