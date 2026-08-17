const baseUrl = (process.argv[2] || process.env.QA_BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const checks = [];

function addCheck(label, path, options = {}) {
  checks.push({ label, path, ...options });
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, {
    redirect: options.redirect || "follow",
    headers: {
      "user-agent": "YukJadiLegal-QA/1.0",
    },
  });

  return {
    response,
    text: await response.text(),
  };
}

function extractSitemapLocations(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
}

function pathnameFromUrl(value) {
  try {
    const url = new URL(value);
    return `${url.pathname}${url.search}`;
  } catch {
    return value;
  }
}

async function run() {
  console.log(`\nYuk Jadi Legal — Route QA`);
  console.log(`Base URL: ${baseUrl}\n`);

  let sitemapLocations = [];

  try {
    const sitemap = await fetchText(`${baseUrl}/sitemap.xml`);
    if (!sitemap.response.ok) {
      throw new Error(`HTTP ${sitemap.response.status}`);
    }

    sitemapLocations = extractSitemapLocations(sitemap.text);
    console.log(`[OK] sitemap.xml (${sitemapLocations.length} URL)`);
  } catch (error) {
    console.error(`[FAIL] sitemap.xml — ${error instanceof Error ? error.message : error}`);
  }

  addCheck("robots.txt", "/robots.txt");
  addCheck("favicon.ico", "/favicon.ico");
  addCheck("Open Graph image", "/opengraph-image.png");
  addCheck("Twitter image", "/twitter-image.png");
  addCheck("Admin compatibility redirect", "/admin/dashboard");
  addCheck("KBLI API proxy", "/api/kbli?q=software&limit=1");

  for (const location of sitemapLocations) {
    addCheck(`Sitemap ${pathnameFromUrl(location)}`, pathnameFromUrl(location));
  }

  let failures = 0;

  for (const check of checks) {
    try {
      const response = await fetch(`${baseUrl}${check.path}`, {
        redirect: "follow",
        headers: {
          "user-agent": "YukJadiLegal-QA/1.0",
        },
      });

      if (response.status >= 400) {
        failures += 1;
        console.error(`[FAIL] ${check.label} — HTTP ${response.status}`);
        continue;
      }

      console.log(`[OK] ${check.label} — HTTP ${response.status}`);
    } catch (error) {
      failures += 1;
      console.error(`[FAIL] ${check.label} — ${error instanceof Error ? error.message : error}`);
    }
  }

  console.log("");

  if (failures) {
    console.error(`QA selesai dengan ${failures} kegagalan.`);
    process.exitCode = 1;
    return;
  }

  console.log("QA route selesai: semua pemeriksaan lolos.");
}

await run();
