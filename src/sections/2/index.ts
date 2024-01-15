import updateColorBook from '../3';
import './index.css';



export function handleGenerationProcess() {

    const generate_button = document.getElementById("generate-button") as HTMLButtonElement;
    const progress_div = document.getElementById("progress-div") as HTMLDivElement;
    progress_div.style.width = '0%';

    generate_button.addEventListener("click", async () => {


        const file_input_div = document.getElementById("file-input") as HTMLInputElement;
        const files = file_input_div.files!;
        for (let i = 0; i < files.length; i++) {
            const imageUrl = await uploadAndGetImageUrl(files[i]);

            // Create an <img> element
            createColorBookPage(imageUrl);

            let width = 0;
            width += (i + 1) * (100 / files.length);
            progress_div.style.width = `${width}%`;
        }
    });

}
// FIXME: Remove in production
export function drawInitialColorBook() {
    createColorBookPage("img\\generated\\cover-book.png");
}

function createColorBookPage(imageUrl: string) {
    const image_container_div = document.getElementById("image-container") as HTMLDivElement;
    const href_container_div = document.getElementById("href-container") as HTMLDivElement;

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "idk";
    image_container_div.appendChild(img);

    // Create an <a> element
    const href = document.createElement("a");
    href.href = "#";
    href_container_div.appendChild(href);

    updateColorBook();
}

// TODO DARIJAN
async function uploadAndGetImageUrl(file: File): Promise<string> {
    // const formData = new FormData();
    // formData.append('file', file);

    // try {
    //     const response = await fetch('YOUR_ENDPOINT_URL', {
    //         method: 'POST',
    //         body: formData
    //     });

    //     if (!response.ok) {
    //         throw new Error(`Server responded with ${response.status}`);
    //     }

    //     const data = await response.json();
    //     return data.imageUrl; // Assuming the response contains the URL in this field
    // } catch (error) {
    //     console.error("Error uploading file:", error);
    //     throw error;
    // }

    return new Promise<string>((resolve) => {
        const fileName = file.name.split('.')[0];
        const url = `img\\generated\\${fileName}.png`;
        setTimeout(() => {
            resolve(url);
        }, 1000);
    });
}

