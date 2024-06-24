
import React, { Fragment, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form'
import './fileUpload.css'

export function FileUpload(props) {
    const { label, name, control, placeholder, rules, className, previewImage, handleFileChange, accept, removeImage, imageId } = props

    return (
        <div className="form-group ">
            <label className="">{label}</label>
            <div className="">
                <div id="image-preview" className={`image-preview ${className ? className : ""}`}>
                    {!imageId &&
                        <Fragment>
                            <label htmlFor="image-upload" id="image-label">Choose File</label>
                            <Controller
                                name={name}
                                control={control}
                                rules={rules}
                                render={({ field: { onChange, value, ...rest } }) => (
                                    <input
                                        type={'file'}
                                        placeholder={placeholder}
                                        id="image-upload"
                                        {...rest}
                                        accept={accept}
                                        onChange={handleFileChange}
                                    />
                                )}
                            />
                        </Fragment>}
                    {previewImage &&
                        <div style={thumbInner}>
                            <img src={previewImage} alt='imagePrvi' className='width-per-100 h-100 p-1' />
                            {imageId && <span style={buttonX} onClick={() => removeImage(imageId)}>x</span>}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    position: 'relative',
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};
const buttonX = {
    position: "absolute",
    right: 0,
    backgroundColor: "gray",
    color: "#fff",
    borderRadius: "100%",
    padding: " 4px 10px",
    cursor: "pointer",
    zIndex: "999"
}

export function MutipleFileUpload(props) {
    const { limit, accept, setFiles, files, className, removeImage } = props
    const { clearErrors, setError } = useFormContext()


    const { getRootProps, getInputProps } = useDropzone({
        // accept: {
        //     'image/*': []
        // },
        accept: accept,
        onDrop: acceptedFiles => {
            const newFiles = acceptedFiles.slice(0, limit - files.length);
            setFiles(prevFiles => [...prevFiles, ...newFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file),
            }))]);
        }
    });

    const removeImages = (index) => {
        removeImage(index)
    };


    const thumbs = files.map((file, index) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
                <span style={buttonX} onClick={() => removeImages(index)}>x</span>
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <section>
            <div  {...getRootProps({ className: `dropzone ${className}` })} style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    )
}

// export default index