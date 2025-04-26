// const { Readable } = require("stream");
const cloudinary = require("../utils/cloudinary");
const CourseModel = require("../Models/CourseModel");

// const streamUpload = (fileBuffer, folder, resourceType = "auto") => {
//     return new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//             {
//                 folder,
//                 resource_type: resourceType,
//                 chunk_size: 6000000, // 6MB
//                 eager_async: true,
//                 eager: resourceType === "video"
//                     ? [{ format: "mp4", width: 720, crop: "scale" }]
//                     : undefined,
//                 quality: "auto:good"
//             },
//             (error, result) => {
//                 if (error) {
//                     console.error("Cloudinary stream upload error:", error);
//                     reject(new Error("Error uploading file to Cloudinary"));
//                 } else {
//                     resolve(result.secure_url);
//                 }
//             }
//         );

//         Readable.from(fileBuffer).pipe(uploadStream);
//     });
// };


const streamUpload = (buffer, folder, type) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: type || "auto", // 'video' if it's video, 'image' for images, 'raw' for pdf
        use_filename: true,
        unique_filename: false,
      },
      (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      }
    );
    stream.end(buffer);
  });
};


module.exports.addCourse = async (req, res) => {
    const { name, description } = req.body;
    const { image, pdf, video } = req.files;

    if (!image || !video) {
        return res.status(400).json({ error: "Image and video are required." });
    }

    try {
        // Upload image & video in parallel
        const uploads = [
            streamUpload(image[0].buffer, "course/images", "image"),
            streamUpload(video[0].buffer, "course/videos", "video")
        ];

        // Optional PDF upload
        if (pdf) {
            uploads.push(streamUpload(pdf[0].buffer, "course/pdf", "raw"));
        }

        const [imageUrl, videoUrl, pdfUrl = null] = await Promise.all(uploads);

        const newCourse = await CourseModel.create({
            courseName: name,
            courseDescription: description,
            courseImage: imageUrl,
            coursePdf: pdfUrl,
            courseVideo: videoUrl,
            createdBy: req.user._id,
        });

        return res.status(201).json(newCourse);

    } catch (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ message: "Upload Failed. Please try again." });
    }
};




module.exports.myCourse = async (req, res) => {
    try {
        if (req.user.role !== "Educator") return res.status(400).json({ message: "Access Denied" });
        const courses = await CourseModel.find({ createdBy: req.user._id })
        res.status(200).json(courses)

    } catch (error) {
        console.log("eroor in MyCours Route", error);
        return res.status(500).json({ messagge: "internal server error" })

    }

},

    // module.exports.updateCourse = async (req, res) => {
    //     const { id } = req.params;
    //     const { name, description, price } = req.body;
    //     const { image, pdf, video } = req.files;

    //     try {
    //         const existingCourse = await CourseModel.findById(id);
    //         if (!existingCourse) return res.status(404).json({ message: "Course not found" });

    //         const uploadToCloudinary = async (file, folder, resourceType = 'auto') => {
    //             const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    //             const result = await cloudinary.uploader.upload_large(base64, {
    //                 folder,
    //                 resource_type: resourceType,
    //                 width: 500,
    //                 height: 500,
    //                 crop: "limit",
    //                 quality: "auto:good",
    //             });
    //             return result.secure_url;
    //         };

    //         let imageUrl = existingCourse.courseImage;
    //         let videoUrl = existingCourse.courseVideo;
    //         let pdfUrl = existingCourse.coursePdf;

    //         if (image) imageUrl = await uploadToCloudinary(image[0], "course/images");
    //         if (video) videoUrl = await uploadToCloudinary(video[0], "course/videos", "video");
    //         if (pdf) pdfUrl = await uploadToCloudinary(pdf[0], "course/pdf", "raw");

    //         const updatedCourse = await CourseModel.findByIdAndUpdate(
    //             id,
    //             {
    //                 courseName: name,
    //                 courseDescription: description,
    //                 coursePrice: price,
    //                 courseImage: imageUrl,
    //                 coursePdf: pdfUrl,
    //                 courseVideo: videoUrl,
    //             },
    //             { new: true }
    //         );

    //         res.status(200).json(updatedCourse);
    //     } catch (error) {
    //         console.error("Update Error:", error);
    //         res.status(500).json({ message: "Server error while updating course" });
    //     }
    // };


    module.exports.deleteCourse = async (req, res) => {
        const { id } = req.params;
        try {
            const deletedCourse = await CourseModel.findByIdAndDelete(id);
            if (!deletedCourse) {
                return res.status(404).json({ message: "Course not found" });
            }
            res.status(200).json({ message: "Course deleted successfully" });
        } catch (error) {
            console.error("Delete Error:", error);
            res.status(500).json({ message: "Server error while deleting course" });
        }
    }
