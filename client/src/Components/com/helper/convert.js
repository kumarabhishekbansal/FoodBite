// convert image into base64

const convertToBase64=async(file)=>{
    // console.log("enter convert function");
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror=(error)=>{
            reject(error);
        }
    })
}

module.exports=convertToBase64;