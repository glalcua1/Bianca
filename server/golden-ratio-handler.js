import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import { runGoldenRatioFallback } from "./golden-ratio-fallback.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

// Ensure .env / .env.local are available to Python subprocess and Gemini fallback
Object.assign(
  process.env,
  loadEnv(process.env.NODE_ENV || "development", PROJECT_ROOT, ""),
);
const PYTHON_RUNNER = path.join(PROJECT_ROOT, "scripts", "run-golden-ratio.py");

function resolvePublicImage(imageUrl) {
  if (!imageUrl || typeof imageUrl !== "string") {
    return null;
  }
  const normalized = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
  const absolute = path.join(PROJECT_ROOT, "public", normalized);
  if (!absolute.startsWith(path.join(PROJECT_ROOT, "public"))) {
    return null;
  }
  return fs.existsSync(absolute) ? absolute : null;
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

  let result = await runPythonAnalysis(payload);

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
