"use client"

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useState, useCallback } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "./ui/use-toast";
import { Upload } from "lucide-react";

export default function MultiUploader() {
    const [files, setFiles] = useState<File[]>([]);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { startUpload, permittedFileInfo } = useUploadThing(
        "pdfAttachment",
        {
            onClientUploadComplete: () => {
                toast({
                    description: "Uploaded successfully!",
                })
            },
            onUploadError: () => {
                toast({
                    description: "Error occurred while uploading",
                })
            },
            onUploadBegin: () => {
                toast({
                    description: "Upload has begun",
                })
            },
        },
    );

    const fileTypes = permittedFileInfo?.config
        ? Object.keys(permittedFileInfo?.config)
        : [];

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    });

    return (
        <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-blue-500"
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
                <Upload className="w-12 h-12 text-gray-400" />
                {isDragActive ? (
                    <p className="text-blue-500">Drop the files here...</p>
                ) : (
                    <p className="text-gray-500">Drag &amp; drop files here, or click to select files</p>
                )}
                {files.length > 0 && (
                    <button
                        onClick={() => startUpload(files)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Upload {files.length} file{files.length > 1 ? 's' : ''}
                    </button>
                )}
                {files.length > 0 && (
                    <p className="text-sm text-gray-500">
                        {files.length} file{files.length > 1 ? 's' : ''} selected
                    </p>
                )}
            </div>
        </div>
    );
}