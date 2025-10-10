export function floatMask(value: string, suffix?: string): string {
  // 1. Remove tudo que não for dígito.
  let sanitizedValue = value.replace(/[^\d]/g, '')

  // 2. Lógica para tratar exclusão do sufixo (backspace)
  // Esta lógica previne que o usuário delete o último dígito do valor
  // quando ele tenta apagar o sufixo (ex: "1,00 R$" -> apaga "R$").
  const isDeletingSuffix = suffix && value.endsWith(suffix.trim()) && value.length === sanitizedValue.length + suffix.trim().length + 1
  if (isDeletingSuffix) {
    sanitizedValue = sanitizedValue.slice(0, -1)
  }

  // 3. Remove zeros à esquerda (exceto se for "00" para manter a lógica de padding).
  // Se o valor for "000", ele vira "00", que o padStart transforma em "000"
  if (sanitizedValue.length > 2) {
    sanitizedValue = sanitizedValue.replace(/^0+/, '')
  }

  // 4. Se a string estiver vazia (ou após remover zeros), retorna string vazia.
  // Esta parte substitui a lógica de `Number(sanitizedValue) === 0` que era ineficiente.
  if (!sanitizedValue || Number(sanitizedValue) === 0) {
    return ''
  }

  // Garante que haja pelo menos 3 dígitos (para o formato X,XX).
  const paddedValue = sanitizedValue.padStart(3, '0')

  // A parte inteira é tudo exceto os últimos 2 dígitos.
  let integerPart = paddedValue.slice(0, -2)

  // Remove o zero extra que pode ter sido adicionado pelo padStart, se for o caso.
  if (integerPart.length > 1) {
    integerPart = integerPart.replace(/^0+/, '')
  }

  // Formata a parte inteira com separador de milhar (ponto).
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  // A parte decimal são os últimos 2 dígitos.
  const decimalPart = paddedValue.slice(-2)

  // Junta as partes usando vírgula (padrão BR)
  const finalValue = `${integerPart || '0'},${decimalPart}`

  // Retorna com ou sem sufixo
  return suffix ? `${finalValue} ${suffix.trim()}` : finalValue
}