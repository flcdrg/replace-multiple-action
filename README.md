# Multiple string find/replace in files

[![build-test](https://github.com/flcdrg/replace-multiple-action/actions/workflows/test.yml/badge.svg)](https://github.com/flcdrg/replace-multiple-action/actions/workflows/test.yml)

This action searches matching files for strings and replaces any matches with replacement values, then saves the modified file(s).

## Usage

```yaml
steps:
      - uses: actions/checkout@v3
      - uses: flcdrg/replace-multiple-action@v1
        with:
          files: './*.md'
          find: '[{ "find": "Multiple", "replace": "Many" }]'
```

### Example updating links in Markdown

Search for Markdown files in the current directory. In each matching file, search for Markdown links. eg. that start the line, have whitespace or a left bracket preceding them, and have an end of line, whitespace or right bracket immediately after them.

```yaml
steps:
  - uses: flcdrg/replace-multiple-action@v1
    with:
        files: './*.md'
        find: '[{ "find": "http://localhost", "replace": "https://localhost"}, { "find": "http://davidgardiner.net.au", "replace": "https://david.gardiner.net.au" }]'
        prefix: '(^|\\s+|\\()'
        suffix: '($|\\s+|\\))'
```

### Example with Wayback machine action

The `replacements` output from the [`flcdrg/wayback-machine-query-action`](https://github.com/marketplace/actions/wayback-machine-query) action is the correct shape to be passed in to the `find` input for this action.

```yaml
steps:
  - name: Wayback Machine Query
    uses: flcdrg/wayback-machine-query-action@v2
    id: wayback
    with:
        source-path: ./lychee/links.json
        timestamp-regex: '_posts\/(\d+)\/(?<year>\d+)-(?<month>\d+)-(?<day>\d+)-'
        
  - name: Replacements
    uses: flcdrg/replace-multiple-action@v1
    with:
        find: ${{ steps.wayback.outputs.replacements }}
        prefix: '(^|\\s+|\\()'
        suffix: '($|\\s+|\\))'
```

## Inputs

Various inputs are defined in [`action.yml`](action.yml) to let you configure this action:

| Name | Description | Default |
| - | - | - |
| `files` | A wildcard glob used to match files that should be searched | `**/*.md` |
| `find` | A JSON array of strings to find and values to replace. The JSON array should conform to this structure. `{ find: string; replace: string; }[]`  | |
| `prefix` | Part of a regular expression that is prepended to the search string to add additional context on when to match the string. | |
| `suffix` | Part of a regular expression that is appended to the search string to add additional context on when to match the string. | |
