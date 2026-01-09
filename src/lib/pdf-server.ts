import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PDFParse } from "pdf-parse";

const PDF_PATH = join(process.cwd(), "data", "context.pdf");

let cachedPDFContent: string | null = null;

export async function getPDFContext(): Promise<string | null> {
	if (cachedPDFContent !== null) {
		return cachedPDFContent;
	}

	try {
		const pdfBuffer = await readFile(PDF_PATH);
		const parser = new PDFParse({ data: pdfBuffer });

		const pdfData = await parser.getText();
		cachedPDFContent = pdfData.text;

		return cachedPDFContent;
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") {
			return null;
		}
		throw error;
	}
}

export function clearPDFCache(): void {
	cachedPDFContent = null;
}
