import React from 'react'


let imageURL;

function submitHandler() {
    console.log("click");
    const fileInput = document.getElementById('fileInput');
    console.log(fileInput.files);
    const image = fileInput.files[0];

    // Multipart file
    const formData = new FormData();
    formData.append('image_file', image);
    formData.append('size', 'auto');

    const apiKey = 'QrFAqUXAhseF5ejnpsx8TPVU';

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey
        },
        body: formData
    })
        .then(function (reponse) {
            return reponse.blob()
        })
        .then(function (blob) {
            console.log(blob);
            const url = URL.createObjectURL(blob);
            imageURL = url;
            const img = document.createElement('img');
            img.src = url;
            document.body.appendChild(img);
        })
        .catch();
}

function downloadFile() {
    var a = document.createElement('a'); //<a></a>
    a.href = imageURL;
    a.download = 'naciasv.png';
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
}

const Remover = () => {
    return (
        <div>
            <div class="container mt-4">
                <div class="row mt-4">
                    <div class="col-md-6 card mt-4">
                        <form>
                            <div class="form-group">
                                <label for="fileInput">Select a File: </label>
                                <input id="fileInput" class="form-control"
                                    type="file" />
                            </div>
                            <input class="btn btn-primary m-1"
                                type="button" onClick={submitHandler}
                                value="Priview" />

                        </form>

                        <button class="btn btn-warning "
                            onClick={downloadFile}
                        >
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Remover