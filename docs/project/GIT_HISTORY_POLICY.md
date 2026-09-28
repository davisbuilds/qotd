# Git History and Branch Hygiene

Live merge settings verified 2026-09-27 with `gh api repos/davisbuilds/qotd`.
Query GitHub again before relying on current remote settings.

## Repository Merge Settings

Configured on GitHub repository `davisbuilds/qotd`:

- `allow_squash_merge`: `true`
- `allow_merge_commit`: `false`
- `allow_rebase_merge`: `false`
- `delete_branch_on_merge`: `true`
- `squash_merge_commit_title`: `PR_TITLE`
- `squash_merge_commit_message`: `PR_BODY`

Result:

- PR branches can contain multiple commits.
- `main` receives one squashed commit per merged PR.
- Merged remote branches are auto-deleted.

## Merge Strategy

Squash-merge only. All other merge strategies are disabled at the repository level.

## CI Gates

The tracked [CI workflow](../../.github/workflows/ci.yml) runs lint, tests, and
build on PRs and pushes to `main`. Contributor checks are in
[CONTRIBUTING.md](../../CONTRIBUTING.md).

## Current Limitation

This repository is public. Query `gh api repos/davisbuilds/qotd/branches/main/protection`
for effective branch protection; the merge-settings query above does not establish it.

## Recommended Ongoing Hygiene

1. Create short-lived feature branches from `main`.
2. Open PRs early; keep them focused.
3. Merge only with **Squash and merge** after quality checks pass.
4. Periodically prune local branches:

```bash
git fetch --prune
git branch --merged main | grep -v ' main$' | xargs -n 1 git branch -d
```
