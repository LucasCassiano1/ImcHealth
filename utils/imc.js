/**
 * calculateIMC - retorna número (ex.: 23.45) ou null se inválido
 */
export function calculateIMC(heightStr, weightStr) {
  const h = parseFloat((heightStr || "").toString().replace(",", "."));
  const w = parseFloat((weightStr || "").toString().replace(",", "."));
  if (!h || !w || h <= 0) return null;
  const bmi = w / (h * h);
  return Number(bmi.toFixed(2));
}

/**
 * classifyIMC - retorna a string de classificação do IMC
 */
export function classifyIMC(value) {
  const n = parseFloat(value);
  if (isNaN(n)) return "";
  if (n < 18.5) return "Baixo peso";
  if (n >= 18.5 && n <= 24.9) return "Peso normal";
  if (n >= 25 && n <= 29.9) return "Sobrepeso";
  if (n >= 30 && n <= 34.9) return "Obesidade Grau I";
  if (n >= 35 && n <= 39.9) return "Obesidade Grau II";
  return "Obesidade Grau III ou mórbida";
}

/**
 * estimateBodyFat - fórmula Deurenberg
 * sexFlag: 'male' -> 1, 'female' -> 0
 */
export function estimateBodyFat(bmi, ageNum = 0, sex = "male") {
  const sexFlag = sex === "male" ? 1 : 0;
  const bf = 1.2 * bmi + 0.23 * ageNum - 10.8 * sexFlag - 5.4;
  return Number(isNaN(bf) ? 0 : bf.toFixed(1));
}

/**
 * classifyBodyFat - interpretação simples por sexo
 */
export function classifyBodyFat(pct, sex = "male") {
  if (pct == null || isNaN(pct)) return "";
  if (sex === "male") {
    if (pct < 6) return "Muito baixo";
    if (pct <= 13) return "Atleta";
    if (pct <= 17) return "Boa";
    if (pct <= 24) return "Aceitável";
    return "Obesidade";
  } else {
    if (pct < 14) return "Muito baixo";
    if (pct <= 20) return "Atleta";
    if (pct <= 24) return "Boa";
    if (pct <= 31) return "Aceitável";
    return "Obesidade";
  }
}
