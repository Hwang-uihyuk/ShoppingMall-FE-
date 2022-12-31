export async function uploadImage(file){
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset','docs_upload_example_us_preset')
}