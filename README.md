# La Fábrica Burgers — Menú

🌐 **En vivo:** https://menu-fabrica.netlify.app
💻 **Repo:** https://github.com/zzolrac/menu-fabrica

Sitio estático (sin base de datos). Una sola página con el menú, fotos optimizadas y estilo vintage crema + marrón del logo.

## Estructura

- `index.html` — todo el menú
- `styles.css` — estilos
- `assets/img/*.webp` — 8 fotos elegidas + logo, ya optimizados (~40–170 KB c/u)
- `fotos/` — originales en full (solo local, no se suben a GitHub/Netlify)
- `logo/logo.jpeg` — logo original (JPEG con fondo crema)
- `scripts/optimize-images.mjs` — script que genera los .webp
- `netlify.toml` — caché larga para imágenes

## Sobre el logo (importante)

El logo es JPEG con fondo crema, no PNG transparente. No se puede "volver transparente" con un clic sin recortarlo a mano.
Solución usada: se muestra en círculo con borde marrón sobre fondo crema del mismo tono. Se ve intencional y limpio, sin necesidad de PNG.

Si el cliente pasa el logo en PNG/vectorial algún día, se cambia 1 archivo.

## Comandos

```powershell
# optimizar fotos de nuevo (si agregas fotos a fotos/ y las registras en el script)
node scripts/optimize-images.mjs

# vista previa local
npx serve .
# o
python -m http.server 8000
```

## GitHub (versionado)

```powershell
git init
git add index.html styles.css netlify.toml package.json scripts assets README.md .gitignore
git commit -m "Menu La Fabrica v1"
gh repo create menu-fabrica --public --source=. --push
```

> Nota: `fotos/` y `logo/` están en `.gitignore` para no subir ~100 MB. Solo se versiona `assets/`.

## Netlify (deploy con CLI)

```powershell
netlify login
netlify init      # conecta al repo, publish directory: .
netlify deploy --prod
```

Cada cambio después:

```powershell
git add -A
git commit -m "ajuste precios"
git push
netlify deploy --prod
```

## Precios (editar)

Están directos en `index.html`. Busca `$6`, `$7`, `$3`, `$2`, `$4`, `$1`.
