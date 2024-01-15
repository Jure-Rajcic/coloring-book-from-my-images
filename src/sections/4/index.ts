import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function main4() {

    const purches_button = document.getElementById('purches-button') as HTMLButtonElement;

    purches_button.addEventListener('click', () => {
        const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.img-container img');
        const selectedImages = Array.from(images).filter(img => {
            const style = getComputedStyle(img);
            return style.getPropertyValue('--selected') === 'true';
        });

        console.log(selectedImages);
        if (selectedImages.length === 0) {
            alert('Please select at least one image');
            return;
        }
        if (!tryToPurches()) {
            alert('Something went wrong');
            return;
        };
        createPdfWithImages(selectedImages);
    });

    // TODO proper validation
    function tryToPurches() {
        return true;
    }
}

async function createPdfWithImages(images: HTMLImageElement[]) {

    const pdf = new jsPDF();
    

    for (let i = 0; i < images.length; i++) {
        const imageUrl = images[i].src;
        // console.log(imageUrl);
        const aspectRatio = images[i].naturalWidth / images[i].naturalHeight;
        const width = pdf.internal.pageSize.getWidth() - 20;
        const height = width / aspectRatio;
        const left = (pdf.internal.pageSize.getWidth() - width) / 2;
        const top = (pdf.internal.pageSize.getHeight() - height) / 2;

        pdf.addImage(imageUrl, 'JPEG', left, top, width, height);

        if (i + 1 < images.length) pdf.addPage();
    }

    // Save the PDF
    pdf.save('coloringbook.pdf');
}

