import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runGoldenRatioFallback } from "./golden-ratio-fallback.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

/** Local dev only — Vercel injects env vars; avoid importing Vite in serverless bundles */
function loadLocalEnvFiles() {
  if (process.env.VERCEL) return;
  for (const name of [".env.local", ".env"]) {
    const envPath = path.join(PROJECT_ROOT, name);
    if (!fs.existsSync(envPath)) continue;
    for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
    }
  }
}

loadLocalEnvFiles();
const PYTHON_RUNNER = path.join(PROJECT_ROOT, "scripts", "run-golden-ratio.py");

function resolvePublicImage(imageUrl) {
  if (!imageUrl || typeof imageUrl !== "string") {
    return null;
  }
  const normalized = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
  const roots = ["public", "dist"];
  for (const root of roots) {
    const base = path.join(PROJECT_ROOT, root);
    const absolute = path.join(base, normalized);
    if (!absolute.startsWith(base)) continue;
    if (fs.existsSync(absolute)) return absolute;
  }
  return null;
}

function runPythonAnalysis(payload) {
  return new Promise((resolve) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "bianca-gr-"));
    const payloadPath = path.join(tmpDir, "payload.json");
    fs.writeFileSync(payloadPath, JSON.stringify(payload));

    const venvPython = path.join(PROJECT_ROOT, ".venv-golden-ratio", "bin", "python");
    const pythonCmd = process.env.GOLDEN_RATIO_PYTHON
      || (fs.existsSync(venvPython) ? venvPython : "python3");
    const certifiCa = path.join(
      PROJECT_ROOT,
      ".venv-golden-ratio",
      "lib",
      `python${process.env.PYTHON_VERSION || "3.13"}`,
      "site-packages",
      "certifi",
      "cacert.pem",
    );
    const childEnv = {
      ...process.env,
      PYTHONPATH: path.join(PROJECT_ROOT, "scripts"),
    };
    if (fs.existsSync(certifiCa)) {
      childEnv.SSL_CERT_FILE = certifiCa;
      childEnv.REQUESTS_CA_BUNDLE = certifiCa;
    }

    const child = spawn(pythonCmd, [PYTHON_RUNNER, payloadPath], {
      cwd: PROJECT_ROOT,
      env: childEnv,
    });

    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("close", (code) => {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch {
        /* ignore */
      }

      if (code !== 0) {
        resolve({
          ok: false,
          error: stderr.trim() || `python_exit_${code}`,
        });
        return;
      }

      try {
        const lastLine = stdout.trim().split("\n").pop();
        resolve(JSON.parse(lastLine));
      } catch {
        resolve({ ok: false, error: "invalid_python_output", detail: stdout.slice(0, 500) });
      }
    });
  });
}

export async function handleGoldenRatioRequest(body) {
  const { image, category = "rings", title = "Atelier piece", productCode = "" } = body ?? {};

  const imagePath = resolvePublicImage(image);
  if (!imagePath) {
    return {
      status: 400,
      body: { ok: false, error: "image_not_found", message: "Could not resolve jewellery image on server." },
    };
  }

  const payload = {
    imagePath,
    category,
    title,
    productCode,
  };

  let result = process.env.VERCEL
    ? await runGoldenRatioFallback(payload)
    : await runPythonAnalysis(payload);

  if (!result.ok) {
    result = await runGoldenRatioFallback(payload);
    if (!result.ok) {
      return {
        status: 500,
        body: {
          ok: false,
          error: result.error || "analysis_failed",
          message: "Golden ratio analysis could not be completed.",
        },
      };
    }
  }

  return {
    status: 200,
    body: result,
  };
}
