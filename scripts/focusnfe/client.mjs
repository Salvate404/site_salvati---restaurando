import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const API_BASE = 'https://api.focusnfe.com.br/v2';

function loadEnvFile() {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

export function getToken() {
  loadEnvFile();
  const token = process.env.FOCUSNFE_TOKEN;
  if (!token) {
    throw new Error(
      'Defina FOCUSNFE_TOKEN no arquivo .env. Use o Token Principal de Produção do painel Focus NFe (Painel API > Tokens).'
    );
  }
  return token;
}

export async function criarEmpresa(empresa, { dryRun = true } = {}) {
  const token = getToken();
  const url = new URL(`${API_BASE}/empresas`);
  if (dryRun) url.searchParams.set('dry_run', '1');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${token}:`).toString('base64')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(empresa),
  });

  const text = await response.text();
  let data = text;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  return { ok: response.ok, status: response.status, data };
}
