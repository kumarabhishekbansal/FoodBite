// const { OpenAIApi, Configuration } = require("openai");
// // const axios = require('axios');
// const configuration = new Configuration({
//   apiKey: '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',
// });

// const openai = new OpenAIApi(configuration);

// const generateimage = async () => {
//   try {
//     console.log("enter open ai generate image ");
//     // const {prompt,size}=req.body;
//     size='medium';
//     const imagesize =
//       size === "small"
//         ? "256x256"
//         : size === "medium"
//         ? "512x512"
//         : "1024x1024";
//     // console.log("image is : propmpt is : ",imagesize,prompt);
//     // console.log(openai);
//     const response = await openai.createImage({
//       prompt: "lion on the tree",
//       n: 1,
//       size: imagesize,
//       response_format: 'b64_json',
//     });

//     console.log("response : ", response.data.data[0].b64_json);

//     const imageurl = response.data.data[0].b64_json;

//     if (!imageurl) {
//       // return res.status(400).json({
//       //     message:"The image can not be generated"
//       // });
//       console.log("The image can not be generated");
//     }
//     // res.status(200).json({
//     //     success:true,
//     //     data:imageurl
//     // });
//     // console.log(imageurl);
//   } catch (error) {
//     console.log("error while getting generate image by open ai");
//     // console.log(error);
//     if (error.response) {
//       console.log(error.response.status);
//       console.log(error.response.data);
//     } else {
//       console.log(error.message);
//     }
//   }
// };

// // async function generateimage(name,size) {
// //     const apiKey = process.env.openaiAPI;
// //     const prompt = 'Generate an image of a cat';
  
// //     try {
// //       const response = await axios.post('https://api.openai.com/v1/images', {
// //         prompt: prompt,
// //         apiKey: apiKey,
// //         n: 1,
// //       });
  
// //       const { data } = response;
  
// //       // Save the generated image to a file
// //       const imageBytes = data.images[0].data;
// //       console.log(imageBytes);
  
// //       console.log('Image generated successfully!');
// //     } catch (error) {
// //       console.error('Failed to generate image:', error);
// //     }
// //   }
  
// generateimage();

// module.exports = { generateimage };
