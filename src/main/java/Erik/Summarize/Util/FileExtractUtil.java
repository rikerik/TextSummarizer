package Erik.Summarize.Util;

import java.io.IOException;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.web.multipart.MultipartFile;

import lombok.experimental.UtilityClass;

@UtilityClass
public final class FileExtractUtil {

    public static String getText(MultipartFile pdfFile) throws IOException {
        PDDocument doc = Loader.loadPDF(pdfFile.getBytes());
        return new PDFTextStripper().getText(doc);
    }

}
