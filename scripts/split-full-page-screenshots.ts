/**

 * Splits full-page screenshots into top/bottom halves.

 * Run: npm run split-full-screenshots

 */

import { mkdirSync, readdirSync } from "node:fs";

import { basename, join } from "node:path";

import sharp from "sharp";



const INPUT_DIRS = [

  { input: "full-page", output: "full-page-split" },

  { input: "full-page-mobile", output: "full-page-mobile-split" },

];



async function splitImage(inputPath: string, outputDir: string, name: string) {

  const image = sharp(inputPath);

  const meta = await image.metadata();

  const width = meta.width ?? 0;

  const height = meta.height ?? 0;



  if (!width || !height) {

    throw new Error(`Invalid image dimensions for ${inputPath}`);

  }



  const splitAt = Math.floor(height / 2);



  const topPath = join(outputDir, `${name}-part1.png`);

  const bottomPath = join(outputDir, `${name}-part2.png`);



  await image.clone().extract({ left: 0, top: 0, width, height: splitAt }).png().toFile(topPath);

  await image

    .clone()

    .extract({ left: 0, top: splitAt, width, height: height - splitAt })

    .png()

    .toFile(bottomPath);



  return { topPath, bottomPath, width, height, splitAt };

}



async function splitFolder(inputSubdir: string, outputSubdir: string) {

  const root = join(process.cwd(), "screenshots");

  const inputDir = join(root, inputSubdir);

  const outputDir = join(root, outputSubdir);

  mkdirSync(outputDir, { recursive: true });



  const files = readdirSync(inputDir).filter((file) => file.endsWith(".png"));



  for (const file of files) {

    const name = basename(file, ".png");

    const inputPath = join(inputDir, file);



    console.log(`Splitting ${inputSubdir}/${file}`);



    try {

      const result = await splitImage(inputPath, outputDir, name);

      console.log(

        `  ✓ ${name}-part1.png (${result.width}×${result.splitAt}) + ${name}-part2.png (${result.width}×${result.height - result.splitAt})`,

      );

    } catch (err) {

      console.error(`  ✗ ${file}:`, err);

    }

  }



  console.log(`Saved to screenshots/${outputSubdir}\n`);

}



async function main() {

  for (const { input, output } of INPUT_DIRS) {

    await splitFolder(input, output);

  }

}



main();


