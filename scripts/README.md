# Waitlist → Google Sheets

`waitlist-sheet.gs` é o destino dos leads. São ~5 minutos, uma vez só.

## 1. Criar a planilha e colar o script

1. Nova planilha em [sheets.new](https://sheets.new). Nomeie (ex.: `Qlareo — waitlist`).
2. **Extensões › Apps Script**.
3. Apague o `function myFunction() {}` e cole o conteúdo de `waitlist-sheet.gs`.
4. Salve (Ctrl+S).

A aba `leads` e o cabeçalho são criados sozinhos no primeiro envio.

## 2. Definir o token

O web app fica numa URL pública — o token é o que impede terceiros de escrever
na sua planilha.

1. No editor do Apps Script: **⚙ Configurações do projeto**.
2. Em **Propriedades do script**, **Adicionar propriedade**:
   - Propriedade: `WAITLIST_TOKEN`
   - Valor: uma string aleatória longa

Para gerar uma:

```powershell
$rng = [Security.Cryptography.RNGCryptoServiceProvider]::new()
$bytes = New-Object byte[] 32
$rng.GetBytes($bytes); $rng.Dispose()
($bytes | ForEach-Object { $_.ToString("x2") }) -join ""
```

Guarde esse valor — é o `WAITLIST_WEBHOOK_TOKEN` da LP.

## 3. Publicar como Web app

1. **Implantar › Nova implantação**.
2. Engrenagem ao lado de "Selecione o tipo" › **App da Web**.
3. Configure:
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa** ← sem isto o Google devolve a tela
     de login e o `doPost` nunca roda; a LP recebe o mesmo erro com token certo
     ou errado.
4. **Implantar** e autorize (o aviso "app não verificado" é esperado —
   é o seu próprio script: **Avançado › Acessar <nome>**).
5. Copie a **URL do app da Web** (termina em `/exec`).

> "Qualquer pessoa" é obrigatório: quem chama é o servidor da LP, sem sessão
> Google. O token é a autenticação real.

## 4. Ligar na LP

`.env.local` (dev) e nas env vars da Vercel (produção):

```
WAITLIST_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
WAITLIST_WEBHOOK_TOKEN=<o mesmo valor do passo 2>
```

## 5. Testar

Teste **pela rota da LP**, não com `curl` direto no `/exec`: ao seguir o
redirect do Google, o curl reenvia o POST sem `Content-Length` e leva um
`411`. O `fetch` do Node (que a rota usa) trata isso corretamente.

```powershell
$body = @{ name = "Teste"; email = "teste@exemplo.com"; company = "Loja X"; source = "curl" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/waitlist" -Method Post -Body $body -ContentType "application/json"
```

Esperado: `ok: True` e uma linha nova na planilha.

## Ao alterar o script depois

**Implantar › Gerenciar implantações › ✏️ › Versão: Nova versão › Implantar.**
Uma "Nova implantação" gera outra URL e a LP continua na antiga.
