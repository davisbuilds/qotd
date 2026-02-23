#!/usr/bin/env python3
"""Validate data/quotes.json for structural integrity.

Usage:
    python scripts/validate-quotes.py            # Check only
    python scripts/validate-quotes.py --fix-ids  # Renumber IDs sequentially

Exit code 0 if valid, 1 if errors found.
"""

import json
import sys
from pathlib import Path

QUOTES_PATH = Path(__file__).resolve().parent.parent / "data" / "quotes.json"


def load_quotes():
    with open(QUOTES_PATH) as f:
        return json.load(f)


def validate(quotes, fix_ids=False):
    errors = []

    if not isinstance(quotes, list):
        print("FAIL: quotes.json root is not an array")
        return 1

    ids_seen = set()
    texts_seen = {}

    for i, entry in enumerate(quotes):
        prefix = f"Entry {i}"

        # Structure checks
        if not isinstance(entry, dict):
            errors.append(f"{prefix}: not an object")
            continue

        if "id" not in entry:
            errors.append(f"{prefix}: missing 'id'")
        elif not isinstance(entry["id"], int):
            errors.append(f"{prefix}: 'id' is not an integer")
        else:
            if entry["id"] in ids_seen:
                errors.append(f"{prefix}: duplicate id {entry['id']}")
            ids_seen.add(entry["id"])

        if "quote" not in entry or not isinstance(entry.get("quote"), str) or not entry["quote"].strip():
            errors.append(f"{prefix}: missing or empty 'quote'")
        else:
            normalized = entry["quote"].strip().lower()
            if normalized in texts_seen:
                errors.append(f"{prefix}: duplicate quote (same as entry {texts_seen[normalized]})")
            texts_seen[normalized] = i

        if "author" not in entry or not isinstance(entry.get("author"), str) or not entry["author"].strip():
            errors.append(f"{prefix}: missing or empty 'author'")

    # Check sequential IDs
    expected_ids = set(range(1, len(quotes) + 1))
    if ids_seen and ids_seen != expected_ids:
        if fix_ids:
            for i, entry in enumerate(quotes):
                entry["id"] = i + 1
            with open(QUOTES_PATH, "w") as f:
                json.dump(quotes, f, indent=2, ensure_ascii=False)
                f.write("\n")
            print(f"Fixed: renumbered {len(quotes)} quotes sequentially (1-{len(quotes)})")
        else:
            errors.append(f"IDs are not sequential 1-{len(quotes)} (use --fix-ids to renumber)")

    return errors


def main():
    fix_ids = "--fix-ids" in sys.argv

    try:
        quotes = load_quotes()
    except json.JSONDecodeError as e:
        print(f"FAIL: invalid JSON — {e}")
        sys.exit(1)
    except FileNotFoundError:
        print(f"FAIL: {QUOTES_PATH} not found")
        sys.exit(1)

    errors = validate(quotes, fix_ids=fix_ids)

    if errors:
        print(f"FAIL: {len(errors)} error(s) found:\n")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print(f"OK: {len(quotes)} quotes, all valid")


if __name__ == "__main__":
    main()
