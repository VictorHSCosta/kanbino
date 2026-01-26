# Profile API Endpoints

## Visão Geral

A API de perfil permite que usuários autenticados gerenciem suas fotos de perfil e informações pessoais.

## Base URL

```
http://localhost:3000/api
```

## Autenticação

Todos os endpoints requerem autenticação. O usuário deve estar logado via Google OAuth ou LinkedIn OAuth.

### Headers de Autenticação

A autenticação é gerenciada automaticamente via cookies de sessão. Não é necessário enviar headers manualmente no frontend.

## Endpoints

### 1. Upload de Foto de Perfil

Faz upload de uma nova foto de perfil para o usuário autenticado.

```
POST /api/profile/photo
```

#### Requisição

**Method**: `POST`

**Content-Type**: `multipart/form-data`

**Body Parameters**:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `photo` | File | Sim | Arquivo de imagem (JPEG, PNG, WEBP, GIF) |

**Validações**:

- Tamanho máximo: 5MB
- Tipos aceitos: `image/jpeg`, `image/jpg`, `image/png`, `image/webp`, `image/gif`

#### Exemplo de Requisição

```javascript
const formData = new FormData();
formData.append('photo', fileInput.files[0]);

fetch('/api/profile/photo', {
  method: 'POST',
  body: formData,
  credentials: 'include', // Importante para envio de cookies
})
  .then(response => response.json())
  .then(data => {
    console.log(data.photoUrl);
  });
```

#### Resposta de Sucesso

**Status**: `200 OK`

```json
{
  "success": true,
  "photoUrl": "/uploads/profile-photos/profile-1737876543-abc123def456.jpg",
  "message": "Foto de perfil atualizada com sucesso!"
}
```

#### Respostas de Erro

**400 Bad Request** - Nenhum arquivo enviado:

```json
{
  "error": "Bad Request",
  "message": "Nenhum arquivo enviado. Selecione uma foto para upload."
}
```

**401 Unauthorized** - Usuário não autenticado:

