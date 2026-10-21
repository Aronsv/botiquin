# Botiquín: activar "marcar como agotado"

La página guarda qué medicamentos están agotados en una hoja de Google,
para que todos vean lo mismo. Se configura una sola vez (unos 5 minutos).

## 1. Crear la hoja y el script

1. Entra a https://sheets.new con tu cuenta de Google. Ponle de nombre "Botiquín".
2. Menú **Extensiones → Apps Script**.
3. Borra el código que aparece y pega todo el contenido de `apps-script.gs`.
4. Guarda (ícono de disquete).

## 2. Publicarlo como aplicación web

1. Botón **Implementar → Nueva implementación**.
2. En el engranaje de "Seleccionar tipo", elige **Aplicación web**.
3. Configura:
   - **Ejecutar como:** Yo
   - **Quién tiene acceso:** Cualquier persona
4. **Implementar**. Google pedirá autorizar el acceso a la hoja: acepta
   (si sale "Google no verificó esta app": *Configuración avanzada → Ir a … (no seguro)*,
   es tu propio script).
5. Copia la **URL de la aplicación web** (termina en `/exec`).

## 3. Pegar la URL en la página

En `index.html`, busca:

```js
const API_AGOTADOS = "";
```

y pega la URL entre las comillas:

```js
const API_AGOTADOS = "https://script.google.com/macros/s/XXXX/exec";
```

Luego sube el cambio:

```
git add index.html
git commit -m "Conectar agotados con Google Sheets"
git push
```

En 1–2 minutos aparece en cada medicamento el botón
**"🚫 Se acabó: marcar como agotado"** (y **"✅ Ya hay de nuevo"** para desmarcar).

## Notas

- En la hoja verás una pestaña **Agotados** con cada medicamento, si está agotado y la fecha del último cambio.
  También puedes marcar/desmarcar directamente ahí (columna Agotado = TRUE/FALSE).
- Si cambias el código de `apps-script.gs`, hay que hacer **Implementar → Gestionar implementaciones → Editar → Nueva versión**
  para que tome efecto (la URL no cambia).
- Cualquiera con el enlace puede marcar/desmarcar. Para una prueba con el personal del área está bien;
  si hiciera falta controlar quién lo hace, eso iría en el futuro panel admin.
