# Playables catalog

Static gallery of playable ad prototypes. `index.html` renders a grid; clicking a card
opens the playable inside a phone simulator (an `<iframe>` for HTML, a download panel for ZIP).

## Structure

```
playables/
├── index.html        # gallery (static, reads catalog.js)
├── catalog.js        # AUTO-GENERATED list of playables — do not edit by hand
├── generate.ps1      # regenerates catalog.js by scanning folders
├── <slug>/           # one folder per playable
│   ├── index.html    #   the playable (or a *.zip)
│   ├── screenshot.jpg#   preview image
│   └── meta.json     #   metadata (title, project, tags, details, …)
└── _legacy_unlinked/ # ignored (folders starting with _ or . are skipped)
```

## Add a new playable

1. Create a url-safe folder, e.g. `my-cool-playable/` (lowercase, hyphens, no spaces).
2. Drop the playable in as `index.html` (or any `*.html` / `*.zip`).
3. Add a preview as `screenshot.jpg` (or `.png`).
4. Optionally add `meta.json`:

   ```json
   {
     "title": "My Cool Playable",
     "project": { "name": "Some Game", "shortName": "SG",
                  "appStore": "", "googlePlay": "" },
     "tags": ["threejs", "3d"],
     "details": "Short description",
     "created": "2026-09-14"
   }
   ```

   `meta.json` is optional — without it the folder name becomes the title and the
   playable/screenshot are auto-detected.

5. Regenerate the catalog:

   ```powershell
   pwsh ./generate.ps1
   ```

That's it — `index.html` picks up `catalog.js` automatically. Newest playables (by `created`) show first.

## Source

Exported from the PlayableTools backend (LiteDB) — playables owned by `igor@gritsenko.biz`.
Each `meta.json` keeps the original `sourceGuid` / `creativeId` for traceability.
