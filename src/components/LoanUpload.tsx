"use client"
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function FileUploadComponent() {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const removeFile = (fileToRemove: never) => {
        setFiles(files.filter(file => file !== fileToRemove));
    };

    return (
        <div className="mt-4">
            <motion.div
                {...getRootProps()}
                className={`p-8 border-2 border-dashed rounded-lg cursor-pointer
                            
                            text-black`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <input {...getInputProps()} />
                <p className="text-center">
                    {isDragActive
                        ? "Drop the files here ..."
                        : "Drag 'n' drop some files here, or click to select files"}
                </p>
            </motion.div>
            {files.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Uploaded Files:</h4>
                    <ul className="space-y-2">
                        {files.map((file, index) => (
                            <motion.li
                                key={index}
                                className="flex items-center justify-between bg-white text-black p-2 rounded"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                            >
                                <span>{file.name}</span>
                                <button
                                    onClick={() => removeFile(file)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X size={16} />
                                </button>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}