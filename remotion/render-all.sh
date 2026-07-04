#!/bin/bash
# Renders all 35 stills of Direction D to out/d-*.png.
set -e
cd "$(dirname "$0")"

IDS=(
  d-01-cover
  d-02-toc
  d-03-foreword
  d-04-von-chris
  d-05-von-chris2
  d-06-part1-divider
  d-07-kapitel1
  d-08-kapitel2
  d-09-kapitel3
  d-10-kapitel3b
  d-11-part2-divider
  d-12-kapitel4
  d-13-kapitel5
  d-14-kapitel6
  d-15-kapitel6b
  d-16-part3-divider
  d-17-kapitel7
  d-18-kapitel8
  d-19-part4-divider
  d-20-kapitel9a
  d-21-kapitel9b
  d-22-recipe1
  d-23-recipe2
  d-24-recipe3
  d-25-kapitel11a
  d-26-kapitel11b
  d-27-faq
  d-28-anhang-intro
  d-29-trigger-check
  d-30-notfallkarte
  d-31-einkaufsliste
  d-32-pantry
  d-33-ueber-chris
  d-34-schlusswort
  d-35-backmatter
)

for id in "${IDS[@]}"; do
  echo "Rendering $id..."
  npx remotion still src/index.ts "$id" "out/$id.png" --overwrite
done
