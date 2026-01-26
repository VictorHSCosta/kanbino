# ProfilePhotoUploader Component

## Descrição

O componente `ProfilePhotoUploader` é um componente React que permite aos usuários fazer upload de suas fotos de perfil com preview em tempo real.

## Funcionalidades

- Preview da imagem antes do upload
- Validação de tamanho (máximo 5MB)
- Validação de tipo de arquivo (JPEG, PNG, WEBP, GIF)
- Feedback visual de loading, erro e sucesso
- Interface totalmente em português
- Cancelamento de upload antes da confirmação

## Como Usar

### Importação Básica

```tsx
import ProfilePhotoUploader from '../components/ProfilePhotoUploader';

function MinhaPagina() {
  const handlePhotoUpdated = (photoUrl: string) => {
    console.log('Nova foto:', photoUrl);
    // Atualizar estado ou fazer algo com a URL
  };

  return (
    <ProfilePhotoUploader
      currentPhoto="/uploads/profile-photos/exemplo.jpg"
      onPhotoUpdated={handlePhotoUpdated}
    />
  );
}
```

### Props

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `currentPhoto` | `string \| undefined` | Não | URL da foto de perfil atual do usuário |
| `onPhotoUpdated` | `(photoUrl: string) => void` | Sim | Callback chamado quando o upload é bem-sucedido |

### Exemplo Completo com ProfilePage

```tsx
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { UserProfile } from '../types/api.types';
import ProfilePhotoUploader from '../components/ProfilePhotoUploader';

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await apiService.getProfile();
      setUser(profile);
    } catch (err) {
      console.error('Erro ao carregar perfil:', err);
    }
  };

  const handlePhotoUpdated = (photoUrl: string) => {
    if (user) {
      setUser({ ...user, photo: photoUrl });
      setSuccessMessage('Foto de perfil atualizada com sucesso!');

      // Limpar mensagem após 3 segundos
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          {successMessage}
        </div>
      )}

      <ProfilePhotoUploader
        currentPhoto={user?.photo}
        onPhotoUpdated={handlePhotoUpdated}
      />
    </div>
  );
}
```

## Fluxo de Uso

1. **Seleção de Arquivo**: O usuário clica no botão "Selecionar Foto"
2. **Preview**: A imagem selecionada é exibida como preview
3. **Confirmação**: O usuário clica em "Confirmar Upload" para enviar
4. **Cancelamento**: O usuário pode clicar em "Cancelar" para desfazer a seleção
5. **Feedback**: Mensagens de sucesso ou erro são exibidas

## Validações

### Client-side

- **Tamanho máximo**: 5MB
- **Tipos aceitos**: `image/*` (qualquer formato de imagem)
- **Feedback imediato**: Erro é mostrado antes do upload

### Server-side

- **Tamanho máximo**: 5MB (configurado no Multer)
- **Tipos aceitos**: JPEG, JPG, PNG, WEBP, GIF
- **Segurança**: Validação adicional no backend

## Estados do Componente

| Estado | Descrição |
|--------|-----------|
| `Idle` | Componente pronto para uso |
| `Preview` | Imagem selecionada mas não enviada |
| `Uploading` | Upload em andamento |
| `Success` | Upload concluído com sucesso |
| `Error` | Erro durante upload ou validação |

## Customização

### Estilos

O componente usa Tailwind CSS. Para customizar, modifique as classes no arquivo `ProfilePhotoUploader.tsx`:

```tsx
// Exemplo: mudar cor do botão
className="... bg-blue-600 hover:bg-blue-700 ..." // era indigo-600
```

### Tamanho da Preview

```tsx
// No arquivo ProfilePhotoUploader.tsx, linha 92
<div className="w-32 h-32 rounded-full overflow-hidden ...">
  // Altere w-32 h-32 para o tamanho desejado
  // w-40 h-40 = 160px
  // w-48 h-48 = 192px
</div>
```

### Limites de Tamanho

```tsx
// No arquivo ProfilePhotoUploader.tsx, linha 29
const maxSize = 5 * 1024 * 1024; // 5MB - altere conforme necessário
```

## Troubleshooting

### Upload falha com erro 401

**Problema**: Usuário não está autenticado

**Solução**: Verifique se o usuário fez login antes de acessar a página de perfil

```tsx
if (errorMessage.includes('Unauthorized')) {
  // Redirecionar para login
  router.push('/login');
}
```

### Preview não aparece

**Problema**: Arquivo muito grande ou formato inválido

**Solução**: Verifique o console para mensagens de erro. Valide o arquivo antes de selecionar.

### Foto não atualiza na página

**Problema**: Estado não está sendo atualizado

**Solução**: Certifique-se de que o callback `onPhotoUpdated` está atualizando o estado do usuário:

```tsx
const handlePhotoUpdated = (photoUrl: string) => {
  if (user) {
    setUser({ ...user, photo: photoUrl }); // Importante: criar novo objeto
  }
};
```

### Erro "Directory does not exist"

**Problema**: Diretório de uploads não existe

**Solução**: Crie o diretório:

```bash
mkdir -p src/public/uploads/profile-photos
```

## Integração com Backend

O componente usa o `apiService` para comunicação com o backend:

```typescript
// frontend/src/services/api.ts
uploadProfilePhoto(file: File): Promise<UploadPhotoResponse> {
  const formData = new FormData();
  formData.append('photo', file);

  return fetch('/api/profile/photo', {
    method: 'POST',
    body: formData,
  }).then(...);
}
```

### Endpoint do Backend

```
POST /api/profile/photo
Content-Type: multipart/form-data

Body:
  photo: File (imagem)

Response (200):
{
  "success": true,
  "photoUrl": "/uploads/profile-photos/profile-1234567890-abcdef.jpg",
  "message": "Foto de perfil atualizada com sucesso!"
}
```

## Melhorias Futuras

- [ ] Adicionar crop de imagem antes do upload
- [ ] Suporte para múltiplas fotos
- [ ] Drag and drop
- [ ] Progress bar real do upload
- [ ] Captura de foto da câmera (mobile)
- [ ] Edição de imagem (filtros, rotação)

## Arquivos Relacionados

- **Componente**: `frontend/src/components/ProfilePhotoUploader.tsx`
- **Página de Perfil**: `frontend/src/pages/ProfilePage.tsx`
- **API Service**: `frontend/src/services/api.ts`
- **Tipos**: `frontend/src/types/api.types.ts`
- **Controller**: `src/controllers/profile.controller.ts`
- **Upload Config**: `src/middleware/upload.config.ts`
- **Rotas**: `src/routes/profile.routes.ts`

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório do projeto.
