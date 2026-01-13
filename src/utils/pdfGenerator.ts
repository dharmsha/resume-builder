// src/utils/pdfGenerator.ts
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (elementId: string, filename: string): Promise<boolean> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found:', elementId);
      return false;
    }

    // Create a clone to avoid disturbing the original
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.width = '210mm';
    document.body.appendChild(clone);

    // Enhanced options for better PDF quality
    const options = {
      useCORS: true,
      backgroundColor: '#FFFFFF',
      allowTaint: false,
      removeContainer: true,
      scale: 3,
      logging: false,
      width: 210 * 3.78,
      height: 297 * 3.78,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 210 * 3.78,
      windowHeight: 297 * 3.78,
      onclone: (clonedDoc: Document) => {
        const elements = clonedDoc.querySelectorAll('*');
        elements.forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.position === 'fixed' || style.position === 'sticky') {
            (el as HTMLElement).style.position = 'absolute';
          }
        });
      }
    };

    const canvas = await html2canvas(clone, options);
    
    // Clean up clone
    document.body.removeChild(clone);

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Calculate dimensions to fit entire content
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate image dimensions maintaining aspect ratio
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add image to PDF
    pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
    
    // Save PDF
    pdf.save(`${filename.replace(/[^a-z0-9]/gi, '_')}.pdf`);
    
    return true;
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return false;
  }
};

export default generatePDF;