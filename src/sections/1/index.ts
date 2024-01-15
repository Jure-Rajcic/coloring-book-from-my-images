import "./index.css";






export default function handleFileUpload() {
    const file_input_div = document.getElementById("file-input") as HTMLInputElement;
    file_input_div.setAttribute("accept", "image/*");
    file_input_div.addEventListener("change", function (event) {
        const files = file_input_div.files!;
        if (files.length == 0) {
            return;
        }

        if (files.length != 8) {
            alert("Please upload 8 images");
            return;
        }

        // Check if all uploaded files are images
        for (let file of files) {
            if (!file.type.startsWith('image/')) {
                alert("All files must be images");
                return;
            }
        }


        // Function to set background image for a given element and file
        const setBackgroundImage = (element: HTMLElement, file: File) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                element.style.backgroundImage = `url('${e.target!.result}')`;
            };
            reader.readAsDataURL(file);
        }


        // Get all the card elements
        const cards = document.querySelectorAll('.card-group .card');

        // Set background images for each card
        cards.forEach((card, index) => {
            setBackgroundImage(card as HTMLElement, files[index]);
        });
    });


    const upload_box_div = document.getElementById("upload-box") as HTMLDivElement;
    upload_box_div.addEventListener("click", function () {
        file_input_div.click();
    });
}
