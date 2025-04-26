import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { Cloud, FileSignature, FileText, Image, Loader, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux"
import { addCourse } from "../../Store/Slices/CourseSlice"

const AddCourse = () => {

    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.course);




    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    // const [price, setPrice] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [pdfFileData, setPdfFileData] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

    const [imagePreview, setImagePreview] = useState(false);
    const [pdfName, setPdfName] = useState("");
    const [videoPreview, setVideoPreview] = useState(null);

    const videoRef = useRef();
    const clickRef = useRef();
    const pdfFile = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file?.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
        setImageFile(file);
    };

    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (file?.type !== "application/pdf") {
            alert("Please upload a valid PDF file.");
            return;
        }
        setPdfName(file.name);
        setPdfFileData(file);
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (!file?.type.startsWith("video/")) {
            alert("Please upload a valid video file.");
            return;
        }
        const videoUrl = URL.createObjectURL(file);
        setVideoPreview(videoUrl);
        setVideoFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!courseName.trim()) {
            toast.error("Please enter the course name.");
            return;
        }
        if (!description.trim()) {
            toast.error("Please enter the course description.");
            return;
        }
        // if (!price || isNaN(price) || Number(price) <= 0) {
        //     toast.error("Please enter a valid price greater than 0.");
        //     return;
        // }
        if (!imageFile) {
            toast.error("Please upload a course image.");
            return;
        }

      
            if (!videoFile) {
                toast.error("Please upload a course video.");
                return;
            }
        
        // ✅ Proceed if all validations pass
        const formData = new FormData();
        formData.append("name", courseName);
        formData.append("description", description);
        // formData.append("price", price);
        formData.append("image", imageFile);
        formData.append("pdf", pdfFileData);
        formData.append("video", videoFile);

        console.log("Submitting course:");
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        dispatch(addCourse(formData));
        // if (isEditCourse) {
        //     formData.append("courseId", isEditCourse._id); // Add course ID for updating
        //     dispatch(updateCourse(isEditCourse._id, formData)); // Dispatch update action
        // } else {
        //     dispatch(addCourse(formData)); // Dispatch add action
        // }


        // ✅ Reset all fields
        setCourseName("");
        setDescription("");
        // setPrice("");
        setImageFile(null);
        setPdfFileData(null);
        setVideoFile(null);
        setImagePreview(null);
        setPdfName("");
        setVideoPreview(null);

        if (clickRef.current) clickRef.current.value = "";
        if (pdfFile.current) pdfFile.current.value = "";
        if (videoRef.current) videoRef.current.value = "";
    };



    return (

        <>


            <motion.div
                className="h-full flex"
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className='p-2 text-purple-800 w-full relative'>
                    {isLoading && (
                        <div className="w-full h-full absolute inset-0 z-50 bg-white/5 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                            <Loader className="animate-spin w-40 h-40 text-purple-700" />
                        </div>
                    )}

                    <form className="p-5 space-y-5 bg-white w-full rounded-2xl" onSubmit={handleSubmit}>
                        {/* Course Name */}
                        <div className="flex items-center">
                            <label className="w-40 text-lg text-start">Course Name :</label>
                            <input
                                type="text"
                                className="flex-1 outline-none border-2 rounded-2xl py-1 px-4 text-lg text-black"
                                placeholder="JavaScript MasterClass"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                        </div>

                        {/* Course Description */}
                        <div className="flex items-start mt-10">
                            <label className="w-40 text-start text-lg mt-1">Course -Description:</label>
                            <textarea
                                className="flex-1 outline-none border-2 rounded-2xl py-2 px-4 text-black resize-none"
                                rows={4}
                                placeholder="Enter course details here..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        {/* Course Price */}
                        {/* <div className="flex items-center mt-10">
                            <label className="w-40 text-start text-lg mt-1">Course Price:</label>
                            <input
                                type="number"
                                min="0"
                                className="w-30 outline-none border-2 rounded-2xl py-1 px-4 text-lg text-black"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div> */}

                        {/* Course Image & PDF */}
                        <div className="flex items-center mt-11 w-[70vw] h-10">
                            <label className="w-47 text-lg text-start">Course Image :</label>
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleImageChange}
                                ref={clickRef}
                            />
                            <div className="flex w-full gap-3">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="flex border-2 p-1 rounded-2xl cursor-pointer"
                                        onClick={() => clickRef.current.click()}
                                    >
                                        Choose Image <Image className="ml-1" />
                                    </span>
                                    {imagePreview && (
                                        <div className="size-30 rounded-2xl overflow-hidden relative">
                                            <img src={imagePreview} alt="preview" className='w-full object-cover' />
                                            <X
                                                className='absolute top-0.5 right-0.5 size-6 rounded-full bg-black text-white cursor-pointer'
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    setImageFile(null);
                                                    if (clickRef.current) clickRef.current.value = "";
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center px-1">
                                    <label className="w-30 text-lg">Course PDF :</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        className='hidden w-40'
                                        ref={pdfFile}
                                        onChange={handlePdfChange}
                                    />
                                    <span
                                        className='flex border-2 border-purple-900 px-2 rounded-2xl py-1 cursor-pointer'
                                        onClick={() => pdfFile.current.click()}
                                    >
                                        Select PDF <FileSignature className="ml-1" />
                                    </span>
                                    {pdfName && (
                                        <div className="ml-4 flex items-center gap-2">
                                            <FileText className="text-purple-700" />
                                            <span className="text-sm text-gray-700">{pdfName}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Course Video */}
                        <div className="flex items-center mt-20 w-full h-10">
                            <label className="w-47 text-lg text-start">Course Video :</label>
                            <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                ref={videoRef}
                                onChange={handleVideoChange}
                            />
                            <div className="flex w-full items-center gap-3">
                                <span
                                    className="flex border-2 p-1 rounded-2xl cursor-pointer"
                                    onClick={() => videoRef.current.click()}
                                >
                                    Select Video <Cloud className="ml-1" />
                                </span>

                                {videoPreview && (
                                    <div className="relative rounded-lg overflow-hidden">
                                        <video
                                            src={videoPreview}
                                            controls
                                            className="w-40 h-24 rounded-xl border border-purple-600"
                                        />
                                        <X
                                            className="absolute top-0.5 right-0.5 size-6 rounded-full bg-black text-white cursor-pointer"
                                            onClick={() => {
                                                setVideoPreview(null);
                                                setVideoFile(null);
                                                if (videoRef.current) videoRef.current.value = "";
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className='bg-purple-700 text-white rounded-full py-2 px-10 mt-10'
                        >
                            Upload
                        </button>
                        {/* {isEditCourse && (
                            <button
                                type="button"
                                className='bg-purple-700 text-white rounded-full py-2 px-10 mt-10 ml-5'
                                onClick={() => dispatch(setEditCourse(null))}
                            >
                                Cancel
                            </button>
                        )} */}

                    </form>
                </div>
            </motion.div>
        </>
    );
};

export default AddCourse;

