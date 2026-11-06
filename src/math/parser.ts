/**
 * Prepara e normaliza a expressão matemática inserida na calculadora
 * para compatibilidade segura com o parser do mathjs.
 */
export function sanitizeMathExpression(expr: string): string {
  if (!expr || !expr.trim()) return '';

  let sanitized = expr.trim();

  // Substituições de símbolos visuais comuns
  sanitized = sanitized
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/–/g, '-')
    .replace(/π/g, 'pi')
    .replace(/√\(([^)]+)\)/g, 'sqrt($1)')
    .replace(/√([0-9a-zA-Z.]+)/g, 'sqrt($1)')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3');

  // Tratar porcentagem: converte x% para (x / 100)
  sanitized = sanitized.replace(/([0-9.]+)%/g, '($1 / 100)');

  // Tratar ln(x) como log(x) do mathjs (logaritmo natural)
  sanitized = sanitized.replace(/\bln\(/g, 'log(');

  // Inserir multiplicação implícita segura: ex: 2(3) -> 2*(3), (2)(3) -> (2)*(3)
  // Mas não transformar nomes de função como log10(x) ou log2(x)
  sanitized = sanitized
    .replace(/\b(\d+)\s*\(/g, '$1*(')
    .replace(/\)\s*(\d+)/g, ')*$1')
    .replace(/\)\s*\(/g, ')*(')
    .replace(/(\d+)\s*(pi|e|sqrt|sin|cos|tan|log\b)/gi, '$1*$2');

  return sanitized;
}