```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

**413 Payload Too Large** - Arquivo muito grande:

```json
{
  "error": "Payload Too Large",
  "message": "Arquivo muito grande. Tamanho máximo: 5MB."
}
```

**415 Unsupported Media Type** - Tipo de arquivo inválido:

```json
{
  "error": "Unsupported Media Type",
  "message": "Tipo de arquivo inválido. Use: JPEG, PNG, WEBP ou GIF."
}
```

**500 Internal Server Error** - Erro no servidor:

```json
{
  "error": "Internal Server Error",
  "message": "Erro ao fazer upload da foto. Tente novamente."
}
```

---

### 2. Obter Perfil do Usuário

Retorna as informações do perfil do usuário autenticado.

```
GET /api/profile
```

#### Requisição

**Method**: `GET`

**Headers**: Nenhum necessário (autenticação via cookie)

#### Exemplo de Requisição

```javascript
fetch('/api/profile', {
  method: 'GET',
  credentials: 'include',
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
```

#### Resposta de Sucesso

**Status**: `200 OK`

```json
{
  "id": "user-123456789",
  "email": "usuario@email.com",
  "displayName": "João Silva",
  "firstName": "João",
  "lastName": "Silva",
  "photo": "/uploads/profile-photos/profile-1737876543-abc123def456.jpg",
  "provider": "google",
  "profileUrl": "https://linkedin.com/in/joaosilva",
  "createdAt": "2025-01-26T10:30:00.000Z"
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID único do usuário |
| `email` | string | Email do usuário |
| `displayName` | string | Nome completo para exibição |
| `firstName` | string | Primeiro nome |
| `lastName` | string | Sobrenome |
| `photo` | string \| null | URL da foto de perfil (pode ser null) |
| `provider` | string | Provedor de autenticação (google/linkedin) |
| `profileUrl` | string \| null | URL do perfil do LinkedIn |
| `createdAt` | string | Data de criação da conta (ISO 8601) |

#### Respostas de Erro

**401 Unauthorized** - Usuário não autenticado:

```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

**500 Internal Server Error** - Erro no servidor:

```json
{
  "error": "Internal Server Error",
  "message": "Erro ao buscar perfil do usuário."
}
```

---

## Configuração do Multer

A configuração de upload é feita através do middleware Multer:

```typescript
// src/middleware/upload.config.ts
export const uploadProfilePhoto = uploadMiddleware.single('photo');

// Configurações:
{
  storage: multer.diskStorage({
    destination: 'src/public/uploads/profile-photos/',
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${randomBytes(6).toString('hex')}`;
      const ext = path.extname(file.originalname);
      cb(null, `profile-${uniqueSuffix}${ext}`);
    }
  }),
  fileFilter: {
    allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1
  }
}
```

## Armazenamento de Arquivos

### Estrutura de Diretórios

```
src/public/
└── uploads/
    └── profile-photos/
        ├── profile-1737876543-abc123def456.jpg
        ├── profile-1737876600-xyz789uvw012.png
        └── ...
```

### Nome de Arquivo

Os arquivos são nomeados com o seguinte padrão:

```
profile-{timestamp}-{randomBytes}{extension}
```

Exemplo: `profile-1737876543-abc123def456.jpg`

- `profile-`: Prefixo fixo
- `1737876543`: Timestamp em milissegundos
- `abc123def456`: 6 bytes aleatórios em hex
- `.jpg`: Extensão original do arquivo

### Servindo Arquivos Estáticos

O Express serve os arquivos estaticamente através da configuração:

```typescript
// src/index.ts
app.use('/uploads', express.static('src/public/uploads'));
```

URLs de foto são relativas: `/uploads/profile-photos/profile-xxx.jpg`

## Segurança

### Validações Implementadas

1. **Autenticação Obrigatória**: Todos os endpoints verificam `req.user`
2. **Validação de Tipo**: Apenas imagens são aceitas
3. **Validação de Tamanho**: Limite de 5MB
4. **Filtro de Arquivo**: MIME types validados no Multer
5. **Nome Único**: Cada arquivo recebe um nome único para evitar conflitos

### Considerações de Segurança

- **Path Traversal**: O Multer previne path traversal automaticamente
- **Rate Limiting**: Considere implementar para prevenir abuse
- **Validação de Conteúdo**: Considere validar se o arquivo é realmente uma imagem
- **Permissões**: Diretório de uploads deve ter permissões apropriadas

## Testando os Endpoints

### cURL

#### Upload de Foto

```bash
curl -X POST http://localhost:3000/api/profile/photo \
  -H "Cookie: connect.sid=..." \
  -F "photo=@/path/to/photo.jpg"
```

#### Obter Perfil

```bash
curl -X GET http://localhost:3000/api/profile \
  -H "Cookie: connect.sid=..."
```

### Postman/Insomnia

1. Importe os cookies da sessão (faça login primeiro)
2. Para upload: use o tipo "form-data" e adicione o campo "photo" como File
3. Para perfil: faça um GET simples com os cookies

## Troubleshooting

### Erro "Cannot POST /api/profile/photo"

**Problema**: Rota não está registrada

**Solução**: Verifique se as rotas estão sendo importadas em `src/index.ts`:

```typescript
import profileRoutes from './routes/profile.routes.js';
app.use('/api/profile', profileRoutes);
```

### Erro "Cannot read property 'photo' of undefined"

**Problema**: Middleware de autenticação não está sendo executado

**Solução**: Verifique se o middleware está configurado antes das rotas:

```typescript
import { sessionMiddleware } from './middleware/session.config.js';

app.use(sessionMiddleware);
// ... então as rotas
```

### Upload falha silenciosamente

**Problema**: Multer não está processando o arquivo

**Solução**: Verifique se o middleware está sendo aplicado:

```typescript
router.post('/photo', uploadProfilePhoto, uploadProfilePhoto);
//                          ^^^^^^^^^^^^^^^^ necessário
```

### Arquivo não é acessível após upload

**Problema**: Arquivos estáticos não estão sendo servidos

**Solução**: Verifique a configuração de arquivos estáticos:

```typescript
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
```

## Migração para Cloud Storage

Para produção, considere migrar de armazenamento local para cloud storage (S3, Cloudflare R2, etc.):

### Exemplo com AWS S3

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadToS3(file: Express.Multer.File) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: `profile-photos/${file.filename}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);
  return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/profile-photos/${file.filename}`;
}
```

## Arquivos Relacionados

- **Controller**: `src/controllers/profile.controller.ts`
- **Rotas**: `src/routes/profile.routes.ts`
- **Multer Config**: `src/middleware/upload.config.ts`
- **Auth Middleware**: `src/middleware/auth.middleware.ts`
- **User Service**: `src/auth/user.service.ts`

## Suporte

Para dúvidas ou problemas, consulte a documentação do componente ou abra uma issue no repositório.
