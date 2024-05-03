
import fs from "node:fs"
import { argv } from "node:process"
import { parse } from 'node-html-parser';

(async () => {
    if (argv.length !== 4) {
        console.error("Usage: node scripts/extract-idl.mjs <file> <output>")
        process.exit(1)
    }
    const data = await fs.promises.readFile(argv[2], "utf-8")
    const output = await fs.promises.open(argv[3], "w")
    // Extract all the WebIDL blocks from the HTML file
    const scripts = parse(data).querySelectorAll("script[type=idl]")
    
    for (const script of scripts) {
        // Wait for the write to finish before writing the next one
        await output.write(script.text.trim() + "\n")
    }
    
    
})()
